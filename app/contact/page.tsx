import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Tell us what you're trying to build, or what's broken. We'll tell you honestly whether we can help and what it would take.",
};

const details: [string, string, string?][] = [
  ["Email", "Prashant.Agarwal@threadandcore.com", "mailto:Prashant.Agarwal@threadandcore.com"],
  [
    "LinkedIn",
    "linkedin.com/company/threadandcore",
    "https://linkedin.com/company/threadandcore",
  ],
  ["Location", "R7,F-806,LIFE REPUBLIC BY KOLTE PATIL, MARUNJI, Pune, Maharashtra, India, 411057"],
  ["Availability", "Remote and onsite engagements, globally"],
];

export default function ContactPage() {
  return (
    <main className="container-site pt-40 pb-32">
      <p className="eyebrow mb-6">Start a Conversation</p>
      <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-core-white">
        Start a conversation.
      </h1>
      <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-secondary">
        Tell us what you&rsquo;re trying to build, or what&rsquo;s broken.
        We&rsquo;ll tell you honestly whether we can help and what it would
        take.
      </p>

      <dl className="mt-16 max-w-xl divide-y divide-hairline border-y border-hairline">
        {details.map(([label, value, href]) => (
          <div
            key={label}
            className="grid grid-cols-[130px_1fr] items-baseline gap-4 py-5"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
              {label}
            </dt>
            <dd className="font-mono text-[13.5px] text-fg">
              {href ? (
                <a
                  href={href}
                  className="transition-colors hover:text-thread-300"
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href="mailto:Prashant.Agarwal@threadandcore.com?subject=Start%20a%20conversation%20—%20Thread%20%26%20Core"
        className="btn-primary mt-12 inline-block"
      >
        Start a Conversation
      </a>
      <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-fg-muted uppercase">
        Direct to the architect — no sales layer.
      </p>
    </main>
  );
}
