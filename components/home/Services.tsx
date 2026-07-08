"use client";

import { useState } from "react";
import SectionRule from "@/components/SectionRule";
import CoreScenes from "@/components/home/CoreScenes";

const SERVICES = [
  {
    name: "ERP Extensions & Enterprise Integration",
    line: "We design and build extensions, workflows, and side-by-side applications — and the integrations that connect them. APIs, events, and middleware keep the ERP core clean while giving the business room to move faster.",
    stack: [
      "SAP BTP",
      "CAP",
      "Fiori/UI5",
      "S/4HANA",
      "Clean Core",
      "Integration Suite",
      "APIs",
      "Events",
    ],
  },
  {
    name: "AI & Intelligent Automation",
    line: "We bring forecasting, copilots, RAG, and workflow automation into daily operations — deployed where they remove real work, and engineered to survive production.",
    stack: ["SAP AI Core", "GenAI", "RAG", "Forecasting", "Automation"],
  },
  {
    name: "Full-Stack Enterprise Platforms",
    line: "We build the web and mobile platforms your teams run the business on — offline-first for the field, multilingual by design, and secured for enterprise use.",
    stack: ["React", "Node.js", "MongoDB", "Mobile", "Offline-first"],
  },
  {
    name: "Data & Analytics",
    line: "We turn live enterprise data into dashboards and decision intelligence — from system health and process visibility to ERP migration readiness.",
    stack: ["HANA Cloud", "SAP Analytics Cloud", "CAP", "ABAP"],
  },
  {
    name: "Planning & Solution Architecture",
    line: "We study the ecosystem, write the DPRs and functional specifications that make delivery predictable, and then build against the same plan — planning and execution owned by one team.",
    stack: ["Ecosystem Study", "DPR & Feasibility", "Functional Specs", "Solution Architecture"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="container-site py-28 md:pl-40">
      <SectionRule index="01" label="What We Do" />
      <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:items-center">
        <div>
          <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
            The core systems we architect.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-fg-secondary">
            From ERP foundations to AI-enabled workflows, we design the
            operating layer that connects your enterprise. We help businesses
            modernise, integrate, automate, and scale the systems that run
            daily operations.
          </p>
        </div>
        <CoreScenes />
      </div>

      <div className="mt-14 border-b border-hairline">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.name} className="group relative border-t border-hairline">
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-thread-500 transition-transform duration-500 group-hover:scale-x-100" />
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-6 py-6 text-left"
              >
                <span className="pt-1 font-mono text-[13px] text-thread-500">
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-bold text-core-white md:text-xl">
                    {s.name}
                  </span>
                  <span className="mt-1.5 block max-w-2xl text-[14.5px] leading-relaxed text-fg-secondary">
                    {s.line}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`pt-1 text-xl text-thread-500 transition-transform duration-500 ${
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
                  <div className="pb-7 pl-0 md:pl-12">
                    <div className="flex flex-wrap gap-2">
                      {s.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[2px] border border-thread-500/40 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-thread-300 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
