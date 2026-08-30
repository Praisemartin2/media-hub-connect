// Direct TikTok public-profile stats via headless Chromium.
// Captures TikTok's own /api/post/item_list responses while scrolling
// the @ekabohome profile. Writes stats/tiktok/items.json.
const { chromium } = require('playwright');
const fs = require('fs');
const HANDLE = process.env.TT_HANDLE || 'ekabohome';
const CUTOFF = Date.parse('2025-09-01T00:00:00Z') / 1000;
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
  const ctx = await b.newContext({
    locale: 'en-US', timezoneId: 'America/New_York', viewport: { width: 1366, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  });
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.chrome = { runtime: {} };
  });
  const pg = await ctx.newPage();
  const items = new Map(); let oldest = Infinity; let responses = 0;
  pg.on('response', async r => {
    if (!r.url().includes('/api/post/item_list')) return;
    responses++;
    try {
      const j = JSON.parse(await r.text());
      for (const it of (j.itemList || [])) {
        items.set(it.id, { id: it.id, createTime: it.createTime, desc: (it.desc || '').slice(0, 150),
          stats: it.stats, duration: it.video && it.video.duration });
        if (it.createTime < oldest) oldest = it.createTime;
      }
      console.log(`batch: ${items.size} items` + (oldest < Infinity ? `, oldest ${new Date(oldest * 1000).toISOString().slice(0, 10)}` : ''));
    } catch (e) { }
  });
  await pg.goto(`https://www.tiktok.com/@${HANDLE}`, { waitUntil: 'load', timeout: 60000 });
  await pg.waitForTimeout(6000);
  for (let attempt = 0; attempt < 3 && items.size === 0; attempt++) {
    await pg.reload({ waitUntil: 'load' }).catch(() => { });
    await pg.waitForTimeout(7000);
  }
  for (let i = 0; i < 80 && items.size > 0; i++) {
    await pg.mouse.wheel(0, 2400);
    await pg.waitForTimeout(1400);
    if (oldest < CUTOFF - 86400 * 30) break;
  }
  await b.close();
  const out = [...items.values()].sort((a, b) => b.createTime - a.createTime);
  fs.mkdirSync('stats/tiktok', { recursive: true });
  fs.writeFileSync('stats/tiktok/items.json', JSON.stringify(out, null, 1));
  console.log(`TOTAL ${out.length} items (${responses} api responses)`);
  if (out.length === 0) process.exit(3);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
