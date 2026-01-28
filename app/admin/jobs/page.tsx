"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { DataTable } from "@/src/features/jobs/components/jobs-table"
import { JobForm } from "@/src/features/jobs/components/job-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
// Ensure you have a utils file or similar for formatting, else inline it.
// Assuming formatCurrency exists or I use Intl directly.

interface Job {
  id: string
  name: string
  description?: string
  defaultPrice: number
  createdAt: string
}

export default function JobsPage() {
  const { session } = useSupabase()
  const [data, setData] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | undefined>(undefined)

  const fetchJobs = async () => {
    if (!session) return
    setLoading(true)
    setError(null)
    try {
      const api = createApiClient(session)
      // client.ts might currently be broken, but assuming fix
      const res = await (api as any).jobs.list({ page, limit: 50, search })
      setData(res.data)
      // API currently returns `meta` with total/page/limit?
      // Check controller: yes, returns meta.
      const total = res.meta?.total || 0
      setTotalPages(Math.ceil(total / 10))
    } catch (err: any) {
      console.error(err)
      setError("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchJobs()
    }, 300) // Debounce search
    return () => clearTimeout(timer)
  }, [session, page, search])

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!session || !confirm("Are you sure you want to delete this job?")) return
    try {
        const api = createApiClient(session)
        await (api as any).jobs.delete(id)
        fetchJobs()
    } catch (err) {
        alert("Failed to delete")
    }
  }

  const columns: ColumnDef<Job>[] = [
    {
      accessorKey: "name",
      header: "Job Name",
      cell: ({ row }) => <span className="font-medium text-[#0A2540]">{row.original.name}</span>
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="text-muted-foreground truncate max-w-[300px] block" title={row.original.description}>{row.original.description || "-"}</span>
    },
    {
      accessorKey: "defaultPrice",
      header: "Default Price",
      cell: ({ row }) => <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(row.original.defaultPrice)}</span>
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(row.original)}>Edit</Button>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(row.original.id)}>Delete</Button>
        </div>
      )
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0A2540]">Jobs</h1>
            <p className="text-muted-foreground">Manage service definitions and master data.</p>
        </div>
        <Button onClick={() => { setEditingJob(undefined); setIsFormOpen(true); }} className="bg-[#0A2540] hover:bg-[#0A2540]/90">
            <Plus className="mr-2 h-4 w-4" /> New Job
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <Input 
            placeholder="Search jobs..." 
            value={search} 
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} 
            className="max-w-sm"
        />
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
      />

      {isFormOpen && (
        <JobForm 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            onSuccess={fetchJobs}
            initialData={editingJob}
        />
      )}
    </div>
  )
}
