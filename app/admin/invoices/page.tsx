import { PageHeader } from "@/src/components/ui/page-header"
import { InvoiceList } from "@/src/features/invoices/components/invoice-list"

export default function InvoicesPage() {
  return (
    <div>
      <PageHeader title="Invoices" description="Create, manage, and track customer invoices." />
      <InvoiceList />
    </div>
  )
}
