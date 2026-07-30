"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/technology";

/**
 * Scientific-result stat. If the value is a plain number (optionally with a
 * %/× suffix) it counts up on scroll into view; otherwise it fades in as-is.
 */
export default function ResultStat({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const m = stat.value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : null;
  const suffix = m ? m[2] : "";
  const decimals = m && m[1].includes(".") ? m[1].split(".")[1].length : 0;
  const [display, setDisplay] = useState(target === null ? stat.value : "0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.classList.add("is-in");
        if (target === null || reduced) {
          setDisplay(stat.value);
          return;
        }
        const start = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay((eased * target).toFixed(decimals) + suffix);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(stat.value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stat.value, target, suffix, decimals]);

  return (
    <div className="rstat" ref={ref}>
      <span className="rstat-value">{display}</span>
      <span className="rstat-label">{stat.label}</span>
      {stat.source && <span className="rstat-source">{stat.source}</span>}
    </div>
  );
}
