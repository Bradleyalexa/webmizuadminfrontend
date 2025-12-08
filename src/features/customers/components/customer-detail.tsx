"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Customer, CustomerProduct } from "@/src/types"

interface CustomerDetailProps {
  customer: Customer
  products: CustomerProduct[]
}

// Mock data
const mockCustomer: Customer = {
  id: "1",
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  createdAt: "2024-01-15",
  updatedAt: "2024-03-10",
}

const mockProducts: CustomerProduct[] = [
  {
    id: "cp1",
    customerId: "1",
    productId: "p1",
    product: { id: "p1", name: "Air Conditioner Pro 5000", description: "", category: "HVAC", price: 1299 },
    purchaseDate: "2024-01-15",
    warrantyExpiry: "2026-01-15",
    serialNumber: "AC-2024-001234",
  },
  {
    id: "cp2",
    customerId: "1",
    productId: "p2",
    product: { id: "p2", name: "Smart Thermostat X", description: "", category: "Smart Home", price: 249 },
    purchaseDate: "2024-02-20",
    warrantyExpiry: "2025-02-20",
    serialNumber: "ST-2024-005678",
  },
]

const productColumns = [
  {
    key: "product",
    header: "Product",
    render: (item: CustomerProduct) => item.product?.name ?? "-",
  },
  { key: "serialNumber", header: "Serial Number" },
  {
    key: "purchaseDate",
    header: "Purchase Date",
    render: (item: CustomerProduct) => new Date(item.purchaseDate).toLocaleDateString(),
  },
  {
    key: "warrantyExpiry",
    header: "Warranty",
    render: (item: CustomerProduct) => {
      if (!item.warrantyExpiry) return "-"
      const isExpired = new Date(item.warrantyExpiry) < new Date()
      return <StatusBadge status={isExpired ? "Expired" : "Active"} variant={isExpired ? "error" : "success"} />
    },
  },
]

export function CustomerDetail() {
  const router = useRouter()
  const customer = mockCustomer
  const products = mockProducts

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">{customer.name}</h1>
          <p className="text-sm text-muted-foreground">
            Customer since {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/customers/${customer.id}/edit`)}
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-white bg-transparent"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-[#333333]">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-[#333333]">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-[#333333]">{customer.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-[#333333]">{new Date(customer.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Owned Products</CardTitle>
            <Button size="sm" className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              <Package className="mr-2 h-4 w-4" />
              Assign Product
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={productColumns}
              data={products}
              onRowClick={(product) => router.push(`/admin/products/customer-products/${product.id}`)}
              emptyMessage="No products assigned to this customer"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Active Contracts</CardTitle>
            <Link href={`/admin/contracts?customerId=${customer.id}`}>
              <Button variant="link" className="text-[#00C49A] hover:text-[#00a883]">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">No active contracts</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Recent Services</CardTitle>
            <Link href={`/admin/services?customerId=${customer.id}`}>
              <Button variant="link" className="text-[#00C49A] hover:text-[#00a883]">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">No recent services</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
