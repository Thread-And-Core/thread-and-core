"""
Thread & Core — complete logo kit generator.

Every asset derives from ONE geometry function (mark_geometry), so alignment,
scale ratio, optical centring, stroke weight, and rotation are identical
across all variants and sizes by construction.

Regenerate everything:
    python3 brand/logo/build_logo_kit.py

Outputs into brand/logo/ (svg/, png/, lockup/, favicon/).
"""

import math, os
from PIL import Image, ImageDraw, ImageFont

PROJECT = "/Users/kunjamaggarwal/Documents/Thread-And-Core-website-Fable5"
OUT = f"{PROJECT}/brand/logo"
FONTS = f"{PROJECT}/brand/fonts"

SATOSHI_BOLD = f"{FONTS}/Satoshi-Bold.ttf"
JBM = f"{FONTS}/JetBrainsMono-Regular.ttf"

# ---- palette ----
INK_950 = (8, 10, 15)
THREAD_500 = (217, 154, 78)   # copper stroke
THREAD_300 = (240, 201, 135)  # bright copper (core dot on dark)
CORE_WHITE = (255, 246, 233)
FG_SECONDARY = (154, 163, 178)
WHITE = (255, 255, 255)

SS = 4  # supersample factor for PNG rendering

# ------------------------------------------------------------------
# THE ONE GEOMETRY — trefoil knot, bbox-centred, fixed margins.
# Parametric curve: x = sin t + 2 sin 2t, y = cos t − 2 cos 2t
# Extents: x ∈ [−2.7354, 2.7354]  (width 5.4708)
#          y ∈ [−3.0, 2.0620]     (height 5.0620; NOT symmetric)
# ------------------------------------------------------------------
X_EXT = 2.7354
Y_TOP = 2.0620   # screen-up reach (after y-flip)
Y_BOT = 3.0      # screen-down reach
BBOX_W = 2 * X_EXT
BBOX_H = Y_TOP + Y_BOT

MARGIN = 0.16          # fraction of canvas left clear on the limiting axis
STROKE_FRAC = 0.16     # stroke width as fraction of unit scale s
CORE_FRAC = 0.17       # core dot radius as fraction of s

_TREF = []
for i in range(721):
    t = (i / 720) * 2 * math.pi
    _TREF.append((math.sin(t) + 2 * math.sin(2 * t), math.cos(t) - 2 * math.cos(2 * t)))


def mark_geometry(canvas):
    """Given a square canvas size, return (s, cx, cy) — identical everywhere."""
    s = canvas * (1 - 2 * MARGIN) / BBOX_W          # width is the limiting axis
    cx = canvas / 2
    # optical centring: centre the visual bounding box, not the parametric origin
    cy = canvas / 2 - ((Y_BOT - Y_TOP) / 2) * s
    return s, cx, cy


def draw_mark(d, canvas, stroke_rgb, core_rgb, stroke_frac=STROKE_FRAC):
    s, cx, cy = mark_geometry(canvas)
    pts = [(cx + x * s, cy - y * s) for (x, y) in _TREF]
    w = max(2, int(round(s * stroke_frac)))
    d.line(pts, fill=stroke_rgb + (255,), width=w, joint="curve")
    r = w / 2
    for (px, py) in (pts[0], pts[-1]):
        d.ellipse([px - r, py - r, px + r, py + r], fill=stroke_rgb + (255,))
    cr = s * CORE_FRAC
    d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=core_rgb + (255,))


def render_mark(master=1024, bg=None, stroke=THREAD_500, core=THREAD_300, stroke_frac=STROKE_FRAC):
    c = master * SS
    img = Image.new("RGBA", (c, c), (bg + (255,)) if bg else (0, 0, 0, 0))
    draw_mark(ImageDraw.Draw(img), c, stroke, core, stroke_frac)
    return img.resize((master, master), Image.LANCZOS)


def save_series(img, folder, stem, sizes):
    os.makedirs(f"{OUT}/{folder}", exist_ok=True)
    for size in sizes:
        out = img.resize((size, size), Image.LANCZOS) if size != img.width else img
        out.save(f"{OUT}/{folder}/{stem}-{size}.png", "PNG")
    print(f"{folder}/{stem}: {sizes}")


# ------------------------------------------------------------------
# SVG (vector source of truth — same numbers as the PNGs)
# ------------------------------------------------------------------
def svg_mark(stroke_hex, core_hex, bg_hex=None, canvas=100.0):
    s, cx, cy = mark_geometry(canvas)
    pts = " ".join(f"{cx + x * s:.2f},{cy - y * s:.2f}" for (x, y) in _TREF[::6])
    w = s * STROKE_FRAC
    cr = s * CORE_FRAC
    bg = f'<rect width="{canvas}" height="{canvas}" fill="{bg_hex}"/>' if bg_hex else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas} {canvas}">
{bg}<polyline points="{pts} {pts.split(' ')[0]}" fill="none" stroke="{stroke_hex}" stroke-width="{w:.2f}" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{cr:.2f}" fill="{core_hex}"/>
</svg>
'''


# ------------------------------------------------------------------
# Wordmark lockup: mark + "Thread & Core" / "SYSTEMS"
# ------------------------------------------------------------------
def render_lockup(width=2400, bg=None, text_rgb=CORE_WHITE, amp_rgb=THREAD_500,
                  stroke=THREAD_500, core=THREAD_300, sub_rgb=FG_SECONDARY):
    H = int(width * 0.28)
    w, h = width * SS, H * SS
    img = Image.new("RGBA", (w, h), (bg + (255,)) if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # mark occupies the left square of the lockup, using THE geometry
    square = h
    draw_mark(d, square, stroke, core)

    fnt = ImageFont.truetype(SATOSHI_BOLD, int(h * 0.30))
    sub = ImageFont.truetype(JBM, int(h * 0.105))
    tx = square * 0.98
    asc, desc = fnt.getmetrics()
    sasc, sdesc = sub.getmetrics()
    gap = h * 0.055
    block_h = (asc + desc) + gap + sasc
    ty = (h - block_h) / 2

    x = tx
    for part, col in [("Thread ", text_rgb), ("&", amp_rgb), (" Core", text_rgb)]:
        d.text((x, ty), part, font=fnt, fill=col + (255,))
        x += fnt.getlength(part)

    # letter-spaced SYSTEMS aligned under the wordmark
    sy = ty + asc + desc * 0.3 + gap
    sx = tx + fnt.getlength("T") * 0.06
    tracking = h * 0.062
    for ch in "SYSTEMS":
        d.text((sx, sy), ch, font=sub, fill=sub_rgb + (255,))
        sx += sub.getlength(ch) + tracking

    # trim right edge to content
    text_end = int(x + h * 0.10)
    img = img.crop((0, 0, min(w, text_end), h))
    fw = img.width // SS
    return img.resize((fw, H), Image.LANCZOS)


# ------------------------------------------------------------------
# BUILD EVERYTHING
# ------------------------------------------------------------------
SIZES = [1024, 512, 300, 256, 128, 64]

# 1) mark on dark tile (LinkedIn company page = the 300px one)
save_series(render_mark(bg=INK_950), "png/dark", "logo-mark-dark", SIZES)
# 2) mark on white tile
save_series(render_mark(bg=WHITE, stroke=INK_950, core=THREAD_500), "png/light", "logo-mark-light", SIZES)
# 3) transparent — copper (for dark backgrounds)
save_series(render_mark(), "png/transparent-copper", "logo-mark-copper", SIZES)
# 4) transparent — ink (for light backgrounds)
save_series(render_mark(stroke=INK_950, core=THREAD_500), "png/transparent-ink", "logo-mark-ink", SIZES)

# 5) SVG sources
os.makedirs(f"{OUT}/svg", exist_ok=True)
svgs = {
    "logo-mark-on-dark.svg": svg_mark("#D99A4E", "#F0C987", "#080A0F"),
    "logo-mark-on-light.svg": svg_mark("#080A0F", "#D99A4E", "#FFFFFF"),
    "logo-mark-copper-transparent.svg": svg_mark("#D99A4E", "#F0C987"),
    "logo-mark-ink-transparent.svg": svg_mark("#080A0F", "#D99A4E"),
}
for name, content in svgs.items():
    with open(f"{OUT}/svg/{name}", "w") as f:
        f.write(content)
print("svg:", list(svgs))

# 6) lockups (mark + wordmark)
os.makedirs(f"{OUT}/lockup", exist_ok=True)
lockups = {
    "lockup-dark": dict(bg=INK_950),
    "lockup-light": dict(bg=WHITE, text_rgb=INK_950, stroke=INK_950, core=THREAD_500,
                          sub_rgb=(93, 102, 117)),
    "lockup-transparent-for-dark-bg": dict(),
    "lockup-transparent-for-light-bg": dict(text_rgb=INK_950, stroke=INK_950,
                                             core=THREAD_500, sub_rgb=(93, 102, 117)),
}
for stem, kw in lockups.items():
    for width in (2400, 1200):
        img = render_lockup(width=width, **kw)
        img.save(f"{OUT}/lockup/{stem}-{width}.png", "PNG")
    print("lockup:", stem)

# 7) favicons — heavier stroke at tiny sizes for legibility
os.makedirs(f"{OUT}/favicon", exist_ok=True)
tiny = render_mark(master=256, bg=INK_950, stroke_frac=0.30)
for size in (16, 32, 48):
    tiny.resize((size, size), Image.LANCZOS).save(f"{OUT}/favicon/favicon-{size}.png", "PNG")
tiny.resize((48, 48), Image.LANCZOS).save(
    f"{OUT}/favicon/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
)
# PWA / touch icons use the standard geometry
render_mark(master=512, bg=INK_950).save(f"{OUT}/favicon/favicon-512.png", "PNG")
render_mark(master=512, bg=INK_950).resize((192, 192), Image.LANCZOS).save(f"{OUT}/favicon/favicon-192.png", "PNG")
render_mark(master=512, bg=INK_950).resize((180, 180), Image.LANCZOS).save(f"{OUT}/favicon/apple-touch-icon.png", "PNG")
print("favicon: ico + 16/32/48/192/512 + apple-touch-icon")

print("all done")
