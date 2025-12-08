"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Contract } from "@/src/types"

const mockContracts: Contract[] = [
  {
    id: "c1",
    customerProductId: "cp1",
    customerProduct: {
      id: "cp1",
      customerId: "1",
      productId: "p1",
      customer: { id: "1", name: "John Smith", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p1", name: "Air Conditioner Pro 5000", description: "", category: "HVAC", price: 1299 },
      purchaseDate: "2024-01-15",
      serialNumber: "AC-2024-001234",
    },
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    status: "active",
    type: "Annual Maintenance",
    value: 299,
  },
  {
    id: "c2",
    customerProductId: "cp2",
    customerProduct: {
      id: "cp2",
      customerId: "2",
      productId: "p2",
      customer: { id: "2", name: "Sarah Johnson", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p2", name: "Smart Thermostat X", description: "", category: "Smart Home", price: 249 },
      purchaseDate: "2024-02-20",
      serialNumber: "ST-2024-005678",
    },
    startDate: "2024-02-20",
    endDate: "2024-08-20",
    status: "expired",
    type: "Extended Warranty",
    value: 149,
  },
  {
    id: "c3",
    customerProductId: "cp3",
    customerProduct: {
      id: "cp3",
      customerId: "3",
      productId: "p3",
      customer: { id: "3", name: "Mike Davis", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p3", name: "Central Heating Unit", description: "", category: "HVAC", price: 2499 },
      purchaseDate: "2024-03-01",
      serialNumber: "CH-2024-009876",
    },
    startDate: "2024-03-01",
    endDate: "2026-03-01",
    status: "active",
    type: "Premium Service",
    value: 599,
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success"
    case "expired":
      return "error"
    case "pending":
      return "warning"
    default:
      return "default"
  }
}

const columns = [
  {
    key: "customer",
    header: "Customer",
    render: (contract: Contract) => contract.customerProduct?.customer?.name ?? "-",
  },
  {
    key: "product",
    header: "Product",
    hideOnMobile: true,
    render: (contract: Contract) => contract.customerProduct?.product?.name ?? "-",
  },
  { key: "type", header: "Type", hideOnMobile: true },
  {
    key: "value",
    header: "Value",
    render: (contract: Contract) => `$${contract.value.toLocaleString()}`,
  },
  {
    key: "endDate",
    header: "End Date",
    hideOnMobile: true,
    render: (contract: Contract) => new Date(contract.endDate).toLocaleDateString(),
  },
  {
    key: "status",
    header: "Status",
    render: (contract: Contract) => (
      <StatusBadge status={contract.status} variant={getStatusVariant(contract.status)} />
    ),
  },
]

export function ContractList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.customerProduct?.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.customerProduct?.product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C49A]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/admin/contracts/new")}
            className="bg-[#00C49A] text-white hover:bg-[#00a883] w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Contract
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredContracts}
        onRowClick={(contract) => router.push(`/admin/contracts/${contract.id}`)}
      />
    </div>
  )
}
