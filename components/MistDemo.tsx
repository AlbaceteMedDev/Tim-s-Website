"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { key: "mist", label: "01 — Saline mist", note: "A fine saline mist carries acoustic energy to the wound. Nothing touches the surface." },
  { key: "waves", label: "02 — 40 kHz waves", note: "Low-frequency ultrasound penetrates into and below the wound bed." },
  { key: "bacteria", label: "03 — Bacteria fall", note: "Acoustic disruption lowers bacterial load and biofilm at the surface." },
  { key: "perfuse", label: "04 — Perfusion rises", note: "Blood flow and new granulation tissue build back toward closure." },
] as const;

/**
 * A looping, interactive cross-section "virtual demo" of non-contact
 * ultrasound therapy, drawn as an anatomically-layered tissue section.
 * Auto-advances; users can scrub with the stage chips. Pauses off-screen
 * and respects reduced-motion.
 */
export default function MistDemo() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2800);
    return () => clearInterval(t);
  }, [playing]);

  const s = STAGES[stage].key;

  return (
    <div className="demo" ref={wrapRef} data-stage={s}>
      <div className="demo-stage">
        <svg viewBox="0 0 460 300" role="img" aria-label="Cross-section animation of non-contact ultrasound wound therapy">
          <defs>
            <linearGradient id="epi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6ddcb" />
              <stop offset="1" stopColor="#efc9b1" />
            </linearGradient>
            <linearGradient id="derm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e7b199" />
              <stop offset="1" stopColor="#d99a7f" />
            </linearGradient>
            <linearGradient id="subq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0d29f" />
              <stop offset="1" stopColor="#e6c184" />
            </linearGradient>
            <radialGradient id="bed" cx="50%" cy="18%" r="85%">
              <stop offset="0" stopColor="#9c3b2c" />
              <stop offset="0.6" stopColor="#822c20" />
              <stop offset="1" stopColor="#6a2118" />
            </radialGradient>
            <radialGradient id="granu" cx="50%" cy="30%" r="80%">
              <stop offset="0" stopColor="#d17a55" />
              <stop offset="1" stopColor="#b85a38" />
            </radialGradient>
            <linearGradient id="mistcone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#dff0e7" stopOpacity="0.55" />
              <stop offset="1" stopColor="#dff0e7" stopOpacity="0" />
            </linearGradient>
            <clipPath id="skinclip">
              <path d="M0 118 H150 C176 118 184 150 210 150 C236 150 244 118 270 118 H460 V300 H0 Z" />
            </clipPath>
          </defs>

          {/* ===== device ===== */}
          <g className="demo-device">
            <ellipse cx="230" cy="30" rx="52" ry="9" fill="#0c2419" opacity="0.35" />
            <rect x="182" y="6" width="96" height="30" rx="10" fill="#0e2c1e" />
            <rect x="182" y="6" width="96" height="30" rx="10" fill="none" stroke="#2f6b4a" strokeWidth="1" />
            <rect x="192" y="12" width="34" height="8" rx="4" fill="#43a06a" />
            <circle cx="262" cy="16" r="4" fill="#d6a03a" />
            <path d="M214 36 h32 l-8 14 h-16 z" fill="#123a29" />
            <rect x="222" y="48" width="16" height="5" rx="2.5" fill="#2f6b4a" />
          </g>

          {/* ===== saline mist cone + motes ===== */}
          <path className="demo-cone" d="M224 52 L236 52 L246 118 L214 118 Z" fill="url(#mistcone)" />
          <g className="demo-mist" aria-hidden="true">
            {Array.from({ length: 26 }).map((_, i) => (
              <circle key={i} className="mote" style={{ "--m": i } as React.CSSProperties}
                cx={214 + (i % 9) * 4} cy={58 + (i % 6) * 3} r={1 + (i % 3) * 0.7}
                fill="#eaf5ef" />
            ))}
          </g>

          {/* ===== acoustic wavefronts (into the bed) ===== */}
          <g className="demo-waves" clipPath="url(#skinclip)" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <ellipse key={i} className="wave" style={{ "--w": i } as React.CSSProperties}
                cx="210" cy="150" rx={30 + i * 20} ry={14 + i * 9}
                fill="none" stroke="#5fce93" strokeWidth="1.6" />
            ))}
          </g>

          {/* ===== tissue strata ===== */}
          <g clipPath="url(#skinclip)">
            <rect x="0" y="112" width="460" height="26" fill="url(#epi)" />
            <rect x="0" y="138" width="460" height="58" fill="url(#derm)" />
            <rect x="0" y="196" width="460" height="104" fill="url(#subq)" />
            {/* subcutaneous fat lobules */}
            <g fill="#f7dcac" opacity="0.55">
              {Array.from({ length: 22 }).map((_, i) => (
                <circle key={i} cx={16 + (i % 11) * 42} cy={224 + (i % 2) * 30} r="9" />
              ))}
            </g>
          </g>

          {/* ===== wound crater ===== */}
          <path d="M150 118 C176 118 184 150 210 150 C236 150 244 118 270 118 C262 150 250 176 210 176 C170 176 158 150 150 118 Z"
            fill="url(#bed)" />
          {/* slough speckle on the bed */}
          <g className="demo-bacteria" aria-hidden="true">
            {[[192, 138], [208, 146], [224, 138], [200, 132], [216, 132], [186, 130], [230, 130]].map(([cx, cy], i) => (
              <circle key={i} className="germ" style={{ "--g": i } as React.CSSProperties}
                cx={cx} cy={cy} r="2.6" fill="#8a9a4a" />
            ))}
          </g>

          {/* ===== granulation fill + vessels (perfusion) ===== */}
          <path className="demo-granulation"
            d="M150 118 C176 118 184 150 210 150 C236 150 244 118 270 118 C262 150 250 176 210 176 C170 176 158 150 150 118 Z"
            fill="url(#granu)" />
          <g className="demo-vessels" aria-hidden="true">
            {[[186, 168], [202, 172], [218, 172], [234, 168]].map(([x, y], i) => (
              <path key={i} className="vessel" style={{ "--v": i } as React.CSSProperties}
                d={`M${x} ${y} q4 -14 -3 -26`} fill="none" stroke="#c0472a" strokeWidth="2" strokeLinecap="round" />
            ))}
          </g>

          {/* surface line highlight */}
          <path d="M0 118 H150 C176 118 184 150 210 150 C236 150 244 118 270 118 H460"
            fill="none" stroke="#00000018" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="demo-side">
        <div className="demo-readout" aria-live="polite">
          <span className="demo-stage-label">{STAGES[stage].label}</span>
          <p>{STAGES[stage].note}</p>
        </div>
        <div className="demo-progress" aria-hidden="true">
          <span style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }} />
        </div>
        <div className="demo-chips" role="tablist" aria-label="Demo stages">
          {STAGES.map((st, i) => (
            <button
              key={st.key}
              role="tab"
              aria-selected={i === stage}
              className={`demo-chip ${i === stage ? "is-on" : ""}`}
              onClick={() => setStage(i)}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
