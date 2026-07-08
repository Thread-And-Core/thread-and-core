import Link from "next/link";
import HeroGenesis from "@/components/home/HeroGenesis";
import FrameworkSection from "@/components/home/FrameworkSection";
import Services from "@/components/home/Services";
import Industries from "@/components/home/Industries";
import ThreadSpine from "@/components/ThreadSpine";
import CoreSphere from "@/components/CoreSphere";
import Reveal from "@/components/Reveal";
import SectionRule from "@/components/SectionRule";

const FACTS = [
  "14+ years enterprise delivery",
  "SAP certified — CAP & Fiori",
  "Australia · Germany · India",
  "Instructor — BTP100 & CLD200",
];

const ARTICLES = [
  ["Clean Core is a strategy, not a setting", "Clean Core"],
  ["Why most enterprise AI projects fail before they start", "Enterprise AI"],
  ["The five questions to ask before any ERP platform engagement", "SAP BTP"],
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <HeroGenesis />

      <div className="relative">
        <ThreadSpine />

        {/* 01 — What we do (plain terms, before any metaphor) */}
        <Services />

        {/* 02 — The framework */}
        <FrameworkSection />

        {/* 03 — Industries */}
        <Industries />

        {/* 04 — The practitioner */}
        <section className="bg-ink-950">
          <div className="container-site py-28 md:pl-40">
            <SectionRule index="04" label="The Practitioner" />
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

        {/* 05 — Insights */}
        <section>
          <div className="container-site py-28 md:pl-40">
            <SectionRule index="05" label="Insights" />
            <Reveal>
              <h2 className="max-w-2xl text-[clamp(1.7rem,3vw,2.5rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
                Thinking on enterprise architecture, ERP, AI, and
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

        {/* 06 — Contact: the thread ends at the core */}
        <section className="bg-ink-950">
          <div className="container-site py-28 md:py-32">
            <SectionRule index="06" label="Start a Conversation" />
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
