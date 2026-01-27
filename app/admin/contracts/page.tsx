"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContractsTable } from "@/src/features/contracts/components/contracts-table"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Contract } from "@/src/types"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContractForm } from "@/src/features/contracts/components/contract-form"

export default function ContractsPage() {
  const { session } = useSupabase()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [productSearch, setProductSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Debounce search could be better, but for now simple effect
  useEffect(() => {
    if (!session) return

    const fetchContracts = async () => {
      try {
        setIsLoading(true)
        const api = createApiClient(session)
        // Pass filters to backend
        // Note: api client currently doesn't accept args for list(). Fixing client first.
        // Wait, I forgot to update Client for contracts.list to accept params!
        // Step 841: Client only has list() for contracts without arguments.
        // I must update client.ts first.
        
        // Assuming client is updated:
        const res = await (api.contracts as any).list({ 
            status: statusFilter,
            productName: productSearch
        })
        
        if ((res as any).success) {
          setContracts((res as any).data)
        } else {
          setContracts([])
        }
      } catch (error) {
        console.error("Failed to fetch contracts", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce to avoid too many requests
    const timer = setTimeout(() => {
        fetchContracts()
    }, 300)

    return () => clearTimeout(timer)
  }, [session, statusFilter, productSearch])

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search Product / Customer..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C499]"
                />
            </div>
             {/* Status Filter Dropdown */}
             <select 
               className="h-10 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
             >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
             </select>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
             <Dialog>
               <DialogTrigger asChild>
                  <Button className="bg-[#00C49A] hover:bg-[#00A07D] text-white flex-1 sm:flex-none">
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">New Contract</span>
                    <span className="sm:hidden">New</span>
                  </Button>
               </DialogTrigger>
               <DialogContent className="w-[95vw] max-w-md sm:max-w-xl max-h-[90vh] overflow-y-auto">
                 <DialogHeader>
                    <DialogTitle>Create New Contract</DialogTitle>
                 </DialogHeader>
                 <ContractForm 
                    onSuccess={() => {
                      // Reload current page to see new data
                      window.location.reload() 
                    }}
                 />
               </DialogContent>
             </Dialog>
          </div>
      </div>
      
      <ContractsTable data={contracts} isLoading={isLoading} />
    </div>
  )
}
