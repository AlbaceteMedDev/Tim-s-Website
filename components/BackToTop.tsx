"use client";

import { useEffect, useRef, useState } from "react";

/** Floating back-to-top button with a progress ring; appears after one screen. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
      ringRef.current?.style.setProperty("stroke-dashoffset", String(1 - p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      className={`to-top ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle className="to-top-track" cx="20" cy="20" r="17.5" pathLength={1} />
        <circle
          ref={ringRef}
          className="to-top-ring"
          cx="20"
          cy="20"
          r="17.5"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <path
          d="M20 26V14m0 0-5.5 5.5M20 14l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
