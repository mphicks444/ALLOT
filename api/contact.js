// Vercel serverless function: receives ALLOT contact-form submissions and
// creates a row in the Notion "Contacts" CRM database.
//
// Required environment variables (set in Vercel → Settings → Environment Variables):
//   NOTION_TOKEN   - Notion internal integration secret (starts with ntn_ / secret_)
//   NOTION_DB_ID   - the Contacts database id (optional; falls back to the known id)
//
// Optional email notification (only sends if RESEND_API_KEY is set):
//   RESEND_API_KEY - Resend API key (re_...)
//   NOTIFY_EMAIL   - where to send the "new lead" notification (your inbox)
//   RESEND_FROM    - from address (defaults to onboarding@resend.dev for quick start;
//                    set to a verified-domain address once you verify one in Resend)

const FALLBACK_DB_ID = "f2ab3c31-c9c4-434b-a16f-3a50c5509648";
const NOTION_VERSION = "2022-06-28";

// Map the form's stored values to the human-readable labels shown in the UI.
const ROLE_LABELS = {
  "founder-ceo": "Founder / CEO",
  "president-coo": "President / COO",
  "head-of-marketing": "Head of Marketing / VP of Marketing",
};
const STAGE_LABELS = {
  "550k-1": "$550K–$1M ARR",
  "1-5": "$1M–$5M ARR",
  "5-20": "$5M–$20M ARR",
  "20-plus": "$20M+ ARR",
};
const INTENT_LABELS = {
  awareness: "We need more awareness.",
  customers: "We need more customers.",
  positioning: "We need stronger positioning.",
  partnerships: "We need strategic partnerships.",
  investor: "We need investor visibility.",
  gtm: "We need a clearer GTM strategy.",
  all: "We need all of the above.",
};
const BUDGET_LABELS = {
  "50-100": "$50K–$100K",
  "100-250": "$100K–$250K",
  "250-500": "$250K–$500K",
  "500-plus": "$500K+",
};

const label = (map, v) => map[v] || v || "—";
const clip = (s, n) => String(s == null ? "" : s).slice(0, n);
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Sends a "new lead" email via Resend. No-op (and never throws) if not configured.
async function sendNotification(d) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return; // email is optional — skip silently if unconfigured
  const from = process.env.RESEND_FROM || "ALLOT Website <onboarding@resend.dev>";

  const rows = [
    ["Name", d.name],
    ["Company", d.company],
    ["Email", d.email],
    ["Role", d.roleLabel],
    ["Stage", d.stageLabel],
    ["Intent", d.intentLabel],
    ["Budget", d.budgetLabel],
  ].map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#888">${k}</td><td style="padding:4px 0"><strong>${esc(v || "—")}</strong></td></tr>`).join("");

  const html =
    `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;color:#161018">` +
    `<h2 style="margin:0 0 12px">New lead from the ALLOT website</h2>` +
    `<table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>` +
    `<div style="color:#888;margin-bottom:4px">Message</div>` +
    `<div style="white-space:pre-wrap;border-left:3px solid #FF0A54;padding-left:12px">${esc(d.message)}</div>` +
    `<p style="color:#888;margin-top:20px;font-size:13px">Also saved to your Notion Contacts CRM.</p></div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: d.email || undefined,
        subject: `New lead: ${d.name}${d.company ? " — " + d.company : ""}`,
        html,
      }),
    });
    if (!r.ok) console.error("Resend error", r.status, await r.text());
  } catch (err) {
    console.error("Resend send failed", err);
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_DB_ID || FALLBACK_DB_ID;
  if (!token) {
    return res.status(500).json({ ok: false, error: "Server not configured" });
  }

  // Body may arrive parsed (object) or as a raw string depending on runtime.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const name = clip(body.name, 200).trim();
  const email = clip(body.email, 200).trim();
  const message = clip(body.message, 2000).trim();

  if (!name || !message) {
    return res.status(400).json({ ok: false, error: "Name and message are required." });
  }

  const company = clip(body.company, 200).trim();
  const roleLabel = label(ROLE_LABELS, body.role);
  const stageLabel = label(STAGE_LABELS, body.stage);
  const intentLabel = label(INTENT_LABELS, body.intent);
  const budgetLabel = label(BUDGET_LABELS, body.budget);

  const notes =
    `Stage: ${stageLabel}\n` +
    `Intent: ${intentLabel}\n` +
    `Budget: ${budgetLabel}\n\n` +
    `Message:\n${message}`;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  const properties = {
    Name: { title: [{ text: { content: name } }] },
    "Relationship type": { select: { name: "Lead" } },
    Industry: { select: { name: "ALLOT Studios" } },
    "Last contact date": { date: { start: today } },
    Notes: { rich_text: [{ text: { content: clip(notes, 2000) } }] },
  };
  if (company) properties.Company = { rich_text: [{ text: { content: company } }] };
  if (roleLabel && roleLabel !== "—") properties.Title = { rich_text: [{ text: { content: roleLabel } }] };
  if (email) properties.Email = { email };

  try {
    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: dbId }, properties }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Notion API error", r.status, detail);
      return res.status(502).json({ ok: false, error: "Could not save to Notion." });
    }

    // Optional: email notification. Fires only if configured; never blocks the
    // success response (the Notion row is the source of truth).
    await sendNotification({ name, company, email, roleLabel, stageLabel, intentLabel, budgetLabel, message });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact handler error", err);
    return res.status(500).json({ ok: false, error: "Unexpected error." });
  }
};
