"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskSchema, type TaskFormData } from "@/src/lib/validations/service"

const mockTechnicians = [
  { id: "t1", name: "Tom Wilson", specialization: "HVAC" },
  { id: "t2", name: "Jane Cooper", specialization: "Smart Home" },
  { id: "t3", name: "Alex Martinez", specialization: "General" },
]

const timeSlots = [
  "08:00 - 10:00",
  "09:00 - 11:00",
  "10:00 - 12:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "14:00 - 16:00",
  "15:00 - 17:00",
  "16:00 - 18:00",
]

export function TaskForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = async (data: TaskFormData) => {
    // Placeholder: await api.tasks.create(data)
    console.log("Task data:", data)
    router.push("/admin/tasks")
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-semibold text-[#0A2540]">Task Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#333333]">
              Task Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter task title"
              className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#333333]">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the task..."
              rows={4}
              className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate" className="text-[#333333]">
                Scheduled Date
              </Label>
              <Input
                id="scheduledDate"
                type="date"
                {...register("scheduledDate")}
                className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
              />
              {errors.scheduledDate && <p className="text-sm text-destructive">{errors.scheduledDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[#333333]">Time Slot</Label>
              <Select onValueChange={(value) => setValue("timeSlot", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#333333]">Assign Technician</Label>
              <Select onValueChange={(value) => setValue("technicianId", value)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {mockTechnicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.name} ({tech.specialization})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
