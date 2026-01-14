"use client"

import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Customer, CustomerProduct } from "@/src/types"
import { useEffect, useState } from "react"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"

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
  const params = useParams()
  const id = params?.id as string

  const { supabase } = useSupabase()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [products, setProducts] = useState<CustomerProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!id) return
      
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const api = createApiClient(sessionData.session)
        
        // Fetch Customer
        const customerRes = await api.customers.getOne(id)
        if ((customerRes as any).success) {
          setCustomer((customerRes as any).data)
        }

        // Fetch Products (TODO: Implement customer_products endpoint)
        // For now, empty list
        setProducts([]) 
        
      } catch (error: any) {
        console.error("Failed to fetch customer details", error)
        toast.error("Failed to load customer details")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, supabase])

  if (loading) return <div>Loading...</div>
  if (!customer) return <div>Customer not found</div>

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to deactivate this customer?")) return
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const api = createApiClient(sessionData.session)
      await api.customers.delete(customer.id)
      toast.success("Customer deactivated successfully")
      router.push("/admin/customers")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete customer")
    }
  }

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
            onClick={handleDelete}
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
              <p className="text-[#333333]">{customer.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-[#333333]">{customer.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-[#333333]">{customer.address || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-[#333333]">{customer.updatedAt ? new Date(customer.updatedAt).toLocaleDateString() : "N/A"}</p>
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
