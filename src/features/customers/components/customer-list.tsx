"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/src/components/ui/data-table"
import type { Customer } from "@/src/types"
import { createApiClient } from "@/src/lib/api/client"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { Session } from "@supabase/supabase-js"

export function CustomerList() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const api = createApiClient(session)
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<{ items: Customer[]; total: number }>({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const res = await api.customers.list({ page, limit: 10, search: searchQuery })
      // Backend returns { success: true, data: items, pagination: { total } }
      // Client wrapper returns full response? No, fetchApi returns `data`. 
      // Checking ProductController... it returns { success: true, data: result } where result is { items, total }.
      // Checking CustomerController... it returns { success: true, data: result.data, pagination: { total } }
      // Wait, CustomerController logic:
      // res.json({ success: true, data: result.data, pagination: { ... } })
      // fetchApi returns the JSON body.
      // So res.data is the array, res.pagination.total is the count.
      
      const response = res as any
      if (response.success) {
        setData({ items: response.data, total: response.pagination.total })
      }
    } catch (error) {
      console.error("Failed to fetch customers", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [page, searchQuery, session]) // Re-fetch on params change

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email", hideOnMobile: true },
    { key: "phone", header: "Phone", hideOnMobile: true },
    { key: "status", header: "Status", render: (c: Customer) => c.status },
    {
      key: "createdAt",
      header: "Joined",
      render: (customer: Customer) => new Date(customer.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} // Reset page on search
            className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C499]"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent flex-1 sm:flex-none"
          >
            <Filter className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button
            onClick={() => router.push("/admin/customers/new")}
            className="bg-[#00C499] text-white hover:bg-[#00a883] flex-1 sm:flex-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Customer</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data.items}
        page={page}
        totalPages={Math.ceil(data.total / 10)}
        onPageChange={setPage}
        onRowClick={(customer) => router.push(`/admin/customers/${customer.id}`)}
      />
    </div>
  )
}
