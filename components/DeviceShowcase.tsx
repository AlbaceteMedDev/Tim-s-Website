"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * UltraMIST device showcase. When a motion loop is available, browsers that
 * render transparent video (VP9 WebM with alpha) get the loop floating
 * directly on the hero background. Safari ignores WebM alpha, so it — and the
 * pre-hydration render — gets the transparent device still with the parallax
 * float. Both variants share the CSS glow, spec ticks and mist layer, so the
 * showcase always blends into the page.
 */
export default function DeviceShowcase({ hasVideo = false }: { hasVideo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const ua = navigator.userAgent;
    const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|android/i.test(ua);
    setUseVideo(!isSafari);
  }, []);

  function onMove(e: React.MouseEvent) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${-py * 6}deg`);
      el.style.setProperty("--ry", `${px * 8}deg`);
      el.style.setProperty("--tx", `${px * 10}px`);
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
  }

  const showLoop = hasVideo && useVideo;

  return (
    <div
      className={`device${showLoop ? " device--video" : ""}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="device-glow" aria-hidden="true" />
      <div className="device-ticks" aria-hidden="true">
        <span>40 kHz</span>
        <span>NON-CONTACT</span>
        <span>FDA CLEARED</span>
      </div>

      <div className="device-float">
        {showLoop ? (
          <video
            className="device-media"
            autoPlay
            muted
            loop
            playsInline
            poster="/ultramist-poster.png"
          >
            <source src="/ultramist-loop.webm" type="video/webm" />
          </video>
        ) : (
          <Image
            src="/ultramist-device.webp"
            alt="UltraMIST handheld low-frequency ultrasound wound-therapy device"
            width={634}
            height={652}
            className="device-media"
            priority
          />
        )}
        {!reduced && (
          <div className="device-mist" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
