import { z } from "zod"

export const serviceRequestSchema = z.object({
  customerProductId: z.string().min(1, "Customer product is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  scheduledDate: z.string().optional(),
  technicianId: z.string().optional(),
})

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technicianId: z.string().optional(),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  timeSlot: z.string().optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>
