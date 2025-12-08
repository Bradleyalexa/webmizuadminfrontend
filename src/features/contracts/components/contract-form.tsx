"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { contractSchema, type ContractFormData } from "@/src/lib/validations/contract"

const contractTypes = [
  { value: "annual-maintenance", label: "Annual Maintenance" },
  { value: "extended-warranty", label: "Extended Warranty" },
  { value: "premium-service", label: "Premium Service" },
  { value: "basic-support", label: "Basic Support" },
]

// Mock customer products for selection
const mockCustomerProducts = [
  { id: "cp1", label: "John Smith - Air Conditioner Pro 5000 (AC-2024-001234)" },
  { id: "cp2", label: "Sarah Johnson - Smart Thermostat X (ST-2024-005678)" },
  { id: "cp3", label: "Mike Davis - Central Heating Unit (CH-2024-009876)" },
]

export function ContractForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedCustomerProductId = searchParams.get("customerProductId")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      customerProductId: preselectedCustomerProductId || "",
      value: 0,
    },
  })

  const onSubmit = async (data: ContractFormData) => {
    // Placeholder: await api.contracts.create(data)
    console.log("Contract data:", data)
    router.push("/admin/contracts")
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-[#0A2540]">Contract Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-[#333333]">Customer Product</Label>
              <Select
                value={watch("customerProductId")}
                onValueChange={(value) => setValue("customerProductId", value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select a customer product" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomerProducts.map((cp) => (
                    <SelectItem key={cp.id} value={cp.id}>
                      {cp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerProductId && (
                <p className="text-sm text-destructive">{errors.customerProductId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#333333]">Contract Type</Label>
              <Select onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="value" className="text-[#333333]">
                Contract Value ($)
              </Label>
              <Input
                id="value"
                type="number"
                {...register("value", { valueAsNumber: true })}
                placeholder="299"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.value && <p className="text-sm text-destructive">{errors.value.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-[#333333]">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-[#333333]">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.endDate && <p className="text-sm text-destructive">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              {isSubmitting ? "Creating..." : "Create Contract"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
