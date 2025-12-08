import { PageHeader } from "@/src/components/ui/page-header"
import { CustomerList } from "@/src/features/customers/components/customer-list"

export default function CustomersPage() {
  return (
    <div>
      <PageHeader title="Customers" description="Manage your customer database and view customer details." />
      <CustomerList />
    </div>
  )
}
