// Dev harness: renders the 3D world at chosen times, fast, without the full HyperFrames pipeline.
//   NODE_PATH=$(npm root -g) node tools/frames.cjs [--scale 0.5] [--out dir] 1.2 4.4 9.5 ...
// It serves the project, opens index.html in Chromium with SwiftShader WebGL (the same software path the
// HyperFrames engine uses here), waits for window.__hf.buildReady, then fires hf-seek events itself.
// Overlays (sub-compositions) are not mounted here: use `npx hyperframes snapshot` for the real composite.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  const args = process.argv.slice(2);
  let scale = 0.5, out = path.join(root, "snapshots", "dev");
  const times = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--scale") scale = +args[++i];
    else if (args[i] === "--out") out = path.resolve(args[++i]);
    else times.push(+args[i]);
  }
  fs.mkdirSync(out, { recursive: true });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on("pageerror", (e) => console.error("pageerror:", e.message));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console.error("console:", m.text()); });
  // the variable the composition reads for its draft scale
  await page.addInitScript((s) => { window.__timelines = {}; window.__hyperframes = { getVariables: () => ({ glScale: s }) }; }, scale);
  const t0 = Date.now();
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
  await page.waitForFunction(() => window.__hf && window.__hf.buildReady && window.__hf.buildReady["agentic-world"], null, { timeout: 60000 });
  await page.evaluate(() => window.__hf.buildReady["agentic-world"]);
  console.log(`world ready in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  for (const t of times) {
    const s = Date.now();
    await page.evaluate((tt) => { window.__hfThreeTime = tt; window.dispatchEvent(new CustomEvent("hf-seek", { detail: { time: tt, waitUntil() {} } })); }, t);
    const file = path.join(out, `t${t.toFixed(2).padStart(5, "0")}.jpg`);
    await page.locator("#gl").screenshot({ path: file, type: "jpeg", quality: 88 });
    console.log(`t=${t} → ${path.relative(root, file)} (${((Date.now() - s) / 1000).toFixed(2)} s)`);
  }
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
