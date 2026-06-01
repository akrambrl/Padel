import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
// 1) Vrai mobile (iPhone 12) : doit remplir l'écran
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mp = await m.newPage();
await mp.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await mp.waitForTimeout(1200);
await mp.screenshot({ path: '/tmp/mobile_full.png' });
// 2) Ordinateur : colonne centrée
const d = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
const dp = await d.newPage();
await dp.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await dp.waitForTimeout(1200);
await dp.screenshot({ path: '/tmp/desktop.png' });
await browser.close();
console.log('done');
