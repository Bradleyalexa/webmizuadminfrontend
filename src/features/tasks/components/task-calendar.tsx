"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, LayoutGrid, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { 
  format, 
  isSameDay, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  addMonths, 
  subMonths, 
  addWeeks, 
  subWeeks, 
  isToday
} from "date-fns"
import { StatusBadge } from "@/src/components/ui/status-badge"

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

interface TaskCalendarProps {
  tasks: Task[]
  onAddClick: () => void
  onEditClick: (task: Task) => void
  currentMonth: Date
  onMonthChange: (date: Date) => void
}

type ViewMode = 'monthly' | 'weekly'

export function TaskCalendar({ tasks, onAddClick, onEditClick, currentMonth, onMonthChange }: TaskCalendarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('weekly')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  // Navigation Handlers
  const handlePrev = () => {
    if (viewMode === 'monthly') {
      onMonthChange(subMonths(currentMonth, 1))
    } else {
      onMonthChange(subWeeks(currentMonth, 1))
    }
  }

  const handleNext = () => {
    if (viewMode === 'monthly') {
      onMonthChange(addMonths(currentMonth, 1))
    } else {
      onMonthChange(addWeeks(currentMonth, 1))
    }
  }

  const handleToday = () => {
    onMonthChange(new Date())
  }

  // Date Calculations
  const year = currentMonth.getFullYear()
  
  const getDays = () => {
    if (viewMode === 'monthly') {
      const start = startOfMonth(currentMonth)
      const end = endOfMonth(currentMonth)
      return {
        days: eachDayOfInterval({ start, end }),
        prefix: Array(start.getDay()).fill(null)
      }
    } else {
      const start = startOfWeek(currentMonth, { weekStartsOn: 0 })
      const end = endOfWeek(currentMonth, { weekStartsOn: 0 })
      return {
        days: eachDayOfInterval({ start, end }),
        prefix: []
      }
    }
  }

  const { days, prefix } = getDays()
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
        const taskDate = new Date(task.taskDate)
        return isSameDay(taskDate, date)
    })
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed": return "success"
      case "canceled": return "default" // Using default/neutral for canceled
      default: return "warning" // pending
    }
  }

  return (
    <>
      <Card className="bg-transparent shadow-none border-none flex flex-col h-full">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-6 px-0 shrink-0 space-y-4 md:space-y-0">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrev} className="h-9 w-9">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleToday} className="h-9 px-4 font-medium">
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext} className="h-9 w-9">
                  <ChevronRight className="h-4 w-4" />
                </Button>
             </div>
             <h2 className="text-xl font-bold text-[#0A2540] ml-2">
               {format(currentMonth, "MMMM yyyy")}
             </h2>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
             <div className="flex items-center bg-white rounded-md border p-1">
                <Button 
                   variant="ghost" 
                   size="sm" 
                   onClick={() => setViewMode('weekly')}
                   className={cn(
                     "h-8 px-3 text-xs font-medium rounded-sm",
                     viewMode === 'weekly' ? "bg-[#0A2540] text-white hover:bg-[#0A2540]/90" : "text-muted-foreground hover:bg-transparent"
                   )}
                >
                    <LayoutGrid className="h-3 w-3 mr-2" /> Weekly
                </Button>
                <Button 
                   variant="ghost" 
                   size="sm" 
                   onClick={() => setViewMode('monthly')}
                   className={cn(
                     "h-8 px-3 text-xs font-medium rounded-sm",
                     viewMode === 'monthly' ? "bg-[#0A2540] text-white hover:bg-[#0A2540]/90" : "text-muted-foreground hover:bg-transparent"
                   )}
                >
                    <CalendarIcon className="h-3 w-3 mr-2" /> Monthly
                </Button>
             </div>
             
             <Button onClick={onAddClick} className="bg-[#00C49A] hover:bg-[#00C49A]/90 text-white font-medium px-6">
                <Plus className="h-4 w-4 mr-2" /> Create Task
             </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
          {viewMode === 'monthly' ? (
             // Monthly View (Grid)
             <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-7 gap-px bg-gray-200 border rounded-lg overflow-hidden min-w-[800px] min-h-[600px] h-full">
                    {dayNames.map((day) => (
                    <div key={day} className="bg-gray-50 py-2 text-center text-xs font-semibold text-muted-foreground">
                        {day}
                    </div>
                    ))}
                    {prefix.map((_, i) => (
                        <div key={`blank-${i}`} className="bg-white min-h-[100px]" />
                    ))}
                    {days.map((date, index) => {
                    const dayTasks = getTasksForDate(date)
                    const _isToday = isToday(date)
                    return (
                        <div 
                            key={index} 
                            onClick={() => setSelectedDate(date)}
                            className={cn(
                            "bg-white p-2 min-h-[100px] cursor-pointer hover:bg-gray-50 transition-colors flex flex-col gap-1",
                            _isToday && "bg-blue-50/30"
                            )}
                        >
                            <div className="flex justify-between items-start">
                            <span className={cn(
                                "text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full",
                                _isToday ? "bg-[#0A2540] text-white" : "text-[#0A2540]"
                            )}>
                                {date.getDate()}
                            </span>
                            {dayTasks.length > 0 && <span className="text-[10px] text-muted-foreground">{dayTasks.length} tasks</span>}
                            </div>
                            <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                                {dayTasks.slice(0, 3).map(task => (
                                    <div key={task.id} className="text-[10px] bg-gray-100 rounded px-1 py-0.5 truncate text-[#0A2540]">
                                        {task.title}
                                    </div>
                                ))}
                                {dayTasks.length > 3 && (
                                    <span className="text-[10px] text-muted-foreground">+{dayTasks.length - 3} more</span>
                                )}
                            </div>
                        </div>
                    )
                    })}
                </div>
             </div>
          ) : (
             // Weekly View (Cards)
             <div className="flex-1 overflow-y-auto md:overflow-hidden">
                 <div className="flex flex-col md:grid md:grid-cols-7 gap-4 h-auto md:h-full p-1">
                    {days.map((date, index) => {
                    const dayTasks = getTasksForDate(date)
                    const _isToday = isToday(date)
                    
                    return (
                        <div 
                            key={index} 
                            className={cn(
                                "flex flex-col md:h-full bg-white rounded-xl md:rounded-[24px] border transition-all overflow-hidden shadow-sm shrink-0 min-h-[180px] md:min-h-0",
                                _isToday ? "border-[#00C49A] border-2 shadow-md relative z-10" : "border-transparent shadow-none"
                            )}
                        >
                            {/* Day Header */}
                            <div className="p-3 md:p-4 md:text-center shrink-0 flex items-center md:block justify-between border-b md:border-none border-gray-50 bg-gray-50/50 md:bg-transparent">
                                <div className="flex items-baseline gap-2 md:block">
                                    <div className="text-xs font-bold text-gray-400 md:mb-1 uppercase tracking-wider">{format(date, "EEE")}</div>
                                    <div className={cn(
                                        "text-lg md:text-3xl font-bold",
                                        _isToday ? "text-[#00C49A]" : "text-[#0A2540]"
                                    )}>
                                        {date.getDate()}
                                    </div>
                                </div>
                                {/* Mobile-only task count logic could go here if collapsed */}
                            </div>

                            {/* Tasks List */}
                            <div className="flex-1 overflow-y-auto px-2 py-3 md:pb-4 flex flex-col gap-3 no-scrollbar">
                                {dayTasks.length === 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 min-h-[50px] md:min-h-[100px] text-xs font-medium">
                                        No tasks
                                    </div>
                                ) : (
                                    dayTasks.map(task => (
                                        <div 
                                            key={task.id} 
                                            onClick={() => onEditClick(task)}
                                            className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow group shrink-0"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-sm text-[#0A2540] leading-tight line-clamp-2 group-hover:text-[#00C49A] transition-colors">
                                                    {task.title}
                                                </h4>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-xs text-gray-500">
                                                        {format(new Date(task.taskDate), "HH:mm")}
                                                    </div>
                                                    <StatusBadge status={task.status} variant={getStatusVariant(task.status) as any} className="text-[10px] h-5 px-1.5" />
                                                </div>

                                                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                                    <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500 shrink-0">
                                                        {task.technicianName?.charAt(0) || "?"}
                                                    </div>
                                                    <span className="text-xs text-gray-600 truncate">{task.technicianName || "Unassigned"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )
                    })}
                </div>
             </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#0A2540]">
                 Tasks for {selectedDate ? format(selectedDate, "PPP") : ""}
            </DialogTitle>
             <DialogDescription>
                 {selectedDate ? `${getTasksForDate(selectedDate).length} tasks scheduled` : ""}
             </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 overflow-y-auto flex-1 pr-2">
             {selectedDate && getTasksForDate(selectedDate).length > 0 ? (
                getTasksForDate(selectedDate).map(task => (
                 <div 
                    key={task.id} 
                    className="cursor-pointer rounded-lg border border-border p-4 transition-all duration-200 hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                    onClick={() => { setSelectedDate(null); onEditClick(task); }}
                 >
                     <div className="flex items-start justify-between gap-2">
                         <div className="flex-1 min-w-0">
                             <p className="font-medium text-[#0A2540]">{task.title}</p>
                             <p className="text-sm text-muted-foreground mt-1">{task.jobName}</p>
                             {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
                         </div>
                         <StatusBadge status={task.status} variant={getStatusVariant(task.status) as any} />
                     </div>
                     <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                         <span className="text-sm">
                             <span className="text-muted-foreground">Technician: </span>
                             <span className="font-medium text-[#0A2540]">{task.technicianName || "Unassigned"}</span>
                         </span>
                         <span className="text-xs text-muted-foreground">
                             {format(new Date(task.taskDate), "p")}
                         </span>
                     </div>
                 </div>
                ))
             ) : (
                 <div className="text-center py-8">
                     <p className="text-muted-foreground">No tasks for this day.</p>
                     <Button variant="link" onClick={() => { 
                         setSelectedDate(null); 
                         onAddClick(); 
                     }}>
                         Create one?
                     </Button>
                 </div>
             )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
