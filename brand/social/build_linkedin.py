"""
Thread & Core — LinkedIn asset generator (Ink & Copper system).

Regenerate all assets:
    python3 brand/social/build_linkedin.py

Requires brand fonts in FONT_DIR (Satoshi from Fontshare; Fraunces + JetBrains
Mono static instances from Google Fonts — see repo history for the fetch
commands) and Pillow + fontTools installed.
"""

import math, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

PROJECT = "/Users/kunjamaggarwal/Documents/Thread-And-Core-website-Fable5"
FONT_DIR = os.environ.get("TC_FONT_DIR", f"{PROJECT}/brand/fonts")
OUT = f"{PROJECT}/brand/social"
os.makedirs(OUT, exist_ok=True)

SATOSHI_BOLD = f"{FONT_DIR}/Satoshi-Bold.ttf"
SATOSHI_BLACK = f"{FONT_DIR}/Satoshi-Black.ttf"
SATOSHI_MED = f"{FONT_DIR}/Satoshi-Medium.ttf"
FRAUNCES = f"{FONT_DIR}/Fraunces-Italic.ttf"
JBM = f"{FONT_DIR}/JetBrainsMono-Regular.ttf"
JBM_MED = f"{FONT_DIR}/JetBrainsMono-Medium.ttf"

INK_950 = (8, 10, 15)
INK_900 = (12, 15, 22)
HAIRLINE = (35, 42, 58)
THREAD_500 = (217, 154, 78)
THREAD_300 = (240, 201, 135)
CORE_WHITE = (255, 246, 233)
FG = (237, 231, 220)
FG_SECONDARY = (154, 163, 178)
FG_MUTED = (93, 102, 117)

SS = 3

def font(path, size):
    return ImageFont.truetype(path, size * SS)

# ---- trefoil knot ------------------------------------------------------
# Parametric extents: x ∈ [-2.7354, 2.7354], y ∈ [-3.0, 2.0620].
# So for a given `scale`, drawn half-width ≈ 2.74*scale; top reach 2.06*scale,
# bottom reach 3.0*scale. Use these for layout clearance — NOT `scale` itself.
KNOT_HALF_W = 2.7354
KNOT_TOP = 2.0620
KNOT_BOTTOM = 3.0

_TREF = []
for i in range(481):
    t = (i / 480) * 2 * math.pi
    _TREF.append((math.sin(t) + 2 * math.sin(2 * t), math.cos(t) - 2 * math.cos(2 * t)))

def draw_knot(base, cx, cy, scale, width_frac=0.11, color=THREAD_500, core=THREAD_300, alpha=255):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # canonical website orientation (single lobe UP): screen_y = cy + y*scale
    pts = [(cx + x * scale, cy + y * scale) for (x, y) in _TREF]
    w = max(2, int(scale * width_frac))
    d.line(pts, fill=color + (alpha,), width=w, joint="curve")
    r = w / 2
    for (px, py) in (pts[0], pts[-1]):
        d.ellipse([px - r, py - r, px + r, py + r], fill=color + (alpha,))
    cr = scale * 0.17  # trefoil is 3-fold symmetric about origin → dot dead-centre
    d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=core + (alpha,))
    base.alpha_composite(layer)

def core_motif(base, cx, cy, r, glow_alpha=90, threads=True):
    W, H = base.size
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=THREAD_500 + (glow_alpha,))
    glow = glow.filter(ImageFilter.GaussianBlur(r * 0.55))
    base.alpha_composite(glow)

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    if threads:
        anchors = [(-0.15, 0.2), (1.15, 0.05), (-0.1, 0.85), (1.12, 0.9), (0.5, -0.2)]
        for (ax, ay) in anchors:
            axp, ayp = ax * W, ay * H
            ang = math.atan2(cy - ayp, cx - axp)
            ex = cx - math.cos(ang) * r * 0.62
            ey = cy - math.sin(ang) * r * 0.62
            mx = (axp + ex) / 2 + (r * 0.5 if (ax + ay) % 1 > 0.5 else -r * 0.5)
            my = (ayp + ey) / 2 - r * 0.4
            poly = []
            for k in range(41):
                tt = k / 40
                u = 1 - tt
                poly.append((u * u * axp + 2 * u * tt * mx + tt * tt * ex,
                             u * u * ayp + 2 * u * tt * my + tt * tt * ey))
            d.line(poly, fill=THREAD_500 + (70,), width=max(1, int(SS * 1.1)))
    d.ellipse([cx - r * 0.4, cy - r * 0.4, cx + r * 0.4, cy + r * 0.4],
              outline=THREAD_300 + (150,), width=max(1, int(SS * 1.4)))
    cr = r * 0.13
    d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=THREAD_500 + (255,))
    base.alpha_composite(layer)
    d2 = ImageDraw.Draw(base)
    for a in (0.6, 2.4, 4.5):
        sx = cx + math.cos(a) * r * 0.55
        sy = cy + math.sin(a) * r * 0.3
        s = SS * 2.2
        d2.ellipse([sx - s, sy - s, sx + s, sy + s], fill=THREAD_300 + (230,))

def fibers(base, count=3, alpha=14):
    W, H = base.size
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i in range(count):
        y0 = H * (0.22 + i * (0.6 / max(1, count - 1)))
        poly = []
        for k in range(61):
            x = -W * 0.05 + (W * 1.1) * (k / 60)
            y = y0 + math.sin(k / 60 * math.pi * 2 + i) * H * 0.05 * (1 if i % 2 else -1)
            poly.append((x, y))
        d.line(poly, fill=THREAD_500 + (alpha,), width=max(1, int(SS)))
    base.alpha_composite(layer)

def text_width(text, fnt, tracking=0):
    return sum(fnt.getlength(ch) for ch in text) + tracking * SS * max(0, len(text) - 1)

def draw_tracked(base, xy, text, fnt, fill, tracking=0, anchor="lm"):
    d = ImageDraw.Draw(base)
    tw = text_width(text, fnt, tracking)
    asc, desc = fnt.getmetrics()
    x, y = xy
    if anchor[0] == "c": x -= tw / 2
    elif anchor[0] == "r": x -= tw
    if anchor[1] == "m": y -= (asc + desc) / 2
    elif anchor[1] == "b": y -= (asc + desc)
    for ch in text:
        d.text((x, y), ch, font=fnt, fill=fill)
        x += fnt.getlength(ch) + tracking * SS

def finalize(img, final_w, final_h, name, keep_alpha=False):
    if keep_alpha:
        out = img.resize((final_w, final_h), Image.LANCZOS)
    else:
        out = img.convert("RGB").resize((final_w, final_h), Image.LANCZOS)
    out.save(os.path.join(OUT, name), "PNG")
    print("saved", name, f"{final_w}x{final_h}")

# ============================================================
# 1. COMPANY LOGO — 800x800 (transparent corners survive)
# ============================================================
def build_logo():
    FW = FH = 800
    w, h = FW * SS, FH * SS
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, w, h], radius=int(96 * SS), fill=INK_950 + (255,))
    fibers(img, count=2, alpha=10)
    draw_knot(img, w / 2, h / 2, scale=w * 0.125, width_frac=0.1)
    finalize(img, FW, FH, "linkedin-company-logo.png", keep_alpha=True)

# ============================================================
# 2. COMPANY COVER — 2256x382 (1128x191 @2x)
# ============================================================
def build_company_cover():
    """Centered composition (nudged slightly left of centre), all text in the
    upper/middle band — the company logo tile overlaps the banner's
    bottom-left corner, so nothing important lives there."""
    FW, FH = 2256, 382
    w, h = FW * SS, FH * SS
    img = Image.new("RGBA", (w, h), INK_900 + (255,))
    fibers(img, count=3, alpha=12)
    core_motif(img, w * 0.93, h * 0.5, r=h * 0.42, glow_alpha=55)

    cx = w * 0.49  # slightly left of centre, per LinkedIn crop guidance
    draw_tracked(img, (cx, h * 0.19), "THREAD & CORE SYSTEMS",
                 font(JBM_MED, 26), THREAD_500 + (255,), tracking=7, anchor="cm")
    d = ImageDraw.Draw(img)
    d.text((cx, h * 0.43), "Enterprise Architecture for the Connected Systems.",
           font=font(SATOSHI_BOLD, 52), fill=CORE_WHITE, anchor="mm")
    d.text((cx, h * 0.66),
           "We connect ERP, applications, data, automation, and AI into business systems that scale.",
           font=font(SATOSHI_MED, 30), fill=THREAD_300, anchor="mm")
    finalize(img, FW, FH, "linkedin-company-cover.png")

# ============================================================
# 3. FOUNDER PROFILE COVER — 3168x792 (1584x396 @2x)
#    Bottom-left kept clear for the profile-photo overlay.
# ============================================================
def build_founder_cover():
    FW, FH = 3168, 792
    w, h = FW * SS, FH * SS
    img = Image.new("RGBA", (w, h), INK_900 + (255,))
    fibers(img, count=4, alpha=13)
    core_motif(img, w * 0.91, h * 0.44, r=h * 0.38, glow_alpha=55)

    # PHOTO-SAFE BY GEOMETRY: LinkedIn's profile photo circle overlaps the
    # banner's LEFT COLUMN (measured from a real screenshot: x up to ~23% of
    # width, starting as high as ~50% of height, varying by device). So no
    # text is placed in that column at all — the entire text block starts at
    # x = 0.30w. Overlap is impossible regardless of vertical crop.
    TEXT_X = w * 0.30

    d = ImageDraw.Draw(img)
    draw_tracked(img, (TEXT_X, h * 0.23), "THREAD & CORE SYSTEMS",
                 font(JBM_MED, 26), THREAD_500 + (255,), tracking=7, anchor="lm")

    hf = font(SATOSHI_BLACK, 58)
    d.text((TEXT_X, h * 0.33), "I design and build connected enterprise systems", font=hf, fill=CORE_WHITE)
    d.text((TEXT_X, h * 0.33 + hf.getmetrics()[0] * 1.08), "around ERP, data, automation, and AI.", font=hf, fill=CORE_WHITE)
    d.text((TEXT_X, h * 0.60), "From architecture to execution, one accountable partner.",
           font=font(SATOSHI_MED, 36), fill=THREAD_300)

    draw_tracked(img, (w * 0.93, h * 0.88),
                 "SAP BTP  ·  CLEAN CORE  ·  AI  ·  FULL-STACK  ·  14+ YEARS",
                 font(JBM, 24), FG_MUTED + (255,), tracking=5, anchor="rm")
    finalize(img, FW, FH, "linkedin-founder-cover.png")

# ============================================================
# 4. FOUNDER AVATAR — 800x800 (photo in copper ring)
# ============================================================
def build_founder_avatar():
    FW = FH = 800
    w, h = FW * SS, FH * SS
    img = Image.new("RGBA", (w, h), INK_950 + (255,))
    fibers(img, count=2, alpha=9)
    photo = Image.open(f"{PROJECT}/public/prashant.jpg").convert("RGB")
    ps = int(w * 0.72)
    pw, ph = photo.size
    side = int(0.60 * ph)
    cxp = int(0.49 * pw)
    top = int(0.08 * ph)
    left = max(0, min(pw - side, cxp - side // 2))
    photo = photo.crop((left, top, left + side, top + side)).resize((ps, ps), Image.LANCZOS)
    mask = Image.new("L", (ps, ps), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, ps, ps], fill=255)
    px, py = (w - ps) // 2, (h - ps) // 2
    img.paste(photo, (px, py), mask)
    d = ImageDraw.Draw(img)
    rw = int(SS * 5)
    d.ellipse([px - rw, py - rw, px + ps + rw, py + ps + rw], outline=THREAD_500 + (255,), width=rw)
    finalize(img, FW, FH, "linkedin-founder-avatar.png")

if __name__ == "__main__":
    build_logo()
    build_company_cover()
    build_founder_cover()
    build_founder_avatar()
    print("all done")
