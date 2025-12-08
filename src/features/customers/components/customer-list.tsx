"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/src/components/ui/data-table"
import type { Customer } from "@/src/types"

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    createdAt: "2024-02-20",
    updatedAt: "2024-03-08",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, Chicago, IL 60601",
    createdAt: "2024-01-05",
    updatedAt: "2024-03-12",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.b@email.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Houston, TX 77001",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@email.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    createdAt: "2024-02-10",
    updatedAt: "2024-03-11",
  },
]

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email", hideOnMobile: true },
  { key: "phone", header: "Phone", hideOnMobile: true },
  {
    key: "createdAt",
    header: "Joined",
    render: (customer: Customer) => new Date(customer.createdAt).toLocaleDateString(),
  },
]

export function CustomerList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C499]"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent flex-1 sm:flex-none"
          >
            <Filter className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button
            onClick={() => router.push("/admin/customers/new")}
            className="bg-[#00C499] text-white hover:bg-[#00a883] flex-1 sm:flex-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Customer</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredCustomers}
        page={page}
        totalPages={Math.ceil(filteredCustomers.length / 10)}
        onPageChange={setPage}
        onRowClick={(customer) => router.push(`/admin/customers/${customer.id}`)}
      />
    </div>
  )
}
