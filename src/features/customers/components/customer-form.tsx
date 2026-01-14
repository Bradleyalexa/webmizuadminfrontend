"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { customerSchema, type CustomerFormData } from "@/src/lib/validations/customer"
import type { Customer } from "@/src/types"
import { createApiClient } from "@/src/lib/api/client"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { toast } from "sonner"
import { Session } from "@supabase/supabase-js"

interface CustomerFormProps {
  customer?: Customer
  mode: "create" | "edit"
}

export function CustomerForm({ customer, mode }: CustomerFormProps) {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, [supabase])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: (customer
      ? {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          addressType: customer.addressType ?? "rumah",
          status: customer.status ?? "active",
        }
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
          addressType: "rumah",
          status: "active"
      }) as any,
  })

  const onSubmit = async (data: CustomerFormData) => {
    if (!session) return

    try {
      const api = createApiClient(session)
      
      if (mode === "create") {
        await api.customers.create(data)
        toast.success("Customer created successfully")
      } else {
        if (!customer?.id) return
        await api.customers.update(customer.id, data)
        toast.success("Customer updated successfully")
      }
      
      router.push("/admin/customers")
      router.refresh()
    } catch (error: any) {
      console.error("Failed to save customer", error)
      toast.error(error.message || "Failed to save customer")
    }
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-[#0A2540]">
          {mode === "create" ? "Customer Information" : "Edit Customer"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#333333]">
                Full Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="John Smith"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@example.com"
                disabled={mode === "edit"} // Email is harder to change if it's auth email
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#333333]">
                Phone Number
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+1 (555) 123-4567"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-[#333333]">
                Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="123 Main St, City, State 12345"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressType" className="text-[#333333]">
                Address Type
              </Label>
              <Controller
                control={control}
                name="addressType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white border-border focus:ring-[#00C49A]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rumah">House (Rumah)</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.addressType && <p className="text-sm text-destructive">{errors.addressType.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#333333]">
                Status
              </Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white border-border focus:ring-[#00C49A]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="blacklisted">Blacklisted</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-sm text-destructive">{errors.status.message as string}</p>}
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
              {isSubmitting ? "Saving..." : mode === "create" ? "Create Customer" : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
