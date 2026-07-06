import type { Metadata } from "next";
import Link from "next/link";
import CoreSphere from "@/components/CoreSphere";
import Reveal from "@/components/Reveal";
import SectionRule from "@/components/SectionRule";

export const metadata: Metadata = {
  title: "The Thread & Core Framework",
  description:
    "A proprietary engagement methodology developed through 14+ years of enterprise delivery. Five phases. One continuous method.",
};

const THREADS = [
  "Processes",
  "Applications",
  "Data",
  "Integrations",
  "Intelligence",
  "People",
];

const CORE = [
  ["Value", "Business outcomes and financial control."],
  ["Resilience", "The system absorbs change, scales, and governs itself."],
  [
    "Intelligence",
    "The system learns, adapts, and operates with less human intervention.",
  ],
];

const PHASES = [
  {
    name: "Understand",
    question: "What cannot fail?",
    lead: "Decode the business core.",
    focus: [
      "Business model",
      "Pain points",
      "Systems landscape",
      "Bottlenecks",
      "Process breakdowns",
    ],
    practice:
      "Every engagement starts here — even a one-week SAP extension. Architecture decisions made before this phase are guesses.",
  },
  {
    name: "Connect",
    question: "Where are the gaps?",
    lead: "Map the enterprise threads.",
    focus: [
      "Process dependencies",
      "Application landscape",
      "API flows",
      "Integration points",
      "Human workflows",
    ],
    practice:
      "Dependency maps that show where transformation will actually break — before it does.",
  },
  {
    name: "Modernise",
    question: "What must be rebuilt?",
    lead: "Strengthen the architecture.",
    focus: [
      "SAP modernisation",
      "BTP extensions",
      "Clean Core strategy",
      "Cloud-native engineering",
      "AI readiness",
    ],
    practice:
      "Clean Core by default: extend on BTP, keep the digital core upgrade-safe.",
  },
  {
    name: "Automate",
    question: "What should run without humans?",
    lead: "Introduce intelligence.",
    focus: [
      "Workflows",
      "Approvals",
      "Predictions",
      "Copilots",
      "Automation engines",
      "Analytics",
    ],
    practice:
      "Automation only where a human adds no judgment — and AI only where it survives production.",
  },
  {
    name: "Scale",
    question: "Can it survive change?",
    lead: "Build resilient enterprise systems.",
    focus: [
      "Enterprise visibility",
      "Speed",
      "Agility",
      "Resilience",
      "Compliance",
      "Global scalability",
    ],
    practice:
      "Multi-region, multi-language, compliance-ready before go-live — not after.",
  },
];

export default function FrameworkPage() {
  return (
    <main className="overflow-x-clip">
      {/* Hero */}
      <section className="bg-ink-950">
        <div className="container-site pt-40 pb-24">
          <p className="eyebrow mb-6">The Framework</p>
          <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-core-white">
            The Thread &amp; Core Framework
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-secondary">
            A proprietary engagement methodology developed through 14+ years
            of enterprise delivery.
          </p>
          <p className="mt-8 font-editorial text-[clamp(1.3rem,2.4vw,1.8rem)] italic text-thread-300">
            Transformation happens when every thread connects to the core.
          </p>
        </div>
      </section>

      {/* Philosophy: Threads vs Core */}
      <section>
        <div className="container-site py-24">
          <SectionRule index="01" label="Two Dimensions" />
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[3px] border border-hairline bg-ink-800 p-9">
                <p className="font-mono text-[11px] tracking-[0.16em] text-thread-500 uppercase">
                  Threads — what moves
                </p>
                <h2 className="mt-4 text-2xl font-bold text-core-white">
                  What connects the enterprise.
                </h2>
                <p className="mt-4 font-mono text-[12.5px] leading-8 tracking-[0.08em] text-fg-secondary uppercase">
                  {THREADS.join(" · ")}
                </p>
                <p className="mt-6 font-editorial text-lg italic text-thread-300">
                  Without threads, nothing moves.
                </p>
              </div>
            </Reveal>
            <Reveal delay={130}>
              <div className="h-full rounded-[3px] border border-hairline bg-ink-800 p-9">
                <p className="font-mono text-[11px] tracking-[0.16em] text-thread-500 uppercase">
                  Core — what anchors
                </p>
                <h2 className="mt-4 text-2xl font-bold text-core-white">
                  What anchors the enterprise.
                </h2>
                <dl className="mt-4 space-y-3">
                  {CORE.map(([term, def]) => (
                    <div key={term}>
                      <dt className="font-mono text-[12.5px] tracking-[0.08em] text-fg uppercase">
                        {term}
                      </dt>
                      <dd className="mt-0.5 text-[14px] leading-relaxed text-fg-secondary">
                        {def}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 font-editorial text-lg italic text-thread-300">
                  Without core, nothing sustains.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The five phases */}
      <section className="bg-ink-950">
        <div className="container-site py-24">
          <SectionRule index="02" label="Five Phases, One Method" />
          <div className="divide-y divide-hairline border-y border-hairline">
            {PHASES.map((phase, i) => (
              <Reveal key={phase.name}>
                <div className="grid gap-6 py-14 md:grid-cols-[90px_260px_1fr]">
                  <p className="font-mono text-[13px] text-thread-500">
                    0{i + 1}
                  </p>
                  <div>
                    <h2 className="text-2xl font-bold text-core-white">
                      {phase.name}
                    </h2>
                    <p className="mt-1 text-[14px] text-fg-secondary">
                      {phase.lead}
                    </p>
                  </div>
                  <div>
                    <p className="font-editorial text-xl italic text-thread-300">
                      {phase.question}
                    </p>
                    <p className="mt-4 font-mono text-[11.5px] leading-7 tracking-[0.08em] text-fg-secondary uppercase">
                      {phase.focus.join(" · ")}
                    </p>
                    <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-fg-muted">
                      {phase.practice}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-site py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <CoreSphere size={170} className="mx-auto mb-9" />
              <h2 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
                See the framework in practice.
              </h2>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-fg-secondary">
                The same five phases, applied to production systems across
                mining, healthcare, manufacturing, and analytics.
              </p>
              <Link href="/work" className="btn-primary mt-9 inline-block">
                Explore the work
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
