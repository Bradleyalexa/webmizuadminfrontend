import { ProductList } from "@/src/features/products/components/product-list"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-[#0A2540]">Products</h1>
        <p className="text-muted-foreground mt-2">Manage your product catalog</p>
      </div>

      <ProductList />
    </div>
  )
}
