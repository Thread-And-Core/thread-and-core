# Thread & Core — Logo Kit

The mark is the **Knot Core**: one continuous line tied into a trefoil knot with a
copper dot at its centre. The line is the thread, the knot is the connection, the
dot is the core.

Every file in this kit is generated from a single geometry definition
(`build_logo_kit.py`), so alignment, margins, stroke weight, and centring are
identical across all variants and sizes. To regenerate after any change:

```bash
python3 brand/logo/build_logo_kit.py
```

## Which file do I use?

| Situation | File |
|---|---|
| **LinkedIn company page logo** | `png/dark/logo-mark-dark-300.png` |
| Social avatar, app tile (dark) | `png/dark/logo-mark-dark-{size}.png` |
| Logo on a white document / invoice / slide | `png/transparent-ink/logo-mark-ink-{size}.png` |
| Logo on a dark surface (site, deck, banner) | `png/transparent-copper/logo-mark-copper-{size}.png` |
| White tile version (marketplaces that force white) | `png/light/logo-mark-light-{size}.png` |
| Print / signage / any scalable use | `svg/` (vector source of truth) |
| Email signature / letterhead (full name) | `lockup/lockup-transparent-for-light-bg-1200.png` |
| Dark presentation header (full name) | `lockup/lockup-transparent-for-dark-bg-1200.png` |
| Browser favicon | `favicon/favicon.ico` |
| PWA / Android icons | `favicon/favicon-192.png`, `favicon/favicon-512.png` |
| iOS home-screen icon | `favicon/apple-touch-icon.png` |

## Colour rules

- **On dark** (`#080A0F` ink or any dark surface): copper stroke `#D99A4E`,
  bright copper core `#F0C987`.
- **On light/white**: ink stroke `#080A0F`, copper core `#D99A4E` — the dot is
  the only colour, which is the brand's "one accent" discipline.
- Never recolour the mark outside these two schemes; never rotate, outline,
  shadow, or stretch it.

## Sizes included

PNG marks: 1024 · 512 · 300 (LinkedIn) · 256 · 128 · 64 px, in all four variants.
Lockups: 2400 and 1200 px wide, four variants.
Favicons: multi-resolution `.ico` (16/32/48) + 16/32/48/180/192/512 PNGs —
the tiny sizes use a proportionally heavier stroke for legibility, generated
from the same centring rules.
