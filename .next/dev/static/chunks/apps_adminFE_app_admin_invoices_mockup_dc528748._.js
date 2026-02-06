(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoiceTemplate",
    ()=>InvoiceTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "invoice-mockup-root",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "global_container_",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "header group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "wrapper-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text",
                                            children: [
                                                "Mizu",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3",
                                            children: "Spesialist : Solar Water Heater - Water Purifirer - Pompa Air"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-4",
                                            children: "Pantek Sumur - Bleaching Pipe - Hot & Cold Water Instalation"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 256,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "row-2 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "col-10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-5",
                                                            children: "JL Waru Raya Ujung No. 25 A, Kapuk - Jakarta Barat 11720"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-6",
                                                            children: [
                                                                "Telp : 021 - 54360371, 021 - 29430479, 081584719898, 085287479898",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "wrapper",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-9",
                                            children: data.amountInWords
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-10",
                                            children: data.description
                                        }, void 0, false, {
                                            fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this),
                                        data.optRow1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        data.optRow2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        data.optRow3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: '715px',
                                                left: '635px',
                                                width: '2000px',
                                                maxHeight: '100px',
                                                overflow: 'hidden'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'absolute',
                                                top: '850px',
                                                right: '120px',
                                                textAlign: 'right',
                                                zIndex: 254
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-14",
                                                    children: data.locationDate
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = InvoiceTemplate;
var _c;
__turbopack_context__.k.register(_c, "InvoiceTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MockupInvoicePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$app$2f$admin$2f$invoices$2f$mockup$2f$InvoiceTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/app/admin/invoices/mockup/InvoiceTemplate.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MockupInvoicePage() {
    _s();
    const [isFormOpen, setIsFormOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
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
        try {
            const response = await fetch('/api/invoice-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice_${data.invoiceNo.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url); // Clean up
            document.body.removeChild(a);
        } catch (err) {
            console.error('PDF Export Error:', err);
            alert('Failed to export PDF. Check console.');
        }
    };
    // Scale calculation for "Fit to Screen"
    const previewContainerRef = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [scale, setScale] = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0.4);
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useLayoutEffect({
        "MockupInvoicePage.useLayoutEffect": ()=>{
            if (!previewContainerRef.current) return;
            const observer = new ResizeObserver({
                "MockupInvoicePage.useLayoutEffect": (entries)=>{
                    for (const entry of entries){
                        // Use contentRect for precise content box measurement
                        const containerWidth = entry.contentRect.width;
                        // Invoice width is 2552px. Add some padding (e.g. 20px)
                        const newScale = Math.min((containerWidth - 20) / 2552, 1);
                        setScale(newScale);
                    }
                }
            }["MockupInvoicePage.useLayoutEffect"]);
            observer.observe(previewContainerRef.current);
            return ({
                "MockupInvoicePage.useLayoutEffect": ()=>{
                    observer.disconnect();
                }
            })["MockupInvoicePage.useLayoutEffect"];
        }
    }["MockupInvoicePage.useLayoutEffect"], []); // Empty dependency array as observer handles changes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: 'calc(100vh - 64px)',
            width: '100vw',
            overflow: 'hidden',
            background: '#f0f0f0',
            position: 'relative'
        },
        children: [
            !isFormOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsFormOpen(true),
                style: {
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 1000,
                    background: '#1131aa',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    opacity: 0.9
                },
                children: "✎ Edit Invoice"
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: isFormOpen ? '400px' : '0px',
                    padding: isFormOpen ? '20px' : '0px',
                    background: 'white',
                    borderRight: '1px solid #ddd',
                    overflowY: 'auto',
                    transition: 'width 0.3s ease, padding 0.3s ease',
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    flexShrink: 0 // Prevent shrinking
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsFormOpen(false),
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem',
                                            marginRight: '10px',
                                            padding: '5px'
                                        },
                                        children: "◄"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: '1.25rem',
                                            fontWeight: 'bold',
                                            margin: 0
                                        },
                                        children: "Invoice Editor"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 121,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                children: "Export"
                            }, void 0, false, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 137,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Invoice Number"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Amount (Words)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Optional Row 1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Optional Row 2"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Optional Row 3"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Note (Ket)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Payment Details"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Amount (Numeric)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Location & Date"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '5px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Customer Name & Address"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: previewContainerRef,
                style: {
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#e5e5e5',
                    position: 'relative'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center',
                        marginTop: '20px',
                        marginBottom: '20px',
                        height: '1760px',
                        /* Matches InvoiceTemplate fixed height */ width: '2552px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$app$2f$admin$2f$invoices$2f$mockup$2f$InvoiceTemplate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvoiceTemplate"], {
                        data: data
                    }, void 0, false, {
                        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                    lineNumber: 281,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/adminFE/app/admin/invoices/mockup/page.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(MockupInvoicePage, "n2OAD0Ri1ndcgy2hPJWYLHpWOiE=");
_c = MockupInvoicePage;
var _c;
__turbopack_context__.k.register(_c, "MockupInvoicePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_adminFE_app_admin_invoices_mockup_dc528748._.js.map