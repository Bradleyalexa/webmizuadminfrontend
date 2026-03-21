"use client"

import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
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

  const [primaryIndex, setPrimaryIndex] = useState(() => {
    if (!customer?.addresses) return 0;
    const idx = customer.addresses.findIndex((a) => a.isPrimary);
    return idx === -1 ? 0 : idx;
  });

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
          addresses: customer.addresses && customer.addresses.length > 0 
           ? customer.addresses.map(a => ({ id: a.id, custAddress: a.custAddress, addressType: a.addressType || "rumah", isPrimary: a.isPrimary }))
           : [{ custAddress: customer.address || "", addressType: customer.addressType || "rumah", isPrimary: true }],
          status: customer.status ?? "active",
        }
      : {
          name: "",
          email: "",
          phone: "",
          addresses: [{ custAddress: "", addressType: "rumah", isPrimary: true }],
          status: "active"
      }) as any,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses"
  })

  const onSubmit = async (data: CustomerFormData) => {
    if (!session) return

    // Ensure only one primary address is set based on UI state
    data.addresses = data.addresses.map((addr, index) => ({
      ...addr,
      isPrimary: index === primaryIndex
    }));

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

            <div className="sm:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-[#0A2540]">Addresses</Label>
                <Button 
                   type="button" 
                   variant="outline" 
                   size="sm" 
                   onClick={() => append({ custAddress: "", addressType: "rumah", isPrimary: false })}
                   className="text-[#00C49A] border-[#00C49A] hover:bg-[#00C49A] hover:text-white"
                >
                  <Plus className="mr-2 w-4 h-4"/> Add Address
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="relative border-border shadow-sm">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        remove(index)
                        if (primaryIndex === index) setPrimaryIndex(0)
                        else if (primaryIndex > index) setPrimaryIndex(primaryIndex - 1)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                       <Label htmlFor={`addresses.${index}.custAddress`} className="text-[#333333]">Location specifics</Label>
                       <Input
                         id={`addresses.${index}.custAddress`}
                         {...register(`addresses.${index}.custAddress`)}
                         placeholder="123 Main St, City, State 12345"
                         className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
                       />
                       {errors.addresses?.[index]?.custAddress && (
                         <p className="text-sm text-destructive">{errors.addresses[index]?.custAddress?.message as string}</p>
                       )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <Label htmlFor={`addresses.${index}.addressType`} className="text-[#333333]">Type</Label>
                         <Controller
                           control={control}
                           name={`addresses.${index}.addressType`}
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
                      </div>
                      <div className="space-y-2 flex flex-col justify-end pb-[10px]">
                         <label className="flex items-center space-x-2 cursor-pointer">
                           <input
                             type="radio"
                             name="primaryAddress"
                             checked={primaryIndex === index}
                             onChange={() => setPrimaryIndex(index)}
                             className="text-[#00C49A] focus:ring-[#00C49A] h-4 w-4"
                           />
                           <span className="text-sm font-medium text-[#333333]">Set as Primary Address</span>
                         </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
