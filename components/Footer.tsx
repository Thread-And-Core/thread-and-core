import Link from "next/link";
import { Wordmark } from "@/components/logo/concepts";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink-950">
      <div className="container-site grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Wordmark />
          <p className="mt-4 font-editorial text-[1.05rem] italic text-thread-300">
            Connecting Every Thread to the Core.
          </p>
        </div>
        <div className="font-mono text-[12.5px] leading-7 tracking-[0.04em] text-fg-secondary">
          <a
            href="mailto:agarawal.prashant@gmail.com"
            className="block transition-colors hover:text-core-white"
          >
            agarawal.prashant@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/agarawal-prashant"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors hover:text-core-white"
          >
            linkedin.com/in/agarawal-prashant
          </a>
          <p>Pune, India</p>
          <p>Remote and onsite engagements, globally</p>
        </div>
        <nav className="font-mono text-[12.5px] leading-7 uppercase tracking-[0.12em] text-fg-secondary md:justify-self-end">
          {[
            ["Framework", "/framework"],
            ["Work", "/work"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block transition-colors hover:text-core-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-hairline">
        <div className="container-site flex flex-wrap items-center justify-between gap-2 py-5 font-mono text-[11px] tracking-[0.06em] text-fg-muted">
          <span>Thread and Core Systems Private Limited</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
