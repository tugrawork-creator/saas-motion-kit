// Renders the styleframes with the preinstalled Playwright Chromium (WebGL via SwiftShader here, a real GPU elsewhere).
//   NODE_PATH=$(npm root -g) node render.cjs [1920] [1 2 3]   → out/sf<N>-<W>.jpg
// ES modules can't load from file://, so this serves the folder on a local port first.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = __dirname;
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  const args = process.argv.slice(2);
  const width = args[0] && +args[0] > 100 ? +args.shift() : 1920;
  const frames = args.length ? args : ["1", "2", "3"];
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  fs.mkdirSync(path.join(root, "out"), { recursive: true });
  const browser = await chromium.launch();
  for (const f of frames) {
    const page = await browser.newPage({ viewport: { width, height: Math.round(width * 9 / 16) } });
    page.on("pageerror", (e) => console.error("pageerror:", e.message));
    page.on("console", (m) => { if (m.type() === "error") console.error("console:", m.text()); });
    const t = Date.now();
    await page.goto(`http://127.0.0.1:${port}/index.html?f=${f}`, { timeout: 120000 });
    await page.waitForFunction(() => window.__ready || window.__error, null, { timeout: 900000, polling: 500 });
    const err = await page.evaluate(() => window.__error);
    if (err) { console.error(err); process.exitCode = 1; continue; }
    const out = path.join(root, "out", `sf${f}-${width}.jpg`);
    await page.screenshot({ path: out, type: "jpeg", quality: 92, timeout: 600000 });
    console.log(`sf${f} ${width}px → ${path.relative(root, out)} (${((Date.now() - t) / 1000).toFixed(1)} s)`);
    await page.close();
  }
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
