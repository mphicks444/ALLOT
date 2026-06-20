// sections.jsx — ALLOT Studio homepage sections
// Exported via window for app.jsx consumption.

const { useEffect, useState, useRef } = React;

// ─── ARROW ─────────────────────────────────────────────────────────────────
// On-brand diagonal NE arrow. Inline SVG (not the ↗ glyph, which phones render
// as a colored emoji). Uses currentColor so it inherits the color + the
// hover-translate animation of whatever .arr / .arrow wrapper it sits in.
function ArrowNE() {
  return (
    <svg
      className="arr-svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false">
      <path d="M7 17 17 7" />
      <path d="M8 7 H17 V16" />
    </svg>);

}

// ─── NAV ───────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const links = [
  { id: "about", label: "Studio" },
  { id: "mandates", label: "Who we serve" },
  { id: "services", label: "What we do" },
  { id: "principles", label: "Beliefs" },
  { id: "contact", label: "Say hi" }];

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="ALLOT Studios">
          <span className="mark">A</span>
          <span>ALLOT</span>
          <span className="sep">/</span>
          <span className="role">Studios</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) =>
          <a key={l.id}
          href={`#${l.id}`}
          className="nav-link"
          data-active={activeSection === l.id ? "true" : "false"}>
              {l.label}
            </a>
          )}
        </nav>
        <a href="#contact" className="nav-cta">
          Say hi <span className="arr"><ArrowNE /></span>
        </a>
      </div>
    </header>);

}

// ─── TICKER ────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
  "Strategic Experiences",
  "Visibility & Distribution",
  "Partnerships & BD",
  "Brand Visibility Strategy",
  "Category Presence",
  "Food & Beverage",
  "Beauty & Skincare",
  "Health & Wellness",
  "Recovery & Performance",
  "A screen reaches one sense. A room reaches all five.",
  "Sight · Sound · Taste · Touch · Scent",
  "Proximity over impressions",
  "Working with consumer brands worldwide"];

  const doubled = [...items, ...items];
  return (
    <div className="ticker accent fast" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>);

}

// Giant kinetic marquee divider — repeats a serif phrase across full bleed
function MegaMarquee({ phrase, variant = "", reverse = false }) {
  const items = Array.from({ length: 6 });
  return (
    <div className={`mega-marquee ${variant} ${reverse ? "reverse" : ""}`} aria-hidden="true">
      <div className="mega-marquee-track">
        {items.map((_, i) =>
        <span key={i}>
            {phrase}
            <span className="star" style={{ marginLeft: 32, marginRight: 16 }}>✱</span>
          </span>
        )}
      </div>
    </div>);

}

// ─── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="hero hero-mono">
      <div className="container">
        <div className="hm-grid">
          <div className="hm-mark">
            <h1 className="monogram" aria-label="ALLOT">ALLOT</h1>
            <div className="monogram-labels">
              <span>ALLOT Studios</span>
              <span>Growth · DTC &amp; CPG</span>
            </div>
          </div>

          <nav className="hm-nav" aria-label="Statement">
            <span style={{ fontSize: "clamp(19px, 5vw, 27px)" }}>When growth stalls, presence matters.</span>
          </nav>

          <div className="hm-statement">
            <h2 className="hm-headline" style={{ fontSize: "clamp(26px, 6vw, 42px)" }}>
              A growth studio for DTC and CPG brands with traction, building
              <em> category presence</em> through strategic visibility.
            </h2>
          </div>

          <div className="hm-bio">
            <p>
              We create strategic experiences, partnerships, and
              growth-focused marketing that connect brands with the
              influential communities, high-value audiences, and strategic
              partners most important to their growth across culture,
              business, and sport.
            </p>
          </div>

          <div className="hm-cta">
            <a href="#contact" className="btn btn-dark">
              Create with us <span className="arr"><ArrowNE /></span>
            </a>
          </div>
        </div>
      </div>

      <span className="hm-edge">By introduction</span>
    </section>);

}

// ─── THRESHOLD (THE STRATEGIC FILTER) ──────────────────────────────────────
function Threshold() {
  return (
    <section id="threshold" className="section threshold section--light">
      <div className="container">
        <div className="threshold-frame">
          <div className="eyebrow"><span className="dot"></span>The threshold · strategic filter</div>
          <p className="threshold-copy">
            ALLOT partners with mid-market DTC and CPG brands scaling through
            the <em>$3M–$12M+ ARR</em> corridor. This is the threshold where
            proven demand is no longer enough, and stronger real-world
            presence, community, partnerships, and strategic visibility become
            essential for building <em>category presence</em> and reaching the
            next stage of growth.
          </p>
          <div className="threshold-rule"></div>
          <div className="threshold-meta">
            <span>Selection is mutual</span>
            <span>By introduction</span>
            <span>Briefings under NDA</span>
          </div>
        </div>
      </div>
    </section>);

}

// ─── ABOUT / POSITIONING ───────────────────────────────────────────────────
// ─── THESIS (Relational Proximity vs. Digital Noise) ──────────────────────
function About() {
  return (
    <section id="about" className="section about">
      <div className="container cols-12">
        <div className="label">
          <div className="eyebrow"><span className="dot"></span>01 · Thesis</div>
        </div>
        <div className="text">
          <h2 className="h-section">
            Relational <em>proximity</em><br />
            vs. digital <em>saturation.</em>
          </h2>
          <p className="body-l" style={{ marginTop: 36 }}>
            Growth stalls when the same paid media, the same audiences, and the
            same creative no longer compound. When CAC rises and channel
            efficiency softens, brands realize how much of their growth was
            built on rented digital traffic, not owned presence.
          </p>
          <p className="body-l">
            ALLOT creates strategic experiences and partnership ecosystems that
            help brands move beyond digital saturation and build commercial
            momentum in the rooms, communities, and conversations that shape
            category demand.
          </p>
          <p className="senses-line">
            A screen reaches <em>one sense.</em> A physical experience reaches <em>all five.</em>
          </p>
        </div>

        <div className="pull">
          <div className="num">¶</div>
          <div className="body">
            <p className="body-l" style={{ margin: 0 }}>
              This is the threshold where a brand stops operating like an
              emerging brand and starts behaving like a <em>category player.</em>
               This is the layer that helps growth break through. This is what
              makes a brand feel bigger, move bigger, and be perceived
              differently.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

// ─── CATEGORIES (WHO WE SERVE) ─────────────────────────────────────────────
const CATEGORIES = [
  { name: "Food & Beverage",       desc: "Functional drinks, pantry, snacks, and better-for-you CPG." },
  { name: "Health & Wellness",     desc: "Supplements, adaptogens, longevity, sexual wellness, and daily ritual brands." },
  { name: "Beauty",                desc: "Color, fragrance, tools, and beauty brands with breakout potential." },
  { name: "Skincare",              desc: "Clinical, botanical, derm-led, and modern skincare brands." },
  { name: "Recovery & Performance", desc: "Sports nutrition, recovery, active lifestyle, and performance wellness." },
  { name: "Home & Lifestyle",      desc: "Soft goods, home fragrance, pet, baby, and design-led consumer brands." },
];

function Mandates() {
  return (
    <section id="mandates" className="section categories">
      <div className="container">
        <div className="head">
          <div>
            <div className="eyebrow"><span className="dot"></span>02 · Who we serve</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Built for <em>consumer</em><br />brands with traction.
            </h2>
          </div>
          <p className="lede">
            We focus on the categories where presence, community, and proximity
            compound fastest, and where brands in the <em>$3M–$12M+ ARR</em>
            range are ready to operate like category players.
          </p>
        </div>

        <div className="cats-layout">
          <div className="cats">
            {CATEGORIES.map((c, i) => (
              <div className="cat" key={c.name}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-desc">{c.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="field-card" aria-hidden="true">
            <div className="stripes"></div>
            <div className="corner"></div>
            <div className="corner tr"></div>
            <div className="corner bl"></div>
            <div className="corner br"></div>
            <div className="center-mark">A</div>
            <div className="legend">
              <span>Plate&nbsp;01 · Studio mark</span>
              <span>Consumer focus</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── SERVICES ──────────────────────────────────────────────────────────────
const SERVICES = [
{
  id: "experiences",
  title: "Strategic Experiences",
  body: "Hosted experiences, private dinners, launches, and brand environments designed to move a brand from being seen to being felt. Built to create proximity, deepen relevance, and shape how the market experiences the brand in real life.",
  tags: ["Hosted experiences", "Private dinners", "Launches", "Salons", "Brand environments"]
},
{
  id: "visibility-distribution",
  title: "Visibility & Distribution",
  body: "The systems that bring the brand and the moment into market. From event marketing and amplification to placements, paid support, and content surfaces, this is how visibility travels beyond the experience itself.",
  tags: ["Amplification", "Placements", "Paid support", "Content surfaces", "Audience development"]
},
{
  id: "partnerships",
  title: "Partnerships & Business Development",
  body: "Sponsorships, strategic partnerships, co-marketing, and outbound relationship-building designed to unlock leverage, adjacency, and commercial opportunity. This is where visibility starts opening doors.",
  tags: ["Partnership strategy", "Sponsorship", "Co-marketing", "Outbound", "Strategic BD"]
},
{
  id: "visibility",
  title: "Brand Visibility Strategy",
  body: "The connective tissue. We define where a brand should be seen, around whom, and in what context to strengthen market presence across cultural, commercial, and strategic audiences.",
  tags: ["Positioning", "Visibility strategy", "Editorial", "PR strategy", "Cultural calendar"]
}];


function Services() {
  return (
    <section id="services" className="section services section--light">
      <div className="container">
        <div className="head">
          <div>
            <div className="eyebrow"><span className="dot"></span>02 · What we do</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Four things,<br />done <em>together.</em>
            </h2>
          </div>
          <p className="lede">
            Each one stands on its own. Together, they turn visibility into
            presence, presence into relevance, and relevance into commercial
            momentum.
          </p>
        </div>

        <div className="services-list">
          {SERVICES.map((s, i) =>
          <article className="svc" key={s.id} id={s.id}>
              <div className="num">{String(i + 1).padStart(2, "0")} / 04</div>
              <h3 className="title">{s.title}</h3>
              <div className="body">
                <p style={{ margin: 0 }}>{s.body}</p>
                <div className="tags">
                  {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="arrow"><ArrowNE /></div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

// ─── CLIENTS ───────────────────────────────────────────────────────────────
const CRITERIA = [
{ label: "Already a little bit good",
  desc: "Revenue, repeat customers, or signal that the product is finding the right people." },
{ label: "Going for it",
  desc: "Founders building something they actually want to lead a category — not a side hustle or a quick exit." },
{ label: "Worth talking about",
  desc: "A brand the right people would mention to a friend if they ran into it at the right party." },
{ label: "Taste, or the nose for it",
  desc: "A real opinion about how the brand should look, sound, and behave when no one's watching." }];


function Clients() {
  return (
    <section id="clients" className="section clients">
      <div className="container">
        <div className="grid">
          <div>
            <div className="eyebrow"><span className="dot"></span>05 — Who we work with</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Brands we wish more people <em>knew about.</em>
            </h2>
            <p className="body-l" style={{ marginTop: 28, maxWidth: "44ch" }}>
              We work with a small group of consumer brands each year. The
              good ones tend to find us by introduction.
            </p>

            <ul className="criteria">
              {CRITERIA.map((c, i) =>
              <li key={c.label}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="label">{c.label}</span>
                    <span className="desc">{c.desc}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="field-card" aria-hidden="true">
            <div className="stripes"></div>
            <div className="corner"></div>
            <div className="corner tr"></div>
            <div className="corner bl"></div>
            <div className="corner br"></div>
            <div className="center-mark">A</div>
            <div className="legend">
              <span>Plate&nbsp;01 · Studio mark</span>
              <span>Drop image →</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── PRINCIPLES (HOW WE THINK) ─────────────────────────────────────────────
const PRINCIPLES = [
{ stmt: <>Omnichannel only works when the brand feels <em>coherent.</em></>,
  gloss: "When product, experience, and communication do not reinforce each other, scale gets noisy instead of cumulative." },
{ stmt: <>Strategic adjacency <em>accelerates</em> trust.</>,
  gloss: "The right partners, contexts, and associations compress credibility and expand demand faster than standalone brand effort can." },
{ stmt: <>Category leaders are <em>experienced,</em> not just seen.</>,
  gloss: "Seeing is one sense. The brands that last are tasted, heard, touched, and remembered in ways that build memory and equity." },
{ stmt: <>The goal is becoming the brand that <em>lasts.</em></>,
  gloss: "The most valuable consumer brands are built for memory, market pull, and long-term equity that compounds over time." },
{ stmt: <>Efficient reach is not <em>durable</em> growth.</>,
  gloss: "Paid media captures demand, but it does not build legacy." },
{ stmt: <>Preference is built through <em>repetition.</em></>,
  gloss: "The strongest brands are encountered repeatedly across the moments, environments, and touchpoints that shape trust, memory, and demand." }];


function Principles() {
  return (
    <section id="principles" className="section principles">
      <div className="container">
        <div className="cols-12" style={{ alignItems: "end" }}>
          <div style={{ gridColumn: "span 5" }}>
            <div className="eyebrow"><span className="dot"></span>04 · How we think</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Six things we <em>believe.</em>
            </h2>
          </div>
          <p className="lede" style={{ gridColumn: "7 / span 6", color: "rgba(242,239,231,0.72)" }}>
            Earned by doing the work. Not arranged afterward to sound right.
          </p>
        </div>

        <div className="principles-list">
          {PRINCIPLES.map((p, i) =>
          <div className="princ" key={i}>
              <div className="num">P · {String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="stmt">{p.stmt}</div>
                <span className="gloss">{p.gloss}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── SELECTED WORK ────────────────────────────────────────────────────────
const WORK = [
{ client: "Mira & Co.", proj: "Launch campaign + summer pop-up", disc: "Marketing · Experiential", yr: "2025" },
{ client: "House of Ord.", proj: "Retail rollout, 32 doors", disc: "Retail · BD", yr: "2025" },
{ client: "Field Notes Skin", proj: "Founder press push + creator seed", disc: "Media · Partnerships", yr: "2025" },
{ client: "Sundry Wellness", proj: "Always-on growth, year two", disc: "Marketing · Digital", yr: "2024 →" },
{ client: "Norwood Goods", proj: "Holiday windows + chef dinners", disc: "Experiential", yr: "2024" },
{ client: "Confidential", proj: "2026 launch — spirits", disc: "All hands", yr: "Soon" }];


function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="head">
          <div>
            <div className="eyebrow"><span className="dot"></span>03 — Selected work</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              A few brands<br />we're <em>proud of.</em>
            </h2>
          </div>
          <p className="lede">
            We keep the list short on purpose. Each engagement is hands-on —
            usually a year or more, sometimes a single hot launch we couldn't
            say no to.
          </p>
        </div>

        <div className="work-list">
          {WORK.map((w, i) =>
          <article className="proj" key={i}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <div className="client">
                {w.client === "Confidential" ? <em>Confidential</em> : w.client}
              </div>
              <div className="title">{w.proj}</div>
              <div className="disc">{w.disc}</div>
              <div className="yr">{w.yr}</div>
              <div className="arr"><ArrowNE /></div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

// ─── FUTURE ────────────────────────────────────────────────────────────────
function Future() {
  return (
    <section id="future" className="section future">
      <div className="container">
        <div className="grid">
          <div>
            <div className="eyebrow"><span className="dot"></span>06 — Horizon</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Begins with <em>consumer.</em>
            </h2>
          </div>
          <p className="lede">
            ALLOT begins with CPG because that is where strategic visibility
            and disciplined distribution are most under-priced today. The
            studio's operating model is built to extend — patiently — into
            adjacent innovation-led categories where the same unlocks apply.
          </p>
        </div>

        <div className="stages">
          <div className="stage" data-now="true">
            <div className="yr"><span className="pip"></span>2024 — Now</div>
            <div className="name">Consumer &amp; CPG</div>
            <div className="desc">Beverage, wellness, pantry, beauty-adjacent, and home — the studio's primary practice.</div>
          </div>
          <div className="stage">
            <div className="yr"><span className="pip"></span>Next horizon</div>
            <div className="name">Consumer-tech &amp; commerce</div>
            <div className="desc">Hardware, marketplaces, and consumer software where retail and distribution remain the central unlock.</div>
          </div>
          <div className="stage">
            <div className="yr"><span className="pip"></span>Long horizon</div>
            <div className="name">Technology &amp; AI</div>
            <div className="desc">Innovation-led categories where strategic visibility, partnerships, and credibility compound the same way.</div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── CONTACT ───────────────────────────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/hi-weareallot/30min";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", company: "", email: "", role: "founder-ceo", stage: "550k-1",
    intent: "awareness", budget: "50-100", message: ""
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
      // Send them to Calendly to book a call, with name + email pre-filled.
      const params = new URLSearchParams();
      if (form.name) params.set("name", form.name);
      if (form.email) params.set("email", form.email);
      const bookingUrl = CALENDLY_URL + (params.toString() ? "?" + params.toString() : "");
      setTimeout(() => { window.location.href = bookingUrl; }, 2000);
    } catch (err) {
      setError(err.message || "Could not send. Please email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="grid">
          <div>
            <div className="eyebrow"><span className="dot"></span>06 · Say hi</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Tell us what you're <em>building.</em>
            </h2>
            <p className="body-l" style={{ marginTop: 28, maxWidth: "44ch" }}>
              We read every note. The right ones usually get a reply within the
              week, often with questions and sometimes with introductions to
              people we think you should already know.
            </p>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="row">
                <div className="field">
                  <label htmlFor="f-name">Your name</label>
                  <input id="f-name" required value={form.name} onChange={set("name")} placeholder="Jane Doe" />
                </div>
                <div className="field">
                  <label htmlFor="f-company">Brand or company</label>
                  <input id="f-company" required value={form.company} onChange={set("company")} placeholder="Your brand" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input id="f-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@yourbrand.com" />
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="f-role">Primary decision maker</label>
                  <select id="f-role" value={form.role} onChange={set("role")}>
                    <option value="founder-ceo">Founder / CEO</option>
                    <option value="president-coo">President / COO</option>
                    <option value="head-of-marketing">Head of Marketing / VP of Marketing</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-stage">Stage</label>
                  <select id="f-stage" value={form.stage} onChange={set("stage")}>
                    <option value="550k-1">$550K–$1M ARR</option>
                    <option value="1-5">$1M–$5M ARR</option>
                    <option value="5-20">$5M–$20M ARR</option>
                    <option value="20-plus">$20M+ ARR</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-intent">What brings you here</label>
                <select id="f-intent" value={form.intent} onChange={set("intent")}>
                  <option value="awareness">We need more awareness.</option>
                  <option value="customers">We need more customers.</option>
                  <option value="positioning">We need stronger positioning.</option>
                  <option value="partnerships">We need strategic partnerships.</option>
                  <option value="investor">We need investor visibility.</option>
                  <option value="gtm">We need a clearer GTM strategy.</option>
                  <option value="all">We need all of the above.</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-budget">What investment level have you allocated for strategic growth?</label>
                <select id="f-budget" value={form.budget} onChange={set("budget")}>
                  <option value="50-100">$50K–$100K</option>
                  <option value="100-250">$100K–$250K</option>
                  <option value="250-500">$250K–$500K</option>
                  <option value="500-plus">$500K+</option>
                </select>
                <span className="field-note">Engagements begin at $25K. Total project investment varies based on scope.</span>
              </div>
              <div className="field">
                <label htmlFor="f-message">A few sentences</label>
                <textarea id="f-message" required value={form.message} onChange={set("message")}
                placeholder="Where you are, what you're trying to make true, and what's in the way." />
              </div>

              <div className="submit-row">
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  <span className="dot"></span>
                  {sending ? "Sending…" : "Send it over"}
                  <span className="arr"><ArrowNE /></span>
                </button>
                {submitted && <span className="ok">Got it — taking you to book a call…</span>}
                {error && <span className="ok" style={{ color: "#FF0A54" }}>{error}</span>}
              </div>
            </form>
          </div>

          <aside className="contact-side">
            <div className="eyebrow"><span className="dot"></span>Currently open to</div>

            <div className="engaging">
              <div className="row">
                <span className="key">01</span>
                <span className="val">Founders building products with real traction and market pull.</span>
              </div>
              <div className="row">
                <span className="key">02</span>
                <span className="val">Brands ready to do real-world moments, not just posts.</span>
              </div>
              <div className="row">
                <span className="key">03</span>
                <span className="val">Partners with a great venue, gathering, audience, or strategic angle.</span>
              </div>
              <div className="row">
                <span className="key">04</span>
                <span className="val">Reporters, producers, and editors chasing stories we'd want our name near.</span>
              </div>
            </div>

            <div className="channels" style={{ marginTop: 44 }}>
              <a href="mailto:hi@allot.studio">hi@allot.studio</a>
              <a href="mailto:work@allot.studio">work@allot.studio</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Press kit <span className="arr"><ArrowNE /></span></a>
            </div>
          </aside>
        </div>
      </div>
    </section>);

}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="col lockup">
            <span className="mark">ALLOT</span>
            <p>Led by operators who turn the right room into a brand's most valuable channel. Proximity over impressions, every time.</p>
          </div>
          <div className="col">
            <h4>Studio</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#mandates">Who we serve</a></li>
              <li><a href="#principles">Beliefs</a></li>
              <li><a href="#contact">Say hi</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>What we do</h4>
            <ul>
              <li><a href="#experiences">Strategic Experiences</a></li>
              <li><a href="#visibility-distribution">Visibility &amp; Distribution</a></li>
              <li><a href="#partnerships">Partnerships &amp; BD</a></li>
              <li><a href="#visibility">Brand Visibility Strategy</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Say hi</h4>
            <ul>
              <li><a href="mailto:hi@allot.studio">hi@allot.studio</a></li>
              <li><a href="mailto:work@allot.studio">work@allot.studio</a></li>
              <li><a href="#">Global · Working internationally</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2024–2026 ALLOT Studios</span>
          <span>A global growth studio · Working internationally</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, {
  Nav, Ticker, MegaMarquee, Hero, Threshold, About, Mandates, Services,
  Principles, Future, Contact, Footer
});