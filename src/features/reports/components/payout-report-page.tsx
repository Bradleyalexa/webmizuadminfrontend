"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/src/components/ui/data-table"
import { Download, DollarSign, Users, CheckCircle, Clock } from "lucide-react"
import { StatsCard } from "@/src/components/ui/stats-card"

const payoutData = [
  {
    id: "1",
    name: "Tom Wilson",
    specialization: "HVAC",
    tasksCompleted: 28,
    hoursWorked: 112,
    hourlyRate: 37.5,
    bonus: 0,
    totalPayout: 4200,
    status: "paid",
  },
  {
    id: "2",
    name: "Jane Cooper",
    specialization: "Smart Home",
    tasksCompleted: 24,
    hoursWorked: 96,
    hourlyRate: 37.5,
    bonus: 0,
    totalPayout: 3600,
    status: "paid",
  },
  {
    id: "3",
    name: "Alex Martinez",
    specialization: "General",
    tasksCompleted: 22,
    hoursWorked: 88,
    hourlyRate: 37.5,
    bonus: 0,
    totalPayout: 3300,
    status: "pending",
  },
  {
    id: "4",
    name: "Chris Johnson",
    specialization: "HVAC",
    tasksCompleted: 18,
    hoursWorked: 72,
    hourlyRate: 37.5,
    bonus: 0,
    totalPayout: 2700,
    status: "pending",
  },
  {
    id: "5",
    name: "Sarah Miller",
    specialization: "Air Quality",
    tasksCompleted: 15,
    hoursWorked: 60,
    hourlyRate: 37.5,
    bonus: 100,
    totalPayout: 2350,
    status: "paid",
  },
]

const columns = [
  { key: "name", header: "Technician" },
  { key: "specialization", header: "Specialization" },
  { key: "tasksCompleted", header: "Tasks" },
  {
    key: "hoursWorked",
    header: "Hours",
    render: (row: (typeof payoutData)[0]) => `${row.hoursWorked}h`,
  },
  {
    key: "hourlyRate",
    header: "Rate",
    render: (row: (typeof payoutData)[0]) => `$${row.hourlyRate}/hr`,
  },
  {
    key: "bonus",
    header: "Bonus",
    render: (row: (typeof payoutData)[0]) => `$${row.bonus}`,
  },
  {
    key: "totalPayout",
    header: "Total Payout",
    render: (row: (typeof payoutData)[0]) => (
      <span className="font-bold text-[#00C49A]">${row.totalPayout.toLocaleString()}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: (typeof payoutData)[0]) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          row.status === "paid" ? "bg-[#00C49A]/10 text-[#00C49A]" : "bg-amber-500/10 text-amber-600"
        }`}
      >
        {row.status === "paid" ? <CheckCircle className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    ),
  },
]

export function PayoutReportPage() {
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [selectedYear, setSelectedYear] = useState("2024")

  const totalPayout = payoutData.reduce((sum, t) => sum + t.totalPayout, 0)
  const totalTasks = payoutData.reduce((sum, t) => sum + t.tasksCompleted, 0)
  const totalHours = payoutData.reduce((sum, t) => sum + t.hoursWorked, 0)
  const paidCount = payoutData.filter((t) => t.status === "paid").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">This Week</SelectItem>
              <SelectItem value="last">Last Week</SelectItem>
              <SelectItem value="2-weeks">2 Weeks Ago</SelectItem>
              <SelectItem value="3-weeks">3 Weeks Ago</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-28 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-[#00C49A] text-white hover:bg-[#00a883]">
          <Download className="mr-2 h-4 w-4" />
          Export Payout Report
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Payout" value={`$${totalPayout.toLocaleString()}`} icon={DollarSign} />
        <StatsCard title="Technicians" value={payoutData.length.toString()} icon={Users} />
        <StatsCard title="Tasks Completed" value={totalTasks.toString()} icon={CheckCircle} />
        <StatsCard title="Total Hours" value={`${totalHours}h`} icon={Clock} />
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Payout Details</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={payoutData} />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
        >
          Mark All as Paid
        </Button>
        <Button className="bg-[#00C49A] text-white hover:bg-[#00a883]">Process Payouts</Button>
      </div>
    </div>
  )
}
