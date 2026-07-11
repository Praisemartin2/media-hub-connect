#!/usr/bin/env node
/**
 * Render the daily COFY Instagram image (1080x1350, 4:5 portrait).
 *
 * Usage: node scripts/ig/render-image.mjs <post.json> <out.png>
 *
 * Builds a branded SVG (cobalt #0064F0, yellow #FFBD12, sunburst motif,
 * COFY logo) from the post's headline/summary/source and rasterizes it
 * with sharp. Fonts: Oswald (display) + Inter (body) if installed on the
 * system, otherwise falls back to any bold sans available to fontconfig.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [, , postPath = "automation/out/post.json", outPath = "automation/out/post.png"] = process.argv;
const post = JSON.parse(readFileSync(postPath, "utf8"));

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const logoB64 = readFileSync(path.join(repoRoot, "src", "assets", "cofy-logo.png")).toString("base64");

const W = 1080;
const H = 1350;
const M = 84; // side margin
const COBALT = "#0064F0";
const YELLOW = "#FFBD12";
const DISPLAY = "'Oswald','Archivo','DejaVu Sans',sans-serif";
const BODY = "'Inter','DejaVu Sans',sans-serif";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(text, maxChars) {
  const lines = [];
  let cur = "";
  for (const w of String(text).split(/\s+/)) {
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

// Headline: pick a size that fits the text length.
const headline = String(post.headline || "").toUpperCase();
let hSize, hChars;
if (headline.length <= 48) [hSize, hChars] = [72, 18];
else if (headline.length <= 78) [hSize, hChars] = [58, 23];
else [hSize, hChars] = [50, 27];
const hLines = wrap(headline, hChars).slice(0, 5);
const hLineH = Math.round(hSize * 1.14);

const sLines = wrap(post.summary || "", 48).slice(0, 5);
const sSize = 30;
const sLineH = 44;

const dateStr = new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

// Vertical layout
let y = 348; // eyebrow baseline
const eyebrowY = y;
y += 62;
const hStartY = y + hSize;
y = hStartY + (hLines.length - 1) * hLineH;
const barY = y + 34;
const sStartY = barY + 30 + sSize;
y = sStartY + (sLines.length - 1) * sLineH;
const sourceY = Math.max(y + 70, 1150);

// Sunburst rays from the top-right corner
const rays = Array.from({ length: 7 }, (_, i) => {
  const a1 = 188 + i * 11;
  const a2 = a1 + 5;
  const r = 640;
  const cx = W + 40;
  const cy = -40;
  const p = (a) => `${cx + r * Math.cos((a * Math.PI) / 180)},${cy - r * Math.sin((a * Math.PI) / 180)}`;
  return `<polygon points="${cx},${cy} ${p(a1)} ${p(a2)}" fill="${YELLOW}" opacity="0.16"/>`;
}).join("");

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${W}" height="${H}" fill="${COBALT}"/>
  ${rays}

  <!-- Header: logo + wordmark -->
  <rect x="${M}" y="72" width="96" height="96" fill="#ffffff"/>
  <image x="${M + 12}" y="84" width="72" height="72" xlink:href="data:image/png;base64,${logoB64}"/>
  <text x="${M + 120}" y="116" font-family="${DISPLAY}" font-size="34" font-weight="600" fill="#ffffff" letter-spacing="1">COFY INC.</text>
  <text x="${M + 120}" y="152" font-family="${BODY}" font-size="21" fill="#ffffff" opacity="0.78">Creating Opportunities for Youth</text>

  <!-- Eyebrow -->
  <text x="${M}" y="${eyebrowY}" font-family="${DISPLAY}" font-size="27" font-weight="600" fill="${YELLOW}" letter-spacing="4">OPPORTUNITY WATCH — ${esc(String(post.region || "").toUpperCase())}</text>

  <!-- Headline -->
  ${hLines
    .map(
      (l, i) =>
        `<text x="${M}" y="${hStartY + i * hLineH}" font-family="${DISPLAY}" font-size="${hSize}" font-weight="600" fill="#ffffff">${esc(l)}</text>`,
    )
    .join("\n  ")}
  <rect x="${M}" y="${barY}" width="150" height="10" fill="${YELLOW}"/>

  <!-- Summary -->
  ${sLines
    .map(
      (l, i) =>
        `<text x="${M}" y="${sStartY + i * sLineH}" font-family="${BODY}" font-size="${sSize}" fill="#ffffff" opacity="0.92">${esc(l)}</text>`,
    )
    .join("\n  ")}

  <!-- Footer -->
  <text x="${M}" y="${sourceY}" font-family="${BODY}" font-size="24" fill="#ffffff" opacity="0.75">Source: ${esc(post.source_name)} · ${esc(dateStr)}</text>
  <rect x="${M}" y="${H - 132}" width="${W - 2 * M}" height="2" fill="#ffffff" opacity="0.25"/>
  <text x="${M}" y="${H - 76}" font-family="${DISPLAY}" font-size="30" font-weight="600" fill="${YELLOW}">@cofyinc</text>
  <text x="${W - M}" y="${H - 76}" text-anchor="end" font-family="${BODY}" font-size="23" fill="#ffffff" opacity="0.8">Helping Together. (2 Corinthians 1:11)</text>
</svg>`;

mkdirSync(path.dirname(outPath), { recursive: true });
const png = await sharp(Buffer.from(svg), { density: 96 }).png().toBuffer();
writeFileSync(outPath, png);
console.log(`Rendered ${outPath} (${png.length} bytes, ${W}x${H})`);
