"use client"

import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Customer, CustomerProduct } from "@/src/types"
import { useEffect, useState } from "react"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomerProductForm } from "@/src/features/customer-products/components/customer-product-form"

const productColumns = [
  {
    key: "product",
    header: "Product",
    render: (item: CustomerProduct) => (
        <div className="flex flex-col">
            <span className="font-medium text-[#0A2540]">{item.product_name || "Unknown Product"}</span>
            <span className="text-xs text-muted-foreground">{item.product_model}</span>
        </div>
    ),
  },
  {
    key: "purchaseDate",
    header: "Purchase Date",
    render: (item: CustomerProduct) => item.installation_date ? new Date(item.installation_date).toLocaleDateString() : "-",
  },
  {
    key: "price",
    header: "Price",
    render: (item: CustomerProduct) => item.cust_product_price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.cust_product_price) : "-",
  },
  {
    key: "technician",
    header: "Installer",
    render: (item: CustomerProduct) => item.technician_name || "-",
  },
  {
    key: "contractStatus",
    header: "Contract",
    render: (item: CustomerProduct) => (
        <StatusBadge 
            status={item.contract_status || "No Contract"} 
            variant={item.contract_status === 'Active' ? 'success' : (item.contract_status === 'Expired' ? 'error' : 'default')} 
        />
    ),
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
  const [isAssignOpen, setIsAssignOpen] = useState(false)

  const fetchData = async () => {
    if (!id) return
    
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const api = createApiClient(sessionData.session)
      
      // Fetch Customer
      const customerRes = await api.customers.getOne(id)
      if ((customerRes as any).success) {
        setCustomer((customerRes as any).data)
      }

      // Fetch Products
      const productsRes = await api.customerProducts.getByCustomer(id)
        if ((productsRes as any).success) {
            setProducts((productsRes as any).data)
        }
      
    } catch (error: any) {
      console.error("Failed to fetch customer details", error)
      toast.error("Failed to load customer details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
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
            
            <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#00C49A] text-white hover:bg-[#00a883]">
                        <Package className="mr-2 h-4 w-4" />
                        Assign Product
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Assign Product to Customer</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to assign a new product.
                        </DialogDescription>
                    </DialogHeader>
                    <CustomerProductForm 
                        customerId={customer.id} 
                        onSuccess={() => {
                            setIsAssignOpen(false)
                            fetchData() // Refresh list
                        }} 
                    />
                </DialogContent>
            </Dialog>

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
