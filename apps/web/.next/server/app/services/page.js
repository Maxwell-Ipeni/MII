const CHUNK_PUBLIC_PATH = "server/app/services/page.js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__9d3c97._.js");
runtime.loadChunk("server/chunks/ssr/[project]__e488ed._.js");
runtime.getOrInstantiateRuntimeModule("[project]/apps/web/.next-internal/server/app/services/page/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/web/node_modules/next/dist/esm/build/templates/app-page.js?page=/services/page { COMPONENT_0 => \"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_1 => \"[project]/apps/web/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_2 => \"[project]/apps/web/src/app/services/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <facade>", CHUNK_PUBLIC_PATH).exports;
