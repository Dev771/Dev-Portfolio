#!/usr/bin/env python3
"""Turn scripts/avatar.png into the pixel sprite the site uses.

Writes public/sprite.png (one pixel per sprite cell, with a violet outline; the
site scales it up with `image-rendering: pixelated`) and public/favicon.png.
Needs Pillow. Run again only when the avatar changes:

    python scripts/make-sprite.py
"""
from collections import Counter
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ROWS = 60
OUTLINE = (123, 97, 255, 255)  # --violet


def cells(rows):
    im = Image.open(ROOT / "scripts" / "avatar.png").convert("RGBA")
    im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 40 else 0).getbbox())
    w, h = im.size
    step = h / rows
    cols = round(w / step)
    flat = Image.new("RGB", im.size, (20, 18, 42))
    flat.paste(im, mask=im.getchannel("A"))
    q = flat.quantize(colors=16, method=Image.Quantize.MAXCOVERAGE, kmeans=3, dither=Image.Dither.NONE)
    pal, qp, ap = q.getpalette(), q.load(), im.getchannel("A").load()
    out = {}
    for r in range(rows):
        y0, y1 = int(r * step), min(h, int((r + 1) * step))
        for c in range(cols):
            x0, x1 = int(c * step), min(w, int((c + 1) * step))
            # vote over the middle of each block only, so neighbouring pixels don't bleed in
            ix0, ix1 = x0 + int((x1 - x0) * 0.2), max(x0 + int((x1 - x0) * 0.8), x0 + 1)
            iy0, iy1 = y0 + int((y1 - y0) * 0.2), max(y0 + int((y1 - y0) * 0.8), y0 + 1)
            votes, n = Counter(), 0
            for yy in range(iy0, iy1):
                for xx in range(ix0, ix1):
                    n += 1
                    if ap[xx, yy] > 128:
                        votes[qp[xx, yy]] += 1
            if n and sum(votes.values()) >= n / 2:
                idx = votes.most_common(1)[0][0]
                out[(r, c)] = tuple(pal[idx * 3: idx * 3 + 3]) + (255,)
    return out, cols


def main():
    sprite, cols = cells(ROWS)
    outline = {
        (r + dr, c + dc) for (r, c) in sprite for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1))
    } - set(sprite)
    # one spare cell on every side so the outline fits; the bottom edge stays cut like the avatar
    img = Image.new("RGBA", (cols + 2, ROWS + 1), (0, 0, 0, 0))
    for (r, c) in outline:
        if 0 <= r + 1 < ROWS + 1:
            img.putpixel((c + 1, r + 1), OUTLINE)
    for (r, c), color in sprite.items():
        img.putpixel((c + 1, r + 1), color)
    img.save(ROOT / "public" / "sprite.png")

    head = img.crop((0, 0, img.width, img.width))  # top square: cap and face
    head.resize((64, 64), Image.NEAREST).save(ROOT / "public" / "favicon.png")
    print(f"sprite {img.width}x{img.height}")


if __name__ == "__main__":
    main()
