import { z } from "zod"

export const contractSchema = z.object({
  customerProductId: z.string().min(1, "Customer product is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  type: z.string().min(1, "Contract type is required"),
  value: z.number().min(0, "Value must be positive"),
})

export type ContractFormData = z.infer<typeof contractSchema>
