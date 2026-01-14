import { z } from "zod"

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 characters").regex(/^\+?[0-9\s-]*$/, "Phone must contain only numbers, spaces, dashes"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  addressType: z.enum(["apartment", "rumah", "company"]).default("rumah"),
  status: z.enum(["active", "inactive", "blacklisted"]).default("active"),
})

export type CustomerFormData = z.infer<typeof customerSchema>
