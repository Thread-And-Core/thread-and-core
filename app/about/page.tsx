import type { Metadata } from "next";
import Link from "next/link";
import Portrait from "@/components/Portrait";
import Reveal from "@/components/Reveal";
import SectionRule from "@/components/SectionRule";

export const metadata: Metadata = {
  title: "About — The Architect Behind the Practice",
  description:
    "Thread & Core is led by Prashant Agarwal, an SAP-certified BTP Solution Architect with 14+ years of enterprise delivery experience.",
};

const ARC = [
  ["India", "Enterprise foundations — full-stack and SAP delivery."],
  ["Germany", "Onsite enterprise delivery for European operations."],
  ["Australia", "Global industrial field-operations platform, in production."],
  ["Pune", "Thread & Core Systems — the independent practice."],
];

const CREDENTIALS = [
  "SAP Certified Associate — Backend Developer (CAP)",
  "SAP Certified Associate — Fiori Application Developer",
  "SAP instructor — BTP100 & CLD200",
  "14+ years of enterprise technology delivery",
  "Onsite delivery across Australia, Germany, and India",
  "Mining · Manufacturing · Oil & Gas · Healthcare · HR · Analytics",
];

export default function AboutPage() {
  return (
    <main className="overflow-x-clip">
      <section className="bg-ink-950">
        <div className="container-site pt-40 pb-24">
          <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-6">The Architect</p>
              <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-core-white">
                The architect behind Thread &amp; Core Systems.
              </h1>
              <p className="mt-8 max-w-2xl font-editorial text-[clamp(1.25rem,2.2vw,1.7rem)] italic text-thread-300">
                The architect who scopes your project is the one who builds
                it.
              </p>
            </div>
            <Portrait className="hidden md:block" />
          </div>
        </div>
      </section>

      <section>
        <div className="container-site py-24">
          <SectionRule index="01" label="The Story" />
          <div className="grid gap-14 md:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <div className="space-y-6 text-[1.0625rem] leading-relaxed text-fg-secondary">
                <p>
                  Thread &amp; Core is led by Prashant Agarwal, an
                  SAP-certified BTP Solution Architect with 14+ years of
                  enterprise technology delivery across SAP BTP, Clean Core
                  extensions, AI-driven enterprise systems, cloud
                  architecture, integration, and production-scale
                  applications.
                </p>
                <p>
                  The practice exists because of one belief, proven across
                  every engagement: technology doesn&rsquo;t transform
                  businesses — connection does. Systems succeed when the
                  people who understand the business problem also own the
                  architecture, and stay accountable through delivery.
                </p>
                <p>
                  That is the model here. No handoff from a senior architect
                  to an anonymous delivery team. The person who scopes the
                  system designs it, the person who designs it builds it, and
                  the person who builds it answers for it in production.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="https://linkedin.com/in/agarawal-prashant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  LinkedIn
                </a>
                <Link href="/contact" className="btn-primary">
                  Start a Conversation
                </Link>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {CREDENTIALS.map((c) => (
                  <li
                    key={c}
                    className="py-4 font-mono text-[12px] leading-relaxed tracking-[0.08em] text-fg-secondary uppercase"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-950">
        <div className="container-site py-24">
          <SectionRule index="02" label="The Arc" />
          <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            <span
              aria-hidden="true"
              className="absolute top-[5px] right-0 left-0 hidden h-px bg-gradient-to-r from-thread-500/60 via-thread-500/30 to-thread-300 md:block"
            />
            {ARC.map(([place, note], i) => (
              <Reveal key={place} delay={i * 120}>
                <div className="relative md:pt-8">
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 hidden h-[11px] w-[11px] rounded-full border md:block ${
                      i === ARC.length - 1
                        ? "border-thread-300 bg-thread-500"
                        : "border-thread-500 bg-ink-950"
                    }`}
                  />
                  <p className="font-mono text-[11px] tracking-[0.16em] text-thread-500 uppercase">
                    {place}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-fg-secondary">
                    {note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
