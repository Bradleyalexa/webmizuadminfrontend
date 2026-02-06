module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoiceTemplate",
    ()=>InvoiceTemplate,
    "default",
    ()=>MockupInvoicePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
'use client';
;
;
;
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
      width: fit-content; 
      min-width: 2552px;
      margin: 0 auto;
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
      height: auto;
      margin: 0 auto;
      padding: 119px 36px 0;
      position: relative;
      width: 2552px;
      background: url(${imageBaseUrl}images/layer_4.png) no-repeat;
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
      margin: 83px -2px 0 0;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "invoice-mockup-root",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "global_container_",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "header group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "wrapper-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-239",
                                                    src: `${imageBaseUrl}images/layer_239.png`,
                                                    alt: "",
                                                    width: "190",
                                                    height: "106"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-239-copy",
                                                    src: `${imageBaseUrl}images/layer_239_copy.png`,
                                                    alt: "",
                                                    width: "194",
                                                    height: "102"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-239-copy-2",
                                                    src: `${imageBaseUrl}images/layer_239_copy_2.png`,
                                                    alt: "",
                                                    width: "194",
                                                    height: "101"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-242",
                                                    src: `${imageBaseUrl}images/layer_242.png`,
                                                    alt: "",
                                                    width: "305",
                                                    height: "213"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text",
                                            children: [
                                                "Mizu",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 39
                                                }, this),
                                                "Firuta"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            className: "text-2",
                                            src: `${imageBaseUrl}images/cv_surya_mizu_firuta_indo.png`,
                                            alt: "CV. SURYA MIZU FIRUTA INDOWATER",
                                            width: "1583",
                                            height: "88",
                                            title: "CV. SURYA MIZU FIRUTA INDOWATER"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3",
                                            children: "Spesialist : Solar Water Heater - Water Purifirer - Pompa Air"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-4",
                                            children: "Pantek Sumur - Bleaching Pipe - Hot & Cold Water Instalation"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "row-2 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "col-10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-5",
                                                            children: "JL Waru Raya Ujung No. 25 A, Kapuk - Jakarta Barat 11720"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-6",
                                                            children: [
                                                                "Telp : 021 - 54360371, 021 - 29430479, 081584719898, 085287479898",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 86
                                                                }, this),
                                                                "082124111778    Fax : 021 - 54360371 Website : www.mizufiruta.com"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-7",
                                                            children: "E-mail : go.mizuindowater@gmail.com, go.mizu9898@gmail.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-8",
                                                    children: data.invoiceNo
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "wrapper",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-15",
                                            style: {
                                                position: 'absolute',
                                                top: '20px',
                                                left: '522px',
                                                width: '1800px',
                                                textAlign: 'left',
                                                zIndex: 999
                                            },
                                            children: data.customerNameAddress
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-9",
                                            children: data.amountInWords
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10",
                                            children: data.description
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this),
                                        data.optRow1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10-extra",
                                            style: {
                                                position: 'absolute',
                                                top: '440px',
                                                left: '522px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.optRow1
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 32
                                        }, this),
                                        data.optRow2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10-extra",
                                            style: {
                                                position: 'absolute',
                                                top: '500px',
                                                left: '522px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.optRow2
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 32
                                        }, this),
                                        data.optRow3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10-extra",
                                            style: {
                                                position: 'absolute',
                                                top: '570px',
                                                left: '522px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.optRow3
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 32
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 271,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-12",
                                            style: {
                                                position: 'absolute',
                                                top: '715px',
                                                left: '635px',
                                                width: '2000px',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: data.paymentDetails
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: '840px',
                                                right: '120px',
                                                textAlign: 'right',
                                                zIndex: 254
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-14",
                                                    children: data.locationDate
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    className: "layer-292",
                                                    src: `${imageBaseUrl}images/layer_292.png`,
                                                    alt: "",
                                                    width: "440",
                                                    height: "328",
                                                    style: {
                                                        display: 'block',
                                                        margin: '-5px 0 0',
                                                        position: 'relative',
                                                        zIndex: 23
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 16
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "shape-8"
                                }, void 0, false, {
                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
function MockupInvoicePage() {
    const [isFormOpen, setIsFormOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        invoiceNo: '0852/SMFI/XII/25',
        amountInWords: 'Tiga Juta Rupiah',
        description: 'Pelunasan Ganti 1 (satu) Unit Catridge Filter air Toclas TW 200 / 1 Tbg',
        optRow1: 'row 2',
        optRow2: 'row 3',
        optRow3: 'row 4',
        footerNote: 'Ket: Harga Sudah Termasuk Ongkos Kerja Team Teknisi di Lapangan',
        paymentDetails: 'Transfer Rekening BCA : 6275256998 - CV Surya Mizu Firuta Indowater',
        amountNumeric: '5.000.000,-',
        locationDate: 'Jakarta, 13 Desember 2025',
        customerNameAddress: 'Mr Jiye Lim / Amala 2508 Apartemen Pondok Indah Residence - Jakarta Selatan'
    });
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleExportPDF = async ()=>{
        const input = document.getElementById('invoice-mockup-root');
        if (!input) return;
        try {
            // Temporarily show loading state or similar if needed
            const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(input, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
                orientation: 'landscape',
                unit: 'px',
                format: [
                    canvas.width,
                    canvas.height
                ] // Match image dimensions exactly
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            const fileName = `Invoice_${data.invoiceNo.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
            pdf.save(fileName);
        } catch (err) {
            console.error('PDF Export Error:', err);
            alert('Failed to export PDF. See console for details.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: 'calc(100vh - 64px)',
            background: '#f0f0f0',
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsFormOpen(!isFormOpen),
                style: {
                    position: 'absolute',
                    top: '20px',
                    left: isFormOpen ? '400px' : '0px',
                    /* Attached to panel edge */ zIndex: 1000,
                    background: '#1131aa',
                    color: 'white',
                    border: 'none',
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    transition: 'left 0.3s ease',
                    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
                },
                children: isFormOpen ? '◄' : '► Editor'
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: isFormOpen ? '400px' : '0px',
                    padding: isFormOpen ? '20px' : '0px',
                    background: 'white',
                    borderRight: '1px solid #ddd',
                    overflowY: 'auto',
                    transition: 'width 0.3s ease, padding 0.3s ease',
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold'
                                },
                                children: "Invoice Editor"
                            }, void 0, false, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 379,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleExportPDF,
                                style: {
                                    padding: '8px 16px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem'
                                },
                                children: "Export PDF"
                            }, void 0, false, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 380,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Invoice Number"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 399,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "invoiceNo",
                                        value: data.invoiceNo,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 400,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Amount (Words)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "amountInWords",
                                        value: data.amountInWords,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "description",
                                        value: data.description,
                                        onChange: handleChange,
                                        rows: 3,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 419,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Optional Row 1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "optRow1",
                                        value: data.optRow1,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 433,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Optional Row 2"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "optRow2",
                                        value: data.optRow2,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 443,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Optional Row 3"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "optRow3",
                                        value: data.optRow3,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 453,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 451,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Note (Ket)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "footerNote",
                                        value: data.footerNote,
                                        onChange: handleChange,
                                        rows: 2,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Payment Details"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 474,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "paymentDetails",
                                        value: data.paymentDetails,
                                        onChange: handleChange,
                                        rows: 2,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Amount (Numeric)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 485,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "amountNumeric",
                                        value: data.amountNumeric,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 486,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Location & Date"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        name: "locationDate",
                                        value: data.locationDate,
                                        onChange: handleChange,
                                        style: {
                                            width: '100%',
                                            padding: '20px',
                                            border: '1px solid #ccc',
                                            borderRadius: '2px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Customer Name & Address"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "customerNameAddress",
                                        value: data.customerNameAddress,
                                        onChange: handleChange,
                                        rows: 3,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#e5e5e5'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        transform: 'scale(0.4)',
                        transformOrigin: 'top center',
                        marginTop: '20px',
                        marginBottom: '20px',
                        height: '1600px',
                        width: '2552px' // Match content width
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InvoiceTemplate, {
                        data: data
                    }, void 0, false, {
                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                        lineNumber: 531,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                    lineNumber: 521,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 520,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__89772932._.js.map