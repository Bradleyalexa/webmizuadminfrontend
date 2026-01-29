"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, CheckCircle, XCircle, Clock, Play, FileText, ExternalLink, User, MapPin, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { TaskForm } from "./task-form"
import { toast } from "sonner"
import { ServiceLogForm, ServiceLogFormValues } from "../../service-logs/components/service-log-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ServiceLogViewer } from "../../service-logs/components/service-log-viewer"

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
    case "done":
      return "success"
    case "in-progress":
      return "info"
    case "pending":
    case "scheduled":
      return "default"
    case "cancelled":
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
  const [isCompleteOpen, setIsCompleteOpen] = useState(false)
  const [isLogViewOpen, setIsLogViewOpen] = useState(false)

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

  const handleCompleteTask = async (data: ServiceLogFormValues) => {
      if (!session || !taskId) return
      setLoading(true)
      try {
          const api = createApiClient(session) as any
          await api.tasks.complete(taskId, data)
          toast.success("Task completed and Service Log created!")
          setIsCompleteOpen(false)
          fetchTask() // Refresh to show updated status
      } catch (error: any) {
          console.error("Failed to complete task", error)
          toast.error(error.message || "Failed to complete task")
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
             
             {/* View Service Log Button */}
             {(task.status === 'completed' || task.status === 'done') && task.serviceLog && (
                  <Button 
                     size="sm" 
                     variant="outline"
                     className="ml-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                     onClick={() => setIsLogViewOpen(true)}
                  >
                     <FileText className="mr-2 h-4 w-4" />
                     View Report
                  </Button>
             )}

             {/* Complete Button */}
             {task.status !== 'completed' && task.status !== 'canceled' && task.status !== 'done' && (
                  <Button 
                    size="sm" 
                    className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                    disabled={!task.technicianId}
                    onClick={() => {
                        if (!task.technicianId) {
                            toast.error("Please assign a technician/product first");
                            return;
                        }
                        setIsCompleteOpen(true);
                    }}
                 >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                 </Button>
             )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Job: {task.jobName} | Scheduled: {new Date(task.taskDate).toLocaleDateString()} {new Date(task.taskDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
        {task.source === 'schedule' ? (
            <Button
                variant="default" // Primary color for "Create"
                onClick={() => setIsEditOpen(true)}
                className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
            >
                <Edit className="mr-2 h-4 w-4" />
                Create Task
            </Button>
        ) : (
            <Button
                variant="outline"
                onClick={() => setIsEditOpen(true)}
                className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
            >
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
            </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-2">
          {/* ... existing content ... */}
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Task Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
              <p className="text-[#333333] whitespace-pre-wrap">{task.description || "No description provided."}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Customer Card */}
               {task.customerId ? (
                   <Link href={`/admin/customers/${task.customerId}`} className="block group">
                       <div className="h-full p-4 border rounded-xl hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all duration-200 cursor-pointer bg-white">
                           <div className="flex items-start justify-between">
                               <div className="flex items-start gap-3">
                                   <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-200 shrink-0">
                                       <User className="h-5 w-5" />
                                   </div>
                                   <div>
                                       <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Customer</p>
                                       <p className="text-base font-bold text-[#0A2540] group-hover:text-blue-700 transition-colors line-clamp-1">
                                           {task.customerName}
                                       </p>
                                   </div>
                               </div>
                               <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                           </div>
                       </div>
                   </Link>
               ) : (
                   <div className="p-4 border rounded-xl bg-gray-50/50">
                       <div className="flex items-center gap-3">
                           <div className="p-2.5 bg-gray-200 text-gray-500 rounded-lg">
                               <User className="h-5 w-5" />
                           </div>
                           <div>
                               <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Customer</p>
                               <p className="text-base font-bold text-gray-700">{task.customerName}</p>
                           </div>
                       </div>
                   </div>
               )}

               {/* Address Card (Non-clickable usually, or map link?) */}
               <div className="p-4 border rounded-xl bg-white">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Location</p>
                            <p className="text-sm text-[#333333] leading-relaxed font-medium">
                                {task.address || "No address provided"}
                            </p>
                        </div>
                    </div>
               </div>
            </div>

            {/* Product Details Section - Re-styled as card */}
            {(task.productName || task.customerProductId) && (
                <div className="pt-2"> 
                    {task.customerProductId ? (
                        <Link href={`/admin/products/customer-products/${task.customerProductId}`} className="block group">
                            <div className="p-4 border rounded-xl hover:border-emerald-300 hover:shadow-md hover:bg-emerald-50/30 transition-all duration-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-200">
                                            <Box className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Customer Product</p>
                                            <div className="flex items-baseline gap-2">
                                                <p className="text-base font-bold text-[#0A2540] group-hover:text-emerald-700 transition-colors">
                                                    {task.productName || "Unknown Product"}
                                                </p>
                                                {task.productModel && (
                                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                        {task.productModel}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[10px] font-mono text-gray-400 mt-1">
                                                SN: {task.customerProductId}
                                            </p>
                                        </div>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="p-4 border rounded-xl bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gray-200 text-gray-500 rounded-lg">
                                    <Box className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Customer Product</p>
                                    <p className="text-base font-bold text-gray-700">{task.productName || "Unknown Product"}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {task.contractId && (
               <Link 
                    href={`/admin/contracts/${task.contractId}`}
                    className="block group"
               >
                   <div className="p-4 bg-gradient-to-r from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <div className="bg-indigo-100 p-2 rounded-md group-hover:bg-indigo-200 transition-colors">
                                  <FileText className="h-4 w-4 text-indigo-600" />
                              </div>
                              <div>
                                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Linked Contract</p>
                                  <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-900">View Contract Details</p>
                              </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                   </div>
               </Link>
            )}

            {task.expectedId && !task.contractId && (
               <div className="p-3 bg-gray-50 rounded-md border border-gray-100 flex items-center gap-3">
                  <div className="bg-gray-200 p-1.5 rounded-full">
                    <Clock className="h-3 w-3 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Linked to Schedule</p>
                    <p className="text-sm font-medium text-mono text-gray-700">{task.expectedId}</p>
                  </div>
               </div>
            )}
            
            {/* Show Source for debugging/info */}
            {task.source === 'schedule' && (
               <div className="p-3 bg-amber-50 rounded-md border border-amber-100 text-amber-800 text-sm flex items-start gap-2">
                  <Play className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    This detail view is a preview of a <strong>Planned Schedule</strong>. 
                    Click "Create Task" to assign a technician and activate it.
                  </span>
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
                <Link 
                    href={`/admin/technicians/${task.technicianId}`}
                    className="block group"
                >
                    <div className="rounded-lg border border-border p-4 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-200">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <span className="text-sm font-bold">{task.technicianName.charAt(0)}</span>
                            </div>
                            <div>
                                <p className="font-medium text-[#0A2540] group-hover:text-blue-700 transition-colors flex items-center gap-1">
                                    {task.technicianName}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-slate-500">View Profile</p>
                            </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                             <p className="text-[10px] text-muted-foreground font-mono">ID: {task.technicianId}</p>
                        </div>
                    </div>
                </Link>
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
            initialData={task.source === 'schedule' ? {
                ...task,
                id: undefined, // Clear ID so it creates
                expectedId: task.id, // Map Schedule ID to expectedId
                title: task.description ? `Task for ${task.productName}` : "New Service Task" // Auto-title
            } : task}
            onSuccess={(newId) => {
                if (task.source === 'schedule' && newId) {
                    // Redirect to the new task
                    toast.success("Schedule promoted to Task! Redirecting...")
                    router.push(`/admin/tasks/${newId}`)
                } else {
                    fetchTask()
                }
            }}
          />
      )}

      {/* Complete Task Dialog */}
      <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Complete Task</DialogTitle>
          </DialogHeader>
          <ServiceLogForm
            defaultValues={{
                technician_id: task.technicianId || "",
                customer_product_id: task.customerProductId || "",
                job_id: task.jobId,
                expected_id: task.expectedId, // Link if exists
                pekerjaan: task.description || task.title, // Default job desc
                service_date: new Date(),
                service_type: "perpanggil", 
            }}
            onSubmit={handleCompleteTask}
            isLoading={loading}
          />
        </DialogContent>
      </Dialog>
      
      {/* Service Log Viewer Dialog */}
      <Dialog open={isLogViewOpen} onOpenChange={setIsLogViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Service Report</DialogTitle>
          </DialogHeader>
          <ServiceLogViewer log={task.serviceLog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
