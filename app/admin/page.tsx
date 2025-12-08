import Link from "next/link"
import { Users, Package, FileText, Wrench, Receipt, TrendingUp, Plus } from "lucide-react"
import { PageHeader } from "@/src/components/ui/page-header"
import { StatsCard } from "@/src/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { LucideIcon } from "lucide-react"

const stats = [
  { title: "Total Customers", value: "2,847", icon: Users, trend: { value: 12, isPositive: true } },
  { title: "Active Products", value: "1,234", icon: Package, trend: { value: 8, isPositive: true } },
  { title: "Active Contracts", value: "892", icon: FileText, trend: { value: 5, isPositive: true } },
  { title: "Pending Services", value: "47", icon: Wrench, trend: { value: 3, isPositive: false } },
  { title: "Open Invoices", value: "156", icon: Receipt, trend: { value: 2, isPositive: false } },
  { title: "Monthly Revenue", value: "$125,430", icon: TrendingUp, trend: { value: 18, isPositive: true } },
]

const recentServices = [
  { id: "1", customer: "John Smith", service: "AC Maintenance", status: "pending", date: "Today" },
  { id: "2", customer: "Sarah Johnson", service: "Filter Replacement", status: "scheduled", date: "Tomorrow" },
  { id: "3", customer: "Mike Davis", service: "System Check", status: "completed", date: "Yesterday" },
  { id: "4", customer: "Emily Brown", service: "Installation", status: "in-progress", date: "Today" },
]

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

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back! Here's an overview of your business." />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} trend={stat.trend} />
        ))}
      </div>

      <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="font-heading text-base md:text-lg font-semibold text-[#0A2540]">
              Recent Service Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 md:space-y-4">
              {recentServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/admin/services/${service.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border p-3 md:p-4 transition-all duration-200 ease-out hover:border-[#00C49A]/30 hover:bg-[#F6F9FC]"
                >
                  <div>
                    <p className="font-medium text-[#0A2540]">{service.customer}</p>
                    <p className="text-sm text-muted-foreground">{service.service}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <StatusBadge status={service.status} variant={getStatusVariant(service.status)} />
                    <span className="text-xs sm:text-sm text-muted-foreground">{service.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="font-heading text-base md:text-lg font-semibold text-[#0A2540]">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2">
              <QuickActionButton icon={Users} label="Add Customer" href="/admin/customers/new" />
              <QuickActionButton icon={Package} label="Add Product" href="/admin/products/new" />
              <QuickActionButton icon={FileText} label="Create Contract" href="/admin/contracts/new" />
              <QuickActionButton icon={Wrench} label="Schedule Service" href="/admin/services/new" />
              <QuickActionButton icon={Receipt} label="Create Invoice" href="/admin/invoices/new" />
              <QuickActionButton icon={Plus} label="Create Task" href="/admin/tasks/new" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function QuickActionButton({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon
  label: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 md:gap-3 rounded-lg border border-border p-3 md:p-4 transition-all duration-200 ease-out hover:border-[#00C49A] hover:bg-[#00C49A]/5"
    >
      <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#00C49A]/10 flex-shrink-0">
        <Icon className="h-4 w-4 md:h-5 md:w-5 text-[#00C49A]" />
      </div>
      <span className="font-medium text-sm md:text-base text-[#0A2540]">{label}</span>
    </Link>
  )
}
