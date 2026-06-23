#!/usr/bin/env node
/**
 * Pack a directory (dist/) into a single gzip blob with a JSON file index,
 * suitable for embedding as a Node SEA asset and extracting at runtime
 * without any third-party dependencies.
 *
 * Format (before gzip):
 *   <12-byte magic "PIFXBLOB\0\0\0\0">
 *   <4-byte big-endian header length>
 *   <header JSON utf8>          -> { v:1, files: [{path, offset, length}] }
 *   <concatenated file bytes>
 *
 * Usage: node build-blob.cjs <input-dir> <out-file>
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const [inDir, outFile] = process.argv.slice(2);
if (!inDir || !outFile) {
  console.error("Usage: node build-blob.cjs <input-dir> <out-file>");
  process.exit(1);
}

function walk(dir, base = dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full, base, out);
    } else if (ent.isFile()) {
      out.push(path.relative(base, full).split(path.sep).join("/"));
    }
  }
  return out;
}

const files = walk(inDir);
const header = { v: 1, files: [] };
const chunks = [];
let offset = 0;
for (const rel of files) {
  const abs = path.join(inDir, rel);
  const data = fs.readFileSync(abs);
  header.files.push({ path: rel, offset, length: data.length });
  chunks.push(data);
  offset += data.length;
}

const headerJson = Buffer.from(JSON.stringify(header), "utf8");
const magic = Buffer.from("PIFXBLOB\0\0\0\0", "binary");
const headerLen = Buffer.alloc(4);
headerLen.writeUInt32BE(headerJson.length, 0);

const blob = Buffer.concat([magic, headerLen, headerJson, ...chunks]);
const gz = zlib.gzipSync(blob, { level: 9 });
fs.writeFileSync(outFile, gz);
console.log(`[build-blob] packed ${files.length} files, ${blob.length} bytes -> ${gz.length} bytes (gzip) -> ${outFile}`);
