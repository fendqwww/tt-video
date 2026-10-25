// рендер фото-карусели для тиктока из json-спеки в jpg 1080x1920.
// node tools/carousel.js posts/<папка>/spec.json
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:#0b1020;color:#f2f5ff;
 font-family:'Inter Display','Inter',sans-serif;overflow:hidden;position:relative}
.glow{position:absolute;width:1400px;height:1400px;border-radius:50%;
 background:radial-gradient(circle,rgba(76,141,255,.28),rgba(76,141,255,0) 65%);left:-500px;top:-450px}
.wrap{position:absolute;inset:150px 90px 170px 90px;display:flex;flex-direction:column;justify-content:center;gap:44px}
.num{font-weight:900;font-size:260px;line-height:.9;color:#4c8dff}
.title{font-weight:900;font-size:96px;line-height:1.05;letter-spacing:-1px}
.hook .title{font-size:118px}
.text{font-weight:500;font-size:52px;line-height:1.3;color:#c9d3ef}
.how{font-weight:600;font-size:42px;line-height:1.35;background:rgba(76,141,255,.14);
 border-left:10px solid #4c8dff;padding:30px 36px;border-radius:18px}
.how b{color:#8db5ff;font-weight:800}
.foot{position:absolute;left:90px;right:90px;bottom:90px;display:flex;justify-content:space-between;
 font-weight:700;font-size:36px;color:#7d8bb3}
.accent{color:#4c8dff}`;

function slide(s, i, n) {
  const parts = [];
  if (s.num) parts.push(`<div class="num">${s.num}</div>`);
  if (s.title) parts.push(`<div class="title">${s.title}</div>`);
  if (s.text) parts.push(`<div class="text">${s.text}</div>`);
  if (s.how) parts.push(`<div class="how">${s.how}</div>`);
  const right = i < n - 1 ? 'листай →' : '';
  return `<html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body><div class="glow"></div><div class="wrap ${s.kind || ''}">${parts.join('')}</div>
<div class="foot"><span>${i + 1} / ${n}</span><span>${right}</span></div></body></html>`;
}

(async () => {
  const specPath = process.argv[2];
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const out = path.dirname(specPath);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [i, s] of spec.slides.entries()) {
    await page.setContent(slide(s, i, spec.slides.length));
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, `${i + 1}.jpg`), type: 'jpeg', quality: 92 });
  }
  await browser.close();
  console.log(`${spec.slides.length} слайдов в ${out}`);
})();
