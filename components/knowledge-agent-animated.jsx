// Nav + Hero
const { useState, useEffect } = React;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "sticky", top: 0, zIndex: 50,
    backdropFilter: scrolled ? "blur(10px)" : "none",
    background: scrolled ? "rgba(244,241,232,0.88)" : "transparent",
    borderBottom: scrolled ? "1px solid rgba(26,26,26,0.08)" : "1px solid transparent",
    transition: "all 0.25s ease",
  };

  const links = [
    ["Work", "#work"],
    ["Approach", "#approach"],
    ["Process", "#process"],
    ["Fields", "#fields"],
    ["About", "#about"],
    ["FAQ", "#faq"],
  ];

  return (
    <nav style={navStyle}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px var(--pad)" }}>
        <a href="#top" style={{ display: "inline-flex", alignItems: "baseline", gap: 0, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", position: "relative" }}>
          <span>Root</span>
          <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", color: "var(--forest)", fontWeight: 400, position: "relative" }}>
            Wurx
            <span style={{
              position: "absolute",
              left: "-4%", right: "-4%",
              bottom: "-6px",
              height: 6,
              background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 8' preserveAspectRatio='none'><path d='M2 5 Q 15 1 30 4 T 58 3' stroke='%236B9A5F' stroke-width='1.8' fill='none' stroke-linecap='round'/></svg>\") no-repeat",
              backgroundSize: "100% 100%",
              pointerEvents: "none",
            }} />
          </span>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} style={{ fontSize: 14, color: "var(--ink-soft)", fontWeight: 450 }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--clay)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--ink-soft)"}>
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>Book a free call</a>
        </div>
        <button className="nav-toggle" onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22
        }}>☰</button>
      </div>
      {open && (
        <div style={{ padding: "0 var(--pad) 20px", display: "flex", flexDirection: "column", gap: 14, background: "var(--paper)" }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ fontSize: 18 }}>{label}</a>
          ))}
          <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>Book a free call</a>
        </div>
      )}
      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroDiagram() {
  // Hand-drawn-feel connection diagram: DATA + PEOPLE + SYSTEMS → OUTCOMES
  return (
    <svg viewBox="0 0 420 300" style={{ width: "100%", height: "auto", maxWidth: 460 }} aria-hidden="true">
      <defs>
        <filter id="rough1">
          <feTurbulence baseFrequency="0.06" numOctaves="2" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#1E3A2F" />
        </marker>
      </defs>
      <g fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="1" fill="#1E3A2F" filter="url(#rough1)">
        {/* Boxes */}
        <g stroke="#1E3A2F" strokeWidth="1.3" fill="none">
          <rect x="30"  y="40"  width="110" height="48" />
          <rect x="280" y="40"  width="110" height="48" />
          <rect x="155" y="130" width="110" height="48" />
          <rect x="155" y="230" width="110" height="48" />
        </g>
        <text x="85"  y="68"  textAnchor="middle" fontWeight="600">DATA</text>
        <text x="335" y="68"  textAnchor="middle" fontWeight="600">SYSTEMS</text>
        <text x="210" y="158" textAnchor="middle" fontWeight="600">PEOPLE</text>
        <text x="210" y="258" textAnchor="middle" fontWeight="600">OUTCOMES</text>

        {/* Connecting lines */}
        <g stroke="#1E3A2F" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)">
          <path d="M 110 88 Q 150 110 180 130" />
          <path d="M 320 88 Q 280 110 240 130" />
          <path d="M 210 178 L 210 230" />
        </g>

        {/* Dashed side connection */}
        <path d="M 140 64 Q 210 20 280 64" stroke="#C7623A" strokeWidth="1" strokeDasharray="4 3" fill="none" />

        {/* Hand-drawn annotation */}
        <text x="210" y="32" textAnchor="middle" fontFamily="var(--font-hand), cursive" fontSize="15" fill="#6B7F6E">
          connected, not stacked
        </text>
      </g>
    </svg>
  );
}

function Hero({ headlineVariant }) {
  const headlines = {
    default: { a: "We don't sell", b: "a product.", c: "We build ", d: "yours." },
    fit:     { a: "Software that", b: "fits your team.", c: "Not the ", d: "other way." },
    quiet:   { a: "The best system", b: "is the quiet one.", c: "We build those ", d: "for you." },
  };
  const h = headlines[headlineVariant] || headlines.default;

  return (
    <section id="top" style={{ paddingTop: "40px", paddingBottom: "clamp(28px, 4vw, 56px)" }}>
      <div className="wrap" style={{ position: "relative" }}>
        {/* page meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <span className="mono-label">Rax · 01 — Tools & Systems</span>
          <span className="mono-label">AI-forward, not AI-first.</span>
        </div>

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: 48, alignItems: "start" }}>
          <div>
            <h1 className="display" style={{ fontSize: "clamp(52px, 8vw, 116px)", margin: 0 }}>
              {h.a}<br/>
              {h.b}<br/>
              <span className="italic-hand">{h.c}<span className="underline-hand">{h.d}</span></span>
            </h1>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 1.6vw, 21px)", color: "var(--forest)", marginTop: 24, fontWeight: 500, letterSpacing: "-0.005em" }}>
              Custom AI agents & automations — <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400 }}>built around how your team actually works.</span>
            </div>
            <p style={{ maxWidth: 520, marginTop: 36, fontSize: 19, lineHeight: 1.55, color: "var(--ink-soft)" }}>
              Every business runs differently. Your AI and software should too.
              <br/>
              <strong style={{ fontWeight: 600 }}>RootWurx</strong> designs and builds custom AI agents, automations, and workflows — tailored precisely to how your team actually operates.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn-primary">Book a free call →</a>
              <a href="#work" className="btn btn-ghost">See what we build</a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 28, paddingTop: 20 }}>
            <div className="tape" style={{ maxWidth: 260, alignSelf: "flex-end" }}>
              <div className="mono-label" style={{ marginBottom: 6 }}>Principle</div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 22, lineHeight: 1.15, color: "var(--ink)" }}>
                Tools should fit the way you work. Not the other way around.
              </div>
            </div>
            <HeroDiagram />
          </div>
        </div>

        {/* bottom strip */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "auto auto auto auto 1fr", gap: 40, alignItems: "center", borderTop: "1px solid rgba(26,26,26,0.15)", paddingTop: 22 }}>
          <div>
            <div className="mono-label">One partner</div>
            <div style={{ fontFamily: "var(--font-section)", fontSize: 15, marginTop: 4 }}>End-to-end.</div>
          </div>
          <div>
            <div className="mono-label">No handoffs</div>
            <div style={{ fontFamily: "var(--font-section)", fontSize: 15, marginTop: 4 }}>We operate it with you.</div>
          </div>
          <div>
            <div className="mono-label">Pilot first</div>
            <div style={{ fontFamily: "var(--font-section)", fontSize: 15, marginTop: 4 }}>See it before you pay.</div>
          </div>
          <div>
            <div className="mono-label">You own it</div>
            <div style={{ fontFamily: "var(--font-section)", fontSize: 15, marginTop: 4 }}>Data, workflows, results.</div>
          </div>
          <div style={{ justifySelf: "end", fontFamily: "var(--font-hand)", color: "var(--sage)", fontSize: 22 }}>
            Scroll · Explore ↓
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Nav, Hero });
