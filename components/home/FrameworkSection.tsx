"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import SectionRule from "@/components/SectionRule";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    name: "Understand",
    question: "What cannot fail?",
    bullets: ["Business model", "Pain points & bottlenecks", "Systems landscape"],
  },
  {
    name: "Connect",
    question: "Where are the gaps?",
    bullets: ["Process dependencies", "Application & API flows", "Human workflows"],
  },
  {
    name: "Modernise",
    question: "What must be rebuilt?",
    bullets: ["SAP modernisation & BTP", "Clean Core strategy", "Cloud-native engineering"],
  },
  {
    name: "Automate",
    question: "What should run without humans?",
    bullets: ["Workflows & approvals", "Predictions & copilots", "Automation & analytics"],
  },
  {
    name: "Scale",
    question: "Can it survive change?",
    bullets: ["Enterprise visibility & speed", "Resilience & compliance", "Global scalability"],
  },
];

const NODE_X = [110, 290, 470, 650, 830];
const NODE_Y = [60, 90, 60, 90, 60];
const PATH_D =
  "M20 75 Q65 60 110 60 Q200 60 290 90 T470 60 T650 90 T830 60 Q900 62 936 73";

function PhaseList() {
  return (
    <div className="space-y-0">
      {PHASES.map((phase, i) => (
        <div
          key={phase.name}
          className="relative border-l border-thread-500/40 pb-10 pl-6"
        >
          <span className="absolute top-1 -left-[4.5px] h-2 w-2 rounded-full bg-thread-500" />
          <p className="font-mono text-[11px] tracking-[0.14em] text-thread-500">
            0{i + 1}
          </p>
          <h3 className="mt-1 text-xl font-bold text-core-white">
            {phase.name}
          </h3>
          <p className="mt-1 font-editorial text-lg italic text-thread-300">
            {phase.question}
          </p>
          <p className="mt-2 font-mono text-[11.5px] leading-6 tracking-[0.06em] text-fg-secondary uppercase">
            {phase.bullets.join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function FrameworkSection() {
  const rootRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(0);
  const [atCore, setAtCore] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const paths = Array.from(
        svg.querySelectorAll<SVGPathElement>(".fw-thread"),
      );
      const len = paths[0].getTotalLength();
      paths.forEach((p) => {
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          const draw = Math.min(p * 1.1, 1);
          paths.forEach(
            (el) => (el.style.strokeDashoffset = `${len * (1 - draw)}`),
          );
          const idx = Math.min(4, Math.floor(p * 5.4));
          setActive((prev) => (prev === idx ? prev : idx));
          setAtCore((prev) => {
            const next = p > 0.92;
            return prev === next ? prev : next;
          });
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [reduced]);

  const headerBlock = (
    <>
      <SectionRule index="02" label="The Framework" />
      <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
        A method built from real enterprise delivery.
      </h2>
      <p className="mt-4 max-w-xl leading-relaxed text-fg-secondary">
        Five phases. One continuous method. The same methodology on every
        engagement, from a single SAP extension to a multi-region enterprise
        programme.
      </p>
    </>
  );

  return (
    <>
      <section
        ref={rootRef}
        className={
          reduced
            ? "hidden"
            : "relative hidden bg-ink-950 md:block md:h-[300vh]"
        }
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center">
          <div className="container-site md:pl-40">
            {headerBlock}

            <svg
              ref={svgRef}
              viewBox="0 0 1000 150"
              fill="none"
              className="mt-14 w-full"
              aria-hidden="true"
            >
              <path
                className="fw-thread"
                d={PATH_D}
                stroke="#D99A4E"
                strokeOpacity={0.1}
                strokeWidth={6}
              />
              <path
                className="fw-thread"
                d={PATH_D}
                stroke="#D99A4E"
                strokeWidth={1.5}
              />
              {PHASES.map((phase, i) => (
                <g key={phase.name}>
                  <circle
                    cx={NODE_X[i]}
                    cy={NODE_Y[i]}
                    r={12}
                    stroke="#F0C987"
                    strokeWidth={1}
                    className="transition-opacity duration-500"
                    opacity={active === i ? 0.7 : 0}
                  />
                  <circle
                    cx={NODE_X[i]}
                    cy={NODE_Y[i]}
                    r={6}
                    fill={active >= i ? "#D99A4E" : "#0C0F16"}
                    stroke="#D99A4E"
                    strokeWidth={1.5}
                    className="transition-[fill] duration-500"
                  />
                  <text
                    x={NODE_X[i]}
                    y={NODE_Y[i] + 34}
                    textAnchor="middle"
                    fill={active === i ? "#F0C987" : "#9AA3B2"}
                    style={{
                      font: "500 12px var(--font-jetbrains, monospace)",
                      letterSpacing: "2px",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {phase.name.toUpperCase()}
                  </text>
                </g>
              ))}
              <circle
                cx={952}
                cy={74}
                r={16}
                stroke="#F0C987"
                strokeWidth={1.2}
                className={atCore ? "animate-pulse" : ""}
                opacity={atCore ? 1 : 0.35}
              />
              <circle
                cx={952}
                cy={74}
                r={6}
                fill="#D99A4E"
                className="transition-opacity duration-700"
                opacity={atCore ? 1 : 0.25}
              />
              <text
                x={952}
                y={34}
                textAnchor="middle"
                fill={atCore ? "#FFF6E9" : "#5D6675"}
                style={{
                  font: "500 10px var(--font-jetbrains, monospace)",
                  letterSpacing: "3px",
                }}
              >
                CORE
              </text>
            </svg>

            <div key={active} className="fade-up mt-10 min-h-[110px]">
              <p className="font-mono text-[11px] tracking-[0.14em] text-fg-muted">
                0{active + 1} / 05
              </p>
              <p className="mt-2 font-editorial text-2xl italic text-thread-300">
                {PHASES[active].question}
              </p>
              <p className="mt-3 font-mono text-[12px] tracking-[0.08em] text-fg-secondary uppercase">
                {PHASES[active].bullets.join("   ·   ")}
              </p>
            </div>

            <Link href="/framework" className="btn-ghost mt-8 inline-block">
              Explore the full framework
            </Link>
          </div>
        </div>
      </section>

      <section className={reduced ? "bg-ink-950" : "bg-ink-950 md:hidden"}>
        <div className="container-site py-28">
          {headerBlock}
          <div className="mt-12">
            <PhaseList />
          </div>
          <Link href="/framework" className="btn-ghost inline-block">
            Explore the full framework
          </Link>
        </div>
      </section>
    </>
  );
}
