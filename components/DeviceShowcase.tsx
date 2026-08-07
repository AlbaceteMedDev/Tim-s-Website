"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * UltraMIST device showcase — the transparent product still on the hero panel,
 * with a parallax float, the ochre glow, spec ticks and the mist layer.
 *
 * This deliberately does NOT play a video loop any more. The generated loop was
 * keyed off a white background, and the remover had matted the blue glove and
 * the motion-blurred fingers by brightness rather than by shape, so parts of
 * the device and hand rendered semi-transparent and the dark panel showed
 * through them. The interior of that matte can be repaired, but the blurred
 * fingers cannot: their RGB is a smear, so no matte makes them solid without
 * turning them into a smeared blob.
 *
 * It cost little to drop. The loop was 31 frames over 1.29s whose mean
 * frame-to-frame change was 1.31/255 and which never differed from its own
 * first frame by more than 4.6% — a 385KB near-still. The motion a visitor
 * actually reads here is the parallax, the float and the mist, all of which
 * are CSS and all of which remain. The still carries a solid matte, so nothing
 * can go transparent.
 */
export default function DeviceShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
    </div>
  );
}
