"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createApiClient } from "@/src/lib/api/client"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { toast } from "sonner"

const addressSchema = z.object({
  custAddress: z.string().min(1, "Address is required"),
  addressType: z.enum(["rumah", "company", "apartment"]),
  isPrimary: z.boolean().default(false),
})

type AddressFormData = z.infer<typeof addressSchema>

interface CustomerAddressFormProps {
  customerId: string
  currentAddresses: any[]
  onSuccess: () => void
  onCancel: () => void
}

export function CustomerAddressForm({ customerId, currentAddresses, onSuccess, onCancel }: CustomerAddressFormProps) {
  const { session } = useSupabase()
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      custAddress: "",
      addressType: "rumah",
      isPrimary: currentAddresses.length === 0,
    }
  })

  const addressType = watch("addressType")

  const onSubmit = async (data: any) => {
    if (!session) return

    try {
      const api = createApiClient(session)
      
      // If new is primary, we need to map existing directly but change their isPrimary to false
      const updatedAddresses = currentAddresses.map((addr) => ({
        id: addr.id,
        custAddress: addr.custAddress,
        addressType: addr.addressType,
        isPrimary: data.isPrimary ? false : addr.isPrimary
      }))

      // Append new address
      updatedAddresses.push({
        custAddress: data.custAddress,
        addressType: data.addressType,
        isPrimary: data.isPrimary,
      } as any)

      await api.customers.update(customerId, {
        addresses: updatedAddresses
      })
      
      toast.success("Address added successfully")
      onSuccess()
    } catch (error: any) {
      console.error("Failed to add address", error)
      toast.error(error.message || "Failed to add address")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="custAddress">Full Address</Label>
        <Input
          id="custAddress"
          {...register("custAddress")}
          placeholder="e.g. 123 Main St, Apt 4B"
        />
        {errors.custAddress && <p className="text-sm text-destructive">{errors.custAddress.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressType">Address Type</Label>
        <Select
          value={addressType}
          onValueChange={(val) => setValue("addressType", val as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rumah">Rumah</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
          </SelectContent>
        </Select>
        {errors.addressType && <p className="text-sm text-destructive">{errors.addressType.message}</p>}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input 
          type="checkbox" 
          id="isPrimary" 
          className="h-4 w-4 rounded border-gray-300 text-[#00C49A] focus:ring-[#00C49A]"
          {...register("isPrimary")}
        />
        <Label htmlFor="isPrimary" className="font-normal cursor-pointer">
          Set as Primary Address
        </Label>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#00C49A] hover:bg-[#00a883] text-white">
          {isSubmitting ? "Adding..." : "Add Address"}
        </Button>
      </div>
    </form>
  )
}
