// Approach (philosophy) + Process
function RootsDiagram() {
  // Computer on a desk. Fiber optic cables descend from the computer, cross the
  // desk edge, and below the ground line they become tangled roots. The
  // metaphor: your clean surface depends on messy, invisible infrastructure.
  return (
    <svg viewBox="0 0 440 460" style={{ width: "100%", height: "auto", maxWidth: 420 }} aria-hidden="true">
      <defs>
        <filter id="rough-roots">
          <feTurbulence baseFrequency="0.04" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
        <filter id="rough-roots-lg">
          <feTurbulence baseFrequency="0.04" numOctaves="2" seed="6" />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </defs>

      {/* === ABOVE GROUND: desk + computer === */}
      <g filter="url(#rough-roots)" fill="none" strokeLinecap="round">

        {/* Monitor body */}
        <rect x="130" y="30" width="180" height="118" rx="4" stroke="#1E3A2F" strokeWidth="1.5" fill="#FFFCED" />
        {/* Monitor inner bezel */}
        <rect x="140" y="40" width="160" height="90" stroke="#1E3A2F" strokeWidth="0.8" fill="#F4F1E8" />

        {/* Monitor stand neck */}
        <path d="M 220 148 L 220 178" stroke="#1E3A2F" strokeWidth="1.5" />
        {/* Monitor foot */}
        <path d="M 180 180 L 260 180" stroke="#1E3A2F" strokeWidth="1.5" />
        <path d="M 200 178 Q 220 182 240 178" stroke="#1E3A2F" strokeWidth="1" />

        {/* Screen content — hint of a dashboard */}
        <g stroke="#6B7F6E" strokeWidth="0.8" opacity="0.75">
          <path d="M 150 54 L 220 54" />
          <path d="M 150 62 L 200 62" strokeDasharray="2 2" />
          <path d="M 150 78 L 180 78 L 180 118 L 150 118 Z" />
          <path d="M 190 78 L 230 78 L 230 118 L 190 118 Z" />
          <path d="M 240 78 L 290 78 L 290 118 L 240 118 Z" />
        </g>
        {/* little "live" dot */}
        <circle cx="288" cy="50" r="2.2" fill="#C7623A" stroke="none" />

        {/* Desk surface */}
        <path d="M 60 200 L 380 200" stroke="#1E3A2F" strokeWidth="1.8" />
        {/* Desk front edge shading */}
        <path d="M 70 205 L 370 205" stroke="#1E3A2F" strokeWidth="0.6" opacity="0.4" />
        {/* Desk legs */}
        <path d="M 90 200 L 90 250" stroke="#1E3A2F" strokeWidth="1.4" />
        <path d="M 350 200 L 350 250" stroke="#1E3A2F" strokeWidth="1.4" />

        {/* Small object on desk (coffee cup hint) */}
        <g stroke="#6B7F6E" strokeWidth="1" opacity="0.7">
          <path d="M 100 185 L 100 200 L 120 200 L 120 185 Z" />
          <path d="M 120 189 Q 126 192 120 196" />
        </g>

        {/* Cables emerging from back of monitor, running behind desk */}
        <g stroke="#1E3A2F" strokeWidth="1.4">
          <path d="M 200 148 Q 195 170 190 200" />
          <path d="M 220 148 Q 218 170 216 200" />
          <path d="M 240 148 Q 245 170 250 200" />
        </g>
        {/* Accent (clay) fiber strand */}
        <path d="M 210 148 Q 206 172 204 200" stroke="#C7623A" strokeWidth="1" opacity="0.8" strokeDasharray="3 3" fill="none" />
      </g>

      {/* === GROUND LINE === */}
      <g>
        <path d="M 10 250 L 430 250" stroke="#6B7F6E" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" fill="none" />
        {/* tiny tufts of "grass" */}
        <g stroke="#6B7F6E" strokeWidth="0.7" opacity="0.6" fill="none">
          <path d="M 40 250 L 40 246" />
          <path d="M 55 250 L 55 244" />
          <path d="M 160 250 L 160 245" />
          <path d="M 300 250 L 300 246" />
          <path d="M 390 250 L 390 244" />
        </g>
      </g>

      {/* === BELOW GROUND: fibers become roots === */}
      <g filter="url(#rough-roots-lg)" fill="none" strokeLinecap="round">
        {/* Main trunk: cables continue down, then spread */}
        <g stroke="#1E3A2F" strokeWidth="1.3">
          {/* continuation of center three cables, spreading */}
          <path d="M 190 250 Q 160 290 130 320 Q 90 355 60 400" />
          <path d="M 195 250 Q 180 300 160 340 Q 140 380 120 420" />
          <path d="M 205 250 Q 205 310 205 420" />
          <path d="M 216 250 Q 230 300 250 340 Q 270 380 290 420" />
          <path d="M 250 250 Q 275 290 305 320 Q 345 355 380 400" />
        </g>

        {/* Clay (accent) root strand continuation */}
        <g stroke="#C7623A" strokeWidth="1" opacity="0.8">
          <path d="M 204 250 Q 170 300 140 340 Q 110 380 90 415" strokeDasharray="3 3" />
          <path d="M 220 250 Q 260 300 300 340 Q 335 375 360 410" strokeDasharray="3 3" />
        </g>

        {/* Fine root fibers */}
        <g stroke="#6B7F6E" strokeWidth="0.7" opacity="0.7">
          <path d="M 130 320 Q 115 335 108 360" />
          <path d="M 160 340 Q 150 360 144 385" />
          <path d="M 250 340 Q 262 360 268 385" />
          <path d="M 305 320 Q 325 335 332 360" />
          <path d="M 90 390 Q 78 405 72 420" />
          <path d="M 360 390 Q 372 405 378 420" />
        </g>
      </g>

      {/* Labels */}
      <g fontFamily="var(--font-mono), monospace" fontSize="9" fill="#1E3A2F" letterSpacing="1">
        <text x="220" y="22" textAnchor="middle" fill="#6B7F6E">WHAT YOU SEE</text>
        <text x="220" y="237" textAnchor="middle" fill="#6B7F6E">— WHAT MAKES IT WORK —</text>
      </g>

      {/* Handwritten annotations */}
      <text x="340" y="170" fontFamily="var(--font-hand), cursive" fontSize="17" fill="#C7623A" transform="rotate(-3, 340, 170)">
        clean surface
      </text>
      <text x="30" y="370" fontFamily="var(--font-hand), cursive" fontSize="16" fill="#6B7F6E" transform="rotate(-4, 30, 370)">
        messy, by design
      </text>
    </svg>
  );
}

function Approach() {
  const pillars = [
    ["i.",   "Start with listening",       "We map your current workflow before writing a single line of code. The best solution is always the one that fits your reality."],
    ["ii.",  "Build to your specs",        "Custom agents, automations, and tools designed around your team — not the other way around."],
    ["iii.", "Stay close after launch",    "We don't hand off and disappear. The build is the start — we operate it with you, tune it to reality, and adjust as your business changes."],
    ["iv.",  "Everything, connected",      "Your CRM, your drive, your spreadsheets, your tools — pulled into one system that works the way your team already does. No migrations. No new logins."],
    ["v.",   "You own the outcome",        "Your data, your workflows, your results — always yours. We manage the infrastructure that keeps it running, so your team never has to."],
  ];
  return (
    <section id="approach" style={{ background: "var(--paper-warm)" }}>
      <div className="wrap">
        <div className="approach-top" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div className="eyebrow">The work beneath</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "18px 0 24px" }}>
              Roots run <span className="italic-hand">deep.</span><br/>So does our work.
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 18, maxWidth: 520, margin: 0 }}>
              Most AI tools are built for everyone, which means they're perfect for no one.
              <strong style={{ fontWeight: 600 }}> We start with your business</strong> — your people, your process, your pain points — and build from there.
            </p>
            <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 520, marginTop: 18 }}>
              No bloated platforms. No subscriptions to things you don't use. Just clean, purpose-built tools that plug directly into how your team already works.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RootsDiagram />
          </div>
        </div>

        {/* Pillars */}
        <div style={{ marginTop: 80, borderTop: "1px solid rgba(26,26,26,0.2)" }}>
          {pillars.map(([n, t, body], i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 2fr",
              gap: 32,
              padding: "32px 0",
              borderBottom: "1px solid rgba(26,26,26,0.1)",
              alignItems: "baseline",
            }} className="pillar-row">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--clay)", letterSpacing: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                {t}
              </div>
              <div style={{ color: "var(--ink-soft)", fontSize: 16, maxWidth: 580 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .approach-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pillar-row { grid-template-columns: 48px 1fr !important; }
          .pillar-row > div:nth-child(3) { grid-column: 1 / -1; padding-left: 48px; }
        }
      `}</style>
    </section>
  );
}

function ProcessStepCard({ num, title, tag, body, tilt }) {
  return (
    <div style={{ transform: `rotate(calc(${tilt} * var(--tilt)))`, position: "relative" }}>
      <div style={{
        background: "#FFFCED",
        border: "1px solid rgba(26,26,26,0.1)",
        padding: "28px 28px 32px",
        position: "relative",
        boxShadow: "0 1px 0 rgba(26,26,26,0.04), 0 18px 28px -22px rgba(26,26,26,0.25)",
      }}>
        {/* tape */}
        <div style={{
          position: "absolute",
          top: -11, left: "50%", transform: "translateX(-50%) rotate(-2deg)",
          width: 70, height: 18,
          background: "rgba(199, 98, 58, 0.18)",
          borderLeft: "1px dashed rgba(199,98,58,0.3)",
          borderRight: "1px dashed rgba(199,98,58,0.3)",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span className="mono-label" style={{ color: "var(--clay)" }}>{num}</span>
          <span className="mono-label">{tag}</span>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 12 }}>
          {title}
        </div>
        <div style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

function Process() {
  const steps = [
    { n: "i.",   title: "Discovery", tag: "Free call",     body: "A call to understand the business — your people, your process, where things slow down.", tilt: "-0.6" },
    { n: "ii.",  title: "Pilot",     tag: "7-day trial",    body: "A short pilot build. You see the work function before committing to the full engagement.", tilt: "0.7" },
    { n: "iii.", title: "Build",     tag: "Phased retainer",body: "Phased retainer with an implementation fee per phase. Each capability goes live before the next one starts.", tilt: "-0.4" },
    { n: "iv.",  title: "Operate",   tag: "Ongoing",        body: "We manage the infrastructure, tune to reality, and grow with the business. Ongoing retainer.", tilt: "0.5" },
  ];
  return (
    <section id="process">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "18px 0 0" }}>
              Four steps. <span className="italic-hand">No surprises.</span>
            </h2>
          </div>
          <p style={{ maxWidth: 420, color: "var(--ink-soft)", fontSize: 17, margin: 0 }}>
            Every engagement follows the same shape. You see the work before you commit, and each phase goes live before the next one starts.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {/* dashed connector line */}
          <div style={{
            position: "absolute",
            top: "50%", left: "4%", right: "4%",
            borderTop: "1.5px dashed rgba(107, 127, 110, 0.5)",
            zIndex: 0,
          }} className="process-line" />
          <div className="process-grid" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {steps.map((s, i) => <ProcessStepCard key={i} num={s.n} title={s.title} tag={s.tag} body={s.body} tilt={s.tilt} />)}
          </div>
        </div>

        {/* Sign-off */}
        <div style={{ marginTop: 72, borderTop: "1px solid rgba(26,26,26,0.15)", paddingTop: 36 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }} className="process-cta">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span className="mono-label" style={{ color: "var(--clay)", paddingTop: 8, minWidth: 18 }}>Q.</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, color: "var(--ink)" }}>
                  What would this look like for my team?
                </span>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span className="mono-label" style={{ color: "var(--forest)", paddingTop: 8, minWidth: 18 }}>A.</span>
                <span style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(22px, 2.6vw, 28px)", color: "var(--forest)", lineHeight: 1.25 }}>
                  Honestly — easier to show you than explain. Half an hour, your workflow, one sketch.
                </span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary" style={{ alignSelf: "center" }}>Start with a call →</a>
          </div>
          <style>{`
            @media (max-width: 760px) {
              .process-cta { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-line { display: none; }
        }
        @media (max-width: 600px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Approach, Process });
