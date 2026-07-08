"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  /** Size and shape classes, e.g. "h-24 w-24 rounded-full". */
  sizeClassName?: string;
};

/**
 * Founder portrait — expects /public/prashant.jpg (use the LinkedIn photo
 * for cross-platform authenticity). Probes for the file and renders a
 * monogram placeholder until it exists.
 */
export default function Portrait({
  className = "",
  sizeClassName = "h-48 w-48 rounded-[3px]",
}: Props) {
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
        className={`border border-hairline object-cover ${sizeClassName} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center border border-hairline bg-ink-800 ${sizeClassName} ${className}`}
    >
      {state === "missing" && (
        <>
          <p className="font-display text-2xl font-bold text-thread-300">PA</p>
          <p className="mt-1 px-2 text-center font-mono text-[8px] leading-relaxed tracking-[0.08em] text-fg-muted uppercase">
            public/prashant.jpg
          </p>
        </>
      )}
    </div>
  );
}
