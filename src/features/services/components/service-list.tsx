"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Calendar, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { ServiceCalendar } from "./service-calendar"
import type { ServiceRequest } from "@/src/types"

const today = new Date()
const formatDate = (daysOffset: number) => {
  const date = new Date(today)
  date.setDate(today.getDate() + daysOffset)
  return date.toISOString().split("T")[0]
}

const mockServices: ServiceRequest[] = [
  {
    id: "s1",
    customerProductId: "cp1",
    customerProduct: {
      id: "cp1",
      customerId: "1",
      productId: "p1",
      customer: { id: "1", name: "John Smith", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p1", name: "Air Conditioner Pro 5000", description: "", category: "HVAC", price: 1299 },
      purchaseDate: "",
      serialNumber: "AC-2024-001234",
    },
    status: "pending",
    description: "AC not cooling properly, needs inspection",
    scheduledDate: formatDate(0), // Today
    technicianId: "t1",
    technician: { id: "t1", name: "Tom Wilson", email: "", phone: "", specialization: "HVAC", isActive: true },
    createdAt: formatDate(-5),
  },
  {
    id: "s2",
    customerProductId: "cp2",
    customerProduct: {
      id: "cp2",
      customerId: "2",
      productId: "p2",
      customer: { id: "2", name: "Sarah Johnson", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p2", name: "Smart Thermostat X", description: "", category: "Smart Home", price: 249 },
      purchaseDate: "",
      serialNumber: "ST-2024-005678",
    },
    status: "scheduled",
    description: "Annual maintenance checkup",
    scheduledDate: formatDate(1), // Tomorrow
    technicianId: "t2",
    technician: { id: "t2", name: "Jane Cooper", email: "", phone: "", specialization: "Smart Home", isActive: true },
    createdAt: formatDate(-7),
  },
  {
    id: "s3",
    customerProductId: "cp3",
    customerProduct: {
      id: "cp3",
      customerId: "3",
      productId: "p3",
      customer: { id: "3", name: "Mike Davis", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p3", name: "Central Heating Unit", description: "", category: "HVAC", price: 2499 },
      purchaseDate: "",
      serialNumber: "CH-2024-009876",
    },
    status: "completed",
    description: "Heating system repair completed",
    scheduledDate: formatDate(-3),
    technicianId: "t1",
    technician: { id: "t1", name: "Tom Wilson", email: "", phone: "", specialization: "HVAC", isActive: true },
    createdAt: formatDate(-10),
  },
  {
    id: "s4",
    customerProductId: "cp4",
    customerProduct: {
      id: "cp4",
      customerId: "4",
      productId: "p1",
      customer: { id: "4", name: "Emily Brown", email: "", phone: "", address: "", createdAt: "", updatedAt: "" },
      product: { id: "p1", name: "Air Conditioner Pro 5000", description: "", category: "HVAC", price: 1299 },
      purchaseDate: "",
      serialNumber: "AC-2024-002345",
    },
    status: "in-progress",
    description: "Filter replacement and cleaning",
    scheduledDate: formatDate(0), // Today
    technicianId: "t3",
    technician: {
      id: "t3",
      name: "Alex Martinez",
      email: "",
      phone: "",
      specialization: "General",
      isActive: true,
    },
    createdAt: formatDate(-4),
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "info"
    case "scheduled":
      return "warning"
    case "pending":
      return "default"
    case "cancelled":
      return "error"
    default:
      return "default"
  }
}

const columns = [
  {
    key: "customer",
    header: "Customer",
    render: (service: ServiceRequest) => service.customerProduct?.customer?.name ?? "-",
  },
  {
    key: "product",
    header: "Product",
    render: (service: ServiceRequest) => service.customerProduct?.product?.name ?? "-",
  },
  {
    key: "description",
    header: "Description",
    render: (service: ServiceRequest) => <span className="line-clamp-1 max-w-xs">{service.description}</span>,
  },
  {
    key: "technician",
    header: "Technician",
    render: (service: ServiceRequest) => service.technician?.name ?? "Unassigned",
  },
  {
    key: "scheduledDate",
    header: "Scheduled",
    render: (service: ServiceRequest) =>
      service.scheduledDate ? new Date(service.scheduledDate).toLocaleDateString() : "-",
  },
  {
    key: "status",
    header: "Status",
    render: (service: ServiceRequest) => (
      <StatusBadge status={service.status} variant={getStatusVariant(service.status)} />
    ),
  },
]

export function ServiceList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.customerProduct?.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.customerProduct?.product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || service.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center rounded-lg border border-border bg-white p-1">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#00C49A] text-white hover:bg-[#00a883]" : "text-[#333333]"}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-[#00C49A] text-white hover:bg-[#00a883]" : "text-[#333333]"}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={() => router.push("/admin/services/new")}
            className="bg-[#00C49A] text-white hover:bg-[#00a883]"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">New Service</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <DataTable
          columns={columns}
          data={filteredServices}
          onRowClick={(service) => router.push(`/admin/services/${service.id}`)}
        />
      ) : (
        <ServiceCalendar services={filteredServices} />
      )}
    </div>
  )
}
