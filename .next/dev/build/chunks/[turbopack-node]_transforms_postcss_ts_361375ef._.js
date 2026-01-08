module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/apps/adminFE/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/d1c34_ff49ea86._.js",
  "chunks/[root-of-the-server]__e906ca08._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/apps/adminFE/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];