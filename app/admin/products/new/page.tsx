import { PageHeader } from "@/src/components/ui/page-header"
import { ProductForm } from "@/src/features/products/components/product-form"

export default function NewProductPage() {
  return (
    <div>
      <PageHeader title="Add New Product" description="Add a new product to your catalog." backHref="/admin/products" />
      <ProductForm mode="create" />
    </div>
  )
}
