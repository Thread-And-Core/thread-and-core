"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { TREFOIL_PATH } from "@/components/logo/concepts";

const SCENES = [
  {
    title: "The Clean ERP Core",
    note: "S/4HANA stays standard — extensions live beside it.",
  },
  {
    title: "The AI Core",
    note: "Live data in. Predictions and decisions out.",
  },
  {
    title: "The Connected Stack",
    note: "Web to ERP to automation — one flow, no gaps.",
  },
];

const HOLD = 8; // seconds per scene

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ez = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

type DrawCtx = CanvasRenderingContext2D;

function halo(ctx: DrawCtx, x: number, y: number, r: number, a: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(217,154,78,${a})`);
  g.addColorStop(1, "rgba(217,154,78,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 7);
  ctx.fill();
}

function label(
  ctx: DrawCtx,
  mono: string,
  text: string,
  x: number,
  y: number,
  size = 9.5,
  color = "#9AA3B2",
  a = 1,
) {
  ctx.globalAlpha = a;
  ctx.fillStyle = color;
  ctx.font = `500 ${size}px ${mono}`;
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
}

/** Scene 1 — S/4HANA clean digital core, extensions docking beside it. */
function drawErpCore(ctx: DrawCtx, w: number, h: number, t: number, ts: number, mono: string) {
  const cx = w / 2;
  const cy = h / 2;
  halo(ctx, cx, cy, h * 0.32, 0.14 + 0.05 * Math.sin(t * 1.6));

  const cw = Math.min(w * 0.27, 170);
  const ch = h * 0.22;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#131722";
  ctx.strokeStyle = "#F0C987";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cx - cw / 2, cy - ch / 2, cw, ch, 4);
  ctx.fill();
  ctx.stroke();
  label(ctx, mono, "S/4HANA", cx, cy - 2, 12, "#EDE7DC");
  label(ctx, mono, "CLEAN DIGITAL CORE", cx, cy + 15, 7.5, "#5D6675");

  const EXT = ["FIORI APP", "CAP SERVICE", "WORKFLOW", "ANALYTICS"];
  const bw = Math.min(w * 0.21, 130);
  const bh = h * 0.15;
  for (let i = 0; i < 4; i++) {
    const px = i % 2 ? 1 : -1;
    const py = i < 2 ? -1 : 1;
    const p = ez((ts - 0.5 - i * 0.55) / 0.9);
    if (p <= 0) continue;
    const ex = cx + px * lerp(w * 0.46, w * 0.32, p);
    const ey = cy + py * lerp(h * 0.44, h * 0.32, p);

    const sx = cx + px * (cw / 2);
    const sy = cy + py * (ch / 2);
    ctx.globalAlpha = p * 0.5;
    ctx.strokeStyle = "#D99A4E";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(lerp(sx, ex, p), lerp(sy, ey, p));
    ctx.stroke();

    ctx.globalAlpha = p;
    ctx.fillStyle = "#0C0F16";
    ctx.strokeStyle = "#232A3A";
    ctx.beginPath();
    ctx.roundRect(ex - bw / 2, ey - bh / 2, bw, bh, 3);
    ctx.fill();
    ctx.stroke();
    label(ctx, mono, EXT[i], ex, ey + 3.5, 8.5, "#D99A4E", p);

    if (p >= 1) {
      const q = (t * 0.4 + i * 0.25) % 1;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#F0C987";
      ctx.beginPath();
      ctx.arc(lerp(ex, sx, q), lerp(ey, sy, q), 1.8, 0, 7);
      ctx.fill();
    }
  }
}

/** Scene 2 — the AI core: data streams in, predictions and decisions out. */
function drawAiCore(ctx: DrawCtx, w: number, h: number, t: number, ts: number, mono: string) {
  const cx = w * 0.44;
  const cy = h * 0.5;
  const R = h * 0.11;
  const born = ez(ts / 0.9);
  halo(ctx, cx, cy, h * 0.3, 0.18 * born);

  // data streaming in from the left
  const inY = [h * 0.3, h * 0.5, h * 0.7];
  for (let i = 0; i < 3; i++) {
    const p = ez((ts - 0.3 - i * 0.2) / 0.8);
    if (p <= 0) continue;
    ctx.globalAlpha = p * 0.16;
    ctx.strokeStyle = "#D99A4E";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.06, inY[i]);
    ctx.lineTo(cx - R - 6, lerp(inY[i], cy, 0.82));
    ctx.stroke();
    for (let d = 0; d < 2; d++) {
      const q = (t * 0.45 + i * 0.3 + d * 0.5) % 1;
      ctx.globalAlpha = p * (0.3 + q * 0.6);
      ctx.fillStyle = "#D99A4E";
      ctx.beginPath();
      ctx.arc(
        lerp(w * 0.06, cx - R - 6, q),
        lerp(inY[i], lerp(inY[i], cy, 0.82), q),
        1.7,
        0,
        7,
      );
      ctx.fill();
    }
  }
  label(ctx, mono, "LIVE DATA", w * 0.13, h * 0.2, 8.5, "#5D6675", born);

  // the core
  ctx.globalAlpha = born;
  ctx.fillStyle = "#D99A4E";
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, 7);
  ctx.fill();
  ctx.strokeStyle = "#F0C987";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, 7);
  ctx.stroke();
  ctx.globalAlpha = born * 0.35;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.7, 0, 7);
  ctx.stroke();
  // thinking dots orbiting
  for (let d = 0; d < 3; d++) {
    const ang = t * 1.1 + (d * Math.PI * 2) / 3;
    ctx.globalAlpha = born * 0.9;
    ctx.fillStyle = "#F0C987";
    ctx.beginPath();
    ctx.arc(cx + Math.cos(ang) * R * 1.7, cy + Math.sin(ang) * R * 0.75, 1.8, 0, 7);
    ctx.fill();
  }
  label(ctx, mono, "AI CORE", cx, cy + R + 22, 9.5, "#9AA3B2", born);

  // outputs: predict & decide
  const outs: [number, number, string][] = [
    [w * 0.84, h * 0.32, "PREDICT"],
    [w * 0.84, h * 0.68, "DECIDE"],
  ];
  for (let k = 0; k < 2; k++) {
    const [ox, oy, name] = outs[k];
    const p = ez((ts - 1.2 - k * 0.3) / 0.9);
    if (p <= 0) continue;
    const sx = cx + R;
    const sy = lerp(cy, oy, 0.15);
    ctx.globalAlpha = p * 0.35;
    ctx.strokeStyle = "#D99A4E";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo((sx + ox) / 2 + 20, oy, ox - 12, oy);
    ctx.stroke();

    const q = (t * 0.5 + k * 0.45) % 1;
    const u = 1 - q;
    const qx = (sx + ox) / 2 + 20;
    ctx.globalAlpha = p;
    ctx.fillStyle = "#F0C987";
    ctx.beginPath();
    ctx.arc(
      u * u * sx + 2 * u * q * qx + q * q * (ox - 12),
      u * u * sy + 2 * u * q * oy + q * q * oy,
      1.8,
      0,
      7,
    );
    ctx.fill();

    const flash = q > 0.85 ? (q - 0.85) / 0.15 : 0;
    ctx.globalAlpha = p;
    ctx.fillStyle = "#131722";
    ctx.strokeStyle = flash > 0 ? "#F0C987" : "#D99A4E";
    ctx.lineWidth = 1 + flash;
    ctx.beginPath();
    ctx.arc(ox, oy, 8, 0, 7);
    ctx.fill();
    ctx.stroke();
    label(ctx, mono, name, ox, oy - 18, 9.5, flash > 0 ? "#F0C987" : "#9AA3B2", p);
  }
}

const STACK: [string, number, number][] = [
  ["WEB", 0.15, 0.26],
  ["MOBILE", 0.5, 0.16],
  ["APIs", 0.85, 0.26],
  ["ERP", 0.2, 0.74],
  ["DATA", 0.54, 0.84],
  ["AUTOMATION", 0.85, 0.7],
];
const STACK_LINKS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 5],
  [3, 4],
  [4, 5],
  [1, 4],
];

/** Scene 3 — the full stack, every component connected and flowing. */
function drawConnectedStack(ctx: DrawCtx, w: number, h: number, t: number, ts: number, mono: string) {
  const pts = STACK.map(([, fx, fy]) => [fx * w, fy * h] as [number, number]);

  for (let k = 0; k < STACK_LINKS.length; k++) {
    const p = ez((ts - 0.3 - k * 0.16) / 1);
    if (p <= 0) continue;
    const [ai, bi] = STACK_LINKS[k];
    const [ax, ay] = pts[ai];
    const [bx, by] = pts[bi];
    const mx = (ax + bx) / 2 + (k % 2 ? 16 : -16);
    const my = (ay + by) / 2 + (k % 2 ? -12 : 12);
    const len = Math.hypot(bx - ax, by - ay) * 1.15;
    ctx.globalAlpha = p * 0.4;
    ctx.strokeStyle = "#D99A4E";
    ctx.lineWidth = 1;
    ctx.setLineDash([len * p, 9999]);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.stroke();
    ctx.setLineDash([]);

    if (p >= 1) {
      const q = (t * 0.28 + k * 0.17) % 1;
      const u = 1 - q;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#F0C987";
      ctx.beginPath();
      ctx.arc(
        u * u * ax + 2 * u * q * mx + q * q * bx,
        u * u * ay + 2 * u * q * my + q * q * by,
        1.7,
        0,
        7,
      );
      ctx.fill();
    }
  }

  STACK.forEach(([name, fx, fy], i) => {
    const x = fx * w;
    const y = fy * h;
    const p = ez((ts - i * 0.12) / 0.7);
    if (p <= 0) return;
    ctx.globalAlpha = p;
    ctx.fillStyle = "#131722";
    ctx.strokeStyle = "#D99A4E";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, 7);
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = p * 0.9;
    ctx.fillStyle = "#F0C987";
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, 7);
    ctx.fill();
    label(ctx, mono, name, x, y + 26, 8.5, "#9AA3B2", p);
  });
}

const DRAW = [drawErpCore, drawAiCore, drawConnectedStack];

export default function CoreScenes({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const switchAtRef = useRef(0);
  const nowRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const select = (i: number) => {
    activeRef.current = i;
    switchAtRef.current = nowRef.current;
    setActive(i);
  };

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-jetbrains")
        .trim() || "monospace";
    const knot = new Path2D(TREFOIL_PATH);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = cv.parentElement?.clientWidth || 480;
      h = Math.min(340, Math.round(w * 0.68));
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (cv.parentElement) ro.observe(cv.parentElement);

    const frame = (t: number, ts: number) => {
      ctx.fillStyle = "#080A0F";
      ctx.fillRect(0, 0, w, h);
      try {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "1px";
      } catch {}
      DRAW[activeRef.current](ctx, w, h, t, ts, mono);
      const fade = 1 - ez(ts / 0.6);
      if (fade > 0) {
        ctx.globalAlpha = fade;
        ctx.fillStyle = "#080A0F";
        ctx.fillRect(0, 0, w, h);
      }
      // brand signature — constant across scenes
      ctx.save();
      ctx.translate(w - 54, h - 54);
      ctx.scale(0.9, 0.9);
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = "#D99A4E";
      ctx.lineWidth = 2.2;
      ctx.lineJoin = "round";
      ctx.stroke(knot);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#F0C987";
      ctx.beginPath();
      ctx.arc(24, 24.6, 3.1, 0, 7);
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.textAlign = "left";
    };

    if (reduced) {
      frame(6, 6);
      const id = setInterval(() => frame(6, 6), 400);
      return () => {
        clearInterval(id);
        ro.disconnect();
      };
    }

    let raf = 0;
    let running = false;
    const loop = (ms: number) => {
      const t = ms / 1000;
      nowRef.current = t;
      if (!switchAtRef.current) switchAtRef.current = t;
      if (t - switchAtRef.current > HOLD) {
        const next = (activeRef.current + 1) % SCENES.length;
        activeRef.current = next;
        switchAtRef.current = t;
        setActive(next);
      }
      frame(t, t - switchAtRef.current);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(cv);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <div
      className={`overflow-hidden rounded-[3px] border border-hairline bg-ink-950 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full"
        aria-label={`Animated scene: ${SCENES[active].title} — ${SCENES[active].note}`}
        role="img"
      />
      <div className="flex items-center justify-between gap-4 border-t border-hairline px-4 py-3">
        <p className="font-mono text-[10.5px] leading-relaxed tracking-[0.08em] text-fg-secondary uppercase">
          <span className="text-thread-300">{SCENES[active].title}</span>
          <span className="hidden sm:inline"> · {SCENES[active].note}</span>
        </p>
        <div className="flex shrink-0 gap-2">
          {SCENES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show scene: ${s.title}`}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                active === i ? "bg-thread-300" : "bg-ink-700 hover:bg-fg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
