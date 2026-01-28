"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { format } from "date-fns"
import { toast } from "sonner"

export default function ScheduleDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { session } = useSupabase()
  
  const [schedule, setSchedule] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     const fetchSchedule = async () => {
         if (!session || !id) return
         try {
             const api = createApiClient(session) as any
             const res = await api.schedules.getOne(id)
             setSchedule(res.data)
         } catch (error) {
             console.error("Failed to fetch schedule", error)
             toast.error("Failed to load schedule details")
         } finally {
             setLoading(false)
         }
     }
     fetchSchedule()
  }, [session, id])

  if (loading) return <div className="p-8 text-center bg-gray-50 rounded-lg">Loading schedule...</div>

  if (!schedule) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Schedule Not Found</h1>
        </div>
        <Card className="bg-white shadow-sm border-dashed">
             <CardContent className="py-12 text-center text-muted-foreground">
                 This schedule may have been deleted or invalid.
             </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-[#0A2540]">
                {schedule.jobName || "Scheduled Service"}
            </h1>
            <StatusBadge status={schedule.status} />
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 border border-indigo-200">
                Planned Schedule
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            Expected: {format(new Date(schedule.expectedDate), "PPP")}
          </p>
        </div>
        
        {/* Placeholder for action: e.g. "Create Task" from this schedule */}
        <Button 
            className="bg-[#0A2540] hover:bg-[#0A2540]/90"
            onClick={() => {
                // Logic to create a task from this schedule (could pass data via query params or state)
                toast.info("Create Task from Schedule not implemented yet")
            }}
        >
            Process Service
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                  <p className="font-medium text-[#0A2540]">{schedule.customerName}</p>
               </div>
               <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Product</p>
                  <p className="text-[#333333]">{schedule.productName}</p>
               </div>
            </div>
             
             <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                <p className="text-[#333333]">{schedule.address}</p>
             </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="bg-white shadow-sm">
             <CardHeader>
                 <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Contract Info</CardTitle>
             </CardHeader>
             <CardContent>
                 <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                     <p className="text-xs text-muted-foreground">Generated from Contract</p>
                     <p className="font-medium mt-1">ID: {schedule.contractId || "N/A"}</p>
                 </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
