"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo/concepts";

const links: [string, string][] = [
  ["Framework", "/framework"],
  ["Work", "/work"],
  ["About", "/about"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open
          ? "border-hairline bg-ink-950/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Thread & Core Systems — home">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-7">
          {links.map(([label, href]) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative hidden font-mono text-[12px] uppercase tracking-[0.14em] transition-colors md:block ${
                  active
                    ? "text-thread-300"
                    : "text-fg-secondary hover:text-core-white"
                }`}
              >
                {label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[5px] left-0 h-px w-full bg-thread-500"
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-primary hidden px-4 py-2 text-[11px] sm:inline-block"
          >
            Start a Conversation
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-fg transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-fg transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {open && (
        <nav className="border-t border-hairline bg-ink-950/95 backdrop-blur-md md:hidden">
          <div className="container-site flex flex-col py-4">
            {links.map(([label, href]) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`py-3 font-mono text-[13px] uppercase tracking-[0.14em] ${
                    active ? "text-thread-300" : "text-fg-secondary"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="btn-primary mt-3 mb-2 inline-block self-start px-4 py-2 text-[11px]"
            >
              Start a Conversation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
