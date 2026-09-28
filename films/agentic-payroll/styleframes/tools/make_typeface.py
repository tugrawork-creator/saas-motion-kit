"""Build a three.js typeface JSON (TextGeometry) from the bundled Inter variable font.

Instantiates Inter at a fixed weight, removes overlapping contours (needs skia-pathops), and keeps only
the characters the 3D titles need, so the file stays small.

Usage: python tools/make_typeface.py [weight] [chars]
"""
import json, os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.pens.basePen import decomposeQuadraticSegment

here = os.path.dirname(os.path.abspath(__file__))
weight = int(sys.argv[1]) if len(sys.argv) > 1 else 800
chars = sys.argv[2] if len(sys.argv) > 2 else "%0123456789"

font = TTFont(os.path.join(here, "..", "assets", "fonts", "inter-latin-wght-normal.woff2"))
font = instancer.instantiateVariableFont(font, {"wght": weight}, overlap=instancer.OverlapMode.REMOVE)
gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm
def r(v):
    v = round(float(v), 1)
    return str(int(v)) if v == int(v) else str(v)

glyphs = {}
for ch in chars:
    g = gs[cmap[ord(ch)]]
    pen = DecomposingRecordingPen(gs)
    g.draw(pen)
    out, xs = [], []
    for op, args in pen.value:
        if op == "moveTo":
            out += ["m", r(args[0][0]), r(args[0][1])]
        elif op == "lineTo":
            out += ["l", r(args[0][0]), r(args[0][1])]
        elif op == "qCurveTo":
            if args[-1] is None:
                raise SystemExit(f"'{ch}': contour without on-curve points is not supported")
            for c, e in decomposeQuadraticSegment(args):
                out += ["q", r(e[0]), r(e[1]), r(c[0]), r(c[1])]
        elif op == "curveTo":
            c1, c2, e = args
            out += ["b", r(e[0]), r(e[1]), r(c1[0]), r(c1[1]), r(c2[0]), r(c2[1])]
        for pt in args:
            if pt:
                xs.append(pt[0])
    glyphs[ch] = {"ha": g.width, "x_min": round(min(xs)) if xs else 0, "x_max": round(max(xs)) if xs else 0, "o": " ".join(out)}

hhea, post, head = font["hhea"], font["post"], font["head"]
data = {
    "glyphs": glyphs, "familyName": f"Inter {weight}", "ascender": hhea.ascent, "descender": hhea.descent,
    "underlinePosition": post.underlinePosition, "underlineThickness": post.underlineThickness,
    "boundingBox": {"xMin": head.xMin, "yMin": head.yMin, "xMax": head.xMax, "yMax": head.yMax},
    "resolution": upm, "original_font_information": {"license": "SIL Open Font License 1.1 (Inter)"},
}
out_path = os.path.join(here, "..", "assets", f"inter-{weight}.typeface.json")
json.dump(data, open(out_path, "w"), separators=(",", ":"))
print(f"wrote {os.path.relpath(out_path)}: {len(glyphs)} glyphs, {os.path.getsize(out_path)} bytes")
