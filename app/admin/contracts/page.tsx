import { PageHeader } from "@/src/components/ui/page-header"
import { ContractList } from "@/src/features/contracts/components/contract-list"

export default function ContractsPage() {
  return (
    <div>
      <PageHeader title="Contracts" description="Manage service contracts and warranties." />
      <ContractList />
    </div>
  )
}
