"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, User, Calendar, Loader2, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Technician } from "@/src/types"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"

export function TechnicianList() {
  const router = useRouter()
  const { session } = useSupabase()
  const [searchQuery, setSearchQuery] = useState("")
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTechnicians = async () => {
      if (!session) return
      try {
        const api = createApiClient(session)
        const res: any = await api.technicians.list({ limit: 50 })
        if (res.success) {
          setTechnicians(res.data.items)
        }
      } catch (err) {
        console.error(err)
        toast.error("Failed to load technicians")
      } finally {
        setLoading(false)
      }
    }

    fetchTechnicians()
  }, [session])

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tech.phone && tech.phone.includes(searchQuery))
  )

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search technicians..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C49A]"
          />
        </div>
        <Button 
          onClick={() => router.push("/admin/technicians/new")}
          className="bg-[#00C49A] hover:bg-[#00A07D] text-white w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Technician
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : filteredTechnicians.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No technicians found.</div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTechnicians.map((technician) => (
            <Card
              key={technician.id}
              onClick={() => router.push(`/admin/technicians/${technician.id}`)}
              className="cursor-pointer bg-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-[#00C49A]/30 group"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00C49A]/10 text-2xl font-bold text-[#00C49A] overflow-hidden">
                    {technician.photo_url ? (
                      <img src={technician.photo_url} alt={technician.name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-10 w-10" />
                    )}
                  </div>
                </div>
                <div className="mt-3 md:mt-4">
                  <h3 className="font-heading font-semibold text-[#0A2540] text-sm md:text-base group-hover:text-[#00C49A] transition-colors">{technician.name}</h3>
                </div>
                <div className="mt-2 md:mt-3 space-y-1 text-xs md:text-sm text-muted-foreground">
                  <p>{technician.phone || "No phone"}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {technician.created_at ? new Date(technician.created_at).toLocaleDateString() : "N/A"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
