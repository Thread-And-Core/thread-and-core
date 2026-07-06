"use client";

import { useState } from "react";
import SectionRule from "@/components/SectionRule";

const THREADS = [
  {
    name: "Business",
    line: "Process design and transformation on a clean digital core. We map how the business actually runs — then shape SAP processes to fit it, not the other way around.",
    stack: ["SAP", "Process Design", "Transformation", "Clean Core", "S/4HANA"],
    proof: "Business processes redesigned behind a 4-region, 7-language global rollout.",
  },
  {
    name: "Technology",
    line: "Cloud-native engineering and architecture that holds at enterprise scale — BTP, CAPM, and full-stack delivery designed as one system, not a stack of parts.",
    stack: ["Cloud", "Architecture", "BTP", "CAPM", "React", "Node.js"],
    proof: "Production platforms architected and shipped across Australia, Germany, and India.",
  },
  {
    name: "Intelligence",
    line: "AI only where it survives production: forecasting, copilots, RAG, and analytics wired into real workflows — never bolted on for the demo.",
    stack: ["AI", "Analytics", "RAG", "GenAI", "SAP AI Core", "Forecasting"],
    proof: "AI demand forecasting running live inside industrial field operations.",
  },
  {
    name: "Integration",
    line: "Systems that speak to each other by design, not by exception — APIs, events, and middleware with contracts that hold when either side changes.",
    stack: ["APIs", "Events", "Middleware", "OData", "SAP Integration Suite"],
    proof: "PO-to-SO automation flowing across enterprise boundaries without manual re-entry.",
  },
  {
    name: "Experience",
    line: "Interfaces field teams actually use — mobile, offline-first, and multilingual from day one, because the plant floor doesn't have perfect Wi-Fi.",
    stack: ["Mobile", "Web", "UX", "Fiori", "SAP Build", "Offline-first"],
    proof: "A 16-step operator process reduced to a single click, in 7 languages.",
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
                    <p className="mt-4 font-mono text-[12px] leading-relaxed tracking-[0.06em]">
                      <span className="text-fg-muted uppercase">
                        In practice —{" "}
                      </span>
                      <span className="text-thread-300">{t.proof}</span>
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
