import { z } from "zod"

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 characters").regex(/^\+?[0-9\s-]*$/, "Phone must contain only numbers, spaces, dashes"),
  status: z.enum(["active", "inactive", "blacklisted"]).default("active"),
  addresses: z.array(
    z.object({
      id: z.string().optional(),
      custAddress: z.string().min(5, "Address is required"),
      addressType: z.enum(["apartment", "rumah", "company"]).default("rumah"),
      isPrimary: z.boolean().default(false).optional(),
    })
  )
})

export type CustomerFormData = z.infer<typeof customerSchema>
