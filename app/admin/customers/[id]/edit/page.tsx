import { PageHeader } from "@/src/components/ui/page-header"
import { CustomerForm } from "@/src/features/customers/components/customer-form"

// Mock customer data - in real app would be fetched
const mockCustomer = {
  id: "1",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  createdAt: "2024-01-15",
  updatedAt: "2024-03-10",
}

export default function EditCustomerPage() {
  return (
    <div>
      <PageHeader title="Edit Customer" description="Update customer information." />
      <CustomerForm mode="edit" customer={mockCustomer} />
    </div>
  )
}
