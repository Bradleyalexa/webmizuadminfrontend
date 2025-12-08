"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { serviceRequestSchema, type ServiceRequestFormData } from "@/src/lib/validations/service"

const mockCustomerProducts = [
  { id: "cp1", label: "John Smith - Air Conditioner Pro 5000 (AC-2024-001234)" },
  { id: "cp2", label: "Sarah Johnson - Smart Thermostat X (ST-2024-005678)" },
  { id: "cp3", label: "Mike Davis - Central Heating Unit (CH-2024-009876)" },
]

const mockTechnicians = [
  { id: "t1", name: "Tom Wilson", specialization: "HVAC" },
  { id: "t2", name: "Jane Cooper", specialization: "Smart Home" },
  { id: "t3", name: "Alex Martinez", specialization: "General" },
]

export function ServiceForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedCustomerProductId = searchParams.get("customerProductId")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      customerProductId: preselectedCustomerProductId || "",
    },
  })

  const onSubmit = async (data: ServiceRequestFormData) => {
    // Placeholder: await api.services.create(data)
    console.log("Service data:", data)
    router.push("/admin/services")
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-[#0A2540]">Service Request Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#333333]">Customer Product</Label>
            <Select value={watch("customerProductId")} onValueChange={(value) => setValue("customerProductId", value)}>
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
            {errors.customerProductId && <p className="text-sm text-destructive">{errors.customerProductId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#333333]">
              Issue Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the issue or service needed..."
              rows={4}
              className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate" className="text-[#333333]">
                Scheduled Date (Optional)
              </Label>
              <Input
                id="scheduledDate"
                type="date"
                {...register("scheduledDate")}
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#333333]">Assign Technician (Optional)</Label>
              <Select onValueChange={(value) => setValue("technicianId", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {mockTechnicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name} ({tech.specialization})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {isSubmitting ? "Creating..." : "Create Service Request"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
