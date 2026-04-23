// Tweaks panel — user-configurable via toolbar toggle
const { useState: useStateT, useEffect: useEffectT } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "clay",
  "tilt": 1,
  "grain": 0.07,
  "headline": "default",
  "dark_hero": false
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  clay:   "#C7623A",
  sage:   "#6B7F6E",
  forest: "#1E3A2F",
  amber:  "#C9942F",
};

function applyTweaks(t) {
  const r = document.documentElement;
  r.style.setProperty("--accent", ACCENT_PRESETS[t.accent] || ACCENT_PRESETS.clay);
  r.style.setProperty("--clay", ACCENT_PRESETS[t.accent] || ACCENT_PRESETS.clay);
  r.style.setProperty("--tilt", `${t.tilt}deg`);
  r.style.setProperty("--grain", String(t.grain));
}

function TweaksPanel({ active, tweaks, setTweaks }) {
  if (!active) return null;
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };
  const row = { display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 };
  const label = { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "var(--mute)" };
  return (
    <div style={{
      position: "fixed", bottom: 18, right: 18, zIndex: 200,
      width: 280,
      background: "#FFFCED",
      border: "1px solid rgba(26,26,26,0.2)",
      padding: "18px 18px 16px",
      fontFamily: "var(--font-body)",
      boxShadow: "0 20px 40px -20px rgba(26,26,26,0.35)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>Tweaks</div>
        <div className="mono-label">Live</div>
      </div>

      <div style={row}>
        <span style={label}>Accent</span>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(ACCENT_PRESETS).map(([k, v]) => (
            <button key={k} onClick={() => set("accent", k)} title={k}
              style={{
                width: 30, height: 30, borderRadius: "50%",
                background: v,
                border: tweaks.accent === k ? "2px solid var(--ink)" : "1px solid rgba(26,26,26,0.15)",
                cursor: "pointer", padding: 0,
              }} />
          ))}
        </div>
      </div>

      <div style={row}>
        <span style={label}>Tilt ({tweaks.tilt.toFixed(1)}°)</span>
        <input type="range" min="0" max="3" step="0.1" value={tweaks.tilt}
          onChange={e => set("tilt", parseFloat(e.target.value))} />
      </div>

      <div style={row}>
        <span style={label}>Grain ({tweaks.grain.toFixed(2)})</span>
        <input type="range" min="0" max="0.2" step="0.01" value={tweaks.grain}
          onChange={e => set("grain", parseFloat(e.target.value))} />
      </div>

      <div style={row}>
        <span style={label}>Headline</span>
        <select value={tweaks.headline} onChange={e => set("headline", e.target.value)}
          style={{ padding: "6px 8px", fontFamily: "inherit", fontSize: 13, border: "1px solid rgba(26,26,26,0.2)", background: "#fff" }}>
          <option value="default">We don't sell a product. We build yours.</option>
          <option value="fit">Software that fits your team.</option>
          <option value="quiet">The best system is the quiet one.</option>
        </select>
      </div>

      <div style={{ fontFamily: "var(--font-hand)", fontSize: 16, color: "var(--sage)", marginTop: 8 }}>
        Toggle Tweaks in the toolbar to hide.
      </div>
    </div>
  );
}

function useTweaks() {
  const [tweaks, setTweaks] = useStateT(TWEAK_DEFAULTS);
  const [active, setActive] = useStateT(false);

  useEffectT(() => {
    const handler = (e) => {
      const d = e.data;
      if (!d || !d.type) return;
      if (d.type === "__activate_edit_mode") setActive(true);
      if (d.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffectT(() => { applyTweaks(tweaks); }, [tweaks]);

  return { tweaks, setTweaks, active };
}

Object.assign(window, { TweaksPanel, useTweaks, TWEAK_DEFAULTS });
