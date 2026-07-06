import SectionRule from "@/components/SectionRule";

const TILES = [
  {
    name: "Mining & Explosives",
    proof: "Field operations platform — 4 regions, 7 languages, live.",
  },
  {
    name: "Healthcare",
    proof: "Patient workflows with AI clinical notes, in production.",
  },
  {
    name: "Hospital & Pharma",
    proof: "Care and inventory operations under real constraints.",
  },
  {
    name: "Manufacturing & Supply Chain",
    proof: "PO-to-SO automation across enterprise boundaries.",
  },
  {
    name: "Oil & Gas",
    proof: "Enterprise systems delivered for industrial operations.",
  },
  {
    name: "HR & Talent",
    proof: "Talent platform delivery at enterprise scale.",
  },
  {
    name: "Enterprise Analytics",
    proof: "45,000+ objects classified across 15+ SAP systems.",
  },
  {
    name: "Veterinary & Pet Health",
    proof: "Clinic management platform, live with practitioners.",
  },
];

/** Deterministic pseudo-random in [0,1) — stable across server and client. */
function rnd(seed: number, n: number) {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Woven({ seed }: { seed: number }) {
  const strands = Array.from({ length: 6 }, (_, i) => {
    const y0 = 20 + i * 52 + rnd(seed, i) * 26;
    const a = rnd(seed, i + 7) * 90 - 45;
    const b = rnd(seed, i + 13) * 70 - 35;
    return {
      d: `M-20 ${y0} C 120 ${y0 + a}, 260 ${y0 - b}, 420 ${y0 + b * 0.6}`,
      o: 0.08 + rnd(seed, i + 23) * 0.16,
    };
  });
  return (
    <svg
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full opacity-70 transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
      aria-hidden="true"
    >
      {strands.map((s, i) => (
        <path
          key={i}
          d={s.d}
          fill="none"
          stroke="#D99A4E"
          strokeOpacity={s.o}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

export default function Industries() {
  return (
    <section className="bg-ink-950">
      <div className="container-site py-28 md:pl-40">
      <SectionRule index="04" label="Where We've Delivered" />
      <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-core-white">
        Every engagement is anchored in the business.
      </h2>
      <p className="mt-4 max-w-xl leading-relaxed text-fg-secondary">
        Every sector below is one where production software has been delivered
        against real enterprise constraints.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile, i) => (
          <div
            key={tile.name}
            className="group relative aspect-[4/3] overflow-hidden rounded-[3px] border border-hairline bg-ink-800 transition-colors duration-500 hover:border-thread-500/60"
          >
            <Woven seed={i + 1} />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[15px] font-bold text-core-white transition-transform duration-500 group-hover:-translate-y-1">
                {tile.name}
              </p>
              <p className="mt-1 max-h-0 font-mono text-[10.5px] leading-relaxed tracking-[0.04em] text-fg-secondary opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                {tile.proof}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
