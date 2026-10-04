"""Build docs/index.html (the theme gallery) from docs/themes/data/*.json.

Usage: python tools/build_gallery.py
"""
import glob, html, json, os

ROOT = os.path.join(os.path.dirname(__file__), "..", "docs")
CATS = [
    ("product-ui", "Product UI as the stage"), ("type", "Typography & graphic systems"), ("material", "Material & 3D"),
    ("light", "Light, optics & texture"), ("metaphor", "Metaphor concepts"), ("signature", "Signature directions"),
    ("data", "Data storytelling"), ("character", "Characters & mascots"), ("era", "Art movements & eras"),
    ("camera", "Camera & edit grammar"), ("hardware-ad", "Hardware-ad grammar"),
]
CAT_NAME = dict(CATS)
dots = lambda n: "●" * int(n) + "○" * (3 - int(n))

themes = [json.load(open(f, encoding="utf-8")) for f in sorted(glob.glob(os.path.join(ROOT, "themes", "data", "*.json")))]
counts = {c: sum(1 for t in themes if t["category"] == c) for c, _ in CATS}

cards = []
for t in themes:
    e = html.escape
    cards.append(f"""
  <a class="card" href="{e(t['file'])}" data-cat="{e(t['category'])}" data-effort="{e(t['fit']['effort'])}">
    <img src="themes/thumbs/{t['id']}.jpg" alt="" loading="lazy">
    <div class="meta">
      <div class="k"><span>{t['id']}</span><span>{e(CAT_NAME.get(t['category'], t['category']))}</span></div>
      <h3>{e(t['name'])}</h3>
      <p>{e(t['summary'])}</p>
      <div class="fit"><span>read {dots(t['fit']['readability'])}</span><span>trust {dots(t['fit']['trust'])}</span><span>effort {e(t['fit']['effort'])}</span></div>
    </div>
  </a>""")

filters = "".join(f'<button data-c="{c}">{html.escape(n)} <i>{counts[c]}</i></button>' for c, n in CATS)

page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{len(themes)} Motion Themes — saas-motion-kit</title>
<meta name="description" content="{len(themes)} storyboard themes for software promo videos made with HyperFrames + Claude Code, all shown on the same fictional product.">
<link rel="icon" href="assets/brand/acme-mark.svg">
<link rel="stylesheet" href="assets/brand/acme.css">
<style>
*{{box-sizing:border-box;margin:0}}
body{{background:var(--paper);color:var(--ink);font-family:var(--sans);padding:48px 40px 80px}}
header{{max-width:1360px;margin:0 auto 28px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end}}
.kicker{{font:600 12px var(--mono);letter-spacing:.16em;color:var(--brand-deep);text-transform:uppercase}}
h1{{font:400 64px/1 var(--serif);letter-spacing:-.01em;margin:10px 0 14px}} h1 em{{color:var(--brand-deep)}}
.dek{{max-width:760px;font-size:17px;line-height:1.55;color:#33415C}}
.dek a{{color:var(--brand-deep)}}
.logo{{display:flex;align-items:center;gap:10px;font:800 18px var(--sans)}} .logo img{{width:36px;height:36px}}
.bar{{max-width:1360px;margin:0 auto 22px;display:flex;flex-wrap:wrap;gap:8px}}
.bar button{{font:600 13px var(--sans);border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:100px;padding:8px 14px;cursor:pointer}}
.bar button i{{font:500 11px var(--mono);font-style:normal;color:var(--muted);margin-left:4px}}
.bar button.on{{background:var(--ink);color:#fff;border-color:var(--ink)}} .bar button.on i{{color:#9fb0c9}}
.grid{{max-width:1360px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:22px}}
.card{{display:block;background:#fff;border-radius:14px;overflow:hidden;text-decoration:none;color:inherit;border:1px solid var(--line);transition:transform .15s,box-shadow .15s}}
.card:hover{{transform:translateY(-2px);box-shadow:0 10px 30px rgba(14,23,38,.12)}}
.card img{{display:block;width:100%;height:auto;background:#ECEBE6;border-bottom:1px solid var(--line)}}
.meta{{padding:14px 16px 16px}}
.k{{display:flex;justify-content:space-between;font:500 11px var(--mono);letter-spacing:.08em;color:var(--muted);text-transform:uppercase}}
.card h3{{font:400 28px/1.1 var(--serif);margin:6px 0 6px}}
.card p{{font-size:14px;line-height:1.5;color:#33415C}}
.fit{{display:flex;gap:12px;margin-top:10px;font:500 11px var(--mono);color:var(--muted)}}
footer{{max-width:1360px;margin:48px auto 0;font-size:13px;color:var(--muted);line-height:1.6}}
@media(max-width:700px){{body{{padding:24px 16px}} header{{grid-template-columns:1fr}} h1{{font-size:44px}} .grid{{grid-template-columns:1fr}}}}
</style>
</head>
<body>
<header>
  <div>
    <div class="kicker">saas-motion-kit · theme gallery</div>
    <h1>{len(themes)} ways to tell <em>one</em> product story</h1>
    <p class="dek">Every sheet below tells the same 45-second story about the same fictional product, <b>Acme Pulse</b>, in a different visual theme. Each one has four key frames, a six-part component kit, three motion techniques and notes on how to adapt it to your own product. Pick one and hand it to Claude Code with <a href="https://github.com/heygen-com/hyperframes">HyperFrames</a>. <a href="transitions/">Transition atlas →</a></p>
  </div>
  <div class="logo"><img src="assets/brand/acme-mark.svg" alt="">Acme <span style="font-weight:500;color:var(--muted)">(fictional)</span></div>
</header>
<nav class="bar"><button class="on" data-c="all">All <i>{len(themes)}</i></button>{filters}</nav>
<main class="grid">{''.join(cards)}
</main>
<footer>Acme and Acme Pulse are fictional, and every number shown in the sheets is invented for the demo. Fonts: Manrope, Instrument Serif and JetBrains Mono (SIL OFL 1.1).</footer>
<script>
const bs = document.querySelectorAll(".bar button"), cs = document.querySelectorAll(".card");
bs.forEach(b => b.onclick = () => {{
  bs.forEach(x => x.classList.toggle("on", x === b));
  cs.forEach(c => c.style.display = (b.dataset.c === "all" || c.dataset.cat === b.dataset.c) ? "" : "none");
}});
</script>
</body>
</html>
"""
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(page)
print("wrote docs/index.html with", len(themes), "themes")
