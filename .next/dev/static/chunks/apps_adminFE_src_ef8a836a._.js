(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/adminFE/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "createApiClient",
    ()=>createApiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:3001/api/v1") || "http://localhost:3000/api/v1";
async function fetchApi(path, options = {}) {
    const { token, headers, ...init } = options;
    const reqHeaders = new Headers(headers);
    reqHeaders.set("Content-Type", "application/json");
    if (token) {
        reqHeaders.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(`${BACKEND_URL}${path}`, {
        ...init,
        headers: reqHeaders
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error?.message || "An API error occurred");
    }
    return data; // Assuming { success: true, data: T } is unwrapped by caller or we return full response?
// User spec: standard response envelope. Ideally we return the whole envelope or just data?
// Let's return the full envelope for now to match current return types if any.
}
const createApiClient = (session)=>{
    const token = session?.access_token;
    return {
        auth: {
            getMe: async ()=>{
                return fetchApi("/auth/me", {
                    token
                });
            }
        },
        technicians: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.page) searchParams.append("page", params.page.toString());
                if (params?.limit) searchParams.append("limit", params.limit.toString());
                if (params?.q) searchParams.append("q", params.q);
                return fetchApi(`/technicians?${searchParams.toString()}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/technicians", {
                    token,
                    method: "POST",
                    body: JSON.stringify(data)
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/technicians/${id}`, {
                    token,
                    method: "PATCH",
                    body: JSON.stringify(data)
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/technicians/${id}`, {
                    token
                });
            }
        },
        categories: {
            list: async ()=>{
                return fetchApi("/categories", {
                    token
                });
            }
        },
        products: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.page) searchParams.append("page", params.page.toString());
                if (params?.limit) searchParams.append("limit", params.limit.toString());
                if (params?.q) searchParams.append("q", params.q);
                if (params?.categoryId) searchParams.append("categoryId", params.categoryId);
                return fetchApi(`/products?${searchParams.toString()}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/products", {
                    token,
                    method: "POST",
                    body: JSON.stringify(data)
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/products/${id}`, {
                    token,
                    method: "PUT",
                    body: JSON.stringify(data)
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/products/${id}`, {
                    token
                });
            },
            delete: async (id)=>{
                return fetchApi(`/products/${id}`, {
                    token,
                    method: "DELETE"
                });
            }
        },
        customers: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.page) searchParams.append("page", params.page.toString());
                if (params?.limit) searchParams.append("limit", params.limit.toString());
                if (params?.search) searchParams.append("search", params.search);
                return fetchApi(`/customers?${searchParams.toString()}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/customers", {
                    token,
                    method: "POST",
                    body: JSON.stringify(data)
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/customers/${id}`, {
                    token,
                    method: "PUT",
                    body: JSON.stringify(data)
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/customers/${id}`, {
                    token
                });
            },
            delete: async (id)=>{
                return fetchApi(`/customers/${id}`, {
                    token,
                    method: "DELETE"
                });
            }
        }
    };
};
const api = {
    // Legacy placeholders that warn
    customers: {
        list: ()=>{
            throw new Error("Use createApiClient(session).customers.list()");
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/adminFE/src/components/providers/supabase-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseProvider",
    ()=>SupabaseProvider,
    "useSupabase",
    ()=>useSupabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/src/lib/api/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const SupabaseContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const SupabaseProvider = ({ children })=>{
    _s();
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SupabaseProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://gdfhhfcdomtpkelvmhui.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZmhoZmNkb210cGtlbHZtaHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzQ0NzMsImV4cCI6MjA4MDk1MDQ3M30.AgXjTyFb7htcxTsEGLaJDcvslvpKgYYjIx3KZgz28B0"))
    }["SupabaseProvider.useState"]);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Initial session check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SupabaseProvider.useEffect": ()=>{
            ({
                "SupabaseProvider.useEffect": async ()=>{
                    const { data: { session } } = await supabase.auth.getSession();
                    setSession(session);
                    if (session) {
                        fetchProfile(session);
                    }
                    setIsLoading(false);
                }
            })["SupabaseProvider.useEffect"]();
        }
    }["SupabaseProvider.useEffect"], [
        supabase
    ]);
    const fetchProfile = async (currentSession)=>{
        try {
            const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createApiClient"])(currentSession);
            // @ts-ignore - method exists in our new client
            const res = await client.auth.getMe();
            if (res.success) {
                setProfile(res.data);
                console.log("Backend Profile Loaded:", res.data);
            }
        } catch (e) {
            console.error("Failed to load backend profile", e);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SupabaseProvider.useEffect": ()=>{
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "SupabaseProvider.useEffect": async (event, session)=>{
                    setSession(session);
                    setIsLoading(false);
                    if (event === "SIGNED_IN" && session) {
                        fetchProfile(session);
                        router.refresh();
                    }
                    if (event === "SIGNED_OUT") {
                        setProfile(null);
                    }
                }
            }["SupabaseProvider.useEffect"]);
            return ({
                "SupabaseProvider.useEffect": ()=>{
                    subscription.unsubscribe();
                }
            })["SupabaseProvider.useEffect"];
        }
    }["SupabaseProvider.useEffect"], [
        router,
        supabase
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SupabaseContext.Provider, {
        value: {
            supabase,
            session,
            isLoading,
            profile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/adminFE/src/components/providers/supabase-provider.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SupabaseProvider, "prcL2fcH0mvMYIlei+c88EYBJt8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SupabaseProvider;
const useSupabase = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SupabaseContext);
    if (context === undefined) {
        throw new Error("useSupabase must be used within a SupabaseProvider");
    }
    return context;
};
_s1(useSupabase, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SupabaseProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_adminFE_src_ef8a836a._.js.map