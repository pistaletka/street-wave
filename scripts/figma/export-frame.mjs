import Figma from "figma-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import https from "https";

dotenv.config({ override: true });

const token = process.env.FIGMA_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY;

const frameName = process.argv[2];
const outputPath = process.argv[3];

if (!frameName || !outputPath) {
  console.error("Usage: node export-frame.mjs <FRAME_NAME> <output.png>");
  process.exit(1);
}

// Load node mappings
const nodesFile = path.join(path.dirname(new URL(import.meta.url).pathname), " templates_nodes.json");
let nodeMap = {};
try {
  const raw = fs.readFileSync(nodesFile, "utf-8");
  // File contains two JSON objects, parse both and merge
  const parts = raw.trim().split(/\n\n+/);
  for (const part of parts) {
    Object.assign(nodeMap, JSON.parse(part));
  }
} catch {
  // fallback: no node map
}

// Resolve node ID
let nodeId, format = "png", scale = 2;

if (nodeMap[frameName]) {
  const entry = nodeMap[frameName];
  if (typeof entry === "string") {
    nodeId = entry;
  } else {
    nodeId = entry.nodeId;
    format = entry.format || format;
    scale = entry.scale || scale;
  }
} else {
  console.error(`Frame "${frameName}" not found in templates_nodes.json`);
  console.error("Available frames:", Object.keys(nodeMap).join(", "));
  process.exit(1);
}

console.log(`Exporting "${frameName}" (node ${nodeId}) as ${format} @${scale}x ...`);

const client = Figma.Client({ personalAccessToken: token });

const res = await client.fileImages(fileKey, {
  ids: [nodeId],
  format,
  scale,
});

const imageUrl = res.data.images[nodeId];

if (!imageUrl) {
  console.error("No image URL returned. Check node ID:", nodeId);
  process.exit(1);
}

// Download the image
const outDir = path.dirname(outputPath);
if (outDir) fs.mkdirSync(outDir, { recursive: true });

const file = fs.createWriteStream(outputPath);
https.get(imageUrl, (response) => {
  response.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log(`Saved to ${outputPath}`);
  });
});
