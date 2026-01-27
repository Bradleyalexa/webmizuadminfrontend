import { Session } from "@supabase/supabase-js";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api/v1";

interface CreateTechnicianDTO {
  name: string;
  phone?: string;
  photo_url?: string;
  notes?: string;
}

type ApiOptions = RequestInit & {
  token?: string;
};

// We can rely on Types from @/src/types, but here we define DTOs if needed for generics
import { CreateProductDTO, CreateCustomerDTO, UpdateCustomerDTO } from "@/src/types";

async function fetchApi<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...init } = options;
  
  const reqHeaders = new Headers(headers);
  reqHeaders.set("Content-Type", "application/json");
  
  if (token) {
    reqHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: reqHeaders,
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

// Factory to create a client bound to a session
export const createApiClient = (session: Session | null) => {
  const token = session?.access_token;

  return {
    auth: {
      getMe: async () => {
        return fetchApi("/auth/me", { token });
      }
    },
    technicians: {
      list: async (params?: { page?: number; limit?: number; q?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.q) searchParams.append("q", params.q);
        return fetchApi(`/technicians?${searchParams.toString()}`, { token });
      },
      create: async (data: CreateTechnicianDTO) => {
        return fetchApi("/technicians", {
          token,
          method: "POST",
          body: JSON.stringify(data),
        });
      },
      update: async (id: string, data: Partial<CreateTechnicianDTO>) => {
        return fetchApi(`/technicians/${id}`, {
          token,
          method: "PATCH",
          body: JSON.stringify(data),
        });
      },
      getOne: async (id: string) => {
        return fetchApi(`/technicians/${id}`, { token });
      }
    },
    categories: {
      list: async () => {
        return fetchApi("/categories", { token });
      }
    },
    products: {
      list: async (params?: { page?: number; limit?: number; q?: string; categoryId?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.q) searchParams.append("q", params.q);
        if (params?.categoryId) searchParams.append("categoryId", params.categoryId);
        return fetchApi(`/products?${searchParams.toString()}`, { token });
      },
      create: async (data: CreateProductDTO) => {
        return fetchApi("/products", {
          token,
          method: "POST",
          body: JSON.stringify(data),
        });
      },
      update: async (id: string, data: Partial<CreateProductDTO>) => {
        return fetchApi(`/products/${id}`, {
          token,
          method: "PUT",
          body: JSON.stringify(data),
        });
      },
      getOne: async (id: string) => {
        return fetchApi(`/products/${id}`, { token });
      },
      delete: async (id: string) => {
        return fetchApi(`/products/${id}`, {
          token,
          method: "DELETE"
        });
      }
    },
    customers: {
      list: async (params?: { page?: number; limit?: number; search?: string; addressType?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.search) searchParams.append("search", params.search);
        if (params?.addressType && params.addressType !== "all") searchParams.append("addressType", params.addressType);
        return fetchApi(`/customers?${searchParams.toString()}`, { token });
      },
      create: async (data: CreateCustomerDTO) => {
        return fetchApi("/customers", {
          token,
          method: "POST",
          body: JSON.stringify(data),
        });
      },
      update: async (id: string, data: UpdateCustomerDTO) => {
        return fetchApi(`/customers/${id}`, {
          token,
          method: "PUT",
          body: JSON.stringify(data),
        });
      },
      getOne: async (id: string) => {
        return fetchApi(`/customers/${id}`, { token });
      },
      delete: async (id: string) => {
        return fetchApi(`/customers/${id}`, {
          token,
          method: "DELETE"
        });
      }
    },
    customerProducts: {
        getByCustomer: async (customerId: string) => {
            return fetchApi(`/customer-products/customer/${customerId}`, { token });
        },
        create: async (data: any) => {
            return fetchApi("/customer-products", {
                token,
                method: "POST",
                body: JSON.stringify(data)
            });
        },
        update: async (id: string, data: any) => {
            return fetchApi(`/customer-products/${id}`, {
                token,
                method: "PATCH",
                body: JSON.stringify(data)
            });
        },
        getOne: async (id: string) => {
            return fetchApi(`/customer-products/${id}`, { token });
        }
    },
    contracts: {
        list: async (params?: { status?: string, productName?: string }) => {
            const searchParams = new URLSearchParams();
            if (params?.status) searchParams.append("status", params.status);
            if (params?.productName) searchParams.append("productName", params.productName);
            return fetchApi<any[]>(`/contracts?${searchParams.toString()}`, { token });
        },
        getOne: async (id: string) => {
            return fetchApi<any>(`/contracts/${id}`, { token });
        },
        create: async (data: any) => {
            return fetchApi("/contracts", {
                token,
                method: "POST",
                body: JSON.stringify(data)
            });
        },
        update: async (id: string, data: any) => {
             return fetchApi(`/contracts/${id}`, {
                token,
                method: "PATCH",
                body: JSON.stringify(data)
            });
        },
        delete: async (id: string) => {
            return fetchApi(`/contracts/${id}`, {
                token,
                method: "DELETE"
            });
        }
    }
    // Keep structure but throw error or require token for others
    // For now, implementing just the auth one requested
  };
};

// Deprecated static mock client - removing as requested
// Or keeping a shell that throws errors to force migration
export const api = {
   // Legacy placeholders that warn
   customers: {
       list: () => { throw new Error("Use createApiClient(session).customers.list()") }
   }
};
