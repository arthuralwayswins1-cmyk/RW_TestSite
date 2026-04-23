// Philosophy sidebar / "Tilted Truth" — editorial interlude
function TiltedTruth() {
  return (
    <section style={{ background: "var(--paper)", paddingTop: "clamp(24px, 3vw, 48px)", paddingBottom: "clamp(40px, 6vw, 80px)" }}>
      <div className="wrap">
        <div className="tt-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}>
          <div>
            <div className="eyebrow">A Principle</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 58px)", margin: "18px 0 24px", letterSpacing: "-0.01em" }}>
              Technology should <span className="italic-hand">disappear</span> into your work.
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 18, maxWidth: 520, margin: 0 }}>
              Most software forces you to change. I build systems that fit the way you <em style={{ fontFamily: "var(--font-italic)" }}>actually</em> work.
            </p>
            <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 520, marginTop: 14 }}>
              No bloat. No handoffs. Just the right tools, connected, built to grow with you.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="tape" style={{ maxWidth: 360, padding: "26px 28px", transform: "rotate(calc(1.2 * var(--tilt)))" }}>
              <div className="mono-label" style={{ color: "var(--clay)", marginBottom: 12 }}>What that looks like</div>
              <ul style={{ fontFamily: "var(--font-hand)", fontSize: 26, lineHeight: 1.35, color: "var(--ink)", listStyle: "none", padding: 0, margin: 0 }}>
                <li>· Clear scoping</li>
                <li>· Thoughtful design</li>
                <li>· Pragmatic build</li>
                <li>· Reliable operation</li>
                <li>· Ongoing iteration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .tt-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function App() {
  const { tweaks, setTweaks, active } = useTweaks();
  return (
    <>
      <Nav />
      <Hero headlineVariant={tweaks.headline} />
      <Work />
      <TiltedTruth />
      <Approach />
      <Process />
      <Fields />
      <AboutNik />
      <FAQ />
      <Contact />
      <Footer />
      <TweaksPanel active={active} tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
