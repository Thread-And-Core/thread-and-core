import type { Metadata } from "next";
import Link from "next/link";
import ThreadSpine from "@/components/ThreadSpine";
import Reveal from "@/components/Reveal";
import Stat from "@/components/Stat";
import WorkMedia from "@/components/WorkMedia";

export const metadata: Metadata = {
  title: "Where We've Delivered",
  description:
    "Every engagement represents production software: running systems, real constraints, real outcomes — with demos to prove it.",
};

type Case = {
  sector: string;
  title: string;
  body: string;
  tags: string;
  live?: boolean;
  media: { type: "video" | "image"; src: string };
  stats?: { value: React.ReactNode; label: string }[];
};

export default function WorkPage() {
  const cases: Case[] = [
    {
      sector: "Mining & Explosives — Global industrial field operations",
      title: "Field Operations Intelligence Platform",
      body: "Blast scheduling, inbound delivery automation, real-time inventory, mobile operator workflows, customer portal, and AI forecasting for a global explosives company — Australia, 4 regions, 7 languages.",
      tags: "SAP BTP · S/4HANA · CAPM · React · Node.js · SAP AI Core",
      live: true,
      media: { type: "video", src: "/work/field-operations.mp4" },
      stats: [
        { value: "AUD 1M+", label: "Contract value" },
        { value: "16 → 1", label: "Steps to one click" },
        { value: <Stat to={4} />, label: "Regions" },
        { value: <Stat to={7} />, label: "Languages" },
      ],
    },
    {
      sector: "Manufacturing & Supply Chain",
      title: "PO-to-SO Automation Pipeline",
      body: "Purchase orders converted to sales orders automatically across enterprise boundaries — validation, exception handling, and human review only where judgment is required.",
      tags: "SAP BTP · CAPM · APIs · Events",
      live: true,
      media: { type: "image", src: "/work/po-to-so.png" },
    },
    {
      sector: "Supply Chain Intelligence",
      title: "StockSense AI",
      body: "Inventory intelligence with demand forecasting: stock positions, movement patterns, and replenishment signals surfaced before they become stockouts.",
      tags: "AI · Forecasting · Analytics · Node.js",
      media: { type: "image", src: "/work/stocksense.png" },
    },
    {
      sector: "Enterprise Analytics",
      title: "Clean Core Assessment Dashboard",
      body: "Custom objects classified across SAP systems, with system health dashboards and S/4HANA migration intelligence.",
      tags: "HANA Cloud · SAP Analytics Cloud · CAPM · ABAP",
      media: { type: "image", src: "/work/clean-core.png" },
      stats: [
        { value: <Stat to={45000} suffix="+" />, label: "Objects classified" },
        { value: <Stat to={15} suffix="+" />, label: "SAP systems" },
      ],
    },
    {
      sector: "Healthcare",
      title: "CareFlow",
      body: "Patient appointment and follow-up platform with AI speech-to-text clinical notes — less typing for clinicians, cleaner records for the practice.",
      tags: "React · Node.js · GenAI · Speech-to-Text",
      live: true,
      media: { type: "video", src: "/work/careflow.mp4" },
    },
    {
      sector: "Healthcare & Wellness",
      title: "Ayurvedya",
      body: "Care platform for ayurvedic practice management — appointments, treatment plans, and patient history in one place.",
      tags: "React · Node.js · MongoDB",
      media: { type: "video", src: "/work/ayurvedya.mp4" },
    },
    {
      sector: "Veterinary & Pet Health",
      title: "PawChart",
      body: "Clinic management platform for veterinary practices: records, visits, and treatment tracking, built for the pace of a working clinic.",
      tags: "React · Node.js · MongoDB",
      live: true,
      media: { type: "video", src: "/work/pawchart.mp4" },
    },
    {
      sector: "HR & Talent",
      title: "Talent Platform",
      body: "Enterprise talent processes — candidate pipelines, evaluation workflows, and reporting — delivered against real HR operating constraints.",
      tags: "React · Node.js · Analytics",
      media: { type: "image", src: "/work/talent-platform.png" },
    },
  ];

  return (
    <main className="overflow-x-clip">
      <section className="bg-ink-950">
        <div className="container-site pt-40 pb-20">
          <p className="eyebrow mb-6">Enterprise Experience</p>
          <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-core-white">
            Where we&rsquo;ve delivered.
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-secondary">
            Every engagement below represents production software: running
            systems, real constraints, real outcomes — with demos to prove it.
          </p>
        </div>
      </section>

      <div className="relative">
        <ThreadSpine />
        <section className="container-site py-20 md:pl-40">
          <div className="space-y-5">
            {cases.map((c) => (
              <Reveal key={c.title}>
                <article className="rounded-[3px] border border-hairline bg-ink-800 p-8 transition-colors duration-500 hover:border-thread-500/50 md:p-10">
                  <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="font-mono text-[10.5px] tracking-[0.12em] text-fg-muted uppercase">
                          {c.sector}
                        </p>
                        {c.live && (
                          <p className="font-mono text-[10px] tracking-[0.14em] text-thread-300 uppercase">
                            Live in production
                          </p>
                        )}
                      </div>
                      <h2 className="mt-3 text-xl font-bold text-core-white md:text-2xl">
                        {c.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-fg-secondary">
                        {c.body}
                      </p>
                      {c.stats && (
                        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
                          {c.stats.map((s) => (
                            <div key={s.label}>
                              <p className="text-2xl font-bold text-thread-300 tabular-nums">
                                {s.value}
                              </p>
                              <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                                {s.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="mt-6 font-mono text-[11px] tracking-[0.06em] text-slate-accent">
                        {c.tags}
                      </p>
                    </div>
                    <WorkMedia
                      type={c.media.type}
                      src={c.media.src}
                      title={c.title}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 max-w-xl">
              <p className="leading-relaxed text-fg-secondary">
                Client names are withheld where confidentiality applies. All
                demos shown were built independently by the practice. Every
                case maps to the same five-phase method:{" "}
                <Link
                  href="/framework"
                  className="text-thread-300 underline decoration-thread-500/40 underline-offset-4 transition-colors hover:text-core-white"
                >
                  the Thread &amp; Core Framework
                </Link>
                .
              </p>
              <Link href="/contact" className="btn-primary mt-8 inline-block">
                Start a Conversation
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
