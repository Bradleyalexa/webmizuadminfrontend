"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProductTasksModal } from "./product-tasks-modal"
import { ArrowLeft, Edit, Package, History, FileText } from "lucide-react"
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
import { ContractForm } from "@/src/features/contracts/components/contract-form"

export function CustomerProductDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { supabase } = useSupabase()
  const [product, setProduct] = useState<CustomerProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false)

  const fetchData = async () => {
    // ... existing code
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
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
             <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC] shrink-0">
                <ArrowLeft className="h-5 w-5" />
             </Button>
             <div className="flex-1">
                <h1 className="font-heading text-xl md:text-2xl font-bold text-[#0A2540]">
                  {product.product_name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {product.product_model}
                </p>
             </div>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto md:ml-auto">
            <Button 
                variant="outline" 
                className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white flex-1 md:flex-none whitespace-nowrap"
                onClick={() => setIsTasksModalOpen(true)}
            >
                <History className="mr-2 h-4 w-4" />
                Service History
            </Button>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white flex-1 md:flex-none whitespace-nowrap">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#00C49A] hover:bg-[#00A07D] text-white flex-1 md:flex-none whitespace-nowrap">
                        <FileText className="mr-2 h-4 w-4" />
                        Add Contract
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:w-full max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Create New Contract</DialogTitle>
                    </DialogHeader>
                    <ContractForm 
                        customerProductId={product.id}
                        onSuccess={() => {
                            fetchData()
                            // Optionally toast or redirect
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ... existing content ... */}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

       <ProductTasksModal
          isOpen={isTasksModalOpen}
          onClose={() => setIsTasksModalOpen(false)}
          customerProductId={product.id}
          productName={product.product_name}
       />
    </div>
  )
}
