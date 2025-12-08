import { PageHeader } from "@/src/components/ui/page-header"
import { TechnicianDetail } from "@/src/features/technicians/components/technician-detail"

export default async function TechnicianDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader
        title="Technician Details"
        description="View technician information and assigned tasks."
        backHref="/admin/technicians"
      />
      <TechnicianDetail id={id} />
    </div>
  )
}
