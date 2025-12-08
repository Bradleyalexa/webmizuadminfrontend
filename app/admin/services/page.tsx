import { PageHeader } from "@/src/components/ui/page-header"
import { ServiceList } from "@/src/features/services/components/service-list"

export default function ServicesPage() {
  return (
    <div>
      <PageHeader title="Services" description="Manage service requests and schedule technician visits." />
      <ServiceList />
    </div>
  )
}
