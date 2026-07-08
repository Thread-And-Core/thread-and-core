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

const CARD_ROWS: [string, string | string[]][] = [
  [
    "Certified",
    [
      "SAP Certified Associate — Backend Developer (CAP)",
      "SAP Certified Associate — Fiori Application Developer",
      "SAP Instructor — BTP100 & CLD200",
    ],
  ],
  ["Focus", "Full-spectrum enterprise tech — SAP BTP, AI, cloud, full-stack"],
  ["Onsite", "Delivered in Australia, Germany & India"],
  ["Experience", "14+ years of enterprise technology delivery"],
  ["Industries", "Mining · Manufacturing · Oil & Gas · Healthcare · HR · Analytics"],
];

const ARC = [
  ["India", "Enterprise foundations — full-stack and SAP delivery."],
  ["Germany", "Onsite enterprise delivery for European operations."],
  ["Australia", "Global industrial field-operations platform, in production."],
  ["Pune", "Thread & Core Systems — the independent practice."],
];

export default function AboutPage() {
  return (
    <main className="overflow-x-clip">
      <section className="bg-ink-950">
        <div className="container-site grid gap-14 pt-40 pb-24 lg:grid-cols-[420px_1fr] lg:gap-20">
          {/* Profile card */}
          <Reveal>
            <div className="rounded-[6px] border border-hairline bg-ink-800 p-8">
              <div className="flex items-center gap-5">
                <Portrait sizeClassName="h-24 w-24 rounded-full" />
                <div>
                  <p className="text-2xl font-bold tracking-[-0.01em] text-core-white">
                    Prashant Agarwal
                  </p>
                  <a
                    href="https://linkedin.com/in/agarawal-prashant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-mono text-[11.5px] tracking-[0.04em] text-thread-300 transition-colors hover:text-core-white"
                  >
                    View profile on LinkedIn →
                  </a>
                </div>
              </div>

              <div className="mt-8">
                {CARD_ROWS.map(([term, value], i) => (
                  <div
                    key={term as string}
                    className={`grid grid-cols-[110px_1fr] gap-4 border-t border-hairline py-4 ${
                      i === 0
                        ? "rounded-[3px] border-t-0 bg-thread-500/[0.06] px-3"
                        : ""
                    }`}
                  >
                    <dt className="font-mono text-[10.5px] tracking-[0.16em] text-thread-500 uppercase">
                      {term}
                    </dt>
                    <dd className="text-[13.5px] leading-relaxed text-fg-secondary">
                      {Array.isArray(value) ? (
                        <ul className="space-y-2">
                          {value.map((v) => (
                            <li key={v}>{v}</li>
                          ))}
                        </ul>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Narrative — the story of the practice */}
          <Reveal delay={130}>
            <p className="eyebrow mb-7">Deep Expertise, Direct Involvement</p>
            <h1 className="max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.12] tracking-[-0.01em] text-core-white">
              <span className="font-editorial italic text-thread-300">
                The architect
              </span>{" "}
              <span className="font-bold">
                behind Thread &amp; Core Systems.
              </span>
            </h1>
            <p className="mt-7 max-w-xl font-editorial text-[clamp(1.2rem,2vw,1.55rem)] italic text-thread-300">
              The architect who scopes your project is the one who builds it.
            </p>

            <div className="mt-8 max-w-xl space-y-5 text-[1.0625rem] leading-relaxed text-fg-secondary">
              <p>
                Thread &amp; Core is led by Prashant Agarwal, an SAP-certified
                BTP Solution Architect with 14+ years of enterprise technology
                delivery across SAP BTP, Clean Core extensions, AI-driven
                enterprise systems, cloud architecture, integration, and
                production-scale applications.
              </p>
              <p>
                The practice exists because of one belief, proven across every
                engagement: technology doesn&rsquo;t transform businesses —
                connection does. Systems succeed when the people who
                understand the business problem also own the architecture, and
                stay accountable through delivery.
              </p>
              <p>
                That is the model here. No handoff from a senior architect to
                an anonymous delivery team. The person who scopes the system
                designs it, the person who designs it builds it, and the
                person who builds it answers for it in production.
              </p>
            </div>

            <div className="mt-10 max-w-xl border-t border-hairline pt-7">
              <p className="text-lg font-bold text-core-white">
                Prashant Agarwal
              </p>
              <p className="mt-1 font-mono text-[11.5px] tracking-[0.08em] text-fg-muted uppercase">
                Founder &amp; Principal Architect · Thread &amp; Core Systems
              </p>
            </div>

            <Link href="/contact" className="btn-primary mt-9 inline-block">
              Start a Conversation
            </Link>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-site py-24">
          <SectionRule index="01" label="The Arc" />
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
