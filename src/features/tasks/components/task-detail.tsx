"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, CheckCircle, XCircle, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { TaskForm } from "./task-form"
import { toast } from "sonner"

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "info"
    case "pending":
      return "default"
    case "cancelled":
      return "error" // Corrected from canceled to cancelled/error if needed, but badge usually uses error for red
    case "canceled":
      return "error"
    default:
      return "default"
  }
}

export function TaskDetail() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string
  const { session } = useSupabase()
  
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const fetchTask = async () => {
      if (!session || !taskId) return
      setLoading(true)
      try {
          const api = createApiClient(session) as any
          const res = await api.tasks.getOne(taskId)
          setTask(res.data)
      } catch (error) {
          console.error("Failed to fetch task", error)
          toast.error("Failed to load task details")
      } finally {
          setLoading(false)
      }
  }

  useEffect(() => {
      fetchTask()
  }, [session, taskId])

  const handleStatusChange = async (newStatus: string) => {
    if (!session || !taskId) return
    try {
        const api = createApiClient(session) as any
        await api.tasks.update(taskId, { status: newStatus })
        setTask((prev: any) => ({ ...prev, status: newStatus }))
        toast.success("Task status updated")
    } catch (error) {
        console.error("Failed to update status", error)
        toast.error("Failed to update status")
    }
  }

  if (loading) {
      return <div className="p-8 text-center">Loading task details...</div>
  }

  if (!task) {
    // ... (unchanged)
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Task Not Found</h1>
        </div>
        <Card className="bg-white shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">The requested task could not be found.</p>
            <Button onClick={() => router.back()} className="mt-4 bg-[#0A2540] text-white hover:bg-[#0A2540]/90">
              Go Back
            </Button>
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
             <h1 className="font-heading text-2xl font-bold text-[#0A2540]">{task.title}</h1>
             
             {/* Status Dropdown */}
             <Select value={task.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px] h-8">
                    <div className="flex items-center gap-2">
                        <StatusBadge status={task.status} variant={getStatusVariant(task.status)} />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
             </Select>

             <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 border border-blue-200 uppercase">
                {task.taskType || "General"}
             </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Job: {task.jobName} | Scheduled: {new Date(task.taskDate).toLocaleDateString()} {new Date(task.taskDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditOpen(true)}
          className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Task
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Task Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
              <p className="text-[#333333] whitespace-pre-wrap">{task.description || "No description provided."}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
               <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                  <p className="font-medium text-[#0A2540]">{task.customerName}</p>
               </div>
               <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Location / Address</p>
                  <p className="text-[#333333]">{task.address || "N/A"}</p>
               </div>
            </div>

            {/* Product Details Section */}
            {(task.productName || task.customerProductId) && (
                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-[#0A2540] mb-3">Customer Product</h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div>
                            <p className="text-xs text-muted-foreground">Product Name</p>
                            <p className="text-sm font-medium text-[#0A2540]">{task.productName || "Unknown Product"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Model</p>
                            <p className="text-sm text-[#333333]">{task.productModel || "N/A"}</p>
                        </div>
                        {task.customerProductId && (
                         <div className="col-span-2">
                            <p className="text-xs text-muted-foreground">System ID</p>
                            <p className="text-xs font-mono text-gray-500">{task.customerProductId}</p>
                         </div>
                        )}
                    </div>
                </div>
            )}

            {task.expectedId && (
               <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <p className="text-xs text-muted-foreground">Linked to Contract Schedule</p>
                  <p className="text-sm font-medium">{task.expectedId}</p>
               </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Assigned Technician</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {task.technicianId && task.technicianName ? (
                <div className="rounded-lg border border-border p-4 bg-gray-50/50">
                  <p className="font-medium text-[#0A2540]">{task.technicianName}</p>
                  <p className="text-xs text-muted-foreground">ID: {task.technicianId}</p>
                </div>
              ) : (
                <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed">
                    <p className="text-muted-foreground text-sm">No technician assigned</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isEditOpen && (
          <TaskForm
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            initialData={task}
            onSuccess={fetchTask}
          />
      )}
    </div>
  )
}
