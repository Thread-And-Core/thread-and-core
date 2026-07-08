import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (every route prerenders — no server, no API routes,
  // no middleware). Exports plain HTML/CSS/JS to /out, deployable to any
  // static host (Netlify, Cloudflare Pages, S3, etc.) with zero server.
  output: "export",
  // Preview/verification servers use a separate build dir so they never
  // corrupt the main dev server's cache (multiple writers on one .next
  // breaks with "Cannot find module './NNN.js'" / missing _document.js).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
