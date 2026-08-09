// sections.jsx — ALLOT Studio homepage sections
// Exported via window for app.jsx consumption.

const { useEffect, useState, useRef } = React;

// ─── NAV ───────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const links = [
  { id: "top", label: "Studio" },
  { id: "mandates", label: "Who we serve" },
  { id: "services", label: "What we do" },
  { id: "principles", label: "Beliefs" },
  { id: "careers", label: "Careers", href: "careers.html" },
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
          href={l.href || `#${l.id}`}
          className="nav-link"
          data-active={activeSection === l.id ? "true" : "false"}>
              {l.label}
            </a>
          )}
        </nav>
        <a href="#contact" className="nav-cta">
          Say hi <span className="arr">↗</span>
        </a>
      </div>
    </header>);

}

// ─── TICKER ────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
  "Experiential Marketing",
  "Creative Direction for Campaigns",
  "Content Strategy",
  "Category Presence",
  "Consumer & CPG",
  "Fashion",
  "Sport",
  "Entertainment",
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
              <span>Experience Studio</span>
            </div>
          </div>

          <nav className="hm-nav" aria-label="Statement">
            <span style={{ fontSize: "27px", textTransform: "uppercase" }}>Most brands chase attention. We create attachment.</span>
          </nav>

          <div className="hm-statement">
            <h2 className="hm-headline" style={{ fontSize: "42px" }}>
              An experience studio creating branded environments and
              experiential campaigns across <em>consumer, fashion, sport, and entertainment.</em>
            </h2>
          </div>

          <div className="hm-bio">
            <p>
              We are a culturally connected experience agency fueled by vivid
              imagination, rigorous strategy, and a refusal to be boxed in. We
              do not play it safe, and we do not do quiet. We fuse cultural
              insight with flawless production execution to design tactical,
              real-world experiences that completely reshape what is next.
            </p>
          </div>

          <div className="hm-cta">
            <a href="#contact" className="btn btn-dark">
              Let's vibe out <span className="arr">↗</span>
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
            We partner with mid-market brands scaling through
            the <em>critical $3M–$12M+ ARR</em> corridor.
            <span className="tc-break">
            </span>
            <span className="tc-break">
              Operating with absolute intentionality and always engineering
              with the ultimate outcome in mind, we step in to turn baseline
              market presence into absolute <em>category dominance.</em>
            </span>
            <span className="tc-break">
              We construct the commanding physical footprints, amplified PR,
              and strategic visibility required to shatter growth ceilings and
              lock in your next tier of enterprise scale.
            </span>
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

// ─── CATEGORIES (WHO WE SERVE) ─────────────────────────────────────────────
const CATEGORIES = [
  { name: "Consumer Brands", desc: "Beauty, skincare, wellness, food, beverage, personal care, home, and emerging consumer categories." },
  { name: "Fashion, Lifestyle and Performance", desc: "Fashion, fragrance, footwear, fitness, recovery, sports nutrition, and active lifestyle." },
  { name: "Select Sports, Entertainment and Cultural Properties", desc: "Organizations seeking experiential concepts, audience engagement, strategic partnerships, and cultural visibility." },
];

function Mandates() {
  return (
    <section id="mandates" className="section categories">
      <div className="container">
        <div className="head">
          <div>
            <div className="eyebrow"><span className="dot"></span>02 · Who we create for</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Built for <em>brands</em><br />with traction.
            </h2>
          </div>
          <p className="lede" style={{ fontSize: 15 }}>
            From experiential marketing, to creative direction, to content
            strategy, we design experiences and stories that connect brands
            with influential communities and turn attention into attachment.
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
const EXPERIENTIAL_COLUMNS = [
{ label: "Strategy", items: ["Strategy + Insight"] },
{ label: "Brand Experiences", items: ["Pop-ups", "Press + Influencers", "Brand Trips", "Global Toolkits", "Festivals"] },
{ label: "Amplification", items: ["Influencer Mktg", "Mailers", "Merch", "Content", "OOH", "Sampling"] },
{ label: "Retail", items: ["In-store Exp.", "Concept Stores"] },
{ label: "Commercial Impact", items: ["Measurement + Results"] }];


const SERVICES = [
{
  id: "experiential",
  title: "Experiential Marketing",
  lead: "Full funnel activation, delivered end to end.",
  body: "We plan, produce, and amplify the brand moments that turn attention into commercial results, covering strategy, the experience itself, retail, and everything that keeps working after the room clears.",
  columns: EXPERIENTIAL_COLUMNS
},
{
  id: "creative-direction",
  title: "Creative Direction for Campaigns",
  lead: "A campaign is only as strong as the idea holding it together.",
  body: "We shape the creative concept, look, and voice behind a campaign, then carry it consistently across every channel and touchpoint so the brand feels considered at every size.",
  tagLabel: "Includes",
  tags: ["Campaign Concepting", "Art Direction", "Brand Voice & Messaging", "Visual Systems", "Asset Direction", "Channel Adaptation"]
},
{
  id: "content-strategy",
  title: "Content Strategy",
  lead: "Content should build a following, not just fill a calendar.",
  body: "We define what a brand says, where it says it, and why it matters, then build a content approach that compounds audience and trust over time instead of chasing one off moments.",
  tagLabel: "Includes",
  tags: ["Content Pillars", "Editorial Planning", "Channel Strategy", "Creator Partnerships", "Performance Content", "Reporting & Insights"]
}];


function Services() {
  return (
    <section id="services" className="section services section--light">
      <div className="container">
        <div className="head">
          <div>
            <div className="eyebrow"><span className="dot"></span>02 · What we do</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Three <em>distinct</em><br />services.
            </h2>
          </div>
          <p className="lede">
            We design tailored visibility strategies around the audiences,
            partnerships, and measurable outcomes that matter most to your
            growth. Each of these three services stands on its own, and each
            helps brands build familiarity, strengthen credibility, and create
            lasting commercial opportunities.
          </p>
        </div>

        <div className="services-list">
          {SERVICES.map((s, i) =>
          <article className="svc" key={s.id} id={s.id}>
              <div className="num">{String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}</div>
              <h3 className="title">{s.title}</h3>
              <div className="body">
                {s.lead && <p className="svc-lead">{s.lead}</p>}
                <p style={{ margin: 0 }}>{s.body}</p>
                {s.columns &&
                <div className="svc-columns">
                  {s.columns.map((c, ci) =>
                  <div className="svc-col" key={c.label}>
                    <div className="svc-col-head">
                      <span className="svc-col-num">{String(ci + 1).padStart(2, "0")}</span>
                      <span className="svc-col-label">{c.label}</span>
                    </div>
                    <ul className="svc-col-items">
                      {c.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  </div>
                  )}
                </div>}
                {s.tagLabel &&
                <>
                  <span className="tags-label">{s.tagLabel}</span>
                  <div className="tags">
                    {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </>}
              </div>
              <div className="arrow">↗</div>
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
              <div className="arr">↗</div>
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
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", role: "founder-ceo", stage: "550k-1",
    intent: "awareness", budget: "50-100", message: ""
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="grid">
          <div>
            <div className="eyebrow"><span className="dot"></span>06 · Say hi</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Tell us the <em>vibes.</em>
            </h2>
            <p className="body-l" style={{ marginTop: 28, maxWidth: "44ch" }}>
              After you submit, our Experience team reaches out to schedule a
              call. Expect a reply within the week, often with questions,
              sometimes with introductions to people we think you should
              already know.
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
                <button type="submit" className="btn btn-primary">
                  <span className="dot"></span>
                  Send it over
                  <span className="arr">↗</span>
                </button>
                {submitted && <span className="ok">Got it. Talk soon.</span>}
              </div>
            </form>
          </div>

          <aside className="contact-side">
            <div className="channels">
              <a href="mailto:hi@weareallot.com">hi@weareallot.com</a>
              <a href="mailto:partnerships@weareallot.com">partnerships@weareallot.com</a>
              <a href="mailto:hi@weareallot.com">Contact us ↗</a>
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
              <li><a href="#top">About</a></li>
              <li><a href="#mandates">Who we serve</a></li>
              <li><a href="#principles">Beliefs</a></li>
              <li><a href="careers.html">Careers</a></li>
              <li><a href="#contact">Say hi</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>What we do</h4>
            <ul>
              <li><a href="#experiential">Experiential Marketing</a></li>
              <li><a href="#creative-direction">Creative Direction for Campaigns</a></li>
              <li><a href="#content-strategy">Content Strategy</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Say hi</h4>
            <ul>
              <li><a href="mailto:hi@weareallot.com">hi@weareallot.com</a></li>
              <li><a href="mailto:partnerships@weareallot.com">partnerships@weareallot.com</a></li>
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
  Nav, Ticker, MegaMarquee, Hero, Threshold, Mandates, Services,
  Principles, Future, Contact, Footer
});