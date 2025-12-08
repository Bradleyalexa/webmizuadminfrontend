"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Invoice } from "@/src/types"

const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    customerId: "1",
    customer: {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    type: "contract",
    referenceId: "c1",
    amount: 299,
    status: "sent",
    dueDate: "2024-12-31",
    createdAt: "2024-12-01",
  },
  {
    id: "inv2",
    customerId: "2",
    customer: {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    type: "service",
    referenceId: "s2",
    amount: 150,
    status: "paid",
    dueDate: "2024-12-15",
    createdAt: "2024-12-05",
  },
  {
    id: "inv3",
    customerId: "3",
    customer: {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    type: "order",
    referenceId: "o1",
    amount: 2499,
    status: "overdue",
    dueDate: "2024-12-01",
    createdAt: "2024-11-15",
  },
  {
    id: "inv4",
    customerId: "4",
    customer: {
      id: "4",
      name: "Emily Brown",
      email: "emily.b@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    type: "contract",
    referenceId: "c2",
    amount: 599,
    status: "draft",
    dueDate: "2024-12-20",
    createdAt: "2024-12-10",
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "paid":
      return "success"
    case "sent":
      return "info"
    case "draft":
      return "default"
    case "overdue":
      return "error"
    default:
      return "default"
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "order":
      return "Order"
    case "contract":
      return "Contract"
    case "service":
      return "Service"
    default:
      return type
  }
}

const columns = [
  {
    key: "id",
    header: "Invoice #",
    render: (invoice: Invoice) => <span className="font-mono text-[#0A2540]">{invoice.id.toUpperCase()}</span>,
  },
  {
    key: "customer",
    header: "Customer",
    render: (invoice: Invoice) => invoice.customer?.name ?? "-",
  },
  {
    key: "type",
    header: "Type",
    hideOnMobile: true,
    render: (invoice: Invoice) => (
      <span className="rounded-full bg-[#0A2540]/10 px-2.5 py-0.5 text-xs font-medium text-[#0A2540]">
        {getTypeLabel(invoice.type)}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (invoice: Invoice) => (
      <span className="font-heading font-semibold text-[#0A2540]">${invoice.amount.toLocaleString()}</span>
    ),
  },
  {
    key: "dueDate",
    header: "Due Date",
    hideOnMobile: true,
    render: (invoice: Invoice) => new Date(invoice.dueDate).toLocaleDateString(),
  },
  {
    key: "status",
    header: "Status",
    render: (invoice: Invoice) => <StatusBadge status={invoice.status} variant={getStatusVariant(invoice.status)} />,
  },
  {
    key: "actions",
    header: "",
    render: (invoice: Invoice) => (
      <div className="flex items-center gap-2">
        {invoice.status === "draft" && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-[#00C49A] hover:text-[#00a883] hover:bg-[#00C49A]/10"
            onClick={(e) => {
              e.stopPropagation()
              console.log("Send invoice:", invoice.id)
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        )}
        {invoice.status === "sent" && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-[#00C49A] hover:text-[#00a883] hover:bg-[#00C49A]/10"
            onClick={(e) => {
              e.stopPropagation()
              console.log("Mark paid:", invoice.id)
            }}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    ),
  },
]

export function InvoiceList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesType = typeFilter === "all" || invoice.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C49A]"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-32 bg-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="order">Order</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/admin/invoices/new")}
            className="bg-[#00C49A] text-white hover:bg-[#00a883] w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredInvoices}
        onRowClick={(invoice) => router.push(`/admin/invoices/${invoice.id}`)}
      />
    </div>
  )
}
