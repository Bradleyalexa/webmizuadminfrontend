"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Wrench, DollarSign, Users, ExternalLink } from "lucide-react"
import { StatsCard } from "@/src/components/ui/stats-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 69000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 82000 },
  { month: "Nov", revenue: 91000 },
  { month: "Dec", revenue: 125430 },
]

const serviceData = [
  { month: "Jan", completed: 45, pending: 12 },
  { month: "Feb", completed: 52, pending: 8 },
  { month: "Mar", completed: 48, pending: 15 },
  { month: "Apr", completed: 61, pending: 10 },
  { month: "May", completed: 55, pending: 7 },
  { month: "Jun", completed: 67, pending: 9 },
  { month: "Jul", completed: 72, pending: 11 },
  { month: "Aug", completed: 69, pending: 13 },
  { month: "Sep", completed: 78, pending: 6 },
  { month: "Oct", completed: 82, pending: 8 },
  { month: "Nov", completed: 91, pending: 5 },
  { month: "Dec", completed: 85, pending: 12 },
]

const technicianPayouts = [
  { name: "Tom Wilson", tasks: 28, payout: 4200 },
  { name: "Jane Cooper", tasks: 24, payout: 3600 },
  { name: "Alex Martinez", tasks: 22, payout: 3300 },
  { name: "Chris Johnson", tasks: 18, payout: 2700 },
]

export function ReportsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("december")
  const [selectedYear, setSelectedYear] = useState("2024")

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32 md:w-40 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="may">May</SelectItem>
              <SelectItem value="june">June</SelectItem>
              <SelectItem value="july">July</SelectItem>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="december">December</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24 md:w-28 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-[#00C49A] text-white hover:bg-[#00a883] w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Monthly Revenue" value="$125,430" icon={DollarSign} trend={{ value: 18, isPositive: true }} />
        <StatsCard title="Services Completed" value="85" icon={Wrench} trend={{ value: 12, isPositive: true }} />
        <StatsCard title="New Customers" value="23" icon={Users} trend={{ value: 8, isPositive: true }} />
        <StatsCard
          title="Avg. Completion Time"
          value="2.3 days"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Revenue Chart */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="font-heading text-base md:text-lg font-semibold text-[#0A2540]">
            Monthly Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6 pt-0 md:pt-0">
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 10 }} />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 10 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  width={45}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#00C49A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Service Summary Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="font-heading text-base md:text-lg font-semibold text-[#0A2540]">
              Monthly Service Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-0 md:pt-0">
            <div className="h-48 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#00C49A"
                    strokeWidth={2}
                    dot={{ fill: "#00C49A", r: 3 }}
                    name="Completed"
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#0A2540"
                    strokeWidth={2}
                    dot={{ fill: "#0A2540", r: 3 }}
                    name="Pending"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 md:mt-4 flex justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#00C49A]" />
                <span className="text-xs md:text-sm text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#0A2540]" />
                <span className="text-xs md:text-sm text-muted-foreground">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technician Payout Report */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="font-heading text-base md:text-lg font-semibold text-[#0A2540]">
              Technician Weekly Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-0 md:pt-0">
            <div className="space-y-3 md:space-y-4">
              {technicianPayouts.map((tech, index) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3 md:p-4 transition-all duration-200 ease-out hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#00C49A]/10 font-bold text-[#00C49A] text-sm md:text-base">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-[#0A2540] text-sm md:text-base">{tech.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{tech.tasks} tasks</p>
                    </div>
                  </div>
                  <p className="font-heading text-base md:text-lg font-bold text-[#00C49A]">
                    ${tech.payout.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-3 md:mt-4 w-full border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent text-sm"
              asChild
            >
              <Link href="/admin/reports/payout">
                View Full Payout Report
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
