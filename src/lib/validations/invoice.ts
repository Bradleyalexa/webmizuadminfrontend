import { z } from "zod"

export const invoiceSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  type: z.enum(["order", "contract", "service"]),
  referenceId: z.string().min(1, "Reference is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  dueDate: z.string().min(1, "Due date is required"),
})

export type InvoiceFormData = z.infer<typeof invoiceSchema>
