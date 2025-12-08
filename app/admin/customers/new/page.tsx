import { PageHeader } from "@/src/components/ui/page-header"
import { CustomerForm } from "@/src/features/customers/components/customer-form"

export default function NewCustomerPage() {
  return (
    <div>
      <PageHeader
        title="Add New Customer"
        description="Create a new customer record in the system."
        backHref="/admin/customers"
      />
      <CustomerForm mode="create" />
    </div>
  )
}
