// app.jsx — ALLOT Studio entry

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "noir",
  "displayFont": "serif",
  "density": "regular",
  "energy": "high",
  "accent": ""
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeSection, setActiveSection] = React.useState("top");

  React.useEffect(() => {
    document.body.dataset.palette = t.palette;
    document.body.dataset.displayFont = t.displayFont;
    document.body.dataset.density = t.density;
    document.body.dataset.energy = t.energy;
    if (t.accent) {
      document.documentElement.style.setProperty("--accent", t.accent);
    } else {
      document.documentElement.style.removeProperty("--accent");
    }
  }, [t.palette, t.displayFont, t.density, t.energy, t.accent]);

  React.useEffect(() => {
    const ids = ["top", "threshold", "about", "mandates", "services", "principles", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <Ticker />
      <main>
        <Hero />
        <Threshold />
        <MegaMarquee phrase={<>Dinners · <em>Pop-ups</em> · Retail · Partnerships · Community · Press</>} />
        <About />
        <Mandates />
        <Services />
        <MegaMarquee variant="cobalt" reverse phrase={<>Proximity over <em>impressions</em> · Rooms over <em>reach</em> · Trust over <em>noise</em> ·</>} />
        <Principles />
        <MegaMarquee variant="accent" phrase={<>The right people, in the <em>right room</em> · The right people, in the <em>right room</em> ·</>} />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio
          label="Theme"
          value={t.palette}
          options={["blush", "coral", "plum", "noir"]}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#FF0A54", "#F5453F", "#C71D6A", "#FF2D74", "#A8FF1F"]}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Energy" />
        <TweakRadio
          label="Mode"
          value={t.energy}
          options={["high", "max"]}
          onChange={(v) => setTweak("energy", v)}
        />

        <TweakSection label="Type" />
        <TweakRadio
          label="Display"
          value={t.displayFont}
          options={["serif", "sans"]}
          onChange={(v) => setTweak("displayFont", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
