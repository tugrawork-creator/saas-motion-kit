// Renders storyboard frames and boards with the preinstalled Playwright Chromium.
//   NODE_PATH=$(npm root -g) node render.cjs frames A1 A2 …   → frames/<id>.jpg (1600×900)
//   NODE_PATH=$(npm root -g) node render.cjs frames all
//   NODE_PATH=$(npm root -g) node render.cjs boards            → boards/*.jpg from index.html sections
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const here = __dirname;
const ids = [];
for (const v of "ABCDE") for (let s = 1; s <= 7; s++) ids.push(v + s);

(async () => {
  const [mode = "frames", ...rest] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  page.on("console", (m) => { if (m.type() === "error") console.error("console:", m.text()); });
  page.on("pageerror", (e) => console.error("pageerror:", e.message));

  if (mode === "frames") {
    const list = !rest.length || rest[0] === "all" ? ids : rest;
    fs.mkdirSync(path.join(here, "frames"), { recursive: true });
    for (const id of list) {
      await page.goto("file://" + path.join(here, "frames.html") + "?f=" + id);
      await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
      await page.waitForTimeout(150);
      const out = path.join(here, "frames", id + ".jpg");
      await page.locator("#frame-" + id).screenshot({ path: out, type: "jpeg", quality: 86 });
      console.log("frame", id, "→", path.relative(here, out));
    }
  } else if (mode === "boards") {
    fs.mkdirSync(path.join(here, "boards"), { recursive: true });
    await page.setViewportSize({ width: 1800, height: 1000 });
    await page.goto("file://" + path.join(here, "index.html"));
    await page.waitForFunction(() => document.fonts.status === "loaded", null, { timeout: 30000 });
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    for (const sel of rest.length ? rest : await page.$$eval("[data-board]", (els) => els.map((e) => e.dataset.board))) {
      const out = path.join(here, "boards", sel + ".jpg");
      await page.locator(`[data-board="${sel}"]`).screenshot({ path: out, type: "jpeg", quality: 88 });
      console.log("board", sel, "→", path.relative(here, out));
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
