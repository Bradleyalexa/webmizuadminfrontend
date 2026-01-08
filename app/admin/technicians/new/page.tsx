import { PageHeader } from "@/src/components/ui/page-header"
import { TechnicianForm } from "@/src/features/technicians/components/technician-form"

export default function NewTechnicianPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Technician"
        description="Register a new service technician to your team."
      />
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <TechnicianForm />
      </div>
    </div>
  )
}
