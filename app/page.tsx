import Link from "next/link";
import HeroGenesis from "@/components/home/HeroGenesis";
import FrameworkSection from "@/components/home/FrameworkSection";
import Capabilities from "@/components/home/Capabilities";
import Industries from "@/components/home/Industries";
import ThreadSpine from "@/components/ThreadSpine";
import CoreSphere from "@/components/CoreSphere";
import Reveal from "@/components/Reveal";
import SectionRule from "@/components/SectionRule";
import Stat from "@/components/Stat";

const CASES = [
  {
    sector: "Mining & Explosives — Global industrial field operations",
    title: "Field Operations Intelligence Platform",
    body: "Blast scheduling, inbound delivery automation, real-time inventory, mobile operator workflows, customer portal, and AI forecasting for a global explosives company — Australia, 4 regions, 7 languages.",
    tags: "SAP BTP · S/4HANA · CAPM · React · Node.js · SAP AI Core",
    featured: true,
  },
  {
    sector: "Healthcare",
    title: "CareFlow",
    body: "Patient appointment and follow-up platform with AI speech-to-text clinical notes.",
    tags: "React · Node.js · GenAI · Speech-to-Text",
    featured: false,
  },
  {
    sector: "Enterprise Analytics",
    title: "Clean Core Assessment Dashboard",
    body: "Custom objects classified across SAP systems, with health dashboards and S/4HANA migration intelligence.",
    tags: "HANA Cloud · SAP Analytics Cloud · CAPM · ABAP",
    featured: false,
  },
];

const FACTS = [
  "14+ years enterprise delivery",
  "SAP certified — CAP & Fiori",
  "Australia · Germany · India",
  "Instructor — BTP100 & CLD200",
];

const ARTICLES = [
  ["Clean Core is a strategy, not a setting", "Clean Core"],
  ["Why most enterprise AI projects fail before they start", "Enterprise AI"],
  ["The five questions to ask before any SAP BTP engagement", "SAP BTP"],
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <HeroGenesis />

      <div className="relative">
        <ThreadSpine />

        {/* 01 — The belief */}
        <section>
          <div className="container-site py-28 md:py-36">
            <SectionRule index="01" label="The Belief" />
            <div className="mx-auto max-w-3xl py-10 text-center">
              <Reveal>
                <p className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-snug text-core-white">
                  Technology doesn&rsquo;t transform businesses.
                </p>
                <p className="mt-3 font-editorial text-[clamp(2rem,4vw,3.2rem)] italic text-thread-300">
                  Connection does.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <p className="mx-auto mt-10 max-w-xl leading-relaxed text-fg-secondary">
                  Every enterprise runs on invisible threads: processes,
                  applications, data, people, and intelligence. We help connect
                  those threads to the core, creating systems that scale,
                  adapt, and endure.
                </p>
                <p className="mt-6 font-mono text-[12px] tracking-[0.14em] text-fg-muted uppercase">
                  That is why Thread &amp; Core exists.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 02 — The framework */}
        <FrameworkSection />

        {/* 03 — Capabilities */}
        <Capabilities />

        {/* 04 — Industries */}
        <Industries />

        {/* 05 — Proof */}
        <section>
          <div className="container-site py-28 md:pl-40">
            <SectionRule index="05" label="Enterprise Experience" />
            <Reveal>
              <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
                Proof, not presentations.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-fg-secondary">
                Experience gained delivering enterprise transformation
                initiatives across industries, regions, and scale.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {CASES.map((c) => (
                <Reveal
                  key={c.title}
                  className={c.featured ? "md:col-span-2" : ""}
                >
                  <article className="h-full rounded-[3px] border border-hairline bg-ink-800 p-8 transition-colors duration-500 hover:border-thread-500/50 md:p-9">
                    <p className="font-mono text-[10.5px] tracking-[0.12em] text-fg-muted uppercase">
                      {c.sector}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-core-white md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-fg-secondary">
                      {c.body}
                    </p>
                    {c.featured ? (
                      <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
                        <div>
                          <p className="text-2xl font-bold text-thread-300 tabular-nums">
                            AUD 1M+
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                            Contract value
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-thread-300 tabular-nums">
                            16 → 1
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                            Steps to one click
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-thread-300 tabular-nums">
                            <Stat to={4} />
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                            Regions
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-thread-300 tabular-nums">
                            <Stat to={7} />
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                            Languages
                          </p>
                        </div>
                      </div>
                    ) : c.title === "Clean Core Assessment Dashboard" ? (
                      <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
                        <div>
                          <p className="text-2xl font-bold text-thread-300 tabular-nums">
                            <Stat to={45000} suffix="+" />
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                            Objects classified
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-thread-300 tabular-nums">
                            <Stat to={15} suffix="+" />
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-fg-muted uppercase">
                            SAP systems
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <p className="mt-6 font-mono text-[11px] tracking-[0.06em] text-slate-accent">
                      {c.tags}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Link href="/work" className="btn-ghost mt-12 inline-block">
                Explore all engagements
              </Link>
            </Reveal>
          </div>
        </section>

        {/* 06 — The practitioner */}
        <section className="bg-ink-950">
          <div className="container-site py-28 md:pl-40">
            <SectionRule index="06" label="The Practitioner" />
            <div className="grid gap-14 md:grid-cols-[1.3fr_1fr]">
              <Reveal>
                <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
                  The architect who scopes your project is the one who builds
                  it.
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-fg-secondary">
                  Thread &amp; Core is led by an SAP-certified BTP Solution
                  Architect with 14+ years of enterprise delivery experience
                  and production systems shipped across Australia, Germany,
                  and India. When you work with Thread &amp; Core, you work
                  directly with the person who has architected and built the
                  kind of system you need. End to end. In production. At
                  enterprise scale.
                </p>
                <Link href="/about" className="btn-ghost mt-9 inline-block">
                  About the architect
                </Link>
              </Reveal>
              <Reveal delay={150}>
                <ul className="divide-y divide-hairline border-y border-hairline">
                  {FACTS.map((fact) => (
                    <li
                      key={fact}
                      className="py-4 font-mono text-[12.5px] tracking-[0.1em] text-fg-secondary uppercase"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 07 — Insights */}
        <section>
          <div className="container-site py-28 md:pl-40">
            <SectionRule index="07" label="Insights" />
            <Reveal>
              <h2 className="max-w-2xl text-[clamp(1.7rem,3vw,2.5rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
                Thinking on enterprise architecture, SAP, AI, and
                transformation.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-fg-secondary">
                Articles and perspectives from the practice, published as work
                allows.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-12 divide-y divide-hairline border-y border-hairline">
                {ARTICLES.map(([title, tag]) => (
                  <div
                    key={title}
                    className="flex flex-wrap items-baseline justify-between gap-3 py-5"
                  >
                    <p className="text-[1.0625rem] font-medium text-fg">
                      {title}
                    </p>
                    <p className="font-mono text-[10.5px] tracking-[0.14em] text-thread-500 uppercase">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 08 — Contact: the thread ends at the core */}
        <section className="bg-ink-950">
          <div className="container-site py-28 md:py-32">
            <SectionRule index="08" label="Start a Conversation" />
            <div className="mx-auto max-w-3xl py-8 text-center">
              <Reveal>
                <CoreSphere size={210} className="mx-auto mb-10" />
                <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
                  Tell us how your business runs. We&rsquo;ll tell you what to
                  build.
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-fg-secondary">
                  We are not taking every engagement. We are taking the right
                  ones — where architecture can create real leverage and the
                  client wants a peer, not a vendor.
                </p>
                <Link href="/contact" className="btn-primary mt-9 inline-block">
                  Start a Conversation
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
