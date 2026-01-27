"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { FileUploadButton } from "@/components/ui/file-upload-button"

import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Technician } from "@/src/types"

const technicianSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  notes: z.string().optional(),
})

type TechnicianFormValues = z.infer<typeof technicianSchema>

interface TechnicianFormProps {
  initialData?: Technician
}

export function TechnicianForm({ initialData }: TechnicianFormProps) {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.photo_url || null)
  const isEditing = !!initialData

  const form = useForm<TechnicianFormValues>({
    resolver: zodResolver(technicianSchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      notes: initialData?.notes || "",
    },
  })

  // Reset form when initialData loads (if async)
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        phone: initialData.phone || "",
        notes: initialData.notes || "",
      })
      setImagePreview(initialData.photo_url || null)
    }
  }, [initialData, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large", { description: "Max file size is 5MB" })
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const uploadImage = async (file: File, name: string): Promise<string | null> => {
    try {
      const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
      const timestamp = Date.now()
      const filePath = `${sanitizedName}-${timestamp}`
      
      const { data, error } = await supabase.storage
        .from("technicians") // Bucket name: technicians
        .upload(filePath, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from("technicians")
        .getPublicUrl(filePath)

      return publicUrlData.publicUrl
    } catch (error: any) {
      console.error("Storage upload error:", error)
      toast.error("Failed to upload image", { description: error.message })
      return null
    }
  }

  async function onSubmit(data: TechnicianFormValues) {
    if (!session) return
    setIsLoading(true)

    try {
      let photoUrl: string | undefined = initialData?.photo_url || undefined

      if (imageFile) {
        const url = await uploadImage(imageFile, data.name)
        if (url) photoUrl = url
        else {
           setIsLoading(false)
           return
        }
      } else if (imagePreview === null && initialData?.photo_url) {
        // Handle image removal if logic supports it (not strictly required by prompt but good UX)
        // For now we assume if imagePreview is null, user wants to remove it?
        // But we didn't implement explicit 'delete' logic in backend DTO yet, 
        // passing null might work if backend allows it.
        // Let's assume keep existing if not changed, unless explicitly cleared?
        // Simplicity: If imageFile is set, update. If cleared, strictly speaking we should clear in DB.
        // Current logic: removeImage sets preview to null.
        if (imagePreview === null) photoUrl = "" 
      }

      const api = createApiClient(session)
      
      if (isEditing && initialData) {
        await api.technicians.update(initialData.id, {
          ...data,
          photo_url: photoUrl
        })
        toast.success("Technician updated")
      } else {
        await api.technicians.create({
          ...data,
          photo_url: photoUrl,
        })
        toast.success("Technician created")
      }

      router.push("/admin/technicians")
      router.refresh()
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} technician`, { description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Image Upload Section */}
          {/* Image Upload Section */}
          <div className="space-y-4">
            <FileUploadButton 
                label="Profile Photo"
                accept="image/*"
                onFileSelect={(f: File | null) => setImageFile(f)}
                selectedFile={imageFile}
                currentFileUrl={initialData?.photo_url}
             />
            <p className="text-xs text-muted-foreground">
               Recommended: Square image, max 5MB.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. +1 555 000 0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Certifications, skills, or other details..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton 
              type="submit" 
              isLoading={isLoading} 
              loadingText={isEditing ? "Updating..." : "Creating..."}
              className="bg-[#00C49A] hover:bg-[#00A07D] text-white"
            >
              {isEditing ? "Update Technician" : "Create Technician"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  )
}
