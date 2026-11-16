#!/usr/bin/env node
/**
 * Render branded COFY event posters in the sizes the social accounts need.
 *
 * Usage: node scripts/promo/render-event.mjs <event.json> <out-dir>
 *
 * The JSON takes: eyebrow, title, date, time, place, cost, cta, note.
 * Three files come out, sharing one layout engine so the set reads as
 * one campaign:
 *   instagram-4x5.png   1080x1350  (feed / Threads)
 *   square-1x1.png      1080x1080  (feed, Facebook, WhatsApp)
 *   linkedin-16x9.png   1200x627   (LinkedIn & X link cards)
 *
 * Brand: cobalt #0064F0, yellow #FFBD12, sunburst motif, COFY logo.
 * Fonts: Inter Display (headings) + Inter (body) when installed, else
 * whatever bold sans fontconfig offers.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [, , specPath, outDir = "automation/out/promo"] = process.argv;
if (!specPath) {
  console.error("usage: render-event.mjs <event.json> <out-dir>");
  process.exit(1);
}
const ev = JSON.parse(readFileSync(specPath, "utf8"));

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const logoB64 = readFileSync(path.join(repoRoot, "src", "assets", "cofy-logo.png")).toString("base64");

const COBALT = "#0064F0";
const YELLOW = "#FFBD12";
const DISPLAY = "'Inter Display','Inter','DejaVu Sans',sans-serif";
const BODY = "'Inter','DejaVu Sans',sans-serif";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function wrap(text, maxChars) {
  const lines = [];
  let cur = "";
  for (const w of String(text ?? "").split(/\s+/).filter(Boolean)) {
    if (cur && (cur + " " + w).length > maxChars) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Sunburst rays fanning out of the top-right corner. */
function rays(W, scale = 1) {
  return Array.from({ length: 7 }, (_, i) => {
    const a1 = 188 + i * 11;
    const a2 = a1 + 5;
    const r = 640 * scale;
    const cx = W + 40;
    const cy = -40;
    const p = (a) =>
      `${cx + r * Math.cos((a * Math.PI) / 180)},${cy - r * Math.sin((a * Math.PI) / 180)}`;
    return `<polygon points="${cx},${cy} ${p(a1)} ${p(a2)}" fill="${YELLOW}" opacity="0.16"/>`;
  }).join("");
}

/**
 * One poster. `v` carries the per-size measurements so the three
 * crops stay in proportion instead of being scaled copies.
 */
function poster(v) {
  const { W, H, M, logo, titleSize, titleChars, metaSize, lead } = v;

  const tLines = wrap(ev.title, titleChars).slice(0, 5);
  const tLineH = Math.round(titleSize * 1.08);

  // Vertical rhythm, measured down from the header.
  let y = lead;
  const eyebrowY = y;
  y += v.eyebrowGap;
  const dateY = y;
  y += v.dateGap;
  const tStartY = y + titleSize;
  y = tStartY + (tLines.length - 1) * tLineH;
  const barY = y + Math.round(titleSize * 0.46);
  let mY = barY + v.metaGap + metaSize;

  const metaRows = [
    ["●", ev.place],
    ["●", ev.time],
    ["●", ev.cost],
  ].filter(([, t]) => t);

  const metaSvg = metaRows
    .map(([dot, t], i) => {
      const yy = mY + i * Math.round(metaSize * 1.62);
      return `<text x="${M}" y="${yy}" font-family="${BODY}" font-size="${metaSize}" fill="#ffffff" opacity="0.95"><tspan fill="${YELLOW}">${dot}</tspan>  ${esc(t)}</text>`;
    })
    .join("\n  ");
  const metaEndY = mY + (metaRows.length - 1) * Math.round(metaSize * 1.62);

  // CTA pill, sized to its text.
  const ctaText = String(ev.cta || "").toUpperCase();
  const ctaSize = v.ctaSize;
  const ctaW = Math.round(ctaText.length * ctaSize * 0.62) + ctaSize * 2;
  const ctaH = Math.round(ctaSize * 2.3);
  const ctaY = metaEndY + v.ctaGap;

  const noteLines = ev.note ? wrap(ev.note, v.noteChars).slice(0, 2) : [];
  const noteY = ctaY + ctaH + v.noteGap;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${W}" height="${H}" fill="${COBALT}"/>
  ${rays(W, v.rayScale)}

  <!-- Header: logo + wordmark -->
  <rect x="${M}" y="${v.headerY}" width="${logo + 24}" height="${logo + 24}" fill="#ffffff"/>
  <image x="${M + 12}" y="${v.headerY + 12}" width="${logo}" height="${logo}" xlink:href="data:image/png;base64,${logoB64}"/>
  <text x="${M + logo + 48}" y="${v.headerY + Math.round(logo * 0.47)}" font-family="${DISPLAY}" font-size="${v.brandSize}" font-weight="700" fill="#ffffff" letter-spacing="1">COFY INC.</text>
  <text x="${M + logo + 48}" y="${v.headerY + Math.round(logo * 0.47) + v.brandSize + 4}" font-family="${BODY}" font-size="${Math.round(v.brandSize * 0.62)}" fill="#ffffff" opacity="0.78">Creating Opportunities for Youth</text>

  <!-- Eyebrow -->
  <text x="${M}" y="${eyebrowY}" font-family="${DISPLAY}" font-size="${v.eyebrowSize}" font-weight="700" fill="${YELLOW}" letter-spacing="4">${esc(String(ev.eyebrow || "").toUpperCase())}</text>

  <!-- Date -->
  <text x="${M}" y="${dateY}" font-family="${DISPLAY}" font-size="${v.dateSize}" font-weight="700" fill="#ffffff">${esc(ev.date)}</text>

  <!-- Title -->
  ${tLines
    .map(
      (l, i) =>
        `<text x="${M}" y="${tStartY + i * tLineH}" font-family="${DISPLAY}" font-size="${titleSize}" font-weight="700" fill="#ffffff">${esc(l)}</text>`,
    )
    .join("\n  ")}
  <rect x="${M}" y="${barY}" width="${v.barW}" height="${v.barH}" fill="${YELLOW}"/>

  <!-- Where / when / cost -->
  ${metaSvg}

  <!-- Call to action -->
  <rect x="${M}" y="${ctaY}" width="${ctaW}" height="${ctaH}" fill="${YELLOW}"/>
  <text x="${M + ctaW / 2}" y="${ctaY + Math.round(ctaH * 0.66)}" text-anchor="middle" font-family="${DISPLAY}" font-size="${ctaSize}" font-weight="700" fill="#0A1A3C" letter-spacing="1">${esc(ctaText)}</text>

  ${noteLines
    .map(
      (l, i) =>
        `<text x="${M}" y="${noteY + i * Math.round(v.noteSize * 1.5)}" font-family="${BODY}" font-size="${v.noteSize}" fill="#ffffff" opacity="0.8">${esc(l)}</text>`,
    )
    .join("\n  ")}

  <!-- Footer -->
  <rect x="${M}" y="${H - v.footerBar}" width="${W - 2 * M}" height="2" fill="#ffffff" opacity="0.25"/>
  <text x="${M}" y="${H - v.footerText}" font-family="${DISPLAY}" font-size="${v.footerSize}" font-weight="700" fill="${YELLOW}">@cofyinc</text>
  <text x="${W - M}" y="${H - v.footerText}" text-anchor="end" font-family="${BODY}" font-size="${Math.round(v.footerSize * 0.76)}" fill="#ffffff" opacity="0.8">www.cofyouth.org</text>
</svg>`;
}

const variants = {
  "instagram-4x5": {
    W: 1080, H: 1350, M: 84, logo: 72, headerY: 72, brandSize: 34,
    lead: 330, eyebrowSize: 26, eyebrowGap: 70, dateSize: 46, dateGap: 72,
    titleSize: 62, titleChars: 21, barW: 150, barH: 10,
    metaSize: 28, metaGap: 46, ctaSize: 32, ctaGap: 74,
    noteSize: 23, noteChars: 54, noteGap: 54,
    footerBar: 132, footerText: 76, footerSize: 30, rayScale: 1,
  },
  "square-1x1": {
    W: 1080, H: 1080, M: 80, logo: 64, headerY: 62, brandSize: 31,
    lead: 268, eyebrowSize: 24, eyebrowGap: 62, dateSize: 42, dateGap: 58,
    titleSize: 54, titleChars: 24, barW: 140, barH: 9,
    metaSize: 26, metaGap: 36, ctaSize: 29, ctaGap: 50,
    noteSize: 21, noteChars: 58, noteGap: 44,
    footerBar: 112, footerText: 62, footerSize: 27, rayScale: 0.9,
  },
  "linkedin-16x9": {
    W: 1200, H: 627, M: 64, logo: 46, headerY: 36, brandSize: 24,
    lead: 168, eyebrowSize: 19, eyebrowGap: 40, dateSize: 32, dateGap: 44,
    titleSize: 38, titleChars: 34, barW: 110, barH: 7,
    metaSize: 20, metaGap: 26, ctaSize: 22, ctaGap: 28,
    noteSize: 0, noteChars: 0, noteGap: 0,
    footerBar: 50, footerText: 22, footerSize: 20, rayScale: 0.72,
  },
};

mkdirSync(outDir, { recursive: true });
for (const [name, v] of Object.entries(variants)) {
  const svg = poster(v);
  const png = await sharp(Buffer.from(svg), { density: 96 }).png().toBuffer();
  const out = path.join(outDir, `${name}.png`);
  writeFileSync(out, png);
  console.log(`Rendered ${out} (${v.W}x${v.H}, ${Math.round(png.length / 1024)} KB)`);
}
