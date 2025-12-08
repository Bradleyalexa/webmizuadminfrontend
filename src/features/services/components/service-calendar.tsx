"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { ServiceRequest } from "@/src/types"

interface ServiceCalendarProps {
  services: ServiceRequest[]
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "info"
    case "scheduled":
      return "warning"
    case "pending":
      return "default"
    default:
      return "default"
  }
}

export function ServiceCalendar({ services }: ServiceCalendarProps) {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const days: (number | null)[] = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getServicesForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return services.filter((s) => s.scheduledDate === dateStr)
  }

  const getServicesForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return services.filter((s) => s.scheduledDate === dateStr)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <>
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">
            {monthNames[month]} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              className="h-8 w-8 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="h-8 w-8 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="py-1 md:py-2 text-center text-xs md:text-sm font-medium text-muted-foreground">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}
            {days.map((day, index) => {
              const dayServices = day ? getServicesForDay(day) : []
              const isToday =
                day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

              return (
                <div
                  key={index}
                  onClick={() => day && handleDayClick(day)}
                  className={cn(
                    "min-h-16 md:min-h-24 rounded-lg border p-1 transition-all duration-200 ease-out",
                    day
                      ? "border-border cursor-pointer hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                      : "border-transparent",
                    isToday && "bg-[#00C49A]/5 border-[#00C49A]",
                  )}
                >
                  {day && (
                    <>
                      <div
                        className={`text-xs md:text-sm font-medium ${isToday ? "text-[#00C49A]" : "text-[#333333]"}`}
                      >
                        {day}
                      </div>
                      <div className="mt-1 space-y-0.5 md:space-y-1">
                        {dayServices.slice(0, 2).map((service) => (
                          <div
                            key={service.id}
                            className="w-full truncate rounded bg-[#00C49A]/10 px-1 py-0.5 text-left text-[8px] md:text-xs text-[#00C49A]"
                          >
                            <span className="hidden md:inline">{service.customerProduct?.customer?.name}</span>
                            <span className="md:hidden">{service.customerProduct?.customer?.name?.split(" ")[0]}</span>
                          </div>
                        ))}
                        {dayServices.length > 2 && (
                          <div className="text-[8px] md:text-xs text-muted-foreground">+{dayServices.length - 2}</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Daily breakdown */}
          <div className="mt-4 md:mt-6 border-t border-border pt-4 md:pt-6">
            <h3 className="mb-3 md:mb-4 font-heading text-sm font-semibold text-[#0A2540]">
              Today's Schedule ({new Date().toLocaleDateString()})
            </h3>
            <div className="space-y-2">
              {services
                .filter((s) => s.scheduledDate === new Date().toISOString().split("T")[0])
                .map((service) => (
                  <div
                    key={service.id}
                    onClick={() => router.push(`/admin/services/${service.id}`)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer rounded-lg border border-border p-3 transition-all duration-200 ease-out hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                  >
                    <div>
                      <p className="font-medium text-[#0A2540]">{service.customerProduct?.customer?.name}</p>
                      <p className="text-sm text-muted-foreground">{service.customerProduct?.product?.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{service.technician?.name ?? "Unassigned"}</span>
                      <StatusBadge status={service.status} variant={getStatusVariant(service.status)} />
                    </div>
                  </div>
                ))}
              {services.filter((s) => s.scheduledDate === new Date().toISOString().split("T")[0]).length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No services scheduled for today</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#0A2540]">
              Services for{" "}
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </DialogTitle>
            <DialogDescription>
              {selectedDate && getServicesForDate(selectedDate).length} service(s) scheduled
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 overflow-y-auto flex-1 pr-2">
            {selectedDate && getServicesForDate(selectedDate).length > 0 ? (
              getServicesForDate(selectedDate).map((service) => (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedDate(null)
                    router.push(`/admin/services/${service.id}`)
                  }}
                  className="cursor-pointer rounded-lg border border-border p-4 transition-all duration-200 hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#0A2540]">{service.customerProduct?.customer?.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{service.customerProduct?.product?.name}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                    </div>
                    <StatusBadge
                      status={service.status}
                      variant={getStatusVariant(service.status)}
                      className="flex-shrink-0"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-sm">
                      <span className="text-muted-foreground">Technician: </span>
                      <span className="font-medium text-[#0A2540]">{service.technician?.name ?? "Unassigned"}</span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No services scheduled for this date</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
