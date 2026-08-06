"""
Thread & Core — complete logo kit generator.

CANONICAL ORIENTATION (matches the live website / app/icon.svg):
screen_y = cy + y_param * s  (NO y-flip). Single lobe points UP,
two lobes point DOWN, core dot at the parametric origin.

COLOUR RULE: the knot is ALWAYS copper (#D99A4E stroke, #F0C987 core dot),
on every background — dark, white, or transparent. No ink/black variant.

Every asset derives from ONE geometry function (mark_geometry), so alignment,
scale, centring, and stroke weight are identical across all variants/sizes.

Regenerate:  python3 brand/logo/build_logo_kit.py
"""

import math, os, shutil
from PIL import Image, ImageDraw, ImageFont

PROJECT = "/Users/kunjamaggarwal/Documents/Thread-And-Core-website-Fable5"
OUT = f"{PROJECT}/brand/logo"
FONTS = f"{PROJECT}/brand/fonts"

SATOSHI_BOLD = f"{FONTS}/Satoshi-Bold.ttf"
JBM = f"{FONTS}/JetBrainsMono-Regular.ttf"

INK_950 = (8, 10, 15)
THREAD_500 = (217, 154, 78)   # copper stroke — the knot, always
THREAD_300 = (240, 201, 135)  # bright copper — the core dot, always
CORE_WHITE = (255, 246, 233)
FG_SECONDARY = (154, 163, 178)
FG_MUTED = (93, 102, 117)
WHITE = (255, 255, 255)

SS = 4

# ------------------------------------------------------------------
# THE ONE GEOMETRY — canonical (website) orientation.
# Parametric: x = sin t + 2 sin 2t, y = cos t − 2 cos 2t
# With screen_y = cy + y*s:  top reach = 3.0s, bottom reach = 2.0620s.
# ------------------------------------------------------------------
X_EXT = 2.7354
Y_UP = 3.0        # screen-up reach (single lobe, points UP)
Y_DOWN = 2.0620   # screen-down reach (two lobes)
BBOX_W = 2 * X_EXT

MARGIN = 0.16
STROKE_FRAC = 0.16
CORE_FRAC = 0.17

_TREF = []
for i in range(721):
    t = (i / 720) * 2 * math.pi
    _TREF.append((math.sin(t) + 2 * math.sin(2 * t), math.cos(t) - 2 * math.cos(2 * t)))


def mark_geometry(canvas):
    """(s, cx, cy) for a square canvas — identical everywhere."""
    s = canvas * (1 - 2 * MARGIN) / BBOX_W
    cx = canvas / 2
    # centre the visual bbox: top = cy - Y_UP*s, bottom = cy + Y_DOWN*s
    cy = canvas / 2 + ((Y_UP - Y_DOWN) / 2) * s
    return s, cx, cy


def draw_mark(d, canvas, stroke_frac=STROKE_FRAC):
    s, cx, cy = mark_geometry(canvas)
    pts = [(cx + x * s, cy + y * s) for (x, y) in _TREF]  # canonical: NO flip
    w = max(2, int(round(s * stroke_frac)))
    d.line(pts, fill=THREAD_500 + (255,), width=w, joint="curve")
    r = w / 2
    for (px, py) in (pts[0], pts[-1]):
        d.ellipse([px - r, py - r, px + r, py + r], fill=THREAD_500 + (255,))
    cr = s * CORE_FRAC
    d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=THREAD_300 + (255,))


def render_mark(master=1024, bg=None, stroke_frac=STROKE_FRAC):
    c = master * SS
    img = Image.new("RGBA", (c, c), (bg + (255,)) if bg else (0, 0, 0, 0))
    draw_mark(ImageDraw.Draw(img), c, stroke_frac)
    return img.resize((master, master), Image.LANCZOS)


def save_series(img, folder, stem, sizes):
    os.makedirs(f"{OUT}/{folder}", exist_ok=True)
    for size in sizes:
        out = img.resize((size, size), Image.LANCZOS) if size != img.width else img
        out.save(f"{OUT}/{folder}/{stem}-{size}.png", "PNG")
    print(f"{folder}/{stem}: {sizes}")


def svg_mark(bg_hex=None, canvas=100.0):
    s, cx, cy = mark_geometry(canvas)
    pts = " ".join(f"{cx + x * s:.2f},{cy + y * s:.2f}" for (x, y) in _TREF[::6])
    w = s * STROKE_FRAC
    cr = s * CORE_FRAC
    bg = f'<rect width="{canvas}" height="{canvas}" fill="{bg_hex}"/>' if bg_hex else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {canvas} {canvas}">
{bg}<polyline points="{pts} {pts.split(' ')[0]}" fill="none" stroke="#D99A4E" stroke-width="{w:.2f}" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{cr:.2f}" fill="#F0C987"/>
</svg>
'''


def render_lockup(width=2400, bg=None, text_rgb=CORE_WHITE, sub_rgb=FG_SECONDARY):
    """Knot (always copper) + 'Thread & Core' / 'SYSTEMS'. Only text colour varies."""
    H = int(width * 0.28)
    w, h = width * SS, H * SS
    img = Image.new("RGBA", (w, h), (bg + (255,)) if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    square = h
    draw_mark(d, square)

    fnt = ImageFont.truetype(SATOSHI_BOLD, int(h * 0.30))
    sub = ImageFont.truetype(JBM, int(h * 0.105))
    tx = square * 0.98
    asc, desc = fnt.getmetrics()
    sasc, _ = sub.getmetrics()
    gap = h * 0.055
    block_h = (asc + desc) + gap + sasc
    ty = (h - block_h) / 2

    x = tx
    for part, col in [("Thread ", text_rgb), ("&", THREAD_500), (" Core", text_rgb)]:
        d.text((x, ty), part, font=fnt, fill=col + (255,))
        x += fnt.getlength(part)

    sy = ty + asc + desc * 0.3 + gap
    sx = tx + fnt.getlength("T") * 0.06
    tracking = h * 0.062
    for ch in "SYSTEMS":
        d.text((sx, sy), ch, font=sub, fill=sub_rgb + (255,))
        sx += sub.getlength(ch) + tracking

    img = img.crop((0, 0, min(w, int(x + h * 0.10)), h))
    return img.resize((img.width // SS, H), Image.LANCZOS)


# ------------------------------------------------------------------
# BUILD — clear stale outputs first so no inverted file survives
# ------------------------------------------------------------------
for stale in ("png", "svg", "lockup", "favicon"):
    shutil.rmtree(f"{OUT}/{stale}", ignore_errors=True)

SIZES = [1024, 512, 300, 256, 128, 64]

save_series(render_mark(bg=INK_950), "png/dark", "logo-mark-dark", SIZES)
save_series(render_mark(bg=WHITE), "png/light", "logo-mark-light", SIZES)
save_series(render_mark(), "png/transparent", "logo-mark-transparent", SIZES)

os.makedirs(f"{OUT}/svg", exist_ok=True)
for name, content in {
    "logo-mark-on-dark.svg": svg_mark("#080A0F"),
    "logo-mark-on-light.svg": svg_mark("#FFFFFF"),
    "logo-mark-transparent.svg": svg_mark(),
}.items():
    with open(f"{OUT}/svg/{name}", "w") as f:
        f.write(content)
print("svg: on-dark, on-light, transparent")

os.makedirs(f"{OUT}/lockup", exist_ok=True)
for stem, kw in {
    "lockup-dark": dict(bg=INK_950),
    "lockup-light": dict(bg=WHITE, text_rgb=INK_950, sub_rgb=FG_MUTED),
    "lockup-transparent-for-dark-bg": dict(),
    "lockup-transparent-for-light-bg": dict(text_rgb=INK_950, sub_rgb=FG_MUTED),
}.items():
    for width in (2400, 1200):
        render_lockup(width=width, **kw).save(f"{OUT}/lockup/{stem}-{width}.png", "PNG")
    print("lockup:", stem)

os.makedirs(f"{OUT}/favicon", exist_ok=True)
tiny = render_mark(master=256, bg=INK_950, stroke_frac=0.30)
for size in (16, 32, 48):
    tiny.resize((size, size), Image.LANCZOS).save(f"{OUT}/favicon/favicon-{size}.png", "PNG")
tiny.resize((48, 48), Image.LANCZOS).save(
    f"{OUT}/favicon/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
)
big = render_mark(master=512, bg=INK_950)
big.save(f"{OUT}/favicon/favicon-512.png", "PNG")
big.resize((192, 192), Image.LANCZOS).save(f"{OUT}/favicon/favicon-192.png", "PNG")
big.resize((180, 180), Image.LANCZOS).save(f"{OUT}/favicon/apple-touch-icon.png", "PNG")
print("favicon: ico + 16/32/48/192/512 + apple-touch-icon")

print("all done — canonical orientation, copper everywhere")
