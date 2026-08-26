// One-off image optimization pipeline for Prince Asamany Foundation site.
// Reads referenced source photos from public/media, writes downsized .webp
// into public/media/opt, and emits a blur-data.json map of base64 LQIP
// placeholders keyed by the optimized public path.
//
// Run: node scripts/optimize-images.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MEDIA = path.join('public', 'media');
const OUT = path.join(MEDIA, 'opt');
const BLUR_OUT = path.join('lib', 'blur-data.json');

// Only optimize the photos actually referenced in components/pages.
// (Gallery + hero + stories + collage + founder + about/programs + donate/OG/CTA replacements.)
const FILES = [
  // hero + collage + stories
  'IMG_4403_2.jpg', 'IMG_4479.jpg', 'IMG_6877.jpg',
  'IMG_6917.jpg',
  'IMG_6871.jpg', 'IMG_8203.jpg.jpeg', 'IMG_4488.jpg',
  // about / programs cards
  'IMG_8259.jpg.jpeg', 'IMG_6851.jpg', 'IMG_8277.jpg.jpeg',
  'IMG_8098.jpg.jpeg', 'IMG_8116.jpg.jpeg', 'IMG_6928.jpg',
  // founder profile (About page)
  'IMG_6965.jpg', 'IMG_6899_1.jpg',
  // founder + leadership gallery + video poster
  'FB_IMG_1763729825877.jpg', 'IMG-20251118-WA0048.jpg.jpeg',
  'IMG-20251115-WA0160.jpg.jpeg', 'IMG-20251118-WA0044.jpg.jpeg',
  'IMG-20251118-WA0042.jpg.jpeg', 'WhatsApp Image 2026-08-20 at 18.25.51.jpeg',
  'IMG-20251118-WA0038.jpg.jpeg', 'IMG-20251118-WA0040.jpg.jpeg',
  'IMG-20251118-WA0043.jpg.jpeg',
  'IMG-20251115-WA0157.jpg.jpeg', 'IMG-20251115-WA0161.jpg.jpeg',
  'IMG-20251115-WA0163.jpg.jpeg', 'WhatsApp Image 2026-08-20 at 18.25.51 (1).jpeg',
  // award gallery field photos
  'IMG_6846.jpg', 'IMG_6876.jpg', 'IMG_6889.jpg',
  'IMG_4388.jpg', 'IMG_6934.jpg',
  // donate "why support" + about empowerment card
  'IMG_6926.jpg', 'IMG_8208.jpg.jpeg',
  // home asymmetric cards
  'IMG_6848.jpg',
  // video poster (frame extracted from award-night-highlights.mp4 @95s)
  'award-night-poster.jpg',
  // replacements for AI placeholders (about hero / donate / CTA / OG)
  'IMG_6885.jpg', 'IMG_6863.jpg', 'IMG_6890.jpg',
  // free deworming exercise (Forestry Commission Training Centre, July 2026)
  'IMG-20260727-WA0008.jpg.jpeg', 'IMG-20260727-WA0011.jpg.jpeg',
  'IMG-20260727-WA0017.jpg.jpeg', 'IMG-20260727-WA0014.jpg.jpeg',
  'IMG-20260727-WA0018.jpg.jpeg',
  // farmers' engagement at Akyawkrom (July 2026)
  'IMG-20260713-WA0030.jpg.jpeg', 'IMG-20260713-WA0004.jpg.jpeg',
  'IMG-20260713-WA0041.jpg.jpeg', 'IMG-20260713-WA0020.jpg.jpeg',
  'IMG-20260713-WA0039.jpg.jpeg',
];

// Max width per image. Full-bleed backgrounds get more; small cards get less.
const WIDTHS = {
  'IMG_4403_2.jpg': 2400,        // hero bg full-bleed
  'IMG_6965.jpg': 1800,          // about founder portrait (large feature)
  'IMG_8098.jpg.jpeg': 2000,     // programs health feature (50vw)
  'IMG_6885.jpg': 2000,          // about hero bg
  'IMG_6863.jpg': 2000,          // donate bg / og
  'IMG_6890.jpg': 2000,          // cta bg
};
const DEFAULT_WIDTH = 1600;

fs.mkdirSync(OUT, { recursive: true });

const blurMap = {};
let done = 0;

for (const file of FILES) {
  const src = path.join(MEDIA, file);
  if (!fs.existsSync(src)) {
    console.warn('SKIP (missing):', file);
    continue;
  }
  // Output name: strip trailing .jpeg/.jpg noise, always .webp
  const base = file.replace(/\.(jpe?g)(\.jpe?g)?$/i, '');
  const outName = base + '.webp';
  const outPath = path.join(OUT, outName);
  const publicPath = '/media/opt/' + outName;
  const width = WIDTHS[file] || DEFAULT_WIDTH;

  const input = sharp(src).rotate(); // respect EXIF orientation

  await input
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outPath);

  // Tiny blur placeholder (20px wide webp -> base64 data URI)
  const blurBuf = await sharp(src)
    .rotate()
    .resize({ width: 20 })
    .webp({ quality: 40 })
    .toBuffer();
  blurMap[publicPath] = `data:image/webp;base64,${blurBuf.toString('base64')}`;

  const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`OK ${file} -> ${publicPath} (${kb}KB, w<=${width})`);
  done++;
}

fs.writeFileSync(BLUR_OUT, JSON.stringify(blurMap, null, 2));
console.log(`\nDONE: ${done} images optimized. Blur map -> ${BLUR_OUT}`);
