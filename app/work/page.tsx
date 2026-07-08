import type { Metadata } from "next";
import Link from "next/link";
import ThreadSpine from "@/components/ThreadSpine";
import Reveal from "@/components/Reveal";
import Stat from "@/components/Stat";
import WorkMedia from "@/components/WorkMedia";

export const metadata: Metadata = {
  title: "The Experience Behind the Practice",
  description:
    "Systems architected and delivered by the founder — across enterprise roles and independent builds. The delivery experience Thread & Core is built on.",
};

type Case = {
  sector: string;
  title: string;
  body: string;
  tags: string;
  media: { type: "video" | "image"; src: string };
  stats?: { value: React.ReactNode; label: string }[];
};

export default function WorkPage() {
  const cases: Case[] = [
    {
      sector: "Mining & Explosives — Global industrial field operations",
      title: "Field Operations Intelligence Platform",
      //body: "A three-application operations platform for a global explosives and blasting services company — APAC, EMEA, NA and Europe, in 7 languages. A real-time blast-scheduling board manages trucks, crews, shotfirers and surveyors, and auto-creates Planned Orders in S/4HANA from a 4-week rolling forecast. A tablet app replaced paper delivery dockets entirely — actuals against plan, on-site additions, and the customer's digital signature generating a legally complete docket PDF. A customer portal gives mining sites live delivery visibility and digital countersigning, removing the 3–5 day billing delay per docket. Planner to operator to customer, every status change flowing in real time.",
      body: `Explosives delivery to a mine site involves three moving parts that rarely talk to each other — the planner scheduling the trucks, the operator driving them, and the mining customer waiting for materials.

The delivery involved three connected applications to digitise the entire chain for a global explosives company operating across 4 regions and 7 languages.

Planners got a real-time blast scheduling board — trucks, crews, shotfirers, multi-day and recurring bookings — with a 4-week rolling forecast that auto-creates procurement orders in SAP S/4HANA. What used to be a 16-step manual goods receipt process became a single tap.

Operators used an offline-supported tablet app that replaced paper dockets entirely. Schedule on screen, actuals captured on site, customer signs on the tablet, docket PDF generated and billing triggered — all before the truck leaves the gate.

Mining customers got a portal to track every incoming delivery, review what was delivered, and countersign digitally — cutting days of billing delay to minutes.

Every status change flows across all three applications in real time. Built on SAP BTP, React, Node.js, HANA Cloud and SAP S/4HANA.`,
      tags: "SAP BTP · S/4HANA · CAPM · React · Node.js · HANA Cloud · SAP MDK",
      media: { type: "image", src: "/work/foi.png" },
      stats: [
        { value: "16 → 1", label: "Steps to one click" },
        { value: <Stat to={4} />, label: "Regions" },
        { value: <Stat to={7} />, label: "Languages" },
        { value: <Stat to={80} suffix="+" />, label: "Development objects" },
      ],
    },
    {
      sector: "Healthcare — Independent US medical practices",
      title: "CareFlow",
      body: "An AI-powered clinic operations platform designed for independent medical practices in the US. CareFlow manages appointment booking, live slot availability, patient confirmations, AI consultation recording, SOAP note generation, follow-up scheduling, cancellation monitoring, medication refill workflows, and pre-filled prescription templates.",
      tags: "React · Node.js · GenAI · Speech-to-Text",
      media: { type: "video", src: "/work/careflow.mp4" },
      stats: [
        { value: "<40% → 80%+", label: "Follow-up compliance" },
        { value: "60 sec", label: "Visit summary delivered" },
      ],
    },
    {
      sector: "Ayurveda Hospitals & AYUSH Institutions",
      title: "AyurVaidya",
      body: "A unified inventory platform covering both OPEX — medicines and consumables — and CAPEX — equipment and assets. FEFO-enforced batch management with 30/60/90-day expiry tracking means no medicine expires unnoticed; every asset is serial-tracked with AMC renewal alerts so no contract lapses silently; and QR-coded stock inward, doctor-authorised issue, and audit trails run from delivery to disposal. A built-in AI assistant answers inventory questions in plain English — expiring items, reorder needs, AMC status — from live data.",
      tags: "React · Node.js · MongoDB · GenAI",
      media: { type: "video", src: "/work/ayurvedya.mp4" },
    },
    {
      sector: "Manufacturing & Supply Chain",
      title: "PO-to-SO Automation Pipeline",
      body: "An SAP automation pipeline that reads purchase orders from email, extracts the required data using Document AI, validates it, and creates Sales Orders in SAP automatically. The workflow reduced repetitive manual entry and moved order processing from hours to minutes.",
      tags: "SAP Joule · SAP BPA · SAP Build · SAP AI Core · Fiori · CAPM · S/4HANA",
      media: { type: "image", src: "/work/po-to-so.png" },
      stats: [
        { value: "90%", label: "Less manual entry" },
        { value: "Hours → mins", label: "Processing time" },
      ],
    },
    {
      sector: "Enterprise Analytics",
      title: "Clean Core Assessment Dashboard",
      body: "An SAP assessment dashboard used to classify custom objects across complex SAP landscapes and support S/4HANA migration planning. The dashboard provided 360-degree system health views, standardisation tiers, object-level analysis, and migration intelligence for cleaner enterprise architecture decisions.",
      tags: "HANA Cloud · SAP Analytics Cloud · CAPM · ABAP",
      media: { type: "image", src: "/work/clean-core.png" },
      stats: [
        { value: <Stat to={45000} suffix="+" />, label: "Objects classified" },
        { value: <Stat to={15} suffix="+" />, label: "SAP systems" },
      ],
    },
    {
      sector: "Supply Chain Intelligence",
      title: "StockSense AI",
      body: "A mobile inventory execution and intelligence platform for field teams. StockSense supports stock tracking, transfers, approvals, obsolete material detection, replenishment prediction, and natural-language inventory queries through AI-enabled agents and automation workflows.",
      tags: "SAP Joule · AI Agents · CAPM · SAP AI Core · SAP BPA",
      media: { type: "image", src: "/work/stocksense.jpeg" },
    }
    // {
    //   sector: "Veterinary & Pet Health",
    //   title: "PawChart",
    //   body: "Clinic management platform for veterinary practices: records, visits, and treatment tracking, built for the pace of a working clinic.",
    //   tags: "React · Node.js · MongoDB",
    //   media: { type: "video", src: "/work/pawchart.mp4" },
    // },
    // {
    //   sector: "HR & Talent",
    //   title: "Talent Platform",
    //   body: "Enterprise talent processes — candidate pipelines, evaluation workflows, and reporting — delivered against real HR operating constraints.",
    //   tags: "React · Node.js · Analytics",
    //   media: { type: "image", src: "/work/talent-platform.png" },
    // },
  ];

  return (
    <main className="overflow-x-clip">
      <section className="bg-ink-950">
        <div className="container-site pt-40 pb-20">
          <p className="eyebrow mb-6">The Track Record</p>
          <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-core-white">
            The experience behind the practice.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-fg-secondary">
            Every system below was architected and delivered by our founder —
            through senior enterprise roles and independent product builds —
            before Thread &amp; Core existed. It is the proven delivery experience the practice is
            built on, and what every new engagement starts with.
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
                      <p className="font-mono text-[10.5px] tracking-[0.12em] text-fg-muted uppercase">
                        {c.sector}
                      </p>
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
                The enterprise platforms above were delivered by the founder
                through senior roles at previous organisations; the product
                builds are independent work. Client and employer names are
                withheld where confidentiality applies. Every Thread &amp;
                Core engagement draws on this same delivery experience,
                applied through{" "}
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
