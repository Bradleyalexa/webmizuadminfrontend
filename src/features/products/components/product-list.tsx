"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Grid, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import type { Product } from "@/src/types"

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Air Conditioner Pro 5000",
    description: "High-efficiency split-type air conditioner with inverter technology",
    category: "HVAC",
    price: 1299,
    imageUrl: "/home-air-conditioner.png",
  },
  {
    id: "p2",
    name: "Smart Thermostat X",
    description: "WiFi-enabled programmable thermostat with voice control",
    category: "Smart Home",
    price: 249,
    imageUrl: "/smart-thermostat.png",
  },
  {
    id: "p3",
    name: "Central Heating Unit",
    description: "Energy-efficient central heating system for large homes",
    category: "HVAC",
    price: 2499,
    imageUrl: "/heating-unit.jpg",
  },
  {
    id: "p4",
    name: "Air Purifier Max",
    description: "HEPA air purifier with UV-C sanitization",
    category: "Air Quality",
    price: 499,
    imageUrl: "/modern-air-purifier.png",
  },
  {
    id: "p5",
    name: "Ductless Mini Split",
    description: "Compact ductless cooling and heating system",
    category: "HVAC",
    price: 899,
    imageUrl: "/mini-split-ac.jpg",
  },
  {
    id: "p6",
    name: "Smart Air Quality Monitor",
    description: "Real-time air quality monitoring with app connectivity",
    category: "Smart Home",
    price: 149,
    imageUrl: "/air-quality-monitor.jpg",
  },
]

const columns = [
  {
    key: "name",
    header: "Product Name",
    render: (product: Product) => (
      <div className="flex items-center gap-3">
        <img
          src={product.imageUrl || "/placeholder.svg?height=40&width=40&query=product"}
          alt={product.name}
          className="h-10 w-10 rounded-lg object-cover"
        />
        <span className="font-medium">{product.name}</span>
      </div>
    ),
  },
  { key: "category", header: "Category" },
  {
    key: "price",
    header: "Price",
    render: (product: Product) => `$${product.price.toLocaleString()}`,
  },
]

export function ProductList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/admin/products/new")}
            className="bg-[#00C49A] text-white hover:bg-[#00a883]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Button
            variant="outline"
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex items-center rounded-lg border border-border bg-white p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#00C49A] text-white hover:bg-[#00a883]" : "text-[#333333]"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#00C49A] text-white hover:bg-[#00a883]" : "text-[#333333]"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer bg-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-[#00C49A]/30"
              onClick={() => router.push(`/admin/products/${product.id}`)}
            >
              <CardContent className="p-4">
                <img
                  src={product.imageUrl || "/placeholder.svg?height=200&width=200&query=product"}
                  alt={product.name}
                  className="mb-4 h-40 w-full rounded-lg object-cover bg-[#F6F9FC]"
                />
                <div className="space-y-2">
                  <span className="inline-block rounded-full bg-[#00C49A]/10 px-2.5 py-0.5 text-xs font-medium text-[#00C49A]">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-semibold text-[#0A2540]">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <p className="font-heading text-lg font-bold text-[#0A2540]">${product.price.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProducts}
          onRowClick={(product) => router.push(`/admin/products/${product.id}`)}
        />
      )}
    </div>
  )
}
