"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { format } from "date-fns"
import { Loader2, Calendar, User, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ProductTasksModalProps {
  isOpen: boolean
  onClose: () => void
  customerProductId: string
  productName: string
}

export function ProductTasksModal({ isOpen, onClose, customerProductId, productName }: ProductTasksModalProps) {
  const { session } = useSupabase()
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")

  const fetchTasks = async () => {
    if (!session || !customerProductId) return
    setLoading(true)
    try {
      const api = createApiClient(session) as any
      // We rely on the backend to filter by customerProductId
      // Ideally we fetch ALL tasks for this product and filter client side for tabs, 
      // or fetch per tab. Since we updated the list endpoint, we can use it.
      // But list endpoint is paginated. Let's ask for a reasonable limit.
      const res = await api.tasks.list({ 
          customerProductId,
          limit: 100 
      })
      setTasks(res.data)
    } catch (error) {
      console.error("Failed to fetch product tasks", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
        fetchTasks()
    }
  }, [isOpen, session, customerProductId])

  const filteredTasks = tasks.filter(t => {
      if (activeTab === 'pending') return t.status === 'pending' || t.status === 'in-progress'
      if (activeTab === 'completed') return t.status === 'completed' || t.status === 'done'
      if (activeTab === 'canceled') return t.status === 'canceled'
      return true
  })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-3xl h-[85vh] flex flex-col p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Service History: {productName}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4 p-1 min-h-0">
             {loading ? (
                 <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
             ) : filteredTasks.length === 0 ? (
                 <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg bg-gray-50">
                     No {activeTab} tasks found for this product.
                 </div>
             ) : (
                 <div className="space-y-3">
                     {filteredTasks.map(task => (
                         <Link key={task.id} href={`/admin/tasks/${task.id}`} className="block group">
                             <div className="p-4 rounded-lg border bg-white shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all duration-200">
                                 <div className="flex justify-between items-start mb-2">
                                     <div>
                                         <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-[#0A2540] group-hover:text-blue-600 transition-colors">{task.title || "Untitled Task"}</h4>
                                            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                         </div>
                                         <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                             <Calendar className="h-3 w-3" />
                                             {format(new Date(task.taskDate), "PP p")}
                                         </div>
                                     </div>
                                     <StatusBadge status={task.status} />
                                 </div>
                                 
                                 <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    {task.technicianName || "Unassigned"}
                                 </div>

                                 {task.description && (
                                     <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded line-clamp-2">
                                         {task.description}
                                     </p>
                                 )}
                                 
                                 <div className="mt-2 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                     View Details <ArrowRight className="h-3 w-3" />
                                 </div>
                             </div>
                         </Link>
                     ))}
                 </div>
             )}
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
