import { ProductForm } from "@/src/features/products/components/product-form"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-[#0A2540]">New Product</h1>
        <p className="text-muted-foreground mt-2">Add a new item to your catalog</p>
      </div>

      <ProductForm />
    </div>
  )
}
