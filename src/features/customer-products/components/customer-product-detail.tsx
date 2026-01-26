"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Package } from "lucide-react" // Package icon used to represent product
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { CustomerProduct } from "@/src/types"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomerProductForm } from "./customer-product-form"

export function CustomerProductDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { supabase } = useSupabase()
  const [product, setProduct] = useState<CustomerProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const fetchData = async () => {
    if (!id) return
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const api = createApiClient(sessionData.session)
      
      const res = await api.customerProducts.getOne(id)
      if ((res as any).success) {
        setProduct((res as any).data)
      }
    } catch (error: any) {
      console.error(error)
      toast.error("Failed to load product details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id, supabase])

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">
            {product.product_name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {product.product_model}
          </p>
        </div>
        
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Customer Product</DialogTitle>
                    <DialogDescription>
                        Update the product details below.
                    </DialogDescription>
                </DialogHeader>
                <CustomerProductForm 
                    initialData={product}
                    customerId={product.customer_id}
                    onSuccess={() => {
                        setIsEditOpen(false)
                        fetchData()
                    }} 
                />
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Photo Card - Full Width on Mobile, Side on Desktop or Top */}
        {product.photo_url && (
             <Card className="bg-white shadow-sm lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Product Photo</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="relative h-96 w-full rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img 
                            src={product.photo_url} 
                            alt={product.product_name} 
                            className="h-full w-full object-contain"
                        />
                    </div>
                </CardContent>
             </Card>
        )}

        {/* Main Info */}
        <Card className="bg-white shadow-sm lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Installation Date</p>
                        <p className="text-[#333333] font-medium text-lg">
                            {product.installation_date ? new Date(product.installation_date).toLocaleDateString() : "-"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Price</p>
                        <p className="text-[#333333]">
                            {product.cust_product_price 
                                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.cust_product_price)
                                : "-"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Technician</p>
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {(product.technician_name || "T")[0]}
                            </div>
                            <p className="text-[#333333]">{product.technician_name || "-"}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="text-[#333333]">{product.installation_location || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                        <p className="text-[#333333]">{product.quantity_owned}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <StatusBadge 
                            status={product.status} 
                            variant={product.status === 'active' ? 'success' : 'default'} 
                        />
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Side Info */}
        <div className="space-y-6">
            <Card className="bg-white shadow-sm">
                <CardHeader>
                     <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-[#333333] whitespace-pre-wrap">{product.notes || "No notes available."}</p>
                </CardContent>
            </Card>

             <Card className="bg-white shadow-sm">
                <CardHeader>
                     <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Contract Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                         <span className="text-sm font-medium text-muted-foreground">Current Status</span>
                         <StatusBadge 
                            status={product.contract_status || "Unknown"} 
                             variant={product.contract_status === 'Active' ? 'success' : (product.contract_status === 'Expired' ? 'error' : 'default')} 
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
       
       {/* Description separate block if long */}
       {product.description && (
           <Card className="bg-white shadow-sm">
               <CardHeader>
                   <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Description</CardTitle>
               </CardHeader>
               <CardContent>
                   <p className="text-[#333333]">{product.description}</p>
               </CardContent>
           </Card>
       )}

    </div>
  )
}
