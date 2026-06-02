import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/nopadel_home.png' });
// fiche club
await page.locator('article').first().click();
await page.waitForTimeout(900);
await page.screenshot({ path: '/tmp/nopadel_detail.png' });
// matchs
await page.locator('button:has-text("✕")').click().catch(()=>{});
await page.waitForTimeout(400);
await page.locator('nav button:has-text("Matchs Publics")').click();
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/nopadel_matchs.png' });
await browser.close();
console.log('done');
