import { PageHeader } from "@/src/components/ui/page-header"
import { ProductList } from "@/src/features/products/components/product-list"

export default function ProductsPage() {
  return (
    <div>
      <PageHeader title="Products" description="Browse and manage your product catalog." />
      <ProductList />
    </div>
  )
}
