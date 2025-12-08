"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/src/types"

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  imageUrl: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product
  mode: "create" | "edit"
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          imageUrl: product.imageUrl,
        }
      : undefined,
  })

  const selectedCategory = watch("category")

  const onSubmit = async (data: ProductFormData) => {
    console.log("Product form data:", data)
    router.push("/admin/products")
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-[#0A2540]">
          {mode === "create" ? "Product Information" : "Edit Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#333333]">
                Product Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Air Conditioner Pro 5000"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#333333]">
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Smart Home">Smart Home</SelectItem>
                  <SelectItem value="Air Quality">Air Quality</SelectItem>
                  <SelectItem value="Heating">Heating</SelectItem>
                  <SelectItem value="Cooling">Cooling</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#333333]">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="1299.00"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-[#333333]">
                Image URL (optional)
              </Label>
              <Input
                id="imageUrl"
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description" className="text-[#333333]">
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter product description..."
                rows={4}
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              {isSubmitting ? "Saving..." : mode === "create" ? "Add Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
