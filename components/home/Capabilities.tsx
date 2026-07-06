"use client";

import { useState } from "react";
import SectionRule from "@/components/SectionRule";

const THREADS = [
  {
    name: "Business",
    line: "Process design and transformation on a clean digital core.",
    stack: ["SAP", "Process Design", "Transformation", "Clean Core", "S/4HANA"],
    proof: "16-step field process reduced to a single click.",
  },
  {
    name: "Technology",
    line: "Cloud-native engineering and architecture that holds at enterprise scale.",
    stack: ["Cloud", "Architecture", "BTP", "CAPM", "React", "Node.js"],
    proof: "Production platforms live across 4 regions.",
  },
  {
    name: "Intelligence",
    line: "AI that earns its place in the workflow, not the slide deck.",
    stack: ["AI", "Analytics", "RAG", "GenAI", "SAP AI Core", "Forecasting"],
    proof: "AI forecasting live in industrial field operations.",
  },
  {
    name: "Integration",
    line: "Systems that speak to each other by design, not by exception.",
    stack: ["APIs", "Events", "Middleware", "OData", "SAP Integration Suite"],
    proof: "PO-to-SO automation across enterprise boundaries.",
  },
  {
    name: "Experience",
    line: "Interfaces field teams actually use — offline included.",
    stack: ["Mobile", "Web", "UX", "Fiori", "SAP Build", "Offline-first"],
    proof: "Operator workflows delivered in 7 languages.",
  },
];

export default function Capabilities() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="container-site py-28 md:pl-40">
      <SectionRule index="03" label="Capabilities" />
      <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
        Five disciplines. One architecture.
      </h2>

      <div className="mt-14 border-b border-hairline">
        {THREADS.map((t, i) => {
          const isOpen = open === i;
          return (
            <div key={t.name} className="group relative border-t border-hairline">
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-thread-500 transition-transform duration-500 group-hover:scale-x-100" />
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-baseline gap-6 py-7 text-left"
              >
                <span className="font-mono text-[13px] text-thread-500">
                  0{i + 1}
                </span>
                <span className="text-xl font-bold text-core-white md:text-2xl">
                  {t.name}
                </span>
                <span className="ml-auto hidden max-w-sm text-right font-mono text-[11px] tracking-[0.06em] text-fg-muted uppercase lg:block">
                  {t.stack.slice(0, 3).join(" · ")}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-xl text-thread-500 transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
                style={{ transitionTimingFunction: "var(--ease-silk)" }}
              >
                <div className="overflow-hidden">
                  <div className="pb-8 pl-0 md:pl-12">
                    <p className="max-w-2xl text-[1.0313rem] leading-relaxed text-fg-secondary">
                      {t.line}
                    </p>
                    <p className="mt-4 font-mono text-[11.5px] tracking-[0.08em] text-slate-accent uppercase">
                      {t.stack.join(" · ")}
                    </p>
                    <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-thread-300">
                      {t.proof}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
