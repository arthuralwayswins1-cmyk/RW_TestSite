// Contact + Footer
const { useState: useStateC } = React;

const WEB3FORMS_KEY = "db4002e6-321a-4b1f-8cae-36856346a80f";

function ContactForm() {
  const [form, setForm] = useStateC({ name: "", company: "", working_on: "", whats_not: "" });
  const [sent, setSent] = useStateC(false);
  const [sending, setSending] = useStateC(false);
  const [errorMsg, setErrorMsg] = useStateC("");
  const update = k => e => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");
    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New RootWurx inquiry — ${form.name || "Unknown"} / ${form.company || ""}`,
        from_name: "RootWurx.com",
        name: form.name,
        company: form.company,
        working_on: form.working_on,
        whats_not: form.whats_not,
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data && data.success) {
        setSent(true);
      } else {
        setErrorMsg((data && data.message) || "Something went wrong. Please email nik@rootwurx.com.");
      }
    } catch (err) {
      setErrorMsg("Couldn't send. Please email nik@rootwurx.com.");
    } finally {
      setSending(false);
    }
  };
  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(26,26,26,0.25)",
    padding: "12px 2px 10px",
    fontFamily: "var(--font-body)",
    fontSize: 16,
    color: "var(--ink)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };
  return (
    <form action="https://api.web3forms.com/submit" method="POST" onSubmit={submit} style={{
      background: "#FFFCED",
      padding: "36px 36px 32px",
      border: "1px solid rgba(26,26,26,0.1)",
      transform: "rotate(calc(-0.5 * var(--tilt)))",
      boxShadow: "0 20px 40px -26px rgba(26,26,26,0.3)",
      position: "relative",
    }}>
      {/* hidden fields for Web3Forms (also work as no-JS fallback) */}
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
      <input type="hidden" name="from_name" value="RootWurx.com" />
      <input type="hidden" name="subject" value="New RootWurx inquiry" />
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
      {/* stamp in corner */}
      <div style={{ position: "absolute", top: 22, right: 22 }}>
        <div style={{
          width: 56, height: 56,
          border: "1.5px solid var(--clay)", color: "var(--clay)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
          transform: "rotate(8deg)",
          opacity: 0.9,
        }}>
          <div style={{ fontWeight: 600 }}>RAX</div>
          <div style={{ fontSize: 8 }}>01</div>
          <div style={{ fontSize: 8 }}>'26</div>
        </div>
      </div>

      <div className="mono-label" style={{ marginBottom: 8, color: "var(--clay)" }}>Discovery Intake</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginBottom: 22, letterSpacing: "-0.005em", paddingRight: 60, color: "var(--ink)" }}>
        Tell me about your business<br/>and what you're trying to solve.
      </div>

      {sent ? (
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: 30, color: "var(--forest)" }}>
            Thanks. I'll be in touch within a day.
          </div>
          <div className="mono-label" style={{ marginTop: 14 }}>— Nik</div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <label className="mono-label">Name</label>
              <input name="name" style={inputStyle} value={form.name} onChange={update("name")} required />
            </div>
            <div>
              <label className="mono-label">Company</label>
              <input name="company" style={inputStyle} value={form.company} onChange={update("company")} required />
            </div>
            <div>
              <label className="mono-label">What are you working on?</label>
              <input name="working_on" style={inputStyle} value={form.working_on} onChange={update("working_on")} />
            </div>
            <div>
              <label className="mono-label">What's not working today?</label>
              <input name="whats_not" style={inputStyle} value={form.whats_not} onChange={update("whats_not")} />
            </div>
          </div>
          {errorMsg && (
            <div style={{ marginTop: 16, color: "var(--clay)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
              {errorMsg}
            </div>
          )}
          <button type="submit" disabled={sending} className="btn btn-primary" style={{ marginTop: 28, width: "100%", justifyContent: "center", padding: "16px 20px", opacity: sending ? 0.6 : 1 }}>
            {sending ? "Sending…" : "Start the Conversation →"}
          </button>
        </>
      )}
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background: "var(--forest)", color: "var(--paper)" }}>
      <div className="wrap">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--sage-soft)" }}>
              <style>{`.contact-eyebrow::before { background: var(--sage-soft) !important; }`}</style>
              Plant something
            </div>
            <h2 className="display" style={{ fontSize: "clamp(44px, 6.5vw, 92px)", margin: "20px 0 24px", color: "var(--paper)" }}>
              Let's build <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400, color: "var(--paper)" }}>something</span><br/>
              <span style={{ position: "relative", display: "inline-block", fontFamily: "var(--font-italic)", fontStyle: "italic", fontWeight: 400, color: "#B9C7A8", transform: "rotate(-2.2deg)", transformOrigin: "left center" }}>
                that Wurx.
                <span style={{
                  position: "absolute",
                  left: "-2%", right: "-2%",
                  bottom: "-0.05em",
                  height: "0.14em",
                  background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'><path d='M2 6 Q 50 1 100 5 T 198 4' stroke='%23B9C7A8' stroke-width='2.2' fill='none' stroke-linecap='round'/></svg>\") no-repeat",
                  backgroundSize: "100% 100%",
                  pointerEvents: "none",
                }} />
              </span>
            </h2>
            <p style={{ color: "rgba(244,241,232,0.82)", fontSize: 19, maxWidth: 460 }}>
              Tell me what you need. I'll tell you what's possible.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div className="mono-label" style={{ color: "rgba(244,241,232,0.55)" }}>Direct</div>
                <a href="mailto:nik@rootwurx.com" className="ilink" style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--paper)", borderBottomColor: "rgba(244,241,232,0.4)" }}>
                  nik@rootwurx.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--forest-deep)", color: "rgba(244,241,232,0.7)", padding: "48px 0 28px" }}>
      <div className="wrap">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--paper)" }}>
              <span>Root</span>
              <span style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", color: "#B9C7A8", fontWeight: 400 }}>Wurx</span>
            </div>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: 20, color: "#B9C7A8", marginTop: 8 }}>
              Tools and systems, built to fit.
            </div>
            <div style={{ marginTop: 20, fontSize: 13, maxWidth: 320 }}>
              AI-forward, not AI-first. One partner, end-to-end.
            </div>
          </div>
          <div>
            <div className="mono-label" style={{ color: "rgba(244,241,232,0.5)", marginBottom: 14 }}>Site</div>
            {["Work", "Approach", "Process", "Fields", "About", "FAQ"].map(x => (
              <div key={x} style={{ fontSize: 14, padding: "4px 0" }}>
                <a href={`#${x.toLowerCase()}`} style={{ color: "rgba(244,241,232,0.8)" }}>{x}</a>
              </div>
            ))}
          </div>
          <div>
            <div className="mono-label" style={{ color: "rgba(244,241,232,0.5)", marginBottom: 14 }}>Contact</div>
            <div style={{ fontSize: 14, padding: "4px 0" }}><a href="mailto:nik@rootwurx.com" style={{ color: "rgba(244,241,232,0.8)" }}>nik@rootwurx.com</a></div>
            <div style={{ fontSize: 14, padding: "4px 0" }}><a href="#contact" style={{ color: "rgba(244,241,232,0.8)" }}>Book a call</a></div>
            <div style={{ fontSize: 14, padding: "4px 0" }}><a href="https://influxlead.com" target="_blank" rel="noreferrer" style={{ color: "rgba(244,241,232,0.8)" }}>InfluxLead ↗</a></div>
          </div>
          <div>
            <div className="mono-label" style={{ color: "rgba(244,241,232,0.5)", marginBottom: 14 }}>Address</div>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
              RootWurx<br/>
              PO Box 271<br/>
              Ada, MI 49301
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid rgba(244,241,232,0.15)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: 0.5, color: "rgba(244,241,232,0.5)" }}>
          <div>© 2026 · RootWurx · rootwurx.com</div>
          <div>Designed & operated by Nik.</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
