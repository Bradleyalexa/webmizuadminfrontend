"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { CustomerProduct } from "@/src/types"

const mockCustomerProduct: CustomerProduct = {
  id: "cp1",
  customerId: "1",
  productId: "p1",
  customer: {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
  },
  product: {
    id: "p1",
    name: "Air Conditioner Pro 5000",
    description: "High-efficiency split-type air conditioner",
    category: "HVAC",
    price: 1299,
  },
  purchaseDate: "2024-01-15",
  warrantyExpiry: "2026-01-15",
  serialNumber: "AC-2024-001234",
}

export function CustomerProductDetail() {
  const router = useRouter()
  const customerProduct = mockCustomerProduct
  const isWarrantyActive = customerProduct.warrantyExpiry
    ? new Date(customerProduct.warrantyExpiry) > new Date()
    : false

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Customer Product Detail</h1>
          <p className="text-sm text-muted-foreground">Serial: {customerProduct.serialNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push(`/admin/contracts/new?customerProductId=${customerProduct.id}`)}
            className="bg-[#00C49A] text-white hover:bg-[#00a883]"
          >
            <FileText className="mr-2 h-4 w-4" />
            Create Contract
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/services/new?customerProductId=${customerProduct.id}`)}
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
          >
            <Wrench className="mr-2 h-4 w-4" />
            Request Service
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Product Name</p>
              <p className="text-[#333333]">{customerProduct.product?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <span className="inline-block rounded-full bg-[#00C49A]/10 px-2.5 py-0.5 text-xs font-medium text-[#00C49A]">
                {customerProduct.product?.category}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Serial Number</p>
              <p className="font-mono text-[#333333]">{customerProduct.serialNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Purchase Date</p>
              <p className="text-[#333333]">{new Date(customerProduct.purchaseDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Warranty Status</p>
              <div className="flex items-center gap-2">
                <StatusBadge
                  status={isWarrantyActive ? "Active" : "Expired"}
                  variant={isWarrantyActive ? "success" : "error"}
                />
                {customerProduct.warrantyExpiry && (
                  <span className="text-sm text-muted-foreground">
                    (Expires: {new Date(customerProduct.warrantyExpiry).toLocaleDateString()})
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-[#333333]">{customerProduct.customer?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-[#333333]">{customerProduct.customer?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-[#333333]">{customerProduct.customer?.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-[#333333]">{customerProduct.customer?.address}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/customers/${customerProduct.customerId}`)}
              className="w-full border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
            >
              View Full Customer Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
