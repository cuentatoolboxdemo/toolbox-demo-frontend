import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public/icons", { recursive: true });

async function generate(size, path) {
  await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 24, g: 24, b: 27, alpha: 1 } }
  }).png().toFile(path);
  console.log(`Generated ${path}`);
}

await generate(192, "public/icons/icon-192x192.png");
await generate(512, "public/icons/icon-512x512.png");
