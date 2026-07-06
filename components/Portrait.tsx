"use client";

import { useEffect, useState } from "react";

/**
 * Founder portrait — expects /public/prashant.jpg (use the LinkedIn photo
 * for cross-platform authenticity). Probes for the file and renders a
 * monogram placeholder until it exists.
 */
export default function Portrait({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"checking" | "ok" | "missing">(
    "checking",
  );

  useEffect(() => {
    let alive = true;
    fetch("/prashant.jpg", { method: "HEAD" })
      .then((r) => {
        const contentType = r.headers.get("content-type") || "";
        const ok = r.ok && !contentType.includes("text/html");
        if (alive) setState(ok ? "ok" : "missing");
      })
      .catch(() => {
        if (alive) setState("missing");
      });
    return () => {
      alive = false;
    };
  }, []);

  if (state === "ok") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/prashant.jpg"
        alt="Prashant Agarwal — SAP-certified BTP Solution Architect, founder of Thread & Core Systems"
        className={`h-48 w-48 rounded-[3px] border border-hairline object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-48 w-48 flex-col items-center justify-center rounded-[3px] border border-hairline bg-ink-800 ${className}`}
    >
      {state === "missing" && (
        <>
          <p className="font-display text-4xl font-bold text-thread-300">PA</p>
          <p className="mt-3 px-4 text-center font-mono text-[9px] leading-relaxed tracking-[0.1em] text-fg-muted uppercase">
            Add photo:
            <br />
            public/prashant.jpg
          </p>
        </>
      )}
    </div>
  );
}
