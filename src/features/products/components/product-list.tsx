"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Package, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product, Category } from "@/src/types"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProductList() {
  const router = useRouter()
  const { session } = useSupabase()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      if (!session) return
      try {
        const api = createApiClient(session)
        const res: any = await api.categories.list()
        if (res.success) {
          setCategories(res.data)
        }
      } catch (err) {
        console.error("Failed to fetch categories", err)
      }
    }
    fetchCategories()
  }, [session])

  const fetchProducts = async () => {
    if (!session) return
    try {
      setLoading(true)
      const api = createApiClient(session)
      const res: any = await api.products.list({ 
        limit: 50, 
        q: searchQuery,
        categoryId: selectedCategory !== "all" ? selectedCategory : undefined
      })
      if (res.success) {
        setProducts(res.data.items)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [session, searchQuery, selectedCategory])

  const handleDelete = async (id: string) => {
    if (!session) return
    try {
      const api = createApiClient(session)
      await api.products.delete(id)
      toast.success("Product deleted")
      fetchProducts()
    } catch (error: any) {
      toast.error("Failed to delete product")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C49A]"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={() => router.push("/admin/products/new")}
          className="bg-[#00C49A] hover:bg-[#00A07D] text-white w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No products found.</div>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-[#00C49A]/30 group flex flex-col h-full"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-300">
                    <Package className="h-12 w-12" />
                  </div>
                )}
                {product.category && (
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                    {product.category.name}
                  </div>
                )}
              </div>
              
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-heading font-semibold text-[#0A2540] text-base group-hover:text-[#00C49A] transition-colors line-clamp-1" title={product.name}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.model || "No Model"}</p>
                  <p className="mt-2 font-bold text-[#00C49A]">
                    {product.price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price) : "Rp 0"}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 h-8 text-muted-foreground hover:text-[#00C49A]"
                    onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                  >
                    <Edit className="h-3.5 w-3.5 mr-2" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-red-500 px-2">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
