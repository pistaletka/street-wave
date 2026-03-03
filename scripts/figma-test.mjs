import Figma from "figma-js";
import dotenv from "dotenv";

dotenv.config({ override: true });

console.log("ENV FIGMA_FILE_KEY =", process.env.FIGMA_FILE_KEY);
console.log("ENV FIGMA_TOKEN OK? =", !!process.env.FIGMA_TOKEN);

const token = process.env.FIGMA_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY;

const client = Figma.Client({ personalAccessToken: token });

const res = await client.file(fileKey);

console.log("Connected to Figma");
console.log("File name:", res.data.name);
console.log("Last modified:", res.data.lastModified);
