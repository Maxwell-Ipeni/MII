const CHUNK_PUBLIC_PATH = "server/pages/_error.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[project]__cb989d._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/web/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/apps/web/node_modules/next/error.js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/apps/web/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/apps/web/node_modules/next/app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
