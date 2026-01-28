"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { TaskCalendar } from "@/src/features/tasks/components/task-calendar"
import { Button } from "@/components/ui/button"
import { TaskForm } from "@/src/features/tasks/components/task-form"

interface Task {
  id: string
  title: string
  taskDate: string
  status: 'pending' | 'completed' | 'canceled'
  jobName?: string
  technicianName?: string
  customerName?: string
  description?: string
}

export default function TasksPage() {
  const { session } = useSupabase()
  const router = useRouter()
  const [data, setData] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)

  const fetchTasks = async () => {
    if (!session) return
    setLoading(true)
    setError(null)
    try {
      const api = createApiClient(session) as any
      // In a real app, we should filter by date range (start/end of month)
      // For now, fetching limit 100 to populate calendar
      const res = await api.tasks.list({ 
          limit: 100 
      })
      setData(res.data)
    } catch (err: any) {
      console.error(err)
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [session, currentMonth]) // Re-fetch when month changes (if we had date filtering)

  // Removed table columns

  const handleCreate = () => {
      setEditingTask(undefined)
      setIsFormOpen(true)
  }

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[#0A2540]">Tasks Schedule</h1>
          <p className="text-muted-foreground">Manage service appointments and technician tasks.</p>
      </div>

      <div className="flex-1">
          <TaskCalendar
             tasks={data}
             currentMonth={currentMonth}
             onMonthChange={setCurrentMonth}
             onAddClick={handleCreate}
             onEditClick={(task) => {
                 router.push(`/admin/tasks/${task.id}`)
             }}
          />
      </div>

      {isFormOpen && (
          <TaskForm 
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSuccess={fetchTasks}
            initialData={editingTask}
          />
      )}
    </div>
  )
}
