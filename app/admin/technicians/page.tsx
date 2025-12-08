import { PageHeader } from "@/src/components/ui/page-header"
import { TechnicianList } from "@/src/features/technicians/components/technician-list"

export default function TechniciansPage() {
  return (
    <div>
      <PageHeader title="Technicians" description="View and manage your service technicians." />
      <TechnicianList />
    </div>
  )
}
