"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { FileUploadButton } from "@/components/ui/file-upload-button"

import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Product, Category } from "@/src/types"

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  model: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive").optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: Product
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null)
  const isEditing = !!initialData

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      model: initialData?.model || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || "",
    },
  })

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

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        model: initialData.model || "",
        price: initialData.price || 0,
        description: initialData.description || "",
        categoryId: initialData.categoryId || "",
      })
      setImagePreview(initialData.imageUrl || null)
    }
  }, [initialData, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large", { description: "Max file size is 5MB" })
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const uploadImage = async (file: File, name: string): Promise<string | null> => {
    try {
      const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
      const timestamp = Date.now()
      const filePath = `${sanitizedName}-${timestamp}`
      
      const { data, error } = await supabase.storage
        .from("product-catalog")
        .upload(filePath, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from("product-catalog")
        .getPublicUrl(filePath)

      return publicUrlData.publicUrl
    } catch (error: any) {
      console.error("Storage upload error:", error)
      toast.error("Failed to upload image", { description: error.message })
      return null
    }
  }

  async function onSubmit(data: ProductFormValues) {
    if (!session) return
    setIsLoading(true)

    try {
      let imageUrl: string | undefined = initialData?.imageUrl || undefined

      if (imageFile) {
        const url = await uploadImage(imageFile, data.name)
        if (url) imageUrl = url
        else {
           setIsLoading(false)
           return
        }
      } else if (imagePreview === null) {
        imageUrl = "" 
      }

      const api = createApiClient(session)
      
      const payload = {
        ...data,
        imageUrl: imageUrl || undefined,
        categoryId: data.categoryId || undefined, // Ensure empty string becomes undefined if backend expects optional
      }

      if (isEditing && initialData) {
        await api.products.update(initialData.id, payload)
        toast.success("Product updated")
      } else {
        await api.products.create(payload)
        toast.success("Product created")
      }

      router.push("/admin/products")
      router.refresh()
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} product`, { description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Image Upload */}
          {/* Image Upload */}
          <div className="space-y-4">
             <FileUploadButton 
                label="Product Image"
                accept="image/*"
                onFileSelect={(f: File | null) => setImageFile(f)}
                selectedFile={imageFile}
                currentFileUrl={initialData?.imageUrl}
             />
             <p className="text-xs text-muted-foreground">
               Recommended: Square or landscape, max 5MB.
             </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Water Filter Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model / SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. WF-2024-X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (IDR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product details, specs, etc..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton 
              type="submit" 
              isLoading={isLoading} 
              loadingText={isEditing ? "Updating..." : "Creating..."}
              className="bg-[#00C49A] hover:bg-[#00A07D] text-white"
            >
              {isEditing ? "Update Product" : "Create Product"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  )
}
