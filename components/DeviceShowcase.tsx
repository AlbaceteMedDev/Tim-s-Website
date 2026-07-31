"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * UltraMIST device showcase. Prefers a generated product motion loop
 * (/ultramist-loop.mp4) when present; otherwise shows the device still with a
 * cursor-tracking parallax float and a drifting saline-mist particle layer.
 */
export default function DeviceShowcase({ hasVideo = false }: { hasVideo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [reduced, setReduced] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Safari ignores the alpha channel in VP9 WebM, so it gets an MP4 with the
    // hero background baked in; everyone else gets the true-transparency WebM.
    const ua = navigator.userAgent;
    const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|android/i.test(ua);
    setVideoSrc(isSafari ? "/ultramist-loop.mp4" : "/ultramist-loop.webm");
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

  return (
    <div className="device" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="device-glow" aria-hidden="true" />
      <div className="device-ticks" aria-hidden="true">
        <span>40 kHz</span>
        <span>NON-CONTACT</span>
        <span>FDA CLEARED</span>
      </div>

      {hasVideo ? (
        <div className="device-float">
          <video
            key={videoSrc ?? "poster"}
            className="device-media"
            autoPlay
            muted
            loop
            playsInline
            poster="/ultramist-poster.png"
          >
            {videoSrc && (
              <source
                src={videoSrc}
                type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"}
              />
            )}
          </video>
          {!reduced && (
            <div className="device-mist" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} style={{ "--i": i } as React.CSSProperties} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="device-float">
          <Image
            src="/ultramist-device.webp"
            alt="UltraMIST handheld low-frequency ultrasound wound-therapy device"
            width={634}
            height={652}
            className="device-media"
            priority
          />
          {!reduced && (
            <div className="device-mist" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} style={{ "--i": i } as React.CSSProperties} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
