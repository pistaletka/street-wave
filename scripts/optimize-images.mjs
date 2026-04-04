import sharp from "sharp";
import { readdir, stat, mkdir, copyFile } from "fs/promises";
import { join, relative, dirname, extname } from "path";

const PUBLIC = "public";
const BACKUP = "_originals";
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 80;
const MIN_SIZE = 200 * 1024; // skip files < 200KB

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXTS.has(extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(PUBLIC);
  console.log(`Found ${files.length} images`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const s = await stat(file);
    if (s.size < MIN_SIZE) {
      skipped++;
      continue;
    }

    totalBefore += s.size;

    // Backup original
    const rel = relative(PUBLIC, file);
    const backupPath = join(BACKUP, rel);
    await mkdir(dirname(backupPath), { recursive: true });
    await copyFile(file, backupPath);

    try {
      const meta = await sharp(file).metadata();
      const ext = extname(file).toLowerCase();

      let pipeline = sharp(file).rotate(); // auto-rotate based on EXIF

      // Resize if wider than MAX_WIDTH
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }

      // Convert PNG photos to JPEG (if no alpha channel)
      if (ext === ".png" && !meta.hasAlpha) {
        const buf = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
        // Save as JPEG with .png extension — Next.js Image will re-encode anyway
        // Actually, keep as optimized PNG to avoid confusion
        const pngBuf = await sharp(file).rotate()
          .resize(MAX_WIDTH, null, { withoutEnlargement: true })
          .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
          .toBuffer();
        // Use whichever is smaller
        if (buf.length < pngBuf.length) {
          await sharp(buf).toFile(file);
        } else {
          await sharp(pngBuf).toFile(file);
        }
        const after = (await stat(file)).size;
        totalAfter += after;
      } else if (ext === ".png") {
        // PNG with alpha — keep as PNG
        await pipeline
          .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
          .toFile(file + ".tmp");
        const { rename } = await import("fs/promises");
        await rename(file + ".tmp", file);
        const after = (await stat(file)).size;
        totalAfter += after;
      } else {
        // JPEG/WebP
        await pipeline
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toFile(file + ".tmp");
        const { rename } = await import("fs/promises");
        await rename(file + ".tmp", file);
        const after = (await stat(file)).size;
        totalAfter += after;
      }

      processed++;
      const afterSize = (await stat(file)).size;
      const pct = ((1 - afterSize / s.size) * 100).toFixed(0);
      if (s.size > 1_000_000) {
        console.log(`  ${rel}: ${(s.size / 1e6).toFixed(1)}MB → ${(afterSize / 1e6).toFixed(1)}MB (-${pct}%)`);
      }
    } catch (err) {
      console.error(`  ERROR ${rel}: ${err.message}`);
      // Restore from backup on error
      await copyFile(backupPath, file);
    }
  }

  console.log(`\nDone: ${processed} processed, ${skipped} skipped (< 200KB)`);
  console.log(`Before: ${(totalBefore / 1e6).toFixed(0)}MB → After: ${(totalAfter / 1e6).toFixed(0)}MB`);
  console.log(`Originals backed up to ${BACKUP}/`);
}

main().catch(console.error);
