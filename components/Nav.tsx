"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo/concepts";

const links: [string, string][] = [
  ["Framework", "/framework"],
  ["Work", "/work"],
  ["About", "/about"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-hairline bg-ink-950/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" aria-label="Thread & Core Systems — home">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-7">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="hidden font-mono text-[12px] uppercase tracking-[0.14em] text-fg-secondary transition-colors hover:text-core-white md:block"
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary px-4 py-2 text-[11px]">
            Start a Conversation
          </Link>
        </nav>
      </div>
    </header>
  );
}
