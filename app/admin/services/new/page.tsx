import { Suspense } from "react"
import { PageHeader } from "@/src/components/ui/page-header"
import { ServiceForm } from "@/src/features/services/components/service-form"

export default function NewServicePage() {
  return (
    <div>
      <PageHeader
        title="Create Service Request"
        description="Submit a new service request for a customer product."
        backHref="/admin/services"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ServiceForm />
      </Suspense>
    </div>
  )
}
