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
    throw new Error(data.error?.message || "An API error occurred");
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
