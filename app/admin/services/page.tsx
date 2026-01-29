"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { DataTable } from "@/src/features/schedules/components/schedules-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Filter, Calendar as CalendarIcon, Search } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Schedule {
  id: string
  jobName?: string
  customerName?: string
  productName?: string;
  productModel?: string;
  expectedDate: string;
  status: 'pending' | 'scheduled' | 'done' | 'canceled'
  address: string
  source?: 'schedule' | 'task' | 'log'
}

export default function ServicesPage() {
  const { session } = useSupabase()
  const router = useRouter()
  const [data, setData] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [totalItems, setTotalItems] = useState(0)

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search)
        setPage(1) // Reset to page 1 on search
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const fetchSchedules = async () => {
    if (!session) return
    setLoading(true)
    setError(null)
    try {
      const api = createApiClient(session)
      const res = await (api as any).schedules.list({ 
          page, 
          limit: 10, 
          status: statusFilter,
          search: debouncedSearch
      })
      setData(res.data)
      const total = res.meta?.total || 0
      setTotalItems(total)
      setTotalPages(Math.ceil(total / 10))
    } catch (err: any) {
      console.error(err)
      setError("Failed to load services")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [session, page, statusFilter, debouncedSearch])

  const columns: ColumnDef<Schedule>[] = [
    {
      accessorKey: "expectedDate",
      header: "Date",
      cell: ({ row }) => {
          const date = new Date(row.original.expectedDate)
          return (
              <div className="flex flex-col">
                  <span className="font-medium">{format(date, "PPP")}</span>
                  <span className="text-xs text-muted-foreground">{format(date, "p")}</span>
              </div>
          )
      }
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
          <div className="flex flex-col">
               <span className="font-medium text-[#0A2540]">{row.original.customerName}</span>
               <span className="text-xs text-muted-foreground truncate max-w-[200px]">{row.original.address}</span>
          </div>
      )
    },
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }) => (
          <div className="flex flex-col">
             <span className="font-medium text-[#0A2540]">{row.original.productName || "General"}</span>
             <span className="text-xs text-muted-foreground">{row.original.productModel}</span>
             {row.original.jobName && (
                 <Badge variant="outline" className="w-fit mt-1 text-[10px] h-5 bg-blue-50 text-blue-700 border-blue-200">
                    {row.original.jobName}
                 </Badge>
             )}
          </div>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const status = row.original.status
          const colors: Record<string, string> = {
              pending: "bg-yellow-100 text-yellow-800",
              scheduled: "bg-blue-100 text-blue-800",
              done: "bg-green-100 text-green-800",
              canceled: "bg-gray-100 text-gray-800"
          }
          return (
             <Badge variant="secondary" className={colors[status] || ""}>
                 {status.toUpperCase()}
             </Badge>
          )
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={(e) => {
            e.stopPropagation();
            if (row.original.source === 'task') {
                router.push(`/admin/tasks/${row.original.id}`)
            } else {
                 // Fallback or alert
                 router.push(`/admin/tasks/${row.original.id}`)
            }
        }}>
            View
        </Button>
      )
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0A2540]">
                Services
                {!loading && <span className="ml-2 text-lg font-normal text-muted-foreground">({totalItems})</span>}
            </h1>
            <p className="text-muted-foreground">Manage and track all service schedules.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search customer, product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 bg-white"
                />
            </div>
            
            <Button className="bg-[#0A2540] hover:bg-[#0A2540]/90">
                <Plus className="mr-2 h-4 w-4" /> New Service
            </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
         {['pending', 'scheduled', 'done', 'canceled'].map(s => (
             <Button 
                key={s} 
                variant={statusFilter === s ? "default" : "outline"} 
                size="sm"
                onClick={() => { setStatusFilter(statusFilter === s ? undefined : s); setPage(1); }}
                className={statusFilter === s ? "bg-[#0A2540]" : ""}
             >
                {s.charAt(0).toUpperCase() + s.slice(1)}
             </Button>
         ))}
         {statusFilter && (
             <Button variant="ghost" size="sm" onClick={() => setStatusFilter(undefined)} className="text-red-500">
                Clear
             </Button>
         )}
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        isLoading={loading} 
        error={error}
        pagination={{
            pageIndex: page,
            pageSize: 10,
            pageCount: totalPages,
            onPageChange: setPage
        }}
        onRowClick={(row) => {
            if (row.source === 'task') {
                router.push(`/admin/tasks/${row.id}`)
            } else if (row.source === 'schedule') {
                router.push(`/admin/tasks/${row.id}`)
            } else {
                 // For logs or fallback
                 router.push(`/admin/tasks/${row.id}`)
            }
        }}
      />
    </div>
  )
}
