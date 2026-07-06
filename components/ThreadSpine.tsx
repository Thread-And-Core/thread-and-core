"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The signature spine: a copper thread that draws itself down the page as the
 * visitor scrolls. Rendered as two layered strokes (wide low-alpha glow under a
 * thin bright core). Position it inside a `relative` parent; it spans the
 * parent's full height in a 160px channel on the left.
 */
export default function ThreadSpine({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const parent = wrap.parentElement;
    if (!parent) return;
    const svg = wrap.querySelector("svg")!;
    const paths = Array.from(wrap.querySelectorAll<SVGPathElement>("path"));

    let tween: gsap.core.Tween | undefined;

    const build = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();

      const h = parent.scrollHeight;
      svg.setAttribute("viewBox", `0 0 160 ${h}`);
      svg.setAttribute("height", String(h));

      const seg = 460;
      let d = "M 80 0";
      let x = 80;
      let left = true;
      for (let y = seg; y <= h + seg; y += seg) {
        const yEnd = Math.min(y, h);
        const nx = yEnd === h ? 80 : left ? 42 : 118;
        d += ` C ${x} ${yEnd - seg * 0.5}, ${nx} ${yEnd - seg * 0.5}, ${nx} ${yEnd}`;
        x = nx;
        left = !left;
        if (yEnd === h) break;
      }
      paths.forEach((p) => p.setAttribute("d", d));

      const len = paths[paths.length - 1].getTotalLength();
      paths.forEach((p) => {
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = reduced ? "0" : `${len}`;
      });
      if (reduced) return;

      tween = gsap.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top 70%",
          end: "bottom 95%",
          scrub: 0.8,
        },
      });
    };

    build();
    const ro = new ResizeObserver(() => build());
    ro.observe(parent);

    return () => {
      ro.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[160px] md:block ${className}`}
    >
      <svg width="160" fill="none" style={{ display: "block" }}>
        <path stroke="#D99A4E" strokeOpacity={0.1} strokeWidth={6} />
        <path
          stroke="#D99A4E"
          strokeOpacity={reduced ? 0.35 : 0.9}
          strokeWidth={1.4}
        />
      </svg>
    </div>
  );
}
