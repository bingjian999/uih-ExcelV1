"use strict";
// Inject the SEA preparation blob into PiForExcel.exe using postject's API.
// Node.js 22.x uses "NODE_SEA_FUSE_..." as the sentinel fuse, not the postject default "POSTJECT_SENTINEL_...".
const fs = require("node:fs");
const path = require("node:path");
const { inject } = require("C:/Users/bingjian.wang/.trae-cn/work/6a36307c8aa25fd880a8ec59/postject-pkg/package/dist/api.js");

const exe = process.argv[2];
const blobPath = process.argv[3];

// The sentinel fuse that Node.js embeds in its binary for SEA support.
const NODE_SEA_FUSE = "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2";

(async () => {
  try {
    console.log("[inject] reading blob:", blobPath);
    const blob = fs.readFileSync(blobPath);
    console.log("[inject] blob size:", blob.length);
    console.log("[inject] injecting into:", exe);
    await inject(exe, "NODE_SEA_BLOB", blob, {
      sentinelFuse: NODE_SEA_FUSE,
    });
    console.log("[inject] OK — SEA blob injected");
    console.log("[inject] final exe size:", fs.statSync(exe).size);

    // Verify the fuse was set to '1'
    const exeBuf = fs.readFileSync(exe);
    const fuseIdx = exeBuf.indexOf(NODE_SEA_FUSE);
    if (fuseIdx !== -1) {
      const colonVal = String.fromCharCode(exeBuf[fuseIdx + NODE_SEA_FUSE.length]);
      const flagVal = String.fromCharCode(exeBuf[fuseIdx + NODE_SEA_FUSE.length + 1]);
      console.log(`[inject] fuse at offset ${fuseIdx}, colon='${colonVal}', flag='${flagVal}' (should be '1')`);
    } else {
      console.error("[inject] WARNING: fuse not found in final exe!");
    }
  } catch (e) {
    console.error("[inject] FAILED:", e && e.stack ? e.stack : e);
    process.exit(1);
  }
})();
