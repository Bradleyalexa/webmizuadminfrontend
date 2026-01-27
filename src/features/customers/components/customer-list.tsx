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
  const [addressTypeFilter, setAddressTypeFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<{ items: Customer[]; total: number }>({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  const fetchCustomers = async () => {
    if (!session) return

    try {
      setLoading(true)
      const res = await api.customers.list({ 
        page, 
        limit: 10, 
        search: searchQuery,
        addressType: addressTypeFilter 
      })
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
  }, [page, searchQuery, addressTypeFilter, session])

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email", hideOnMobile: true },
    { key: "phone", header: "Phone", hideOnMobile: true },
    { 
      key: "addressType", 
      header: "Type", 
      render: (c: Customer) => (
        <span className="capitalize text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-700">
          {c.addressType || "Rumah"}
        </span>
      )
    },
    { key: "status", header: "Status", render: (c: Customer) => (
       <span className={`capitalize text-xs font-medium px-2 py-1 rounded ${
           c.status === 'active' ? 'bg-green-100 text-green-700' :
           c.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
           'bg-red-100 text-red-700'
       }`}>
           {c.status}
       </span>
    )},
    {
      key: "createdAt",
      header: "Joined",
      render: (customer: Customer) => new Date(customer.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C499]"
              />
            </div>
             {/* Filter Dropdown */}
             <select 
               className="h-10 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
               value={addressTypeFilter}
               onChange={(e) => { setAddressTypeFilter(e.target.value); setPage(1); }}
             >
                <option value="all">All Types</option>
                <option value="rumah">Rumah</option>
                <option value="apartment">Apartment</option>
                <option value="company">Company</option>
             </select>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
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
