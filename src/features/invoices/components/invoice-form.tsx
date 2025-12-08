"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { invoiceSchema, type InvoiceFormData } from "@/src/lib/validations/invoice"

const mockCustomers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Mike Davis" },
  { id: "4", name: "Emily Brown" },
]

const mockReferences = {
  order: [
    { id: "o1", label: "Order #O1 - Central Heating Unit" },
    { id: "o2", label: "Order #O2 - Air Conditioner Pro" },
  ],
  contract: [
    { id: "c1", label: "Contract #C1 - Annual Maintenance" },
    { id: "c2", label: "Contract #C2 - Premium Service" },
  ],
  service: [
    { id: "s1", label: "Service #S1 - AC Maintenance" },
    { id: "s2", label: "Service #S2 - Thermostat Setup" },
  ],
}

export function InvoiceForm() {
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      amount: 0,
    },
  })

  const selectedType = watch("type")
  const formData = watch()

  const onSubmit = async (data: InvoiceFormData) => {
    // Placeholder: await api.invoices.create(data)
    console.log("Invoice data:", data)
    router.push("/admin/invoices")
  }

  const handlePreview = () => {
    // Placeholder: would call api.invoices.preview(formData)
    setShowPreview(true)
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-[#0A2540]">Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-[#333333]">Customer</Label>
              <Select onValueChange={(value) => setValue("customerId", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerId && <p className="text-sm text-destructive">{errors.customerId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[#333333]">Invoice Type</Label>
              <Select onValueChange={(value) => setValue("type", value as InvoiceFormData["type"])}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Order</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
            </div>

            {selectedType && (
              <div className="space-y-2">
                <Label className="text-[#333333]">Reference</Label>
                <Select onValueChange={(value) => setValue("referenceId", value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select reference" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockReferences[selectedType]?.map((ref) => (
                      <SelectItem key={ref.id} value={ref.id}>
                        {ref.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.referenceId && <p className="text-sm text-destructive">{errors.referenceId.message}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-[#333333]">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                placeholder="0.00"
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-[#333333]">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                {...register("dueDate")}
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.dueDate && <p className="text-sm text-destructive">{errors.dueDate.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreview}
                  className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Invoice Preview</DialogTitle>
                </DialogHeader>
                <div className="rounded-lg border border-border bg-white p-6">
                  <div className="border-b border-border pb-4">
                    <h2 className="font-heading text-2xl font-bold text-[#0A2540]">INVOICE</h2>
                    <p className="text-sm text-muted-foreground">Draft</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bill To</p>
                      <p className="font-medium text-[#0A2540]">
                        {mockCustomers.find((c) => c.id === formData.customerId)?.name || "Customer Name"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                      <p className="text-[#333333]">
                        {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2 text-left text-sm font-medium text-muted-foreground">Description</th>
                          <th className="py-2 text-right text-sm font-medium text-muted-foreground">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 text-[#333333]">
                            {formData.type
                              ? `${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} - ${formData.referenceId || "Reference"}`
                              : "Invoice Item"}
                          </td>
                          <td className="py-3 text-right font-medium text-[#0A2540]">
                            ${(formData.amount || 0).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-border">
                          <td className="py-3 font-heading font-semibold text-[#0A2540]">Total</td>
                          <td className="py-3 text-right font-heading text-xl font-bold text-[#00C49A]">
                            ${(formData.amount || 0).toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              {isSubmitting ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
