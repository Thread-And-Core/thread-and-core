# Thread & Core Systems — Website Design & Build Strategy

This document is the single source of truth for designing and building threadandcore.com.
It builds on two upstream briefs (brand context + website experience prompt) and adds
everything they intentionally left out: the visual concept, color system, typography,
motion grammar, layout system, tech stack, and build plan — plus a few deliberate
improvements over the brief.

---

## 1. The Creative Concept: "The Loom"

One idea governs the entire site:

> **The website is a single continuous thread. The visitor's scroll is the hand that
> draws it. Every section is a point where the thread stitches something into place.
> The thread ends at the Core.**

This is not decoration — it is the information architecture made visible. The brand
promise ("Connecting Every Thread to the Core") is *performed* by the site rather than
stated by it. A visitor who never reads a paragraph still understands the company name
by the time they reach the contact section.

Practical form: a persistent SVG "spine" — a thin luminous thread that runs down the
page, drawn progressively by scroll position (stroke-dashoffset scrub). It weaves left
and right around content, pauses and knots at section boundaries, lights up nodes as it
passes them, and finally plunges into a glowing Core sphere beside the contact CTA.
It doubles as a progress indicator, so it earns its place functionally too.

### Why this beats a generic "animated agency site"
- Every animation on the site derives from one motif, so motion feels authored, not assembled.
- The metaphor is literal: thread → connection → core. No explanation needed.
- It scales down gracefully: on mobile the thread runs as a simple vertical spine;
  with reduced motion it renders as a static stitched line.

### Language discipline: show, don't say

The words **thread** and **core** are the brand's most valuable asset — and the easiest
to devalue. If every heading repeats them, they become wallpaper and the metaphor dies.
The rule: **the motif says it, the copy doesn't.**

- **Budget:** outside the wordmark, navigation, and footer, each word may appear at
  display size (H1/H2/label) at most once per section — and most sections use neither.
- **Sanctioned prominent uses on the homepage (the only three):**
  1. The hero brand line — *"Connecting Every Thread to the Core."*
  2. The manifesto body — where the belief is stated.
  3. The pre-hero's `CORE` naming moment inside the sphere — the one place the site
     *teaches* the word.
  (`/framework` earns one more: the philosophy block where Threads and Core are defined
  as terms of art.)
- **Heading rewrites vs. the original brief:**
  - Capabilities: ~~"Five threads. One architecture."~~ → **"Five disciplines. One
    architecture."** Cards are named Business / Technology / Intelligence / Integration /
    Experience (not "Business Thread" etc.) — each card's woven line signature says
    "thread" visually.
  - Industries: ~~"The core of every engagement is the business."~~ →
    **"Every engagement is anchored in the business."**
  - Framework teaser subcopy: ~~"Five phases. One continuous thread."~~ →
    "Five phases. One continuous method." (the diagram *shows* the thread).
  - Contact: the spine-into-sphere visual carries the metaphor; the copy stays purely
    practical.

Everywhere else the design carries the idea — spine, knots, nodes, woven tiles, the
sphere — while copy speaks plain business language: connection, architecture, method,
systems that endure.

---

## 2. Color System: "Ink & Copper"

The experience brief explicitly warns: *"Do not rely only on faint blue lines on
black."* Every enterprise-tech site is blue-on-black. We go the other way — the thread
is rendered as what a thread actually is: **warm, metallic, physical**. Copper and
warm gold on deep ink. It reads as textile thread, as kintsugi, as copper wire — craft
and engineering in one image. Nobody in enterprise consulting looks like this.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--ink-950` | `#080A0F` | Page background (deepest — pre-hero, contact) |
| `--ink-900` | `#0C0F16` | Default section background |
| `--ink-800` | `#131722` | Raised surfaces: cards, tiles, code blocks |
| `--ink-700` | `#1C2230` | Hover surfaces, active card state |
| `--hairline` | `#232A3A` | Borders, dividers, grid lines (1px only) |
| `--thread-500` | `#D99A4E` | Copper — the thread itself, primary accent |
| `--thread-300` | `#F0C987` | Bright copper — thread highlights, active nodes |
| `--thread-glow` | `#FFDFA8` | Glow color (used only via layered strokes/shadows) |
| `--core-white` | `#FFF6E9` | The Core's inner light; also headline color at full strength |
| `--text-primary` | `#EDE7DC` | Warm off-white body headings |
| `--text-secondary` | `#9AA3B2` | Body copy, supporting text |
| `--text-muted` | `#5D6675` | Captions, meta, disabled |
| `--slate-accent` | `#7FA6B8` | Sparingly: tech tags, data points, mono labels. Never for the thread. |

### Rules
1. **Only the thread and the Core glow.** Nothing else on the site emits light.
   This discipline is what makes the Core feel meaningful when it appears.
2. **Copper is earned, not sprayed.** Backgrounds and surfaces are strictly ink-neutral;
   copper appears only as line, node, glow, and key interactive states. Target ratio:
   ~95% ink/neutral, ~4% copper, ~1% slate.
3. **No gradients on surfaces.** Gradients live only inside the thread stroke and the
   Core sphere. Cards and sections are flat ink with hairline borders — this is what
   "premium, not decorative" looks like in practice.
4. **Warm white headlines.** `--core-white` for H1/H2 gives the type the same warmth
   as the thread without using color.

### Accessibility
- `--text-secondary` on `--ink-900` ≈ 7.5:1 — passes AAA for body.
- `--thread-500` on ink is decorative/large-text only; interactive copper elements get
  `--thread-300` (≥ 4.5:1) or an underline/border affordance.

---

## 3. Typography: Three Voices

The brand speaks in three registers — architect (headlines), believer (manifesto),
engineer (labels/metrics). Give each its own voice:

| Voice | Typeface | Usage |
|---|---|---|
| **Display** | **Satoshi** (Fontshare, free commercial license) — weights 500/700 | Headlines, nav, CTAs, card titles. Sharp modern grotesk with enough character to avoid the Inter-everywhere look. |
| **Editorial** | **Fraunces** (Google Fonts) — italic, optical size axis | Manifesto, phase questions ("What cannot fail?"), pull-quotes only. The "short film" voice. Used ~5 times across the whole site so it stays special. |
| **Technical** | **JetBrains Mono** (free) — 400/500, uppercase, +8% tracking | Eyebrows, section labels, metrics, tech tags, the six thread words in the pre-hero. Quietly signals thread-as-unit-of-execution. |

### Scale (fluid, clamp-based)
- H1 (hero): `clamp(2.6rem, 6.5vw, 5.5rem)`, Satoshi 700, -2% tracking, 1.02 line-height
- H2 (section): `clamp(2rem, 4vw, 3.25rem)`
- Manifesto line: `clamp(1.6rem, 3.2vw, 2.6rem)`, Fraunces italic 300
- Body: `1.0625rem / 1.7`, max measure 62ch
- Eyebrow/label: `0.8125rem`, mono uppercase
- Metric numerals: Satoshi 700, tabular, `clamp(2.5rem, 5vw, 4rem)`

All fonts self-hosted (woff2, subset), `font-display: swap`, preloaded. Zero third-party
font requests.

---

## 4. Motion Grammar

Five rules keep every animation coherent. Any animation that breaks a rule gets cut.

1. **Draw, don't fade.** Lines draw in (stroke-dashoffset). Text reveals by line-mask
   (rises out of an invisible baseline). Plain opacity fades are the fallback, never
   the default.
2. **One axis.** Everything enters along the thread's direction of travel at that
   point in the page. Motion always has a reason to move the way it moves.
3. **One ease.** `cubic-bezier(0.16, 1, 0.3, 1)` ("silk") for entrances, 0.6–1.1s.
   Scroll-scrubbed elements (the spine, the pre-hero) have no duration — they map 1:1
   to scroll, so the visitor is always in control.
4. **Glow discipline.** Glows are pre-baked as layered SVG strokes (wide transparent
   copper under a thin bright core stroke), not runtime CSS `filter: blur()` — sharper
   and dramatically cheaper to composite.
5. **The site must work frozen.** Every section is designed static-first; motion is
   applied on top. `prefers-reduced-motion` gets the fully-stitched thread as a static
   line, a static Core, and simple fades. Nothing is content-gated behind animation.

### Performance budget
- Animate `transform`/`opacity`/`stroke-dashoffset` only. No layout-triggering animation.
- The Core sphere: Canvas 2D particle system (~1,000–1,500 points on desktop, ~500
  mobile), rendered only while in viewport. **No Three.js/WebGL at launch** — a 2D
  particle sphere with depth-sorted alpha reads beautifully and costs ~0 bundle weight.
- JS budget ≤ 180KB gzipped total. LCP < 1.8s, CLS ≈ 0. The pre-hero's opening
  sentence is server-rendered text — visible before any JS loads (the brief's
  "first view is never blank" rule, guaranteed structurally).

### Award-level polish checklist

What separates "nice scroll site" from award-shortlist work is continuity and detail:

- **Continuity over transitions.** The pre-hero sphere physically travels into the hero
  (shared element) — no hard cuts anywhere; the spine bridges every section boundary.
- **No preloader.** Server-rendered first paint beats every preloader ever built. The
  site is readable in under a second and *then* reveals its depth.
- **Text reveals** by line-mask with 60–80ms stagger; play once, never re-trigger.
- **Buttons:** magnetic hover (≤6px pull), copper border-trace on hover and focus.
- **Scroll feel:** Lenis lerp ≈ 0.09; scrubbed elements catch up over ~0.8s so the
  thread feels like it has physical weight and inertia.
- **The detail drawer** (what judges screenshot): copper text-selection color, knot
  favicon, the spine doubling as scroll progress, a 404 page with a single loose thread
  ("This page never connected."), custom OG images per route.
- **Judge-proofing:** 60fps on a mid-tier laptop, no scroll-hijack outside the two
  pinned sequences (pre-hero, framework), complete keyboard and reduced-motion paths.

---

## 5. A Deliberate Upgrade: Code-Drawn Visuals Instead of AI Video

The experience brief suggests three 8-second AI-generated video loops. **Recommendation:
replace all three with code-drawn canvas/SVG scenes at launch.**

Why this is better:
- **Sharper.** Vector/canvas is retina-crisp at any size; AI video loops are soft,
  compressed, and visibly "AI" to a senior buyer in 2026.
- **On-palette by construction.** The visuals use the exact token colors — no color
  grading mismatch between video and UI.
- **~50KB of code vs ~15MB of video.** Massive LCP and mobile win.
- **Alive, not looped.** Canvas scenes can respond subtly to scroll and cursor;
  an 8s loop repeats visibly within one reading of the hero copy.

Mapping:
- *Clip 1 (Thread Genesis)* → the pre-hero scroll sequence itself (Section 7 below).
- *Clip 2 (Connected Enterprise)* → the framework diagram's living thread.
- *Clip 3 (The Core)* → the canvas Core sphere, reused at pre-hero climax and contact.

Industry tiles likewise launch as **generative "thread-woven" SVG artwork per industry**
(each tile gets a distinct woven line pattern + mono label) rather than AI photo stills.
Cinematic photography can be slotted in post-launch if desired — the tile component
takes an optional image without redesign.

### The visual vocabulary (what "code-drawn" actually looks like)

Three ingredients, reused everywhere so the whole site feels made of one material:

1. **Fibers** — long catenary curves drawn as layered strokes (a wide 8%-alpha copper
   stroke under a 1px bright core) that drift slowly, like filament in air. Every fiber
   has a direction and a destination — never a random plexus/mesh cliché.
2. **Dust** — sparse copper particles at 5–15% alpha that give the ink depth and air.
3. **The Core** — a Fibonacci-sphere particle body (~700 depth-shaded points, slow
   rotation, warm halo) that assembles itself out of incoming fibers. It reads as
   intelligence formed from connection — the brand belief, drawn literally.

A working motion prototype of the Thread Genesis sequence (canvas, scrub + autoplay)
was built during the strategy phase and is the pacing/density reference for the
production build.

---

## 6. Layout System

- 12-column grid, max-width 1320px, 24px gutters; generous vertical rhythm
  (sections breathe at 160–220px spacing on desktop).
- **Asymmetry as identity:** content alternates left/right of the thread spine, which
  occupies a ~80px channel that drifts across the grid between sections. No section is
  dead-centered except the manifesto and the Core moments — centering is reserved for
  "resolution" beats.
- Hairline 1px borders, 2px corner radius (near-sharp — this is architecture, not SaaS).
- Nav: fixed, transparent over pre-hero, ink-blur backdrop after scroll. Left: wordmark
  "Thread & Core" with an ampersand drawn as a tiny thread knot (the logo seed). Right:
  Framework / Work / About / Contact + copper "Start a Conversation" button.
- Footer: dark ink-950, the thread's terminus — a final stitched line, contact details,
  the tagline, legal line "Thread and Core Systems Private Limited".

---

## 7. Homepage — Section-by-Section Art Direction

The homepage follows the brief's emotional sequence (Mystery → Recognition → Resolution
→ Trust → Method → Proof → Confidence → Action). Ten beats:

### 7.1 Pre-Hero: Thread Genesis (pinned, ~300vh of scroll)
- **Frame 0 (0 scroll, server-rendered):** ink-950 field. Centered, immediately visible:
  *"Every enterprise runs on thousands of invisible threads."* (Satoshi, core-white).
  Below it a mono cue: `SCROLL ↓` with a 24px animated thread tick. A faint copper
  fiber drifts across the background (CSS only). **Never blank.**
- **Beat 1 (0–35%):** the six thread words — `DATA / PROCESSES / APPLICATIONS /
  INTELLIGENCE / PEOPLE / DECISIONS` — appear in mono at scattered positions, each with
  a short disconnected thread segment dangling from it. Slight parallax drift makes
  them feel unmoored.
- **Beat 2 (35–70%):** scroll pulls the words inward; their thread segments extend,
  seek each other, and connect — copper lines drawing point-to-point.
- **Beat 3 (70–95%):** convergence. Lines spiral into center; the canvas Core sphere
  ignites (particles assemble from the incoming lines). The word `CORE` resolves in
  mono inside it. Sphere diameter ≥ 38vh — a centerpiece, per the brief's rules.
- **Beat 4 (95–100%):** the wordmark **Thread & Core Systems** stitches in beneath the
  sphere; the pin releases and the sphere *translates and shrinks* into the hero's
  right column — one continuous camera move, no cut.
- Total pinned scroll ≈ 3 viewport-heights (~2.5s of natural scrolling): cinematic but
  compressed. The brief's anti-patterns (blank first view, tiny sphere, endless scroll,
  faint blue on black) are all structurally impossible in this design.
- Mobile: same sequence at reduced particle count; words stack in two columns.
  Reduced motion: a single static composition (sentence + connected diagram + Core).

### 7.2 Hero (the resolved state)
- Left column (7 cols): eyebrow `THREAD & CORE SYSTEMS PVT LTD` (mono) →
  H1 **"Enterprise Architecture for the Connected Enterprise."** → brand line
  *"Connecting Every Thread to the Core."* (Fraunces italic, copper) → subhead →
  CTAs: solid copper **Start a Conversation** + hairline ghost **Explore Our Framework**.
- Right column (5 cols): the Core sphere, now calm and small, threads still feeding it —
  continuity from the pre-hero, exactly as the brief demands.
- The spine begins here: the thread exits the sphere and starts its journey down the page.

### 7.3 Manifesto
- Near-empty ink-900 viewport. The thread runs quietly down the left margin.
- *"Technology doesn't transform businesses."* (Satoshi, core-white) — beat —
  *"Connection does."* (Fraunces italic, copper, larger). Then the short manifesto body,
  62ch, centered. The one centered section before the Core returns.
- Line-mask reveal on scroll; the thread stitches a small knot beside the copper line.

### 7.4 The Framework (homepage teaser)
- Label `THE FRAMEWORK` · H2 "A method built from real enterprise delivery."
- The signature diagram: a horizontal living thread through five nodes —
  **Understand → Connect → Modernise → Automate → Scale** — terminating in a small Core.
- Scroll-scrubbed: the thread draws node to node; the active node expands to show its
  Fraunces-italic question ("What cannot fail?") + three mono focus bullets; previous
  nodes dim to hairline+copper dot. The thread enters the Core, which pulses once.
- Mobile: vertical stepper, thread drawing downward, one node open at a time.
- CTA: "Explore the full framework →" (to `/framework`).

### 7.5 Capabilities: Our Threads
- Label `CAPABILITIES` · H2 "Five disciplines. One architecture."
- Five full-width horizontal bars (Business / Technology / Intelligence / Integration /
  Experience), each resting as a hairline-bordered strip: mono index `01`,
  thread name, and a faint woven-line signature unique to each.
- Hover: a copper line traces the bar's border (stroke-draw). Click: bar expands
  (accordion) to reveal description, tech stack as mono tags, one proof point.
- The spine passes through all five bars, visually "threading" them together.

### 7.6 Industries: The Core of Every Engagement
- Label `WHERE WE'VE DELIVERED` · H2 "Every engagement is anchored in the business."
- 8 tiles (4×2 desktop, 2×4 mobile): Mining & Explosives, Healthcare, Hospital & Pharma,
  Manufacturing & Supply Chain, Oil & Gas, HR & Talent, Enterprise Analytics,
  Veterinary & Pet Health.
- Launch art: generative woven-thread SVG per tile (distinct pattern each) on ink-800.
  Hover: border thread-trace, pattern brightens, one-line proof statement reveals.

### 7.7 Enterprise Experience: Proof
- Label `ENTERPRISE EXPERIENCE` · H2 **"Proof, not presentations."**
- Three featured proof cards (Field Operations Intelligence Platform / CareFlow /
  Clean Core Assessment Dashboard), asymmetric layout — the first card is dominant.
- Card anatomy: sector (mono) → title → what-was-built → **metric row in large tabular
  numerals** (`AUD 1M+ · 16→1 steps · 4 regions · 7 languages`) → tech tags (slate mono).
- Metrics count up once on first view (600ms, silk ease). Confidentiality rules applied:
  "A global explosives company — Australia, 4 regions, 7 languages." No restricted names.
- CTA: "Explore all engagements →" (to `/work`).

### 7.8 The Practitioner
- Label `DEEP EXPERTISE, DIRECT INVOLVEMENT`.
- H2 (the differentiator, given full weight): **"The architect who scopes your project
  is the one who builds it."**
- Two columns: the brief's practitioner copy + a fact stack in mono
  (14+ YEARS · SAP-CERTIFIED CAP & FIORI · AUSTRALIA / GERMANY / INDIA · BTP100 & CLD200
  INSTRUCTOR). No headshot required at launch; an architectural thread-portrait mark
  holds the space. Link: "About the architect →".

### 7.9 Insights
- Three article stubs as hairline list rows (title + mono topic tag + date).
  Real titles from the brief, no "coming soon" language. Quiet section — one viewport.

### 7.10 Contact: The Thread Ends at the Core
- The spine makes its final run and plunges into the Core sphere — its second and final
  full appearance, now stable and bright (the enterprise, assembled).
- Label `START A CONVERSATION` · H2 **"Tell us how your business runs. We'll tell you
  what to build."** + the qualifying subcopy ("We are not taking every engagement…").
- Email, LinkedIn, Pune · India, global availability. Large copper CTA.
  No form at launch — a `mailto` with a pre-filled subject is more senior anyway.

---

## 8. Subpages (shared shell, lighter motion)

Each subpage keeps the spine motif but at ~30% of the homepage's motion intensity.

- **`/framework`** — the flagship IP page. Full-screen version of the diagram; then
  Threads vs Core philosophy (two-column: what moves / what anchors); then five phase
  chapters, each a full viewport: number, name, question (Fraunces), focus areas,
  and a "in practice" line mapping to SAP/AI/integration use cases. Ends with
  "See the framework in practice →" (to `/work`). Future: downloadable one-pager.
- **`/work`** — case index as a vertical thread with case cards stitched to it.
  Each case detail follows the framework's five phases as its narrative structure
  (Understand/Connect/Modernise/Automate/Scale) — the methodology proving itself.
  Cases: Field Operations Intelligence Platform, PO-to-SO Automation, StockSense AI,
  Clean Core Dashboard, CareFlow, Ayurvedya, PawChart, HR/Talent platform.
- **`/about`** — "The architect behind Thread & Core Systems." Founder narrative,
  why the company exists, career arc as a horizontal timeline thread (India → Germany →
  Australia → Thread & Core), certifications, LinkedIn. Personal, not emotional;
  confident, not self-promotional. Never reads as a CV.
- **`/contact`** — one calm viewport: "Start a conversation." + honesty subcopy +
  contact details + availability. The Core sits quietly behind the content.
- **`/insights`** — deferred route; homepage section links can point to LinkedIn
  articles until it ships.

---

## 9. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, static export) | SSR/SSG for the never-blank rule + SEO; deploys anywhere |
| Styling | **Tailwind CSS v4** + CSS custom properties for all tokens | Tokens in Section 2/3 map 1:1 to CSS variables |
| Scroll animation | **GSAP + ScrollTrigger** | The pinned pre-hero and scroll-scrubbed spine/diagram are exactly what ScrollTrigger is built for |
| Component motion | **Framer Motion** | Accordions, reveals, hover states — declarative and cheap |
| Smooth scroll | **Lenis** | Makes scrub animation feel cinematic; respects reduced motion |
| Core sphere | **Hand-rolled Canvas 2D** particle system | ~3KB, no WebGL dependency, full palette control |
| Fonts | Self-hosted woff2 (Satoshi via Fontshare, Fraunces + JetBrains Mono via Google) | Performance + zero third-party requests |
| Deployment | **Vercel** (static) | Instant, free tier is fine at launch |
| Analytics | Vercel Analytics or Plausible | Lightweight, privacy-respecting — fits the brand |

**Design tooling / connectors: none required.** The site is built in code, so Framer is
not in the pipeline; the visuals are code-drawn, so AI-video tools (Higgsfield, Seedance,
etc.) are not either. Visual verification happens in the local browser preview. If
cinematic industry photography is wanted post-launch, generate it in the tool's own app
and drop the files into `/public` — no integration needed.

SEO baseline: per-route metadata, OpenGraph images (dark ink + copper thread + page
title, generated), JSON-LD (`Organization` + `Person` for Prashant + `Service`),
sitemap, semantic landmarks, full keyboard navigability.

---

## 10. Build Plan

**Phase 1 — Foundation (design system in code)**
Next.js scaffold, tokens, fonts, grid, nav/footer shell, the thread-spine engine
(SVG path + ScrollTrigger scrub abstraction), the Core sphere component, reduced-motion
infrastructure, and the logo seed (three SVG concepts). *Everything after this is
composition.*

**Phase 2 — Homepage**
Pre-hero Thread Genesis → hero handoff (the hardest, highest-value build — done first),
then manifesto, framework teaser, capabilities, industries, proof, practitioner,
insights, contact. Mobile pass per section, not at the end.

**Phase 3 — Subpages**
`/framework` (flagship), `/work` + case template, `/about`, `/contact`.

**Phase 4 — Polish & launch**
Performance audit against Section 4 budget, accessibility pass, SEO/OG/JSON-LD,
cross-device QA, the brief's launch checklist (first view never blank, name explained
visually, no restricted client names, contact details correct).

---

## 11. Logo: Seed Now, System Later

The site needs three logo artifacts at launch — nav wordmark, favicon, OG mark — so the
logo *seed* is designed in Phase 1, while the full identity system waits until the site
has proven the visual language.

- **Lead concept: the ampersand is the logo.** Wordmark "Thread & Core" set in Satoshi,
  with the ampersand drawn as a single continuous line tying a knot — the "&" literally
  connects the two words, which is the entire brand idea. As a standalone monogram the
  knot-ampersand must read at 16px (favicon) and at 400px (OG image).
- **Alternate concept:** a single line entering a circle and coiling into its center —
  thread meeting core; more abstract, also favicon-safe.
- **Process:** three SVG concepts in Phase 1 → pick one → launch with it → post-launch,
  expand into the full brand kit (lockups, clearspace, LinkedIn banner, proposal and
  one-pager templates) once the live site exists to anchor it.

---

## 12. Guardrails (from the briefs, non-negotiable)

- Never publish: Orica, LTIMindtree, FSSS, SalesSync, internal identifiers.
  Safe reference: "A global explosives company — Australia, 4 regions, 7 languages."
- Voice: senior peer to senior peer. No startup hype, no "passionate about technology",
  no "one-stop solution", no service grids, no overclaimed AI.
- The site must never read as a personal resume — Prashant is *the architect behind
  the practice*.
- Contact: agarawal.prashant@gmail.com · linkedin.com/in/agarawal-prashant ·
  Pune, India · remote and onsite globally.
- Every animation supports the message; any that merely decorates gets cut.
