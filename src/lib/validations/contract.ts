import { z } from "zod"

export const contractSchema = z.object({
  customer_product_id: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  interval_months: z.coerce.number().min(1, "Interval must be at least 1 month"),
  total_service: z.coerce.number().min(1, "Total service must be at least 1"),
  contract_url: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive").optional(),
  notes: z.string().optional(),
}).refine((data) => {
  const start = new Date(data.start_date);
  const end = new Date(data.end_date);
  return end > start;
}, {
  message: "End date must be after start date",
  path: ["end_date"],
});

export type ContractFormData = z.infer<typeof contractSchema>
