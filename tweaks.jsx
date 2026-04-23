// Animated Knowledge Agent demo — cycles through scripted Q&A scenarios.
// Replaces the static KnowledgeAgentMock. Pauses on hover.

function KnowledgeAgentAnimated() {
  const scenarios = [
    {
      question: "What's our procedure when a client misses two payments?",
      sources: [
        { label: "SOPs",      highlight: true  },
        { label: "Drive",     highlight: false },
        { label: "CRM",       highlight: true  },
        { label: "Contracts", highlight: false },
        { label: "Pricing",   highlight: false },
      ],
      response: {
        lead: "Per SOP 4.2:",
        body: "After two missed payments, send formal notice within 5 business days, then pause service on day 10 if unresolved.",
        cite: "source: sops/collections.md",
      },
    },
    {
      question: "What's the current pricing tier for enterprise clients?",
      sources: [
        { label: "SOPs",      highlight: false },
        { label: "Drive",     highlight: true  },
        { label: "CRM",       highlight: false },
        { label: "Contracts", highlight: true  },
        { label: "Pricing",   highlight: true  },
      ],
      response: {
        lead: "Enterprise tier (2025):",
        body: "$4,800/mo base + $120 per seat over 25. Volume discount kicks in at 100 seats. Last updated Q3.",
        cite: "source: pricing/2025-tiers.md",
      },
    },
    {
      question: "Who approved the Henderson contract changes?",
      sources: [
        { label: "SOPs",      highlight: false },
        { label: "Drive",     highlight: false },
        { label: "CRM",       highlight: true  },
        { label: "Contracts", highlight: true  },
        { label: "Pricing",   highlight: false },
      ],
      response: {
        lead: "Approved by M. Torres:",
        body: "Contract v3 signed Nov 14. Changed payment terms net-30 → net-45 and added exclusivity clause for regional market.",
        cite: "source: contracts/henderson-v3.pdf",
      },
    },
  ];

  // Phase progression per scenario (ms, cumulative)
  const TYPE_Q_END    = 2200;   // question typed
  const ASKS_END      = 2800;   // asks arrow shown
  const SOURCES_START = 3000;
  const SOURCES_STEP  = 380;    // per-source stagger
  const SOURCES_END   = SOURCES_START + SOURCES_STEP * 5; // 4900
  const ANSWERS_END   = 5400;
  const TYPE_A_START  = 5500;
  const TYPE_A_END    = 9500;   // response typed
  const HOLD_END      = 12500;  // total scenario length
  const FADE_MS       = 600;

  const [idx, setIdx]       = React.useState(0);
  const [phase, setPhase]   = React.useState(0); // ms within scenario
  const [paused, setPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (paused) return;
    let raf;
    let start = performance.now();
    const tick = (t) => {
      const elapsed = t - start;
      setPhase(elapsed);
      if (elapsed >= HOLD_END) {
        // fade out
        setVisible(false);
        setTimeout(() => {
          setIdx((i) => (i + 1) % scenarios.length);
          setPhase(0);
          start = performance.now();
          setVisible(true);
        }, FADE_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx, paused]);

  const scenario = scenarios[idx];

  // Typewriter for question
  const qChars = Math.max(0, Math.min(scenario.question.length, Math.floor((phase / TYPE_Q_END) * scenario.question.length)));
  const questionText = scenario.question.slice(0, qChars);
  const questionTyping = phase < TYPE_Q_END;

  // Asks arrow
  const asksShown = phase > TYPE_Q_END;

  // Stamp active when asks arrow appears
  const stampActive = phase > TYPE_Q_END + 200;

  // Sources: each appears at SOURCES_START + i*STEP
  const sourceVisible = (i) => phase > SOURCES_START + i * SOURCES_STEP;

  // Answers arrow
  const answersShown = phase > ANSWERS_END;

  // Typewriter for response body
  const fullResponse = scenario.response.body;
  const aChars = Math.max(0, Math.min(fullResponse.length, Math.floor(((phase - TYPE_A_START) / (TYPE_A_END - TYPE_A_START)) * fullResponse.length)));
  const responseText = phase > TYPE_A_START ? fullResponse.slice(0, aChars) : "";
  const responseTyping = phase > TYPE_A_START && phase < TYPE_A_END;
  const leadShown = phase > TYPE_A_START - 200;
  const citeShown = phase > TYPE_A_END + 100;

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transition: `opacity ${FADE_MS}ms ease`,
  };

  // Source positions (matches original layout)
  const sourcePositions = [
    { x: 150, y: 300 },
    { x: 225, y: 320 },
    { x: 300, y: 330 },
    { x: 380, y: 320 },
    { x: 460, y: 300 },
  ];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        background: "#FBF7E9",
        border: "1px solid rgba(26,26,26,0.12)",
        padding: "18px 20px 22px",
        boxShadow: "0 18px 34px -22px rgba(26,26,26,0.25)",
        backgroundImage: `
          linear-gradient(rgba(107,127,110,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(107,127,110,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "22px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--mute)" }}>
        <span>Knowledge Agent · live sketch</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: paused ? "#C7623A" : "#6B9A5F",
            boxShadow: paused ? "none" : "0 0 0 3px rgba(107,154,95,0.25)",
            animation: paused ? "none" : "ka-pulse 1.4s ease-in-out infinite",
          }} />
          <span style={{ color: paused ? "var(--clay)" : "var(--forest)" }}>{paused ? "paused" : "grounded ✓"}</span>
        </span>
      </div>

      <div style={fadeStyle}>
        <svg viewBox="0 0 620 380" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
          <defs>
            <filter id="ka-rough-anim">
              <feTurbulence baseFrequency="0.05" numOctaves="2" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="1.2" />
            </filter>
            <marker id="ka-arrow-anim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#1E3A2F" />
            </marker>
          </defs>

          {/* === LEFT: Employee query bubble === */}
          <g filter="url(#ka-rough-anim)">
            <path d="M 20 40 L 200 40 Q 212 40 212 52 L 212 130 Q 212 142 200 142 L 70 142 L 50 158 L 55 142 L 32 142 Q 20 142 20 130 Z"
                  fill="#FFFCED" stroke="#1E3A2F" strokeWidth="1.3" />
          </g>
          <text x="34" y="62" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1" fill="#6B7F6E">EMPLOYEE</text>
          <foreignObject x="32" y="70" width="172" height="70">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "var(--font-hand), cursive", fontSize: 14, lineHeight: 1.25, color: "#1A1A1A" }}>
              &ldquo;{questionText}{questionTyping && <span className="ka-caret">▌</span>}&rdquo;
            </div>
          </foreignObject>

          {/* === Arrow from query to agent === */}
          <g filter="url(#ka-rough-anim)" fill="none" stroke="#1E3A2F" strokeWidth="1.3" strokeLinecap="round" style={{ opacity: asksShown ? 1 : 0, transition: "opacity 250ms ease" }}>
            <path d="M 215 95 Q 250 100 290 130" markerEnd="url(#ka-arrow-anim)" />
          </g>
          <text x="230" y="82" fontFamily="var(--font-hand), cursive" fontSize="13" fill="#C7623A" transform="rotate(-3, 230, 82)" style={{ opacity: asksShown ? 1 : 0, transition: "opacity 250ms ease" }}>asks</text>

          {/* === CENTER: Knowledge Agent stamp === */}
          <g filter="url(#ka-rough-anim)" style={{
            transformOrigin: "330px 175px",
            transform: stampActive ? "scale(1)" : "scale(0.9)",
            transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            <circle cx="330" cy="175" r="44" fill="#1E3A2F" stroke="#1E3A2F" strokeWidth="1.3" />
            <circle cx="330" cy="175" r="38" fill="none" stroke="#F4F1E8" strokeWidth="0.8" strokeDasharray="2 3"
              style={{ animation: stampActive && !paused ? "ka-spin 12s linear infinite" : "none", transformOrigin: "330px 175px" }} />
          </g>
          <text x="330" y="170" textAnchor="middle" fontFamily="var(--font-display), serif" fontSize="22" fontWeight="600" fill="#F4F1E8" letterSpacing="-0.5">RW</text>
          <text x="330" y="188" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="7.5" letterSpacing="2" fill="#B9C7A8">AGENT</text>

          {/* === Source connections fanning into agent === */}
          {sourcePositions.map((p, i) => {
            const shown = sourceVisible(i);
            const highlight = scenario.sources[i].highlight;
            return (
              <g key={`line-${i}`} filter="url(#ka-rough-anim)" fill="none"
                 stroke={highlight ? "#2E5D3F" : "#6B7F6E"}
                 strokeWidth={highlight ? 1.4 : 1}
                 strokeLinecap="round"
                 strokeDasharray={highlight ? "none" : "3 3"}
                 style={{ opacity: shown ? (highlight ? 1 : 0.55) : 0, transition: "opacity 400ms ease" }}>
                <path d={`M 330 218 L ${p.x + 18} ${p.y}`} />
              </g>
            );
          })}

          {/* === Source document icons === */}
          {sourcePositions.map((p, i) => {
            const shown = sourceVisible(i);
            const src = scenario.sources[i];
            const highlight = src.highlight;
            return (
              <g key={`src-${i}`}
                 transform={`rotate(${(i-2)*2.5}, ${p.x+18}, ${p.y+18})`}
                 style={{
                   opacity: shown ? 1 : 0,
                   transform: `${shown ? "translateY(0)" : "translateY(10px)"} rotate(${(i-2)*2.5}deg)`,
                   transformBox: "fill-box",
                   transformOrigin: "center",
                   transition: "opacity 400ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                 }}>
                <g filter="url(#ka-rough-anim)">
                  <path d={`M ${p.x} ${p.y} L ${p.x+30} ${p.y} L ${p.x+36} ${p.y+6} L ${p.x+36} ${p.y+36} L ${p.x} ${p.y+36} Z`}
                        fill={highlight ? "#E8EFDF" : "#FFFCED"}
                        stroke={highlight ? "#2E5D3F" : "#1E3A2F"}
                        strokeWidth={highlight ? 1.4 : 1.1} />
                  <path d={`M ${p.x+30} ${p.y} L ${p.x+30} ${p.y+6} L ${p.x+36} ${p.y+6}`} fill="none" stroke={highlight ? "#2E5D3F" : "#1E3A2F"} strokeWidth="1" />
                  <path d={`M ${p.x+6} ${p.y+14} L ${p.x+28} ${p.y+14}`} stroke="#6B7F6E" strokeWidth="0.6" />
                  <path d={`M ${p.x+6} ${p.y+20} L ${p.x+30} ${p.y+20}`} stroke="#6B7F6E" strokeWidth="0.6" />
                  <path d={`M ${p.x+6} ${p.y+26} L ${p.x+22} ${p.y+26}`} stroke="#6B7F6E" strokeWidth="0.6" />
                </g>
                <text x={p.x+18} y={p.y+50} textAnchor="middle"
                  fontFamily="var(--font-mono), monospace" fontSize="8.5" letterSpacing="1"
                  fill={highlight ? "#2E5D3F" : "#1E3A2F"}
                  fontWeight={highlight ? 700 : 400}>
                  {src.label.toUpperCase()}
                </text>
                {highlight && (
                  <circle cx={p.x+4} cy={p.y+4} r="3" fill="#C7623A">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* === Handwritten note: sources === */}
          <text x="115" y="275" fontFamily="var(--font-hand), cursive" fontSize="14" fill="#6B7F6E"
            transform="rotate(-4, 115, 275)"
            style={{ opacity: phase > SOURCES_START + 200 ? 1 : 0, transition: "opacity 400ms ease" }}>
            your sources
          </text>

          {/* === Arrow from agent to response === */}
          <g filter="url(#ka-rough-anim)" fill="none" stroke="#1E3A2F" strokeWidth="1.3" strokeLinecap="round"
             style={{ opacity: answersShown ? 1 : 0, transition: "opacity 250ms ease" }}>
            <path d="M 374 150 Q 420 100 460 90" markerEnd="url(#ka-arrow-anim)" />
          </g>
          <text x="375" y="78" fontFamily="var(--font-hand), cursive" fontSize="13" fill="#C7623A"
            transform="rotate(-8, 375, 78)"
            style={{ opacity: answersShown ? 1 : 0, transition: "opacity 250ms ease" }}>
            answers
          </text>

          {/* === RIGHT: Response bubble === */}
          <g filter="url(#ka-rough-anim)">
            <path d="M 425 40 L 600 40 Q 612 40 612 52 L 612 178 Q 612 190 600 190 L 480 190 L 465 206 L 470 190 L 437 190 Q 425 190 425 178 Z"
                  fill="#1E3A2F" stroke="#1E3A2F" strokeWidth="1.3" />
          </g>
          <text x="439" y="62" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1" fill="#B9C7A8">AGENT · GROUNDED</text>
          <foreignObject x="438" y="70" width="166" height="120">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, lineHeight: 1.35, color: "#F4F1E8" }}>
              <div style={{ opacity: leadShown ? 1 : 0, transition: "opacity 300ms ease" }}>
                <strong style={{ color: "#E6C26A" }}>{scenario.response.lead}</strong>{" "}
                {responseText}{responseTyping && <span className="ka-caret" style={{ color: "#F4F1E8" }}>▌</span>}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "#B9C7A8", fontFamily: "var(--font-mono), monospace", letterSpacing: 0.5, opacity: citeShown ? 1 : 0, transition: "opacity 300ms ease" }}>
                {scenario.response.cite}
              </div>
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Scenario dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        {scenarios.map((_, i) => (
          <button key={i}
            onClick={() => { setIdx(i); setPhase(0); setVisible(true); }}
            aria-label={`Scenario ${i+1}`}
            style={{
              width: i === idx ? 24 : 8,
              height: 6,
              borderRadius: 3,
              border: "none",
              background: i === idx ? "var(--forest)" : "rgba(26,26,26,0.2)",
              cursor: "pointer",
              padding: 0,
              transition: "width 300ms ease, background 300ms ease",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ka-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(107,154,95,0.25); }
          50%      { box-shadow: 0 0 0 6px rgba(107,154,95,0.05); }
        }
        @keyframes ka-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ka-caret {
          display: inline-block;
          animation: ka-blink 0.9s steps(2) infinite;
          color: #6B7F6E;
          margin-left: 1px;
        }
        @keyframes ka-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { KnowledgeAgentAnimated });
