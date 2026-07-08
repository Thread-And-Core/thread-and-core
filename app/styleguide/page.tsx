import type { Metadata } from "next";
import CoreSphere from "@/components/CoreSphere";
import {
  KnotCore,
  KnotAmpersand,
  CoilCore,
  StitchMark,
  Wordmark,
} from "@/components/logo/concepts";

export const metadata: Metadata = {
  title: "Design Foundation",
  robots: { index: false },
};

const swatches: [string, string][] = [
  ["ink-950", "#080A0F"],
  ["ink-900", "#0C0F16"],
  ["ink-800", "#131722"],
  ["ink-700", "#1C2230"],
  ["hairline", "#232A3A"],
  ["thread-500", "#D99A4E"],
  ["thread-300", "#F0C987"],
  ["core-white", "#FFF6E9"],
  ["fg", "#EDE7DC"],
  ["fg-secondary", "#9AA3B2"],
  ["fg-muted", "#5D6675"],
  ["slate-accent", "#7FA6B8"],
];

const marks = [
  {
    name: "00 — The Knot Core · Primary",
    note: "One continuous thread tied into a knot around the core. The line is the thread, the knot is the connection, the dot is the core — the mark alone says the name.",
    Mark: KnotCore,
  },
  {
    name: "01 — The Knot Ampersand (superseded)",
    note: "The & drawn as one continuous line tying a knot. The connector is the brand.",
    Mark: KnotAmpersand,
  },
  {
    name: "02 — The Coil",
    note: "A line enters from outside and coils to a still center.",
    Mark: CoilCore,
  },
  {
    name: "03 — The Stitch",
    note: "A dashed line passing through a circle, over and under.",
    Mark: StitchMark,
  },
];

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline py-14">
      <p className="eyebrow mb-8">{label}</p>
      {children}
    </section>
  );
}

export default function Styleguide() {
  return (
    <main className="container-site pt-32 pb-24">
      <h1 className="text-4xl font-bold tracking-tight text-core-white">
        Design foundation
      </h1>
      <p className="mt-3 mb-14 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-muted">
        Internal — Phase 1 reference
      </p>

      <Section label="Color — Ink &amp; Copper">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {swatches.map(([name, hex]) => (
            <div key={name}>
              <div
                className="h-16 rounded-[3px] border border-hairline"
                style={{ backgroundColor: hex }}
              />
              <p className="mt-2 font-mono text-[11px] text-fg-secondary">
                {name}
              </p>
              <p className="font-mono text-[11px] text-fg-muted">{hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Typography — Three voices">
        <div className="space-y-10">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              Display — Satoshi
            </p>
            <p className="text-5xl font-bold tracking-[-0.02em] text-core-white">
              Proof, not presentations.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              Editorial — Fraunces
            </p>
            <p className="font-editorial text-4xl italic text-thread-300">
              What cannot fail?
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              Technical — JetBrains Mono
            </p>
            <p className="font-mono text-sm tracking-[0.12em] text-fg-secondary">
              AUD 1M+ · 4 REGIONS · 7 LANGUAGES · LIVE IN PRODUCTION
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              Body
            </p>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-fg-secondary">
              Every enterprise transformation has two dimensions: what connects
              the enterprise, and what anchors it. Transformation happens when
              the two meet.
            </p>
          </div>
        </div>
      </Section>

      <Section label="Actions">
        <div className="flex flex-wrap items-center gap-4">
          <button className="btn-primary">Start a Conversation</button>
          <button className="btn-ghost">Explore Our Framework</button>
          <span className="eyebrow">Eyebrow label</span>
        </div>
      </Section>

      <Section label="Logo seeds — three concepts">
        <div className="grid gap-4 md:grid-cols-3">
          {marks.map(({ name, note, Mark }) => (
            <div
              key={name}
              className="rounded-[3px] border border-hairline bg-ink-800 p-8"
            >
              <div className="flex items-end gap-6">
                <Mark size={88} strokeWidth={1.6} />
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-[3px]"
                    style={{ backgroundColor: "#080A0F" }}
                  >
                    <Mark size={16} strokeWidth={2.6} />
                  </span>
                  <span className="font-mono text-[10px] text-fg-muted">
                    16px
                  </span>
                </div>
              </div>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-fg">
                {name}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-fg-secondary">
                {note}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[3px] border border-hairline bg-ink-800 p-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
            Wordmark (Concept 01 in use)
          </p>
          <Wordmark className="scale-150 origin-left" />
        </div>
      </Section>

      <Section label="The Core — canvas particle sphere">
        <div className="flex flex-wrap items-center gap-12">
          <CoreSphere size={260} />
          <p className="max-w-sm text-[13.5px] leading-relaxed text-fg-secondary">
            ~700 depth-shaded particles on a Fibonacci sphere, Canvas 2D, no
            WebGL. Pauses off-viewport; renders a static frame under reduced
            motion. The spine (copper thread on the homepage) scrubs with
            scroll via GSAP ScrollTrigger.
          </p>
        </div>
      </Section>
    </main>
  );
}
