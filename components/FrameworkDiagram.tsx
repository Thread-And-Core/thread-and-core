"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const NODES = [
  { x: 110, y: 60, name: "UNDERSTAND" },
  { x: 290, y: 90, name: "CONNECT" },
  { x: 470, y: 60, name: "MODERNISE" },
  { x: 650, y: 90, name: "AUTOMATE" },
  { x: 830, y: 60, name: "SCALE" },
];

const PATH_D =
  "M20 75 Q65 60 110 60 Q200 60 290 90 T470 60 T650 90 T830 60 Q900 62 936 73";

const ez = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/**
 * Self-playing version of the framework thread: draws itself through the five
 * phases into the core, holds, softly fades, and begins again. Static and
 * fully drawn under reduced motion.
 */
export default function FrameworkDiagram({
  className = "",
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const threads = Array.from(
      svg.querySelectorAll<SVGPathElement>(".fd-thread"),
    );
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>(".fd-node"));
    const ring = svg.querySelector<SVGCircleElement>(".fd-ring");
    const dot = svg.querySelector<SVGCircleElement>(".fd-dot");
    const len = threads[0].getTotalLength();
    threads.forEach((t) => {
      t.style.strokeDasharray = `${len}`;
    });

    if (reduced) {
      threads.forEach((t) => (t.style.strokeDashoffset = "0"));
      nodes.forEach((n) => n.setAttribute("fill", "#D99A4E"));
      ring?.setAttribute("opacity", "0.8");
      dot?.setAttribute("opacity", "1");
      return;
    }

    let raf = 0;
    const T = 8000;
    let running = true;

    const loop = (now: number) => {
      if (running) {
        const t = (now % T) / T;
        const draw = ez(Math.min(t / 0.62, 1));
        threads.forEach(
          (el) => (el.style.strokeDashoffset = `${len * (1 - draw)}`),
        );
        nodes.forEach((n, i) => {
          const reached = draw >= (NODES[i].x - 15) / 936;
          n.setAttribute("fill", reached ? "#D99A4E" : "#0C0F16");
        });
        const atCore = draw >= 0.995;
        const pulse = 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(now * 0.005));
        ring?.setAttribute("opacity", atCore ? String(pulse) : "0.25");
        dot?.setAttribute("opacity", atCore ? "1" : "0.25");
        svg.style.opacity = t > 0.92 ? String(1 - ((t - 0.92) / 0.08) * 0.85) : "1";
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
    });
    io.observe(svg);
    raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 150"
      fill="none"
      className={`w-full ${className}`}
      aria-label="The Thread & Core Framework: one thread drawn through Understand, Connect, Modernise, Automate, and Scale, ending at the Core"
      role="img"
    >
      <path
        className="fd-thread"
        d={PATH_D}
        stroke="#D99A4E"
        strokeOpacity={0.1}
        strokeWidth={6}
      />
      <path className="fd-thread" d={PATH_D} stroke="#D99A4E" strokeWidth={1.5} />
      {NODES.map((n) => (
        <g key={n.name}>
          <circle
            className="fd-node"
            cx={n.x}
            cy={n.y}
            r={6}
            fill="#0C0F16"
            stroke="#D99A4E"
            strokeWidth={1.5}
            style={{ transition: "fill 0.4s" }}
          />
          <text
            x={n.x}
            y={n.y + 34}
            textAnchor="middle"
            fill="#9AA3B2"
            style={{
              font: "500 12px var(--font-jetbrains, monospace)",
              letterSpacing: "2px",
            }}
          >
            {n.name}
          </text>
        </g>
      ))}
      <circle
        className="fd-ring"
        cx={952}
        cy={74}
        r={16}
        stroke="#F0C987"
        strokeWidth={1.2}
        opacity={0.25}
      />
      <circle className="fd-dot" cx={952} cy={74} r={6} fill="#D99A4E" opacity={0.25} />
      <text
        x={952}
        y={34}
        textAnchor="middle"
        fill="#FFF6E9"
        style={{
          font: "500 10px var(--font-jetbrains, monospace)",
          letterSpacing: "3px",
        }}
      >
        CORE
      </text>
    </svg>
  );
}
