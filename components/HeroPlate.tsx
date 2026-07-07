"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps the hero emblem panel with a subtle cursor-tracking 3D tilt.
 * Pointer-only and disabled for prefers-reduced-motion.
 */
export default function HeroPlate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
      el.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  }

  return (
    <div className="hero-plate-tilt" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
