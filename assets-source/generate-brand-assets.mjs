// Regenerates every raster brand asset from the SVG sources in this folder:
// favicons, touch/manifest icons, src/app/favicon.ico and public/og-image.jpg.
// Run from the project root:  node assets-source/generate-brand-assets.mjs
import fs from "node:fs";
import sharp from "sharp";

const icon = fs.readFileSync("assets-source/icon-dentacare-aruba.svg");
const logo = fs.readFileSync("assets-source/logo-dentacare-aruba.svg", "utf8");

const png = (size) => sharp(icon, { density: 384 }).resize(size, size).png().toBuffer();

for (const [file, size] of [
  ["public/favicon-16x16.png", 16],
  ["public/favicon-32x32.png", 32],
  ["public/apple-touch-icon.png", 180],
  ["public/android-chrome-192x192.png", 192],
  ["public/android-chrome-512x512.png", 512],
]) {
  fs.writeFileSync(file, await png(size));
}

// favicon.ico holding PNG-encoded 16/32/48 images (supported by every
// current browser): 6-byte header, one 16-byte entry per image, then data.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(size, entry);
  header.writeUInt8(size, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
});
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...images]));

// Open Graph share image, 1200x630: ivory card, centred wordmark, gold rules.
const inner = logo.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="#f5eedd"/><stop offset="100%" stop-color="#fffdfa"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="36" y="36" width="1128" height="558" rx="28" fill="none" stroke="#dcc796" stroke-width="2"/>
  <g transform="translate(300 215) scale(2)">${inner}</g>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 90 }).toFile("public/og-image.jpg");

console.log("Brand assets regenerated.");
