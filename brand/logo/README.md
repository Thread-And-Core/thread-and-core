# Thread & Core — Logo Kit

The mark is the **Knot Core**: one continuous line tied into a trefoil knot with a
copper dot at its centre. The line is the thread, the knot is the connection, the
dot is the core.

**Canonical orientation** (matches the live website): single lobe points UP,
two lobes point DOWN. Never rotate, flip, stretch, outline, or shadow the mark.

**Colour rule — the knot is always copper**, on every background:
stroke `#D99A4E`, core dot `#F0C987`. There is no black/ink version.

Every file is generated from a single geometry definition (`build_logo_kit.py`),
so alignment, margins, stroke weight, and centring are identical across all
variants and sizes. Regenerate everything with:

```bash
python3 brand/logo/build_logo_kit.py
```

## Which file do I use?

| Situation | File |
|---|---|
| **LinkedIn company page logo** | `png/dark/logo-mark-dark-300.png` |
| Social avatar, app tile (dark) | `png/dark/logo-mark-dark-{size}.png` |
| White tile (marketplaces that force white) | `png/light/logo-mark-light-{size}.png` |
| Placing on any background (docs, slides, site) | `png/transparent/logo-mark-transparent-{size}.png` |
| Print / signage / any scalable use | `svg/` (vector source of truth) |
| Email signature / letterhead (full name, light bg) | `lockup/lockup-transparent-for-light-bg-1200.png` |
| Dark presentation header (full name) | `lockup/lockup-transparent-for-dark-bg-1200.png` |
| Browser favicon | `favicon/favicon.ico` |
| PWA / Android icons | `favicon/favicon-192.png`, `favicon/favicon-512.png` |
| iOS home-screen icon | `favicon/apple-touch-icon.png` |

In lockups, only the *text* colour adapts to the background (warm white on dark,
ink on light); the knot itself stays copper everywhere.

## Sizes included

PNG marks: 1024 · 512 · 300 (LinkedIn) · 256 · 128 · 64 px — dark tile, white
tile, and transparent. Lockups: 2400 and 1200 px wide, four variants.
Favicons: multi-resolution `.ico` (16/32/48) + 16/32/48/180/192/512 PNGs — the
tiny sizes use a proportionally heavier stroke for legibility, same centring.
