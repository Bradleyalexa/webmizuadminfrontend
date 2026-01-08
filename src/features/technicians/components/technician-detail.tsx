"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { Mail, Phone, Briefcase, Calendar, CheckCircle, Pencil, User } from "lucide-react"
import type { Technician, Task } from "@/src/types"
import { useEffect, useState } from "react"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "info"
    case "pending":
      return "default"
    default:
      return "default"
  }
}

export function TechnicianDetail({ id }: { id: string }) {
  const router = useRouter()
  const { session } = useSupabase()
  const [technician, setTechnician] = useState<Technician | null>(null)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([]) // Placeholder for real tasks later

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return
      try {
        const api = createApiClient(session)
        const res: any = await api.technicians.getOne(id)
        if (res.success) {
          setTechnician(res.data)
        }
      } catch (err) {
        console.error(err)
        toast.error("Failed to load technician")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, session])

  if (loading) {
    return <div className="py-12 text-center text-muted-foreground">Loading...</div>
  }

  if (!technician) {
    return (
      <Card className="bg-white shadow-sm">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Technician not found</p>
        </CardContent>
      </Card>
    )
  }

  // Placeholder stats
  const completedTasks = 0
  const pendingTasks = 0

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00C49A]/10 text-2xl font-bold text-[#00C49A] overflow-hidden">
               {technician.photo_url ? (
                  <img src={technician.photo_url} alt={technician.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-10 w-10" />
                )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-heading text-2xl font-bold text-[#0A2540]">{technician.name}</h2>
                  {/* Status is not in current Technician type, defaulting to Active */}
                  <StatusBadge
                    status={"Active"}
                    variant={"success"}
                  />
                </div>
                <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={() => router.push(`/admin/technicians/${id}/edit`)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
              
              {technician.notes && (
                <p className="mt-2 text-sm text-gray-600">{technician.notes}</p>
              )}
              
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{technician.phone || "No phone"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {technician.created_at ? new Date(technician.created_at).toLocaleDateString() : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C49A]/10">
                <Briefcase className="h-5 w-5 text-[#00C49A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="font-heading text-2xl font-bold text-[#0A2540]">{tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C49A]/10">
                <CheckCircle className="h-5 w-5 text-[#00C49A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-heading text-2xl font-bold text-[#0A2540]">{completedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                <Calendar className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="font-heading text-2xl font-bold text-[#0A2540]">{pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Assigned Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No tasks assigned</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-all duration-200 hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                >
                  <div>
                    <p className="font-medium text-[#0A2540]">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.scheduledDate}
                    </p>
                  </div>
                  <StatusBadge status={task.status} variant={getStatusVariant(task.status)} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
