"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  size?: number;
  particles?: number;
  halo?: boolean;
  className?: string;
};

export default function CoreSphere({
  size = 320,
  particles = 700,
  halo = true,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size * dpr;
    cv.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < particles; i++) {
      const y = 1 - (2 * (i + 0.5)) / particles;
      const r = Math.sqrt(1 - y * y);
      pts.push({ x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r });
    }

    const c = size / 2;
    const R = size * 0.34;
    const tilt = 0.28;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      if (halo) {
        const g = ctx.createRadialGradient(c, c, 0, c, c, size * 0.5);
        g.addColorStop(0, "rgba(217,154,78,0.16)");
        g.addColorStop(1, "rgba(217,154,78,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
      }
      const yaw = t * 0.00035;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      for (const p of pts) {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const depth = (z2 + 1) / 2;
        ctx.globalAlpha = 0.12 + 0.8 * depth;
        ctx.fillStyle = depth > 0.55 ? "#F0C987" : "#D99A4E";
        const s = (0.6 + 1.5 * depth) * (size / 320);
        ctx.fillRect(c + x1 * R, c + y1 * R, s, s);
      }
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      draw(12000);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(cv);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [size, particles, halo, reduced]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
