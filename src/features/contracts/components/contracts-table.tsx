"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Contract } from "@/src/types"
import { DataTable } from "@/src/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

interface ContractsTableProps {
  data: Contract[]
  isLoading?: boolean
}

export function ContractsTable({ data, isLoading }: ContractsTableProps) {
  const router = useRouter()

  const columns = [
    {
      key: "customerName",
      header: "Customer",
      render: (item: Contract) => <span className="font-medium text-[#0A2540]">{item.customerName || "-"}</span>,
    },
    {
      key: "productName",
      header: "Product",
      render: (item: Contract) => <span>{item.productName || "-"}</span>,
    },
    {
      key: "currentService",
      header: "Current Service",
      render: (item: Contract) => (
        <span className="font-medium">
          {item.servicesUsed + 1} <span className="text-muted-foreground text-xs">/ {item.totalService}</span>
        </span>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (item: Contract) => {
        const date = new Date(item.startDate)
        return <span>{isNaN(date.getTime()) ? "-" : format(date, "dd MMM yyyy")}</span>
      },
    },
    {
      key: "endDate",
      header: "End Date",
      render: (item: Contract) => {
        const date = new Date(item.endDate)
        return <span>{isNaN(date.getTime()) ? "-" : format(date, "dd MMM yyyy")}</span>
      },
    },
    {
      key: "status",
      header: "Status",
      render: (item: Contract) => {
        const isActive = item.status === "active"
        return (
          <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-[#00C49A] hover:bg-[#00A07D]" : ""}>
            {item.status}
          </Badge>
        )
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowClick={(item) => router.push(`/admin/contracts/${item.id}`)}
      emptyMessage="No contracts found"
    />
  )
}
