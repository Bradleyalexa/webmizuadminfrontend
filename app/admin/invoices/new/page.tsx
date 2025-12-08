import { PageHeader } from "@/src/components/ui/page-header"
import { InvoiceForm } from "@/src/features/invoices/components/invoice-form"

export default function NewInvoicePage() {
  return (
    <div>
      <PageHeader
        title="Create Invoice"
        description="Generate a new invoice for a customer."
        backHref="/admin/invoices"
      />
      <InvoiceForm />
    </div>
  )
}
