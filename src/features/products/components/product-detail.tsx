"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Product, CustomerProduct } from "@/src/types"

const mockProduct: Product = {
  id: "p1",
  name: "Air Conditioner Pro 5000",
  description:
    "High-efficiency split-type air conditioner with inverter technology. Features smart connectivity, whisper-quiet operation, and energy-saving modes for optimal comfort and efficiency.",
  category: "HVAC",
  price: 1299,
  imageUrl: "/air-conditioner-professional.jpg",
}

const mockCustomerProducts: CustomerProduct[] = [
  {
    id: "cp1",
    customerId: "1",
    productId: "p1",
    customer: {
      id: "1",
      name: "John Smith",
      email: "john@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    purchaseDate: "2024-01-15",
    warrantyExpiry: "2026-01-15",
    serialNumber: "AC-2024-001234",
  },
  {
    id: "cp2",
    customerId: "2",
    productId: "p1",
    customer: {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    purchaseDate: "2024-02-20",
    warrantyExpiry: "2026-02-20",
    serialNumber: "AC-2024-005678",
  },
]

const customerProductColumns = [
  {
    key: "customer",
    header: "Customer",
    render: (item: CustomerProduct) => item.customer?.name ?? "-",
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

export function ProductDetail() {
  const router = useRouter()
  const product = mockProduct
  const customerProducts = mockCustomerProducts

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-1">
          <CardContent className="p-6">
            <img
              src={product.imageUrl || "/placeholder.svg?height=300&width=300&query=product"}
              alt={product.name}
              className="mb-6 w-full rounded-xl bg-[#F6F9FC] object-cover"
            />
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Price</p>
                <p className="font-heading text-2xl font-bold text-[#0A2540]">${product.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <span className="inline-block rounded-full bg-[#00C49A]/10 px-3 py-1 text-sm font-medium text-[#00C49A]">
                  {product.category}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-[#333333]">{product.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Customer Ownership</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">{customerProducts.length} owners</span>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={customerProductColumns}
              data={customerProducts}
              onRowClick={(item) => router.push(`/admin/products/customer-products/${item.id}`)}
              emptyMessage="No customers own this product"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
