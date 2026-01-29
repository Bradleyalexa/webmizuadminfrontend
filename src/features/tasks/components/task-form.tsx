"use client"

import { useState, useEffect } from "react"
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
// ... imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  customer_id: z.string().uuid("Customer is required"),
  customer_product_id: z.string().uuid("Product is required"),
  job_id: z.string().uuid("Job type is required"),
  task_type: z.string().optional(),
  technician_id: z.string().uuid().optional(),
  task_date: z.string().min(1, "Date and time is required"),
  expected_id: z.string().optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  initialData?: any 
  isOpen: boolean
  onClose: () => void
  onSuccess: (newTaskId?: string) => void
}

export function TaskForm({ initialData, isOpen, onClose, onSuccess }: TaskFormProps) {
  const { session } = useSupabase()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [jobs, setJobs] = useState<any[]>([])
  const [technicians, setTechnicians] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [customerProducts, setCustomerProducts] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      customer_id: initialData?.customerId || "",
      customer_product_id: initialData?.customerProductId || "",
      expected_id: initialData?.expectedId || "",
      job_id: initialData?.jobId || "",
      task_type: initialData?.taskType || "general",
      technician_id: initialData?.technicianId || undefined,
      task_date: initialData?.taskDate ? new Date(initialData.taskDate).toISOString().slice(0, 16) : "",
      status: (initialData?.status as "pending" | "completed" | "canceled") || "pending",
    },
  })

  // Watch customer_id to fetch products
  const selectedCustomerId = watch("customer_id")

  useEffect(() => {
      const fetchData = async () => {
          if (!session) return
          const api = createApiClient(session) as any
          try {
              const [jobsRes, techsRes, customersRes] = await Promise.all([
                  api.jobs.list({ limit: 100 }),
                  api.technicians.list({ limit: 100 }),
                  api.customers.list({ limit: 100 })
              ])
              setJobs(jobsRes.data || [])
              setTechnicians((techsRes.data as any)?.items || []) 
              setCustomers(customersRes.data || []) 
          } catch (e) {
              console.error("Failed to load options", e)
          }
      }
      if (isOpen) fetchData()
  }, [session, isOpen])

  // Fetch customer products when customer changes
  useEffect(() => {
    const fetchProducts = async () => {
        if (!session || !selectedCustomerId) {
            setCustomerProducts([])
            return
        }
        const api = createApiClient(session) as any
        try {
            const res = await api.customerProducts.getByCustomer(selectedCustomerId)
            setCustomerProducts(res.data || [])
        } catch (e) {
            console.error("Failed to load customer products", e)
             setCustomerProducts([])
        }
    }
    fetchProducts()
  }, [session, selectedCustomerId])


  const onSubmit = async (data: TaskFormData) => {
    if (!session) return
    setIsSubmitting(true)
    try {
        const api = createApiClient(session) as any
        const isoDate = new Date(data.task_date).toISOString() 
        const payload = {
            ...data,
            task_date: isoDate
        }

        if (initialData?.id) {
            await api.tasks.update(initialData.id, payload)
            toast.success("Task updated")
            onSuccess(initialData.id)
        } else {
            const res = await api.tasks.create(payload)
            toast.success("Task created")
            onSuccess(res.data ? res.data.id : res.id) // check return type
        }
        onClose()
    } catch (error: any) {
        toast.error(error.message || "Failed to save task")
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
           
           <div className="space-y-2">
              <Label htmlFor="title">Task Title <span className="text-red-500">*</span></Label>
              <Input id="title" {...register("title")} placeholder="e.g. AC Maintenance" className={errors.title ? "border-red-500" : ""} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="customer_id">Customer <span className="text-red-500">*</span></Label>
                  <Select onValueChange={(val) => {
                      setValue("customer_id", val)
                      setValue("customer_product_id", "") // Reset product on customer change
                  }} defaultValue={watch("customer_id")}>
                      <SelectTrigger className={errors.customer_id ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select Customer" />
                      </SelectTrigger>
                      <SelectContent>
                          {customers.map((c) => (
                              <SelectItem key={c.id} value={c.id}>{c.name || c.profiles?.name || c.id}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  {errors.customer_id && <p className="text-sm text-red-500">{errors.customer_id.message}</p>}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="customer_product_id">Product <span className="text-red-500">*</span></Label>
                  <Select onValueChange={(val) => setValue("customer_product_id", val)} value={watch("customer_product_id")}>
                      <SelectTrigger className={errors.customer_product_id ? "border-red-500" : ""} disabled={!selectedCustomerId}>
                          <SelectValue placeholder={selectedCustomerId ? "Select Product" : "Select Customer First"} />
                      </SelectTrigger>
                      <SelectContent>
                          {customerProducts.map((cp) => (
                              <SelectItem key={cp.id} value={cp.id}>
                                  <div className="flex flex-col items-start text-left">
                                      <span className="font-medium">{cp.product_name || "Unknown Product"}</span>
                                      {cp.product_model && <span className="text-xs text-muted-foreground">{cp.product_model}</span>}
                                  </div>
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  {errors.customer_product_id && <p className="text-sm text-red-500">{errors.customer_product_id.message}</p>}
               </div>
           </div>

           <div className="space-y-2">
              <Label htmlFor="job_id">Job Type <span className="text-red-500">*</span></Label>
              <Select onValueChange={(val) => setValue("job_id", val)} defaultValue={watch("job_id")}>
                  <SelectTrigger className={errors.job_id ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                      {jobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>{job.name}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
              {errors.job_id && <p className="text-sm text-red-500">{errors.job_id.message}</p>}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="task_date">Date & Time <span className="text-red-500">*</span></Label>
                  <Input 
                    id="task_date" 
                    type="datetime-local" 
                    {...register("task_date")} 
                    className={errors.task_date ? "border-red-500" : ""} 
                  />
                  {errors.task_date && <p className="text-sm text-red-500">{errors.task_date.message}</p>}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="technician_id">Assign Technician</Label>
                  <Select onValueChange={(val) => setValue("technician_id", val)} defaultValue={watch("technician_id")}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select Technician" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {technicians.map((tech) => (
                              <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
               </div>
           </div>
           
           <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Additional notes..." />
           </div>

            <div className="space-y-2">
               <Label htmlFor="task_type">Task Type</Label>
               <Select onValueChange={(val) => setValue("task_type", val)} defaultValue={watch("task_type") || "general"}>
                   <SelectTrigger>
                       <SelectValue placeholder="Select Type" />
                   </SelectTrigger>
                   <SelectContent>
                       <SelectItem value="general">General</SelectItem>
                       <SelectItem value="service">Service</SelectItem>
                   </SelectContent>
               </Select>
            </div>

           <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(val) => setValue("status", val as any)} defaultValue={watch("status")}>
                  <SelectTrigger>
                      <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
              </Select>
           </div>

           <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <LoadingButton type="submit" isLoading={isSubmitting} className="bg-[#0A2540] hover:bg-[#0A2540]/90">
                {initialData ? "Save Changes" : "Create Task"}
              </LoadingButton>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
