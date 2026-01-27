"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { FileUploadButton } from "@/components/ui/file-upload-button"

import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { CustomerProduct, CreateCustomerProductDTO } from "@/src/types"

const customerProductSchema = z.object({
  product_catalog_id: z.string().min(1, "Product is required"),
  installation_technician_id: z.string().min(1, "Technician is required"),
  installation_date: z.string().min(1, "Installation date is required"),
  installation_location: z.string().optional(),
  cust_product_price: z.coerce.number().min(0, "Price is required"),
  quantity_owned: z.coerce.number().int().min(1),
  status: z.enum(['active', 'inactive', 'tradeIn']),
  description: z.string().optional(),
  notes: z.string().optional(),
})

type CustomerProductFormValues = z.infer<typeof customerProductSchema>

interface CustomerProductFormProps {
  initialData?: CustomerProduct
  customerId: string
  onSuccess?: () => void
}

export function CustomerProductForm({ initialData, customerId, onSuccess }: CustomerProductFormProps) {
  const router = useRouter()
  const { session, supabase } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!initialData

  // State for Lists
  const [products, setProducts] = useState<{id: string, name: string, model?: string}[]>([])
  const [technicians, setTechnicians] = useState<{id: string, name: string}[]>([])
  
  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.photo_url || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CustomerProductFormValues>({
    resolver: zodResolver(customerProductSchema),
    defaultValues: {
      product_catalog_id: initialData?.product_catalog_id || "",
      installation_technician_id: initialData?.installation_technician_id || "",
      installation_date: initialData?.installation_date || new Date().toISOString().split('T')[0],
      installation_location: initialData?.installation_location || "",
      cust_product_price: initialData?.cust_product_price || 0,
      quantity_owned: initialData?.quantity_owned || 1,
      status: (initialData?.status as any) || 'active',
      description: initialData?.description || "",
      notes: initialData?.notes || "",
    },
  })

  // Fetch Options
  useEffect(() => {
    async function fetchOptions() {
        if(!session) return;
        const api = createApiClient(session);
        try {
            const [prodRes, techRes] = await Promise.all([
                api.products.list({ limit: 100 }), // TODO: Handle pagination/search for large catalogs
                api.technicians.list({ limit: 100 })
            ]);
            
            if((prodRes as any).success) {
                setProducts((prodRes as any).data.items);
            }
            if((techRes as any).success) {
                setTechnicians((techRes as any).data.items);
            }
        } catch(e) {
            console.error(e);
            toast.error("Failed to load options");
        }
    }
    fetchOptions();
  }, [session]);

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

  const uploadImage = async (file: File, customerId: string): Promise<string | null> => {
    try {
      const timestamp = Date.now()
      const filePath = `${customerId}-product-${timestamp}`
      
      const { data, error } = await supabase.storage
        .from("customer-product")
        .upload(filePath, file)

      if (error) throw error

      // Return the path, not the public URL
      return filePath
    } catch (error: any) {
      console.error("Storage upload error:", error)
      toast.error("Failed to upload image", { description: error.message })
      return null
    }
  }

  async function onSubmit(data: CustomerProductFormValues) {
    if (!session) return
    setIsLoading(true)

    try {
      const api = createApiClient(session)
      let photoUrl: string | undefined = undefined

      if (imageFile) {
        const path = await uploadImage(imageFile, customerId)
        if (path) photoUrl = path
        else {
           setIsLoading(false)
           return
        }
      } else if (imagePreview === null && initialData?.photo_url) {
          // Explicitly removed
          photoUrl = "";
      }
      
      const payload: CreateCustomerProductDTO = {
        ...data,
        customer_id: customerId,
        // Only include photo_url if it's strictly defined (changed or removed)
        ...(photoUrl !== undefined ? { photo_url: photoUrl } : {}),
      }

      if (isEditing && initialData) {
        await api.customerProducts.update(initialData.id, payload)
        toast.success("Product assignment updated")
      } else {
        await api.customerProducts.create(payload)
        toast.success("Product assigned to customer")
      }

      if(onSuccess) {
          onSuccess();
      } else {
          router.refresh();
      }
    } catch (error: any) {
      console.error(error)
      toast.error(`Failed to ${isEditing ? 'update' : 'assign'} product`, { description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const onError = (errors: FieldErrors<CustomerProductFormValues>) => {
      const missingFields = Object.keys(errors).map((key) => {
        if (key === 'product_catalog_id') return 'Product';
        if (key === 'installation_date') return 'Installation Date';
        if (key === 'installation_technician_id') return 'Technician';
        if (key === 'cust_product_price') return 'Price';
        if (key === 'quantity_owned') return 'Quantity';
        return key;
      });
      toast.error("Please fill in all required fields", {
        description: `Missing: ${missingFields.join(", ")}`
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">

        <FormField
          control={form.control}
          name="product_catalog_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product <span className="text-destructive">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditing} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} {p.model ? `(${p.model})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="installation_date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Installation Date <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="cust_product_price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                    <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="installation_technician_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technician <span className="text-destructive">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {technicians.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="installation_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Installation Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Kitchen, 2nd Floor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
             <FormField
            control={form.control}
            name="quantity_owned"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Quantity <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                    <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="tradeIn">Trade In</SelectItem>
                    </SelectContent>
                </Select>
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
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Image Upload Section */}
        {/* Image Upload Section */}
        <div className="space-y-4">
            <FileUploadButton 
                label="Product Photo"
                accept="image/*"
                onFileSelect={(f: File | null) => setImageFile(f)}
                selectedFile={imageFile}
                currentFileUrl={initialData?.photo_url}
             />
             <p className="text-xs text-muted-foreground">
                Recommended: Max 5MB.
             </p>
        </div>

        <div className="flex justify-end gap-3">
          <LoadingButton 
            type="submit" 
            isLoading={isLoading} 
            loadingText={isEditing ? "Saving..." : "Assigning..."}
            className="bg-[#00C49A] hover:bg-[#00A07D] text-white"
          >
            {isEditing ? "Save Changes" : "Assign Product"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
