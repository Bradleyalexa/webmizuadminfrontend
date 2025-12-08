// API Client - Placeholder functions for backend integration
// All API calls should go through this client

export const api = {
  // Customer Management
  customers: {
    list: async (params?: { search?: string; page?: number; limit?: number }) => {
      // Placeholder: await fetch('/api/customers', { params })
      return { data: [], total: 0, page: 1, limit: 10 }
    },
    get: async (id: string) => {
      // Placeholder: await fetch(`/api/customers/${id}`)
      return { data: null }
    },
    create: async (data: unknown) => {
      // Placeholder: await fetch('/api/customers', { method: 'POST', body: data })
      return { success: true, data: null }
    },
    update: async (id: string, data: unknown) => {
      // Placeholder: await fetch(`/api/customers/${id}`, { method: 'PUT', body: data })
      return { success: true, data: null }
    },
    delete: async (id: string) => {
      // Placeholder: await fetch(`/api/customers/${id}`, { method: 'DELETE' })
      return { success: true }
    },
    getProducts: async (customerId: string) => {
      // Placeholder: await fetch(`/api/customers/${customerId}/products`)
      return { data: [] }
    },
  },

  // Product Management
  products: {
    list: async (params?: { search?: string; page?: number; limit?: number }) => {
      return { data: [], total: 0, page: 1, limit: 10 }
    },
    get: async (id: string) => {
      return { data: null }
    },
    assignToCustomer: async (productId: string, customerId: string) => {
      return { success: true, data: null }
    },
  },

  // Customer Products
  customerProducts: {
    list: async (customerId?: string) => {
      return { data: [] }
    },
    get: async (id: string) => {
      return { data: null }
    },
  },

  // Contract Management
  contracts: {
    list: async (params?: { status?: string; customerId?: string }) => {
      return { data: [], total: 0 }
    },
    get: async (id: string) => {
      return { data: null }
    },
    create: async (data: unknown) => {
      return { success: true, data: null }
    },
    getPdf: async (id: string) => {
      return { url: "" }
    },
  },

  // Service Management
  services: {
    list: async (params?: { status?: string; date?: string }) => {
      return { data: [], total: 0 }
    },
    get: async (id: string) => {
      return { data: null }
    },
    getScheduleExpected: async (params?: { date?: string }) => {
      return { data: [] }
    },
    assignTechnician: async (serviceId: string, technicianId: string) => {
      return { success: true }
    },
    uploadEvidence: async (serviceId: string, files: File[]) => {
      return { success: true, urls: [] }
    },
    approveReschedule: async (serviceId: string) => {
      return { success: true }
    },
    rejectReschedule: async (serviceId: string, reason: string) => {
      return { success: true }
    },
    getLog: async (id: string) => {
      return { data: null }
    },
  },

  // Task Management
  tasks: {
    list: async (params?: { date?: string; technicianId?: string }) => {
      return { data: [] }
    },
    get: async (id: string) => {
      return { data: null }
    },
    create: async (data: unknown) => {
      return { success: true, data: null }
    },
    update: async (id: string, data: unknown) => {
      return { success: true, data: null }
    },
    updateStatus: async (id: string, status: string) => {
      return { success: true }
    },
  },

  // Technician Management
  technicians: {
    list: async () => {
      return { data: [] }
    },
    get: async (id: string) => {
      return { data: null }
    },
    getWeeklyPayout: async (technicianId: string, weekStart: string) => {
      return { data: null }
    },
  },

  // Invoice Management
  invoices: {
    list: async (params?: { status?: string; customerId?: string }) => {
      return { data: [], total: 0 }
    },
    get: async (id: string) => {
      return { data: null }
    },
    create: async (data: unknown) => {
      return { success: true, data: null }
    },
    preview: async (data: unknown) => {
      return { html: "" }
    },
    send: async (id: string) => {
      return { success: true }
    },
    markPaid: async (id: string) => {
      return { success: true }
    },
  },

  // Reports
  reports: {
    getMonthlyServiceSummary: async (month: string) => {
      return { data: null }
    },
    getMonthlyRevenue: async (year: string) => {
      return { data: [] }
    },
    getTechnicianWeeklyPayout: async (weekStart: string) => {
      return { data: [] }
    },
  },

  // Chat / Support
  chat: {
    getConversations: async () => {
      return { data: [] }
    },
    getMessages: async (conversationId: string) => {
      return { data: [] }
    },
    sendMessage: async (conversationId: string, message: string, attachment?: File) => {
      return { success: true, data: null }
    },
    getCustomerStatus: async (customerId: string) => {
      return { online: false }
    },
  },
}
