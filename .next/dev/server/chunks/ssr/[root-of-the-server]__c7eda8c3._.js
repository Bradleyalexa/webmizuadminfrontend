module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/apps/adminFE/src/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "createApiClient",
    ()=>createApiClient
]);
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
        // Check for message in various locations: data.message, data.error.message, data.error
        const msg = data.message || data.error?.message || (typeof data.error === 'string' ? data.error : "An API error occurred");
        throw new Error(msg);
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
                if (params?.addressType && params.addressType !== "all") searchParams.append("addressType", params.addressType);
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
        },
        customerProducts: {
            getByCustomer: async (customerId)=>{
                return fetchApi(`/customer-products/customer/${customerId}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/customer-products", {
                    token,
                    method: "POST",
                    body: JSON.stringify(data)
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/customer-products/${id}`, {
                    token,
                    method: "PATCH",
                    body: JSON.stringify(data)
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/customer-products/${id}`, {
                    token
                });
            }
        },
        contracts: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.status) searchParams.append("status", params.status);
                if (params?.productName) searchParams.append("productName", params.productName);
                return fetchApi(`/contracts?${searchParams.toString()}`, {
                    token
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/contracts/${id}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/contracts", {
                    token,
                    method: "POST",
                    body: JSON.stringify(data)
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/contracts/${id}`, {
                    token,
                    method: "PATCH",
                    body: JSON.stringify(data)
                });
            },
            delete: async (id)=>{
                return fetchApi(`/contracts/${id}`, {
                    token,
                    method: "DELETE"
                });
            }
        },
        jobs: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.page) searchParams.append("page", params.page.toString());
                if (params?.limit) searchParams.append("limit", params.limit.toString());
                if (params?.search) searchParams.append("search", params.search);
                return fetchApi(`/jobs?${searchParams.toString()}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/jobs", {
                    method: "POST",
                    body: JSON.stringify(data),
                    token
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/jobs/${id}`, {
                    token
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/jobs/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    token
                });
            },
            delete: async (id)=>{
                return fetchApi(`/jobs/${id}`, {
                    method: "DELETE",
                    token
                });
            }
        },
        schedules: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.page) searchParams.append("page", params.page.toString());
                if (params?.limit) searchParams.append("limit", params.limit.toString());
                if (params?.startDate) searchParams.append("startDate", params.startDate);
                if (params?.endDate) searchParams.append("endDate", params.endDate);
                if (params?.status) searchParams.append("status", params.status);
                if (params?.search) searchParams.append("search", params.search);
                return fetchApi(`/schedules?${searchParams.toString()}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/schedules", {
                    method: "POST",
                    body: JSON.stringify(data),
                    token
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/schedules/${id}`, {
                    token
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/schedules/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    token
                });
            },
            delete: async (id)=>{
                return fetchApi(`/schedules/${id}`, {
                    method: "DELETE",
                    token
                });
            } // Removed the comma here
        },
        // Keep structure but throw error or require token for others
        // For now, implementing just the auth one requested
        tasks: {
            list: async (params)=>{
                const searchParams = new URLSearchParams();
                if (params?.page) searchParams.append("page", params.page.toString());
                if (params?.limit) searchParams.append("limit", params.limit.toString());
                if (params?.status) searchParams.append("status", params.status);
                if (params?.customerProductId) searchParams.append("customerProductId", params.customerProductId);
                return fetchApi(`/tasks?${searchParams.toString()}`, {
                    token
                });
            },
            create: async (data)=>{
                return fetchApi("/tasks", {
                    method: "POST",
                    body: JSON.stringify(data),
                    token
                });
            },
            getOne: async (id)=>{
                return fetchApi(`/tasks/${id}`, {
                    token
                });
            },
            update: async (id, data)=>{
                return fetchApi(`/tasks/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    token
                });
            },
            delete: async (id)=>{
                return fetchApi(`/tasks/${id}`, {
                    method: "DELETE",
                    token
                });
            },
            complete: async (id, data)=>{
                return fetchApi(`/tasks/${id}/complete`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    token
                });
            }
        },
        serviceLogs: {
            update: async (id, data)=>{
                return fetchApi(`/service-logs/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    token
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
}),
"[project]/apps/adminFE/src/components/providers/supabase-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseProvider",
    ()=>SupabaseProvider,
    "useSupabase",
    ()=>useSupabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/adminFE/src/lib/api/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const SupabaseContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const SupabaseProvider = ({ children })=>{
    const [supabase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://gdfhhfcdomtpkelvmhui.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZmhoZmNkb210cGtlbHZtaHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzQ0NzMsImV4cCI6MjA4MDk1MDQ3M30.AgXjTyFb7htcxTsEGLaJDcvslvpKgYYjIx3KZgz28B0")));
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Initial session check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (session) {
                fetchProfile(session);
            }
            setIsLoading(false);
        })();
    }, [
        supabase
    ]);
    const fetchProfile = async (currentSession)=>{
        try {
            const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createApiClient"])(currentSession);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session)=>{
            setSession(session);
            setIsLoading(false);
            if (event === "SIGNED_IN" && session) {
                fetchProfile(session);
                router.refresh();
            }
            if (event === "SIGNED_OUT") {
                setProfile(null);
            }
        });
        return ()=>{
            subscription.unsubscribe();
        };
    }, [
        router,
        supabase
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SupabaseContext.Provider, {
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
const useSupabase = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$adminFE$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(SupabaseContext);
    if (context === undefined) {
        throw new Error("useSupabase must be used within a SupabaseProvider");
    }
    return context;
};
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c7eda8c3._.js.map