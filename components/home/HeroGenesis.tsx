"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoreSphere from "@/components/CoreSphere";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const map = (t: number, a: number, b: number) => clamp((t - a) / (b - a), 0, 1);
const ez = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

const WORDS: [string, number, number][] = [
  ["DATA", 0.15, 0.2],
  ["PROCESSES", 0.8, 0.16],
  ["APPLICATIONS", 0.14, 0.64],
  ["INTELLIGENCE", 0.84, 0.68],
  ["PEOPLE", 0.33, 0.86],
  ["DECISIONS", 0.67, 0.87],
];

const PAIRS = [
  [0, 1],
  [1, 3],
  [3, 5],
  [5, 4],
  [4, 2],
  [2, 0],
  [0, 3],
];

function quadPoint(
  ax: number,
  ay: number,
  qx: number,
  qy: number,
  bx: number,
  by: number,
  p: number,
): [number, number] {
  const u = 1 - p;
  return [
    u * u * ax + 2 * u * p * qx + p * p * bx,
    u * u * ay + 2 * u * p * qy + p * p * by,
  ];
}

function HeroCopy({ itemClass }: { itemClass: string }) {
  return (
    <>
      <p className={`eyebrow mb-5 ${itemClass}`} data-i="0">
        Thread &amp; Core Systems Pvt Ltd
      </p>
      <h1
        className={`text-[clamp(2.3rem,5.4vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-core-white ${itemClass}`}
        data-i="1"
      >
        Technology doesn&rsquo;t transform businesses.
      </h1>
      <p
        className={`mt-4 font-editorial text-[clamp(1.6rem,3vw,2.4rem)] italic text-thread-300 ${itemClass}`}
        data-i="2"
      >
        Connection does.
      </p>
      <p
        className={`mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-secondary ${itemClass}`}
        data-i="3"
      >
        Every enterprise runs on invisible threads: processes, applications,
        data, people, and intelligence. We help connect those threads to the
        core, creating systems that scale, adapt, and endure.
      </p>
      <div className={`mt-8 flex flex-wrap gap-4 ${itemClass}`} data-i="4">
        <Link href="/contact" className="btn-primary">
          Start a Conversation
        </Link>
        <Link href="/framework" className="btn-ghost">
          Explore Our Framework
        </Link>
      </div>
    </>
  );
}

export default function HeroGenesis() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sentenceRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const cv = canvasRef.current;
    const sentence = sentenceRef.current;
    const hero = heroRef.current;
    if (!root || !cv || !sentence || !hero) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-jetbrains")
        .trim() || "monospace";

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const dust = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0002,
      a: 0.04 + Math.random() * 0.1,
      r: 0.6 + Math.random() * 1.2,
    }));

    const N = 620;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(1 - y * y);
      return {
        x: Math.cos(golden * i) * r,
        y,
        z: Math.sin(golden * i) * r,
        a: Math.random() * Math.PI * 2,
        d: 0.3 + 0.35 * Math.random(),
        s: Math.random(),
      };
    });

    const heroItems = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-i]"),
    );

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
    });

    const render = (p: number, tm: number) => {
      const desktop = w >= 768;
      ctx.fillStyle = "#080A0F";
      ctx.fillRect(0, 0, w, h);

      for (const d of dust) {
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;
        ctx.globalAlpha = d.a;
        ctx.fillStyle = "#D99A4E";
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, 7);
        ctx.fill();
      }

      ctx.strokeStyle = "#D99A4E";
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        ctx.globalAlpha = 0.05;
        const fy = h * (0.2 + 0.3 * j);
        ctx.beginPath();
        ctx.moveTo(-40, fy + Math.sin(tm * 0.2 + j * 2) * 16);
        ctx.bezierCurveTo(
          w * 0.33,
          fy + Math.sin(tm * 0.26 + j) * 34,
          w * 0.66,
          fy - Math.sin(tm * 0.22 + j * 1.4) * 30,
          w + 40,
          fy + Math.cos(tm * 0.18 + j) * 18,
        );
        ctx.stroke();
      }

      const drift = ez(map(p, 0.78, 0.9));
      const cx = w * (desktop ? lerp(0.5, 0.72, drift) : 0.5);
      const cy = h * (desktop ? 0.5 : lerp(0.44, 0.32, drift));

      const tr = lerp(150, 12, ez(map(p, 0.44, 0.6)));
      const wp = WORDS.map(([, fx, fy], i) => {
        const appear = ez(map(p, 0.08 + i * 0.025, 0.15 + i * 0.025));
        const sx = fx * w + Math.sin(tm * 0.6 + i * 1.7) * 5;
        const sy = fy * h + Math.cos(tm * 0.5 + i) * 4;
        const cvg = ez(map(p, 0.3, 0.52));
        const ang = Math.atan2(sy - cy, sx - cx);
        return {
          x: lerp(sx, cx + Math.cos(ang) * tr, cvg),
          y: lerp(sy, cy + Math.sin(ang) * tr, cvg),
          al: appear * (1 - map(p, 0.5, 0.62)),
        };
      });

      const la = 1 - map(p, 0.54, 0.66);
      if (la > 0) {
        for (let k = 0; k < PAIRS.length; k++) {
          const pr = ez(map(p, 0.24 + k * 0.025, 0.36 + k * 0.025));
          if (pr <= 0) continue;
          const A = wp[PAIRS[k][0]];
          const B = wp[PAIRS[k][1]];
          if (A.al <= 0 || B.al <= 0) continue;
          const ay = A.y + 15;
          const by = B.y + 15;
          const mx = (A.x + B.x) / 2;
          const my = (ay + by) / 2;
          const dx = B.x - A.x;
          const dy = by - ay;
          const nl = Math.hypot(dx, dy) || 1;
          const off = 26 * Math.sin(k * 2.1 + 1);
          const qx = mx + (dy / nl) * off;
          const qy = my - (dx / nl) * off;
          ctx.globalAlpha = pr * la * 0.7;
          ctx.setLineDash([nl * 1.15 * pr, 99999]);
          ctx.beginPath();
          ctx.moveTo(A.x, ay);
          ctx.quadraticCurveTo(qx, qy, B.x, by);
          ctx.stroke();
          ctx.setLineDash([]);
          if (pr < 1) {
            const [hx, hy] = quadPoint(A.x, ay, qx, qy, B.x, by, pr);
            ctx.globalAlpha = la;
            ctx.fillStyle = "#F0C987";
            ctx.beginPath();
            ctx.arc(hx, hy, 1.8, 0, 7);
            ctx.fill();
          }
        }
      }

      /* eslint-disable @typescript-eslint/no-explicit-any */
      try {
        (ctx as any).letterSpacing = "3px";
      } catch {}
      ctx.font = `500 ${desktop ? 15 : 12.5}px ${mono}`;
      ctx.textAlign = "center";
      for (let i = 0; i < wp.length; i++) {
        const word = wp[i];
        if (word.al <= 0) continue;
        ctx.globalAlpha = word.al;
        ctx.fillStyle = "#EDE7DC";
        ctx.fillText(WORDS[i][0], word.x, word.y);
        const dotY = word.y + 15;
        const pulse = 0.55 + 0.35 * Math.sin(tm * 2 + i * 1.3);
        ctx.globalAlpha = word.al * pulse;
        ctx.fillStyle = "#F0C987";
        ctx.beginPath();
        ctx.arc(word.x, dotY, 2, 0, 7);
        ctx.fill();
        const tail = 1 - map(p, 0.2, 0.28);
        if (tail > 0) {
          const dirX = word.x < cx ? -1 : 1;
          ctx.globalAlpha = word.al * 0.35 * tail;
          ctx.strokeStyle = "#D99A4E";
          ctx.beginPath();
          ctx.moveTo(word.x, dotY);
          ctx.quadraticCurveTo(
            word.x + 16 * dirX * tail,
            dotY + 10 * tail,
            word.x + 30 * dirX * tail,
            dotY + 4 * tail + 5 * Math.sin(tm + i * 2),
          );
          ctx.stroke();
        }
      }
      try {
        (ctx as any).letterSpacing = "0px";
      } catch {}

      const grow = ez(map(p, 0.5, 0.7));
      if (grow > 0 || p >= 0.5) {
        const Rmax = Math.min(w, h) * 0.21;
        let R = lerp(24, Rmax, grow);
        if (desktop) R = lerp(R, 118, drift);
        else R = lerp(R, Math.min(w, h) * 0.16, drift);

        const halo = 0.2 * ez(map(p, 0.52, 0.72));
        if (halo > 0) {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.95);
          g.addColorStop(0, `rgba(217,154,78,${halo})`);
          g.addColorStop(1, "rgba(217,154,78,0)");
          ctx.globalAlpha = 1;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, R * 1.95, 0, 7);
          ctx.fill();
        }

        const yaw = tm * 0.35;
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const spread = Math.min(w, h);
        for (const pt of pts) {
          const fp = ez(map(p, 0.5 + pt.s * 0.13, 0.68 + pt.s * 0.13));
          if (fp <= 0) continue;
          const xr = pt.x * cosY + pt.z * sinY;
          const zr = -pt.x * sinY + pt.z * cosY;
          const px = cx + xr * R;
          const py = cy + pt.y * R * 0.97;
          const X = lerp(cx + Math.cos(pt.a) * pt.d * spread, px, fp);
          const Y = lerp(cy + Math.sin(pt.a) * pt.d * spread, py, fp);
          const depth = (zr + 1) / 2;
          ctx.globalAlpha = fp * (0.12 + 0.8 * depth);
          ctx.fillStyle = depth > 0.55 ? "#F0C987" : "#D99A4E";
          const sz = 0.9 + 1.4 * depth;
          ctx.fillRect(X, Y, sz, sz);
        }

        const ca = map(p, 0.64, 0.72) * (1 - map(p, 0.8, 0.86));
        if (ca > 0) {
          ctx.globalAlpha = 0.72 * ca;
          ctx.fillStyle = "#080A0F";
          ctx.beginPath();
          ctx.arc(cx, cy, 30, 0, 7);
          ctx.fill();
          ctx.globalAlpha = ca;
          ctx.fillStyle = "#FFF6E9";
          try {
            (ctx as any).letterSpacing = "5px";
          } catch {}
          ctx.font = `500 13px ${mono}`;
          ctx.fillText("CORE", cx + 3, cy + 4);
          try {
            (ctx as any).letterSpacing = "0px";
          } catch {}
        }

        // feeder threads: once the core exists, the enterprise keeps
        // flowing into it — persists through the resolved hero state
        const fa = map(p, 0.7, 0.82);
        if (fa > 0) {
          const anchors: [number, number][] = [
            [-20, h * 0.12],
            [w + 20, h * 0.06],
            [-20, h * 0.88],
            [w + 20, h * 0.8],
            [w * 0.35, -20],
          ];
          ctx.lineWidth = 0.9;
          for (let j = 0; j < anchors.length; j++) {
            const [ax2, ay2] = anchors[j];
            const ddx = cx - ax2;
            const ddy = cy - ay2;
            const dl = Math.hypot(ddx, ddy) || 1;
            const ex = cx - (ddx / dl) * R * 1.02;
            const ey = cy - (ddy / dl) * R * 1.02;
            const qx2 = (ax2 + ex) / 2 + (j % 2 ? 70 : -70);
            const qy2 = (ay2 + ey) / 2 + (j % 2 ? -50 : 50);
            ctx.globalAlpha = fa * 0.28;
            ctx.strokeStyle = "#D99A4E";
            ctx.beginPath();
            ctx.moveTo(ax2, ay2);
            ctx.quadraticCurveTo(qx2, qy2, ex, ey);
            ctx.stroke();
            const q = (tm * 0.16 + j * 0.21) % 1;
            const [px2, py2] = quadPoint(ax2, ay2, qx2, qy2, ex, ey, q);
            ctx.globalAlpha = fa * 0.85;
            ctx.fillStyle = "#F0C987";
            ctx.beginPath();
            ctx.arc(px2, py2, 1.7, 0, 7);
            ctx.fill();
          }
          ctx.lineWidth = 1;
        }
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const loop = (t: number) => {
      const p = st.progress;
      if (st.isActive || (p > 0 && p < 1) || t < 2000) {
        render(p, t / 1000);
        sentence.style.opacity = String(
          p < 0.03 ? 1 : 1 - map(p, 0.03, 0.09),
        );
        for (let i = 0; i < heroItems.length; i++) {
          const q = ez(map(p, 0.84 + i * 0.018, 0.92 + i * 0.018));
          heroItems[i].style.opacity = String(q);
          heroItems[i].style.transform = `translateY(${(1 - q) * 26}px)`;
        }
        hero.style.pointerEvents = p > 0.88 ? "auto" : "none";
      } else if (p >= 1) {
        // keep the resolved hero interactive and softly rotating, and make
        // sure the final overlay state holds even after a fast scroll jump
        render(1, t / 1000);
        sentence.style.opacity = "0";
        for (const item of heroItems) {
          item.style.opacity = "1";
          item.style.transform = "none";
        }
        hero.style.pointerEvents = "auto";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-ink-950">
        <div className="container-site flex min-h-[70vh] items-center justify-center">
          <p className="max-w-2xl text-center text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-snug text-core-white">
            Every enterprise runs on thousands of invisible threads.
          </p>
        </div>
        <div className="container-site flex min-h-screen items-center">
          <div className="grid w-full items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <HeroCopy itemClass="" />
            </div>
            <div className="mx-auto hidden md:block">
              <CoreSphere size={340} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative h-[340vh] bg-ink-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        <div
          ref={sentenceRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <p className="max-w-2xl text-center text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-snug text-core-white">
            Every enterprise runs on thousands of invisible threads.
          </p>
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <span className="font-mono text-[10.5px] tracking-[0.3em] text-fg-muted">
              SCROLL
            </span>
            <span className="cue-line" />
          </div>
        </div>

        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-0 flex items-end pt-24 pb-14 md:items-center md:pt-20 md:pb-0"
        >
          <div className="container-site">
            <div className="max-w-2xl">
              <HeroCopy itemClass="hg-item" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
