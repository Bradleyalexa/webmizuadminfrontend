import { Suspense } from "react"
import { PageHeader } from "@/src/components/ui/page-header"
import { ContractForm } from "@/src/features/contracts/components/contract-form"

export default function NewContractPage() {
  return (
    <div>
      <PageHeader
        title="Create Contract"
        description="Set up a new service contract for a customer product."
        backHref="/admin/contracts"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ContractForm />
      </Suspense>
    </div>
  )
}
