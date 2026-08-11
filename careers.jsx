// careers.jsx — ALLOT Studios careers page

const { useEffect, useState } = React;

// ─── NAV (links back to homepage sections) ──────────────────────────────────
function CareersNav() {
  const links = [
    { href: "index.html#top", label: "Studio" },
    { href: "index.html#mandates", label: "Who we serve" },
    { href: "index.html#services", label: "What we do" },
    { href: "index.html#principles", label: "Process" },
    { href: "careers.html", label: "Careers", active: true },
  ];
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="index.html#top" className="brand" aria-label="ALLOT Studios">
          <span className="mark">A</span>
          <span>ALLOT</span>
          <span className="sep">/</span>
          <span className="role">Studios</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link"
               data-active={l.active ? "true" : "false"}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="index.html#contact" className="nav-cta">
          Say hi <span className="arr">↗</span>
        </a>
      </div>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function CareersHero() {
  return (
    <section className="careers-hero" data-screen-label="Careers — Hero">
      <div className="container">
        <div className="ch-eyebrow">Careers · Build with us</div>
        <h1>
          Work in the<br />
          <em>room</em> where it<br />
          happens.
        </h1>
        <p className="ch-lede">
          ALLOT is a small team of operators who turn the right room into a
          brand's most valuable channel. We hire people who would rather make
          something memorable happen in person than optimize one more ad.
        </p>
        <div className="ch-meta">
          <div className="cell">
            <span className="lbl">Team</span>
            <span className="val">Small &amp; <em>senior</em></span>
          </div>
          <div className="cell">
            <span className="lbl">Where</span>
            <span className="val">Global · <em>remote-first</em></span>
          </div>
          <div className="cell">
            <span className="lbl">How we work</span>
            <span className="val">In the <em>room</em>, on the road</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VALUES / WHAT IT'S LIKE ─────────────────────────────────────────────────
const VALUES = [
  { n: "01", t: "Operators, not vendors", d: "Everyone here has owned an outcome. We hire people who think like founders and move like producers." },
  { n: "02", t: "Proximity over impressions", d: "We believe the most valuable channel is human. The work happens in rooms, not just dashboards." },
  { n: "03", t: "Taste is a skill", d: "We sweat the guest list, the lighting, the follow-up. Detail is the difference between seen and felt." },
  { n: "04", t: "Small on purpose", d: "We stay lean so every person has real surface area. No layers, no busywork, no hiding." },
  { n: "05", t: "Senses, not screens", d: "A screen reaches one sense. A room reaches all five. We build for taste, sound, touch, and scent." },
  { n: "06", t: "Earned, then trusted", d: "Show the work, get the rope. Autonomy here is high and given fast to people who deliver." },
];

function Values() {
  return (
    <section className="section values section--light" data-screen-label="Careers — Values">
      <div className="container">
        <div className="head">
          <div className="eyebrow"><span className="dot"></span>What it's like</div>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            How we<br />work <em>here.</em>
          </h2>
        </div>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.n}>
              <span className="n">{v.n}</span>
              <div className="vt">{v.t}</div>
              <p className="vd">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OPEN ROLES ──────────────────────────────────────────────────────────────
// PLACEHOLDER roles — replace `title / body / tags / type / location` with real
// content when ready. Set `placeholder: false` once a role is finalized.
const ROLES = [
  {
    id: "role-1",
    title: "Role title goes here",
    body: "One or two sentences on what this person owns, who they work with, and what success looks like in the first year.",
    tags: ["Tag", "Tag", "Tag", "Tag"],
    type: "Full-time",
    location: "Remote · Global",
    placeholder: true,
  },
  {
    id: "role-2",
    title: "Second role title",
    body: "One or two sentences on the mandate, the kind of person who thrives in it, and what they'll be measured against.",
    tags: ["Tag", "Tag", "Tag"],
    type: "Full-time",
    location: "Remote · Global",
    placeholder: true,
  },
  {
    id: "role-3",
    title: "Third role title",
    body: "One or two sentences describing scope, seniority, and the part of the studio this role sits inside.",
    tags: ["Tag", "Tag", "Tag", "Tag"],
    type: "Contract",
    location: "Hybrid · NYC / LA",
    placeholder: true,
  },
];

function Role({ role, i }) {
  return (
    <article className={`role ${role.placeholder ? "is-placeholder" : ""}`}
             id={role.id}
             onClick={() => { window.location.href = "index.html#contact"; }}>
      <div className="role-num">{String(i + 1).padStart(2, "0")} / {String(ROLES.length).padStart(2, "0")}</div>
      <h3 className="role-title">{role.title}</h3>
      <div className="role-body">
        <p style={{ margin: 0 }}>{role.body}</p>
        <div className="role-tags">
          {role.tags.map((t, k) => <span key={k} className="tag">{t}</span>)}
        </div>
      </div>
      <div className="role-meta">
        <span className="rm"><span className="pip"></span>{role.type}</span>
        <span className="rm">{role.location}</span>
      </div>
      <div className="role-arrow">↗</div>
    </article>
  );
}

function OpenRoles() {
  return (
    <section className="section roles" id="open-roles" data-screen-label="Careers — Open roles">
      <div className="container">
        <div className="head">
          <div>
            <div className="eyebrow"><span className="dot"></span>Open roles</div>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              Who we're<br />looking <em>for.</em>
            </h2>
          </div>
          <div className="count">
            <strong>0</strong> open right now
          </div>
        </div>

        <div className="roles-empty">
          <span className="re-mark">✱</span>
          <h3>No roles available at the moment.</h3>
          <p>
            We're not actively hiring right now, but we keep an eye out for
            exceptional operators. If that's you, leave a note and we'll reach
            out when the right seat opens.
          </p>
        </div>

        <div className="open-app">
          <div className="oa-text">
            <h3>Think you're the exception?</h3>
            <p>
              We hire ahead of need when we meet the right operator. Tell us what
              you'd own and why it's you.
            </p>
          </div>
          <a href="index.html#contact" className="btn btn-dark">
            Send an open application <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── HIRING PROCESS ──────────────────────────────────────────────────────────
const STEPS = [
  { n: "1", t: "You reach out", d: "A note, a portfolio, or a single great idea. We read every one." },
  { n: "2", t: "We talk", d: "A real conversation about the work, not a quiz. You meet who you'd work with." },
  { n: "3", t: "A working session", d: "We solve a real problem together so the fit is obvious to both of us." },
  { n: "4", t: "We decide fast", d: "No endless loops. A clear yes or no, usually within two weeks." },
];

function Process() {
  return (
    <section className="section process section--light" data-screen-label="Careers — Process">
      <div className="container">
        <div className="head">
          <div className="eyebrow"><span className="dot"></span>How we hire</div>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            Four steps.<br />No <em>theater.</em>
          </h2>
        </div>
        <div className="process-steps">
          {STEPS.map((s) => (
            <div className="process-step" key={s.n}>
              <div className="ps-n">{s.n}</div>
              <div className="ps-t">{s.t}</div>
              <p className="ps-d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function CareersFooter() {
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
              <li><a href="index.html#top">About</a></li>
              <li><a href="index.html#mandates">Who we serve</a></li>
              <li><a href="index.html#principles">Process</a></li>
              <li><a href="careers.html">Careers</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>What we do</h4>
            <ul>
              <li><a href="index.html#experiential">Experiential Marketing</a></li>
              <li><a href="index.html#creative-direction">Creative Campaign Direction</a></li>
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
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function CareersApp() {
  return (
    <>
      <CareersNav />
      <Ticker />
      <main>
        <CareersHero />
        <MegaMarquee phrase={<>Build with us · Operators only · In the room ·&nbsp;</>} variant="cobalt" />
        <OpenRoles />
      </main>
      <CareersFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CareersApp />);
