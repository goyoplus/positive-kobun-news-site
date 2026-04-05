import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import ts from "typescript";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const parserPath = join(projectRoot, "lib", "receipt-parser.ts");
const fixturePath = join(
  projectRoot,
  "tests",
  "fixtures",
  "tsuruha-kamiyama-receipt.ocr.txt",
);

async function importReceiptParser() {
  const source = await readFile(parserPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: parserPath,
  }).outputText;

  const tempDirectory = await mkdtemp(join(tmpdir(), "receipt-parser-test-"));
  const tempFilePath = join(tempDirectory, "receipt-parser.mjs");

  await writeFile(tempFilePath, transpiled, "utf8");

  try {
    return await import(pathToFileURL(tempFilePath).href);
  } finally {
    await rm(tempDirectory, { force: true, recursive: true });
  }
}

const fixture = await readFile(fixturePath, "utf8");
const parser = await importReceiptParser();

const result = parser.extractReceiptFromText({
  fileName: "tsuruha-kamiyama.jpg",
  pageCount: null,
  rawText: fixture,
  sourceLabel: "fixture",
});

assert.equal(result.date, "2026-02-28");
assert.equal(result.amount, "5038");
assert.equal(result.storeName, "ツルハドラッグ 上山店");
assert.equal(result.invoiceNumber, "T1430001010672");
assert.equal(result.paymentMethod, "楽天ペイ");

assert.equal(result.candidates.amount[0]?.value, "5038");
assert.equal(result.candidates.storeName[0]?.value, "ツルハドラッグ 上山店");
assert.equal(result.candidates.paymentMethod[0]?.value, "楽天ペイ");
assert.ok(result.fieldConfidence.amount >= 0.8);
assert.ok(result.fieldConfidence.paymentMethod >= 0.8);

const snippetDate = parser.extractDate(`
<領収 書>
2026年02月28日(土)13:44
店:001594 レジNo:002
`);

assert.equal(snippetDate, "2026-02-28");

console.log("Parser regression test passed.");
