import Link from "next/link"
import { Users, Package, FileText, Wrench, Receipt, Plus } from "lucide-react"
import { PageHeader } from "@/src/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back! Here's an overview of your business." />

      <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 lg:grid-cols-2">
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
              <QuickActionButton icon={Receipt} label="Create Invoice" href="/admin/invoices/mockup" />
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
