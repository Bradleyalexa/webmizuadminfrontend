"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProductForm } from "@/src/features/products/components/product-form"
import { createApiClient } from "@/src/lib/api/client"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { Product } from "@/src/types"
import { Loader2 } from "lucide-react"

export default function EditProductPage() {
  const params = useParams()
  const { session } = useSupabase()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!session || !params.id) return
      try {
        const api = createApiClient(session)
        const res: any = await api.products.getOne(params.id as string)
        if (res.success) {
          setProduct(res.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [session, params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#00C49A]" />
      </div>
    )
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-[#0A2540]">Edit Product</h1>
        <p className="text-muted-foreground mt-2">Update product details</p>
      </div>

      <ProductForm initialData={product} />
    </div>
  )
}
