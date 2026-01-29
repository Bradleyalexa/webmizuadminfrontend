import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";
import { MultiFileUploadButton } from "@/components/ui/multi-file-upload-button";
import { useState } from "react";
import { useSupabase } from "@/src/components/providers/supabase-provider";
import { toast } from "sonner";

const serviceLogSchema = z.object({
  customer_product_id: z.string().uuid(),
  technician_id: z.string().uuid(),
  service_date: z.date(),
  service_type: z.enum(["contract", "perpanggil"]),
  pekerjaan: z.string().min(1, "Job description is required"),
  notes: z.string().optional(),
  harga_service: z.coerce.number().min(0).default(0),
  teknisi_fee: z.coerce.number().min(0).default(0),
  job_evidence: z.array(z.string()).optional(),
  expected_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
});

export type ServiceLogFormValues = z.infer<typeof serviceLogSchema>;

interface ServiceLogFormProps {
  defaultValues: Partial<ServiceLogFormValues>;
  onSubmit: (data: ServiceLogFormValues) => void;
  isLoading?: boolean;
}

export function ServiceLogForm({ defaultValues, onSubmit, isLoading }: ServiceLogFormProps) {
  const { supabase, session } = useSupabase();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ServiceLogFormValues>({
    resolver: zodResolver(serviceLogSchema) as any,
    defaultValues: {
        ...defaultValues,
        service_date: defaultValues.service_date ? new Date(defaultValues.service_date) : new Date(),
        harga_service: 0,
        teknisi_fee: 0,
        service_type: "perpanggil"
    },
  });

  const uploadFiles = async (filesToUpload: File[]): Promise<string[]> => {
      const uploadedPaths: string[] = [];
      const timestamp = Date.now();
      
      for (const file of filesToUpload) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `service-evidence/${fileName}`;

          const { error } = await supabase.storage
              .from('documents') // Using general documents bucket
              .upload(filePath, file);

          if (error) {
              console.error(`Failed to upload ${file.name}`, error);
              toast.error(`Failed to upload ${file.name}`);
              throw error;
          }
          
          // Store relative path or full URL? Schema expects string[].
          // Using getPublicUrl is better for display later, or path if using private buckets.
          // Let's use path for consistency with other modules.
          uploadedPaths.push(filePath);
      }
      return uploadedPaths;
  };

  const handleSubmit = async (data: ServiceLogFormValues) => {
      try {
          let evidencePaths: string[] = [];
          
          if (files.length > 0) {
              setIsUploading(true);
              evidencePaths = await uploadFiles(files);
              setIsUploading(false);
          }

          onSubmit({
              ...data,
              job_evidence: evidencePaths
          });
      } catch (error) {
          setIsUploading(false);
          // Toast handled in upload
      }
  };

  const onError = (errors: any) => {
      console.error("Form Validation Errors:", errors);
      console.log("Current Form Values:", form.getValues());
      const missingFields = Object.keys(errors).join(", ");
      toast.error("Please fill in all required fields", {
          description: `Errors in: ${missingFields}. Check console for details.`
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, onError)} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="service_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Service Date</FormLabel>
                   <FormControl>
                    <Input 
                        type="date"
                        value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                        onChange={(e) => field.onChange(e.target.valueAsDate)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="contract">Contract (Kontrak)</SelectItem>
                      <SelectItem value="perpanggil">Per-Panggil (On-Demand)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <FormField
          control={form.control}
          name="pekerjaan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description (Pekerjaan)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Ganti Filter 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="harga_service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Price</FormLabel>
                  <FormControl>
                      <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teknisi_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technician Fee</FormLabel>
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional notes..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Evidence Upload */}
        <div className="space-y-2">
            <FormLabel>Job Evidence (Photos)</FormLabel>
            <MultiFileUploadButton 
                onFilesChange={setFiles}
                label="Upload Evidence"
            />
        </div>

        {/* Hidden Fields for IDs */}
        <input type="hidden" {...form.register("customer_product_id")} />
        <input type="hidden" {...form.register("technician_id")} />
        <input type="hidden" {...form.register("expected_id")} />
        <input type="hidden" {...form.register("job_id")} />

        <div className="flex justify-end gap-2 pt-2">
            <Button type="submit" disabled={isLoading || isUploading}>
                {isUploading ? "Uploading..." : (isLoading ? "Saving..." : "Complete Task")}
            </Button>
        </div>
      </form>
    </Form>
  );
}
