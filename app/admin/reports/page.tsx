import { PageHeader } from "@/src/components/ui/page-header"
import { ReportsDashboard } from "@/src/features/reports/components/reports-dashboard"

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="View business analytics and performance metrics." />
      <ReportsDashboard />
    </div>
  )
}
