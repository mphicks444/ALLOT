// Vercel serverless function: receives ALLOT contact-form submissions and
// creates a row in the Notion "Contacts" CRM database.
//
// Required environment variables (set in Vercel → Settings → Environment Variables):
//   NOTION_TOKEN  - Notion internal integration secret (starts with ntn_ / secret_)
//   NOTION_DB_ID  - the Contacts database id
// NOTION_DB_ID falls back to the known database id if the env var is absent.

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

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact handler error", err);
    return res.status(500).json({ ok: false, error: "Unexpected error." });
  }
};
