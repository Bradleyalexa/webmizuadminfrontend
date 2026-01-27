"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingButton } from "@/components/ui/loading-button"
import { contractSchema, type ContractFormData } from "@/src/lib/validations/contract"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Contract, Customer, CustomerProduct } from "@/src/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploadButton } from "@/components/ui/file-upload-button"

interface ContractFormProps {
  customerProductId?: string
  contract?: Contract
  onSuccess?: () => void
  onCancel?: () => void
}

export function ContractForm({ customerProductId: initialCpid, contract, onSuccess, onCancel }: ContractFormProps) {
  const router = useRouter()
  const { session, supabase } = useSupabase()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  // Selection Logic for global create
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("")
  const [customerProducts, setCustomerProducts] = useState<CustomerProduct[]>([])
  
  const isGlobalCreate = !initialCpid && !contract

  const defaultValues = contract ? {
    start_date: contract.startDate,
    end_date: contract.endDate,
    interval_months: contract.intervalMonths,
    total_service: contract.totalService,
    contract_url: contract.contractUrl || "",
    notes: contract.notes || "",
    price: contract.contractValue || 0,
    customer_product_id: contract.customerProductId,
  } : {
    start_date: new Date().toISOString().split('T')[0],
    end_date: "",
    interval_months: 3,
    total_service: 4,
    contract_url: "",
    notes: "",
    price: 0,
    customer_product_id: initialCpid || "",
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues,
  })

  // Fetch customers if global create
  useEffect(() => {
    if (isGlobalCreate && session) {
       const fetchCustomers = async () => {
         const api = createApiClient(session)
         try {
           const res = await api.customers.list({ limit: 100 })
           if ((res as any).success) {
              setCustomers((res as any).data)
           }
         } catch (e) {
           console.error("Failed to load customers", e)
         }
       }
       fetchCustomers()
    }
  }, [isGlobalCreate, session])

  // Fetch products when customer selected
  useEffect(() => {
      if (selectedCustomerId && session) {
          const fetchProducts = async () => {
             const api = createApiClient(session)
             try {
                 const res = await api.customerProducts.getByCustomer(selectedCustomerId)
                 if ((res as any).success) {
                     setCustomerProducts((res as any).data)
                 }
             } catch (e) {
                 console.error("Failed to load customer products", e)
             }
          }
          fetchProducts()
      } else {
        setCustomerProducts([])
      }
  }, [selectedCustomerId, session])



  const uploadFile = async (fileToUpload: File): Promise<string> => {
    const fileExt = fileToUpload.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `contracts/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('documents') 
      .upload(filePath, fileToUpload)

    if (uploadError) {
      throw uploadError
    }

    // Return the relative path, NOT the public URL
    return filePath
  }

  const onSubmit = async (data: ContractFormData) => {
    if (!session) return

    try {
      let documentPath: string | undefined = undefined

      if (file) {
        setIsUploading(true)
        documentPath = await uploadFile(file)
        setIsUploading(false)
      }

      const api = createApiClient(session)
      
      // Explicitly construct payload to ensure types and exclude secure fields
      const payload: any = {
          start_date: new Date(data.start_date).toISOString(),
          end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
          interval_months: Number(data.interval_months),
          total_service: Number(data.total_service),
          notes: data.notes || "",
          price: Number(data.price || 0), // Fix for price update failure
          customer_product_id: data.customer_product_id
      }
      
      // Handle Contract URL securely
      if (documentPath) {
          // If we have a NEW file, we update the URL (store path)
          payload.contract_url = documentPath
      } else if (!isEdit) {
          // If creating new and no file, ensure it's empty string/null if required
          payload.contract_url = "" 
      }
      // If Editing and NO new file, we OMIT contract_url so we don't overwrite DB with potentially signed URL

      if (isEdit) {
         await api.contracts.update(contract!.id, payload)
         toast.success("Contract updated successfully")
      } else {
         if (!payload.customer_product_id) {
             toast.error("Please select a product first")
             return
         }
         await api.contracts.create(payload)
         toast.success("Contract created successfully")
      }
      
      router.refresh()
      onSuccess?.()
    } catch (error: any) {
      setIsUploading(false)
      console.error(error)
      toast.error(error.message || "Failed to save contract")
    }
  }

  const isEdit = !!contract

  return (
    <Card className="w-full border-0 shadow-none">
       {/* Remove Card wrapper to fit in Dialog better, or keep it clean */}
      <CardHeader className="px-0 pt-0">
        <CardTitle>{isEdit ? "Edit Contract" : "Create New Contract"}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Customer & Product Selection for Global Create */}
          {isGlobalCreate && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
                <div className="space-y-2">
                   <Label>Customer</Label>
                   <Select onValueChange={(val) => setSelectedCustomerId(val)}>
                      <SelectTrigger>
                         <SelectValue placeholder="Select Customer" />
                      </SelectTrigger>
                      <SelectContent>
                         {customers.map(c => (
                             <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                         ))}
                      </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                   <Label>Product</Label>
                   <Select 
                      disabled={!selectedCustomerId}
                      onValueChange={(val) => setValue("customer_product_id", val)}
                   >
                      <SelectTrigger>
                         <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                      <SelectContent>
                          {customerProducts.map(cp => (
                              <SelectItem key={cp.id} value={cp.id}>
                                {cp.product_name} ({cp.product_model})
                              </SelectItem>
                          ))}
                      </SelectContent>
                   </Select>
                   {errors.customer_product_id && <p className="text-sm text-destructive">Product is required</p>}
                </div>
             </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                {...register("start_date")}
              />
              {errors.start_date && <p className="text-sm text-destructive">{errors.start_date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                {...register("end_date")}
              />
              {errors.end_date && <p className="text-sm text-destructive">{errors.end_date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interval_months">Interval (Months)</Label>
              <Input
                id="interval_months"
                type="number"
                min={1}
                {...register("interval_months")}
              />
              {errors.interval_months && <p className="text-sm text-destructive">{errors.interval_months.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_service">Total Services</Label>
              <Input
                id="total_service"
                type="number"
                min={1}
                {...register("total_service")}
              />
              {errors.total_service && <p className="text-sm text-destructive">{errors.total_service.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Contract Value (IDR)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <FileUploadButton 
               label="Contract Document (PDF/Image)"
               onFileSelect={(f: File | null) => setFile(f)}
               currentFileUrl={contract?.contractUrl}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes..."
              {...register("notes")}
            />
            {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting || isUploading}>
                Cancel
              </Button>
            )}
            <LoadingButton 
              type="submit" 
              isLoading={isSubmitting || isUploading} 
              loadingText={isUploading ? "Uploading..." : (isEdit ? "Saving..." : "Creating...")}
              className="bg-[#00C49A] hover:bg-[#00A07D]"
            >
              {isEdit ? "Save Changes" : "Create Contract"}
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
