import { TechnicianPayoutDetail } from "@/src/features/reports/components/technician-payout-detail"
import { PageHeader } from "@/src/components/ui/page-header"

interface PageProps {
  params: Promise<{ technicianId: string }>
  searchParams: Promise<{ startDate?: string; endDate?: string }>
}

export default async function TechnicianPayoutPage({ params, searchParams }: PageProps) {
  const { technicianId } = await params
  const { startDate, endDate } = await searchParams

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Technician Payout Detail" 
        description="View detailed service logs and payout calculation." 
      />
      <TechnicianPayoutDetail 
        technicianId={technicianId} 
        startDate={startDate} 
        endDate={endDate} 
      />
    </div>
  )
}
