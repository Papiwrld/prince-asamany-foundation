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

// Dynamically find all images in the media directory
const FILES = fs.readdirSync(MEDIA).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return (ext === '.jpg' || ext === '.jpeg' || ext === '.png');
});

// Max width per image. Full-bleed backgrounds get more; small cards get less.
const WIDTHS = {
  'IMG_4403_2.jpg': 2400,        // volunteer gift outreach
  'IMG_6871.jpg': 2400,          // hero bg full-bleed community & founder
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
