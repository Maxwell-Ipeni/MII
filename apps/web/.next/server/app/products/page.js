const CHUNK_PUBLIC_PATH = "server/app/products/page.js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__c2bb08._.js");
runtime.loadChunk("server/chunks/ssr/[project]__80896e._.js");
runtime.getOrInstantiateRuntimeModule("[project]/apps/web/.next-internal/server/app/products/page/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/web/node_modules/next/dist/esm/build/templates/app-page.js?page=/products/page { COMPONENT_0 => \"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_1 => \"[project]/apps/web/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_2 => \"[project]/apps/web/src/app/products/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <facade>", CHUNK_PUBLIC_PATH).exports;
