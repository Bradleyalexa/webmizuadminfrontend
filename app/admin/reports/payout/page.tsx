import { PageHeader } from "@/src/components/ui/page-header"
import { PayoutReportPage } from "@/src/features/reports/components/payout-report-page"

export default function FullPayoutReportPage() {
  return (
    <div>
      <PageHeader
        title="Technician Payout Report"
        description="Detailed payout information for all technicians."
        backHref="/admin/reports"
      />
      <PayoutReportPage />
    </div>
  )
}
