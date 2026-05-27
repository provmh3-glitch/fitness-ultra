const fs = require('fs');
const path = require('path');

async function main() {
  const sharp = require('sharp');
  const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');
  const outDir = path.join(__dirname, '..', 'public');
  const sizes = [180, 152, 167, 120, 1024];

  if (!fs.existsSync(svgPath)) {
    console.error('SVG source not found at', svgPath);
    process.exit(1);
  }

  for (const size of sizes) {
    const outPath = path.join(outDir, `apple-touch-icon-${size}x${size}.png`);
    try {
      await sharp(svgPath).resize(size, size).png().toFile(outPath);
      console.log('Wrote', outPath);
    } catch (err) {
      console.error('Failed to write', outPath, err);
    }
  }
  console.log('Done generating icons.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
