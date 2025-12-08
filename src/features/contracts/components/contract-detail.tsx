"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Contract } from "@/src/types"

const mockContract: Contract = {
  id: "c1",
  customerProductId: "cp1",
  customerProduct: {
    id: "cp1",
    customerId: "1",
    productId: "p1",
    customer: {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      createdAt: "",
      updatedAt: "",
    },
    product: {
      id: "p1",
      name: "Air Conditioner Pro 5000",
      description: "",
      category: "HVAC",
      price: 1299,
    },
    purchaseDate: "2024-01-15",
    serialNumber: "AC-2024-001234",
  },
  startDate: "2024-01-15",
  endDate: "2025-01-15",
  status: "active",
  type: "Annual Maintenance",
  value: 299,
  pdfUrl: "/contracts/contract-c1.pdf",
}

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

export function ContractDetail() {
  const router = useRouter()
  const contract = mockContract

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-[#0A2540]">{contract.type}</h1>
            <StatusBadge status={contract.status} variant={getStatusVariant(contract.status)} />
          </div>
          <p className="text-sm text-muted-foreground">Contract ID: {contract.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
          >
            <Eye className="mr-2 h-4 w-4" />
            View PDF
          </Button>
          <Button className="bg-[#00C49A] text-white hover:bg-[#00a883]">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Contract Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contract Type</p>
              <p className="text-[#333333]">{contract.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Value</p>
              <p className="font-heading text-xl font-bold text-[#0A2540]">${contract.value.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                <p className="text-[#333333]">{new Date(contract.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">End Date</p>
                <p className="text-[#333333]">{new Date(contract.endDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p className="text-[#333333]">
                {Math.ceil(
                  (new Date(contract.endDate).getTime() - new Date(contract.startDate).getTime()) /
                    (1000 * 60 * 60 * 24 * 30),
                )}{" "}
                months
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Customer & Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customer</p>
              <p className="text-[#333333]">{contract.customerProduct?.customer?.name}</p>
              <p className="text-sm text-muted-foreground">{contract.customerProduct?.customer?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Product</p>
              <p className="text-[#333333]">{contract.customerProduct?.product?.name}</p>
              <span className="inline-block rounded-full bg-[#00C49A]/10 px-2.5 py-0.5 text-xs font-medium text-[#00C49A]">
                {contract.customerProduct?.product?.category}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Serial Number</p>
              <p className="font-mono text-[#333333]">{contract.customerProduct?.serialNumber}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/customers/${contract.customerProduct?.customerId}`)}
                className="flex-1 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
              >
                View Customer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/products/customer-products/${contract.customerProductId}`)}
                className="flex-1 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
              >
                View Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PDF Viewer Placeholder */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Contract Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-[#F6F9FC]">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 font-medium text-[#0A2540]">Contract PDF Viewer</p>
              <p className="text-sm text-muted-foreground">PDF document will be rendered here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
