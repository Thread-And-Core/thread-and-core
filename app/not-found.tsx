import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-ink-950">
      <div className="container-site py-32 text-center">
        <svg
          viewBox="0 0 400 80"
          className="mx-auto mb-10 w-full max-w-md"
          aria-hidden="true"
        >
          <path
            d="M0 40 C 80 20, 160 60, 240 38 C 270 30, 290 34, 305 42"
            fill="none"
            stroke="#D99A4E"
            strokeWidth="1.5"
          />
          <path
            d="M305 42 C 315 48, 318 40, 326 46"
            fill="none"
            stroke="#D99A4E"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <path
            d="M305 42 C 312 38, 320 44, 324 36"
            fill="none"
            stroke="#D99A4E"
            strokeWidth="0.8"
            strokeOpacity="0.35"
          />
          <circle cx="370" cy="40" r="8" fill="none" stroke="#232A3A" strokeWidth="1.5" />
        </svg>
        <p className="font-mono text-[12px] tracking-[0.2em] text-thread-500">
          404
        </p>
        <h1 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.01em] text-core-white">
          This page never connected.
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-fg-secondary">
          The thread you followed doesn&rsquo;t reach the core. Let&rsquo;s
          take you back to one that does.
        </p>
        <Link href="/" className="btn-primary mt-9 inline-block">
          Back to the start
        </Link>
      </div>
    </main>
  );
}
