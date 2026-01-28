"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/ui/loading-button"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"

const jobSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  defaultPrice: z.coerce.number().min(0).default(0),
})

type JobFormData = z.infer<typeof jobSchema>


interface JobFormProps {
  initialData?: JobFormData & { id: string }
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function JobForm({ initialData, isOpen, onClose, onSuccess }: JobFormProps) {
  const { session } = useSupabase()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      defaultPrice: initialData?.defaultPrice || 0,
    },
  })

  // Reset form when opening/closing or changing data
  // Using a key on the parent or effect could work, but here we rely on Sheet unmount/remount usually
  // or explicit reset. For simplicity, we just use defaultValues in useForm which works on initial render.
  
  const onSubmit = async (data: JobFormData) => {
    if (!session) return
    setIsSubmitting(true)
    try {
        const api = createApiClient(session)
        const payload = {
            ...data,
            default_price: Number(data.defaultPrice) // Map back to DB snake_case for API
        }

        if (initialData?.id) {
            await (api as any).jobs.update(initialData.id, payload)
            toast.success("Job updated successfully")
        } else {
            await (api as any).jobs.create(payload)
            toast.success("Job created successfully")
        }
        onSuccess()
        onClose()
    } catch (error: any) {
        toast.error(error.message || "Failed to save job")
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Job Template" : "Create New Job Template"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
           <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Job Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="name" 
                    {...register("name")} 
                    placeholder="e.g. Regular AC Service" 
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="defaultPrice" className="text-foreground font-medium">
                    Default Price (IDR) <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    type="number" 
                    id="defaultPrice" 
                    {...register("defaultPrice")}
                    className={errors.defaultPrice ? "border-red-500" : ""} 
                  />
                  {errors.defaultPrice && <p className="text-sm text-red-500">{errors.defaultPrice.message}</p>}
                  <p className="text-xs text-muted-foreground">Base price for this service type.</p>
               </div>
               
               <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground font-medium">Description</Label>
                  <Textarea 
                    id="description" 
                    {...register("description")} 
                    placeholder="Detailed description of what this job entails..." 
                    className="min-h-[100px]"
                  />
               </div>
           </div>

           <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <LoadingButton type="submit" isLoading={isSubmitting} className="bg-[#0A2540] hover:bg-[#0A2540]/90">
                {initialData ? "Save Changes" : "Create Job"}
              </LoadingButton>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
