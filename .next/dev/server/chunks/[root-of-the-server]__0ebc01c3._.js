module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/puppeteer [external] (puppeteer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("puppeteer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoiceTemplate",
    ()=>InvoiceTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-route] (ecmascript)");
;
function InvoiceTemplate({ data }) {
    const imageBaseUrl = 'https://gdfhhfcdomtpkelvmhui.supabase.co/storage/v1/object/public/invoices-public/templateToclas/';
    const styles = `
    /* Reset and Global Overrides for #invoice-mockup-root */
    #invoice-mockup-root * {
      box-sizing: border-box;
    }
    
    #invoice-mockup-root {
      line-height: 1;
      color: #1131aa;
      background: white;
      font-size: 16px; 
      font-family: TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif;
      font-size: 3.125rem;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0;
      text-decoration: none;
      width: 2552px; 
      height: 1760px; /* FIXED CANVAA HEIGHT for A4 Landscape approx ratio */
      overflow: hidden; /* STRICTLY PREVENT SPILLOVER */
      margin: 0 auto;
      position: relative;
    }

    @media print {
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      #invoice-mockup-root {
         page-break-inside: avoid;
         page-break-after: avoid;
         page-break-before: avoid;
      }
    }

    #invoice-mockup-root a { color: inherit; text-decoration: none; }
    #invoice-mockup-root ol, #invoice-mockup-root ul { list-style: none; }
    #invoice-mockup-root table { border-collapse: collapse; border-spacing: 0; }
    #invoice-mockup-root h1, #invoice-mockup-root h2, #invoice-mockup-root h3, 
    #invoice-mockup-root h4, #invoice-mockup-root h5, #invoice-mockup-root h6 { font-weight: bold; margin-top: 0; margin-bottom: 0; }
    
    #invoice-mockup-root .group:before,
    #invoice-mockup-root .group:after { content: " "; display: table; }
    #invoice-mockup-root .group:after { clear: both; }
    #invoice-mockup-root .group { zoom: 1; }
    
    #invoice-mockup-root embed, #invoice-mockup-root img, #invoice-mockup-root object { max-width: 100%; }
    
    /* Layout Classes */
    #invoice-mockup-root .global_container_ {
      float: none;
      height: 100%; /* Fill the fixed root */
      margin: 0 auto;
      padding: 40px 36px 0; /* REDUCED TOP PADDING TO LIFT CONTENT */
      position: relative;
      width: 2552px;
      background: url(${imageBaseUrl}images/layer_4.png) no-repeat;
      page-break-inside: avoid; /* PREVENT BREAKS */
    }
    #invoice-mockup-root .header {
      left: 66px;
      margin: 0 auto;
      position: relative;
      width: 2330px;
    }
    #invoice-mockup-root .col-3 {
      float: left;
      margin: 15px 0 0;
      position: relative;
      width: 337px;
    }
    #invoice-mockup-root .wrapper-6 {
      height: 307px;
      position: relative;
      width: 337px;
    }
    #invoice-mockup-root .layer-239 { left: 50%; position: absolute; top: 201px; margin-left: -117.5px; }
    #invoice-mockup-root .layer-239-copy { left: 50%; position: absolute; top: 142px; margin-left: -168.5px; }
    #invoice-mockup-root .layer-239-copy-2 { left: 50%; position: absolute; top: 173px; margin-left: -141.5px; }
    #invoice-mockup-root .layer-242 { left: 50%; position: absolute; top: 0; margin-left: -136.5px; }
    
    #invoice-mockup-root .text {
      margin: 1px 119px 0 69px;
      font-size: 3.645833rem;
      line-height: 50px;
      text-align: center;
    }
    #invoice-mockup-root .col-8 {
      float: right;
      position: relative;
      width: 1981px;
    }
    #invoice-mockup-root .text-2 { display: block; margin: 0 0 0 4px; position: relative; }
    #invoice-mockup-root .text-3 {
      margin: 34px 0 0 5px;
      position: relative;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
    #invoice-mockup-root .text-4 {
      margin: -4px 0 0 7px;
      position: relative;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
    #invoice-mockup-root .row-2 { margin: 10px 0 0; position: relative; }
    #invoice-mockup-root .col-10 { float: left; position: relative; width: 1299px; }
    #invoice-mockup-root .text-5 {
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 2.604167rem;
    }
    #invoice-mockup-root .text-6 {
      margin: 2px 0 0 7px;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 2.604167rem;
      line-height: 50px;
    }
    #invoice-mockup-root .text-7 {
      margin: 9px 0 0 6px;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 2.604167rem;
    }
    #invoice-mockup-root .text-8 {
      float: right;
      margin: 163px -2px 0 0;
      width: 404px;
      color: #000000;
      font-weight: bold;
    }
    #invoice-mockup-root .wrapper {
      height: 1290px;
      left: 32.5px;
      margin: 39px auto 0;
      position: relative;
      width: 2415px;
    }
    
    #invoice-mockup-root .col-2 {
      left: 50%;
      min-height: 1284px;
      padding: 225px 67px 71px; /* padding-top 225px, padding-left 67px */
      position: absolute;
      top: 6px;
      width: 2404px;
      background: url(${imageBaseUrl}images/layer_6.jpg) no-repeat;
      margin-left: -1196.5px;
    }
    
    #invoice-mockup-root .text-9 {
      margin: 0 489px;
      color: #000000;
      font-weight: bold;
    }
    
    #invoice-mockup-root .text-10 {
      margin: 99px 0 0 455px; /* relative to text-9 */
      color: #000000;
      font-weight: bold;
      /* Ensure description line height aligns with grid if needed */
      line-height: 1.2;
      max-height: 350px; /* Constrain growth */
      overflow: hidden;  /* Hide overflow */
    }

    #invoice-mockup-root .text-10-extra {
      /* margins handled by container styles */
      color: #000000;
      font-weight: bold;
      /* Reset line-height to be tighter */
      line-height: 1.2; 
      font-size: 3.125rem;
    }
    
    /* Footer styling handled by inline absolute positioning to ensure stability */
    #invoice-mockup-root .text-11,
    #invoice-mockup-root .text-12,
    #invoice-mockup-root .text-13 {
        color: #000000;
        font-weight: bold;
    }
    
    #invoice-mockup-root .text-13 {
      font-size: 3.645833rem;
      font-style: italic;
    }

    #invoice-mockup-root .text-14 {
      /* positioned by container */
      color: #000000;
      font-weight: bold;
      text-align: right;
    }
    
    #invoice-mockup-root .text-15 {
      color: #000000;
      font-weight: bold;
      text-align: right;
    }
    #invoice-mockup-root .shape-8 {
      height: 5px;
      left: 50%;
      position: absolute;
      top: 79px;
      width: 1840px;
      background: #2168c2;
      margin-left: -673.5px;
    }
  `;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "invoice-mockup-root",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "global_container_",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "header group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "wrapper-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-239",
                                                    src: `${imageBaseUrl}images/layer_239.png`,
                                                    alt: "",
                                                    width: "190",
                                                    height: "106"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-239-copy",
                                                    src: `${imageBaseUrl}images/layer_239_copy.png`,
                                                    alt: "",
                                                    width: "194",
                                                    height: "102"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-239-copy-2",
                                                    src: `${imageBaseUrl}images/layer_239_copy_2.png`,
                                                    alt: "",
                                                    width: "194",
                                                    height: "101"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-242",
                                                    src: `${imageBaseUrl}images/layer_242.png`,
                                                    alt: "",
                                                    width: "305",
                                                    height: "213"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text",
                                            children: [
                                                "Mizu",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 39
                                                }, this),
                                                "Firuta"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            className: "text-2",
                                            src: `${imageBaseUrl}images/cv_surya_mizu_firuta_indo.png`,
                                            alt: "CV. SURYA MIZU FIRUTA INDOWATER",
                                            width: "1583",
                                            height: "88",
                                            title: "CV. SURYA MIZU FIRUTA INDOWATER"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3",
                                            children: "Spesialist : Solar Water Heater - Water Purifirer - Pompa Air"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-4",
                                            children: "Pantek Sumur - Bleaching Pipe - Hot & Cold Water Instalation"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 256,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "row-2 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "col-10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-5",
                                                            children: "JL Waru Raya Ujung No. 25 A, Kapuk - Jakarta Barat 11720"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-6",
                                                            children: [
                                                                "Telp : 021 - 54360371, 021 - 29430479, 081584719898, 085287479898",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                                    lineNumber: 261,
                                                                    columnNumber: 86
                                                                }, this),
                                                                "082124111778    Fax : 021 - 54360371 Website : www.mizufiruta.com"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-7",
                                                            children: "E-mail : go.mizuindowater@gmail.com, go.mizu9898@gmail.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-8",
                                                    children: data.invoiceNo
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "wrapper",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-15",
                                            style: {
                                                position: 'absolute',
                                                top: '10px',
                                                left: '522px',
                                                width: '1800px',
                                                textAlign: 'left',
                                                zIndex: 999
                                            },
                                            children: data.customerNameAddress
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-9",
                                            children: data.amountInWords
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10",
                                            children: data.description
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this),
                                        data.optRow1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10-extra",
                                            style: {
                                                position: 'absolute',
                                                top: '430px',
                                                left: '522px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.optRow1
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 281,
                                            columnNumber: 32
                                        }, this),
                                        data.optRow2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10-extra",
                                            style: {
                                                position: 'absolute',
                                                top: '500px',
                                                left: '522px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.optRow2
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 282,
                                            columnNumber: 32
                                        }, this),
                                        data.optRow3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10-extra",
                                            style: {
                                                position: 'absolute',
                                                top: '570px',
                                                left: '522px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.optRow3
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 283,
                                            columnNumber: 32
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-11",
                                            style: {
                                                position: 'absolute',
                                                top: '645px',
                                                left: '522px',
                                                width: '2000px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.footerNote
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 286,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: '715px',
                                                left: '635px',
                                                width: '2000px',
                                                maxHeight: '100px',
                                                overflow: 'hidden'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-12",
                                                style: {
                                                    margin: 0
                                                },
                                                children: data.paymentDetails
                                            }, void 0, false, {
                                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                lineNumber: 290,
                                                columnNumber: 18
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 289,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: '850px',
                                                right: '120px',
                                                textAlign: 'right',
                                                zIndex: 254
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-14",
                                                    children: data.locationDate
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-292",
                                                    src: `${imageBaseUrl}images/layer_292.png`,
                                                    alt: "",
                                                    width: "440",
                                                    height: "328",
                                                    style: {
                                                        display: 'block',
                                                        margin: '-5px 0 0',
                                                        position: 'relative',
                                                        zIndex: 23,
                                                        printColorAdjust: 'exact',
                                                        WebkitPrintColorAdjust: 'exact'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 294,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-13",
                                            style: {
                                                position: 'absolute',
                                                top: '1020px',
                                                left: '566px',
                                                width: '500px',
                                                margin: 0,
                                                whiteSpace: 'nowrap'
                                            },
                                            children: [
                                                "Rp.  ",
                                                data.amountNumeric
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 314,
                                            columnNumber: 16
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "shape-8"
                                }, void 0, false, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
        lineNumber: 237,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/adminFE/app/api/invoice-pdf/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/puppeteer [external] (puppeteer, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$app$2f$admin$2f$invoices$2f$mockup$2f$InvoiceTemplate$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const runtime = 'nodejs';
async function POST(req) {
    try {
        const data = await req.json();
        // Render the component to static HTML
        const { renderToStaticMarkup } = await __turbopack_context__.A("[project]/apps/adminFE/node_modules/next/dist/compiled/react-dom/server.node.js [app-route] (ecmascript, async loader)");
        const componentHtml = renderToStaticMarkup(/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$app$2f$admin$2f$invoices$2f$mockup$2f$InvoiceTemplate$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvoiceTemplate"], {
            data
        }));
        // Full HTML document structure
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
             /* Print-specific layout locks */
             @page {
                size: A4 landscape; /* Standard A4 landscape */
                margin: 0;
             }
             body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                /* Ensure background colors are printed */
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
             }
             /* Force specific width to match the template's design logic */
             /* The template uses 2552px width. We need to scale this to fit A4 */
             /* A4 Landscape is approx 297mm x 210mm */
             /* 297mm at 96dpi is ~1123px. */
             /* 2552px is very high res. We will use CSS zoom/transform or Puppeteer scaling */
          </style>
        </head>
        <body>
          ${componentHtml}
        </body>
      </html>
    `;
        const browser = await __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__["default"].launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();
        // Set viewport to the template's native resolution to ensure correct layout calculation
        await page.setViewport({
            width: 2552,
            height: 1800,
            deviceScaleFactor: 1
        });
        await page.setContent(html, {
            waitUntil: 'networkidle0'
        });
        // Generate PDF
        // We scale the 2552px content down to fit A4 Landscape
        // A4 width (landscape) is appx 11.7 inches. 
        // 2552px / 96dpi = 26.58 inches.
        // Scale factor needed: 11.7 / 26.58 = ~0.44
        // However, it's safer to use 'printBackground' and prefer CSS @page size.
        // Let's try fitting it via PDF options safely.
        const pdfBuffer = await page.pdf({
            printBackground: true,
            preferCSSPageSize: true,
            scale: 0.43,
            pageRanges: '1',
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        await browser.close();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Invoice_${data.invoiceNo.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`
            }
        });
    } catch (error) {
        console.error('PDF Generation Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to generate PDF'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ebc01c3._.js.map