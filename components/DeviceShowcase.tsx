"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * UltraMIST device showcase — the transparent device on the hero panel, with a
 * saline-mist loop, the ochre glow, spec ticks and pointer parallax.
 *
 * The loop is BUILT FROM the product still rather than generated, and that is
 * the whole point. The previous generated clip was keyed off a white backdrop,
 * and the remover had matted the glove and the motion-blurred fingers by
 * brightness rather than by shape, so parts of the device and hand rendered
 * semi-transparent and the panel showed through them. A blurred finger cannot
 * be rescued by any matte — its RGB is a smear.
 *
 * Here every frame is one sub-pixel translate of a single pasted copy of the
 * still, so the device pixels and their solid matte are identical throughout
 * (measured drift across the 72 frames: 0.49/255). Only the mist is synthesised
 * — a particle plume from the emitter, periodic over the loop so it cycles
 * seamlessly. Nothing in the device can go transparent, by construction.
 *
 * Safari ignores WebM alpha, so it — and the pre-hydration render — gets the
 * same still the loop is made from.
 */
export default function DeviceShowcase({ hasVideo = false }: { hasVideo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(wantsLessMotion);
    const ua = navigator.userAgent;
    const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|android/i.test(ua);
    setUseVideo(!isSafari && !wantsLessMotion);
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
            preload="metadata"
            poster="/ultramist-poster.webp"
            aria-label="UltraMIST handheld device emitting a saline mist"
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
        {/* The loop carries its own mist; only the still needs the CSS one. */}
        {!reduced && !showLoop && (
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
