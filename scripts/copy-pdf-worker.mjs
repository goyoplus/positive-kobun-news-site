import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const sourcePath = join(projectRoot, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const destinationDirectory = join(projectRoot, "public");
const destinationPath = join(destinationDirectory, "pdf.worker.min.mjs");

try {
  await mkdir(destinationDirectory, { recursive: true });
  await copyFile(sourcePath, destinationPath);
  console.log("Copied pdf.worker.min.mjs to public/");
} catch (error) {
  console.warn("Skipping PDF worker copy.", error instanceof Error ? error.message : error);
}
