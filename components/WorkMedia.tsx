"use client";

import { useEffect, useState } from "react";

type Props = {
  type: "video" | "image";
  src: string;
  title: string;
};

/**
 * Demo media for a case: a video or screenshot in a hairline frame.
 * Probes the file first (a 404 can fire before hydration, so onError alone
 * is unreliable); until the file exists under /public, renders a styled
 * placeholder naming the exact path to drop it at.
 */
export default function WorkMedia({ type, src, title }: Props) {
  const [state, setState] = useState<"checking" | "ok" | "missing">(
    "checking",
  );

  useEffect(() => {
    let alive = true;
    fetch(src, { method: "HEAD" })
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
  }, [src]);

  if (state === "ok") {
    if (type === "video") {
      return (
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          onError={() => setState("missing")}
          className="aspect-video w-full rounded-[3px] border border-hairline bg-ink-950 object-cover"
          aria-label={`Demo video — ${title}`}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${title} — product screenshot`}
        loading="lazy"
        onError={() => setState("missing")}
        className="aspect-video w-full rounded-[3px] border border-hairline bg-ink-950 object-cover"
      />
    );
  }

  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[3px] border border-hairline bg-ink-950">
      {state === "missing" && (
        <>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 225"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M-20 ${30 + i * 45} C 120 ${20 + i * 48}, 260 ${45 + i * 40}, 420 ${25 + i * 46}`}
                fill="none"
                stroke="#D99A4E"
                strokeOpacity={0.1}
                strokeWidth={1}
              />
            ))}
          </svg>
          <div className="relative px-4 text-center">
            <p className="font-mono text-[10px] tracking-[0.18em] text-thread-500 uppercase">
              {type === "video" ? "Demo video" : "Screenshot"}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.06em] text-fg-muted">
              add file: public{src}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
