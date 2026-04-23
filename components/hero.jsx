// Fields / Industries + About + FAQ
const { useState: useStateF } = React;

function FieldCard({ num, title, body, tags, variant }) {
  const isDark = variant === "dark";
  return (
    <div style={{
      background: isDark ? "var(--forest)" : "transparent",
      color: isDark ? "var(--paper)" : "var(--ink)",
      border: isDark ? "none" : "1px solid rgba(26,26,26,0.15)",
      padding: "32px 30px 28px",
      display: "flex",
      flexDirection: "column",
      minHeight: 320,
      position: "relative",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <span className="mono-label" style={{ color: isDark ? "rgba(244,241,232,0.6)" : "var(--mute)" }}>{num}</span>
        <span className="mono-label" style={{ color: isDark ? "var(--clay-soft)" : "var(--clay)" }}>Field</span>
      </div>
      <h3 className="display" style={{ fontSize: 28, margin: 0, color: "inherit", letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ color: isDark ? "rgba(244,241,232,0.78)" : "var(--ink-soft)", fontSize: 15, lineHeight: 1.55, marginTop: 16, flex: 1 }}>
        {body}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "5px 9px",
            border: `1px solid ${isDark ? "rgba(244,241,232,0.25)" : "rgba(26,26,26,0.2)"}`,
            color: isDark ? "rgba(244,241,232,0.85)" : "var(--ink-soft)",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Fields() {
  const fields = [
    { n: "01", title: "Real Estate",               body: "Brokerage and agent teams — commercial and residential. Deal portals, commission engines, lease intelligence, executive dashboards — designed around how your team actually runs deals.", tags: ["Brokers", "Agents", "Deal Flow", "Commission"] },
    { n: "02", title: "Professional Services",     body: "Mortgage brokers, insurance agents, accounting firms, wealth managers, family offices — anywhere deals, clients, and reporting live in spreadsheets and inboxes. We build pipelines, client portals, and reporting systems that pull from the tools you already use.", tags: ["Client Portals", "Reporting", "Pipelines", "Family Offices"] },
    { n: "03", title: "Local Service Businesses",  body: "Inbound leads answered instantly, appointments booked, reviews requested. Or a full executive assistant agent — handling scheduling, invoicing, email, reminders, and follow-ups — so owners run the business, not the back office.", tags: ["Lead Response", "Scheduling", "Reviews", "EA Agent", "Invoicing"], variant: "dark" },
    { n: "04", title: "Any Business. Any Workflow.", body: "If your team repeats the same work every week, handles inbound by hand, or lives in spreadsheets — there's a better way to run it.", tags: ["Automations", "Custom Agents", "Integrations"] },
  ];
  return (
    <section id="fields" style={{ background: "var(--paper-warm)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
          <div>
            <div className="eyebrow">Where we work</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "18px 0 0" }}>
              Built for teams where every <span className="italic-hand">detail matters.</span>
            </h2>
          </div>
          <div className="hand" style={{ maxWidth: 280, color: "var(--sage)" }}>
            I work with teams who are done wrestling with tools that almost fit.
          </div>
        </div>

        <div className="fields-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid rgba(26,26,26,0.15)" }}>
          {fields.map((f, i) => (
            <div key={f.n} style={{
              borderRight: i < fields.length - 1 ? "1px solid rgba(26,26,26,0.1)" : "none",
            }} className="field-cell">
              <FieldCard {...f} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .fields-grid { grid-template-columns: 1fr 1fr !important; }
          .field-cell:nth-child(1), .field-cell:nth-child(3) { border-right: 1px solid rgba(26,26,26,0.1) !important; }
          .field-cell:nth-child(2), .field-cell:nth-child(4) { border-right: none !important; }
          .field-cell:nth-child(1), .field-cell:nth-child(2) { border-bottom: 1px solid rgba(26,26,26,0.1); }
        }
        @media (max-width: 640px) {
          .fields-grid { grid-template-columns: 1fr !important; }
          .field-cell { border-right: none !important; border-bottom: 1px solid rgba(26,26,26,0.1) !important; }
          .field-cell:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}

function AboutNik() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 72, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="eyebrow">About</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "6px 0 0" }}>
              Who's <span className="italic-hand">behind this.</span>
            </h2>
            {/* Signature card instead of portrait */}
            <div style={{
              background: "#FFFCED",
              border: "1px solid rgba(26,26,26,0.12)",
              padding: "22px 24px",
              marginTop: 14,
              maxWidth: 380,
              transform: "rotate(calc(-0.5 * var(--tilt)))",
              boxShadow: "0 18px 34px -22px rgba(26,26,26,0.25)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 16 }}>
                <span className="mono-label" style={{ color: "var(--clay)" }}>Founder · RootWurx</span>
                {/* RW primary mark — single box, serif R + cursive W dropped below baseline */}
                <svg viewBox="0 0 80 72" width="86" height="78" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <rect x="3" y="3" width="74" height="66" fill="none" stroke="#1E3A2F" strokeWidth="2" />
                  {/* R — serif, ink */}
                  <text x="22" y="50" textAnchor="middle" fontFamily="'Literata', Georgia, serif" fontSize="46" fontWeight="500" fill="#1A1A1A" letterSpacing="-1">R</text>
                  {/* W — cursive, sage, sits lower than R baseline */}
                  <text x="48" y="60" textAnchor="middle" fontFamily="'Caveat', 'Reckless Neue', cursive" fontStyle="italic" fontSize="44" fontWeight="500" fill="#6B9A5F">W</text>
                </svg>
              </div>
              <div style={{ fontFamily: "var(--font-hand)", fontSize: 36, color: "var(--forest)", lineHeight: 1, letterSpacing: "-0.01em" }}>
                Nik Mirando
              </div>
            </div>
          </div>

          <div>
            <p style={{ color: "var(--ink-soft)", fontSize: 19, marginTop: 0, maxWidth: 600, lineHeight: 1.55 }}>
              <strong style={{ fontWeight: 600 }}>RootWurx is run by Nik Mirando</strong> — a builder with a background in institutional real estate and sustainability. Roots in the outdoors, hands in the dirt, and a habit of connecting the dots.
            </p>
            <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 600, marginTop: 18 }}>
              The work has always been the same: pay attention to what's actually there, understand how the pieces fit, and build something useful. RootWurx exists because most software isn't built for the people using it — it's built for everyone. The better version is quieter, closer, and made for how your team actually works.
            </p>
            <p style={{ color: "var(--mute)", fontSize: 15, maxWidth: 600, marginTop: 22, fontStyle: "italic", fontFamily: "var(--font-italic)" }}>
              Off hours: gardening, fishing, and a running list of boats, houses, and projects to bring back to life.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function FAQItem({ q, a, idx, open, setOpen }) {
  const isOpen = open === idx;
  return (
    <div style={{ borderBottom: "1px solid rgba(26,26,26,0.15)" }}>
      <button
        onClick={() => setOpen(isOpen ? null : idx)}
        style={{
          width: "100%",
          display: "grid", gridTemplateColumns: "60px 1fr 40px",
          gap: 20,
          alignItems: "baseline",
          background: "none", border: "none",
          padding: "28px 0",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
        }}>
        <span className="mono-label" style={{ color: "var(--clay)" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>
          {q}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--forest)", justifySelf: "end", transition: "transform 0.3s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? 400 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease, opacity 0.3s ease",
        opacity: isOpen ? 1 : 0,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 40px", gap: 20, paddingBottom: 28 }}>
          <div />
          <div style={{ color: "var(--ink-soft)", fontSize: 16, maxWidth: 680 }}>
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useStateF(0);
  const items = [
    { q: "What does it cost?", a: "Discovery calls are free. Most engagements start with a no-cost pilot — we build the first tier at our risk, and you only begin paying once it's live and working. From there, engagements run on a phased retainer with a small implementation fee per phase. Pricing scales with scope, not seat count." },
    { q: "Who owns the work?", a: "Your data, your workflows, and your results are always yours. We manage the underlying infrastructure that keeps the system running, so your team never has to. You get the outcome; we handle the operation." },
    { q: "Do I need to migrate or replace my existing tools?", a: "Almost never. We build around the stack you already use — your CRM, your drive, your spreadsheets, your communication tools. No migrations, no new logins for your team." },
    { q: "How long does a project take?", a: "The pilot is usually live within a few weeks of the discovery call. Subsequent phases go live in sequence — weeks, not months. We prefer to ship functional, focused capability early and build up from there." },
    { q: "What if my business isn't on the list of industries you serve?", a: "The industries section shows where we have the most experience, but the approach is the same regardless of vertical. If your team repeats the same work every week, handles inbound by hand, or lives in spreadsheets — there's a good chance we can help." },
    { q: "What happens after the build is live?", a: "We stay on. The build is the start — we operate the system with you, tune it to reality, and adjust as your business changes. Retainer engagements mean continuous improvement, not a handoff and goodbye." },
    { q: "How do we start?", a: "Book a free call. We'll talk through what your team does, where the friction lives, and whether there's a fit. No pitch deck, no hard sell — just a conversation." },
  ];
  return (
    <section id="faq">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48 }} className="faq-grid">
          <div>
            <div className="eyebrow">FAQ</div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 64px)", margin: "18px 0 0" }}>
              Common <span className="italic-hand">questions.</span>
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 16, marginTop: 24, maxWidth: 320 }}>
              Anything else? Reach out — <a href="mailto:nik@rootwurx.com" className="ilink" style={{ color: "var(--forest)", fontWeight: 500 }}>nik@rootwurx.com</a>
            </p>
          </div>
          <div>
            {items.map((it, i) => (
              <FAQItem key={i} idx={i} open={open} setOpen={setOpen} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Fields, AboutNik, FAQ });
