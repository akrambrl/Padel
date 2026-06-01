import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const tabs = ['Recherche','Matchs Publics','Discussions','Profil'];
for (let i=0;i<tabs.length;i++){
  await page.locator(`nav button:has-text("${tabs[i]}")`).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/tab${i}.png` });
}
// Onglet Infos club : revenir sur Recherche, ouvrir un club, cliquer Infos club
await page.locator('nav button:has-text("Recherche")').click();
await page.waitForTimeout(500);
await page.locator('article').first().click();
await page.waitForTimeout(800);
await page.locator('button:has-text("Infos club")').click();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/infos.png' });
await browser.close();
console.log('done');
