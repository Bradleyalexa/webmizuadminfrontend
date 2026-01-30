"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"
import { Loader2, User, ChevronRight, Calculator, Calendar } from "lucide-react"
import { DateRange } from "react-day-picker"
import { startOfMonth, endOfMonth, format } from "date-fns"

export function ReportsDashboard() {
  const router = useRouter()
  const { session, supabase } = useSupabase()
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [technicians, setTechnicians] = useState<any[]>([])
  const [stats, setStats] = useState<Record<string, { count: number, fee: number }>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return

      setLoading(true)
      try {
        // 1. Fetch Technicians (always fetch list)
        const api = createApiClient(session)
        const techRes: any = await api.technicians.list({ limit: 100 })
        const techs = techRes.success ? techRes.data.items : []
        setTechnicians(techs)

        // 2. Fetch Service Logs ONLY if date range is complete
        if (date?.from && date?.to) {
            const fromStr = format(date.from, 'yyyy-MM-dd')
            const toStr = format(date.to, 'yyyy-MM-dd')
    
            const { data: logs, error } = await supabase
              .from('service_log')
              .select('technician_id, teknisi_fee')
              .gte('service_date', fromStr)
              .lte('service_date', toStr)
    
            if (error) {
                console.error("Supabase Error:", error)
                throw error
            }
    
            // 3. Aggregate Data
            const newStats: Record<string, { count: number, fee: number }> = {}
            logs?.forEach((log: any) => {
                const tid = log.technician_id
                if (!tid) return
    
                if (!newStats[tid]) {
                    newStats[tid] = { count: 0, fee: 0 }
                }
                newStats[tid].count += 1
                newStats[tid].fee += Number(log.teknisi_fee || 0)
            })
            setStats(newStats)
        } else {
            setStats({}) // Reset stats if no date
        }

      } catch (err) {
        console.error(err)
        toast.error("Failed to load report data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [session, date])

  const handleTechnicianClick = (techId: string) => {
      if (!date?.from || !date?.to) {
          toast.error("Please select a date range first")
          return
      }
      const fromStr = format(date.from, 'yyyy-MM-dd')
      const toStr = format(date.to, 'yyyy-MM-dd')
      router.push(`/admin/reports/${techId}?startDate=${fromStr}&endDate=${toStr}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-border">
        <div className="flex items-center gap-2">
            <div className="bg-[#00C49A]/10 p-2 rounded-md">
                <Calendar className="h-5 w-5 text-[#00C49A]" />
            </div>
            <div>
                <h2 className="font-semibold text-[#0A2540]">Date Range</h2>
                <p className="text-xs text-muted-foreground">Select period to filter reports</p>
            </div>
        </div>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#00C49A]" />
        </div>
      ) : technicians.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed">
          <p className="text-muted-foreground">No technicians found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicians.map((tech) => {
            const stat = stats[tech.id] || { count: 0, fee: 0 }
            return (
              <Card 
                key={tech.id}
                onClick={() => handleTechnicianClick(tech.id)}
                className="cursor-pointer transition-all hover:shadow-md hover:border-[#00C49A]/50 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      {tech.photo_url ? (
                        <img src={tech.photo_url} alt={tech.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                    <div className="bg-[#effcf9] text-[#00C49A] px-2 py-1 rounded text-xs font-medium">
                        View Details
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-[#0A2540] text-lg mb-1 group-hover:text-[#00C49A] transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tech.phone || "No Phone"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Completed Tasks</p>
                        <p className="font-bold text-[#0A2540] text-lg">{stat.count}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Total Fee</p>
                        <p className="font-bold text-[#00C49A] text-lg">
                            Rp {stat.fee.toLocaleString()}
                        </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
