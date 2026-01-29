
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { ServiceLogForm, ServiceLogFormValues } from "./service-log-form"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"

interface ServiceLogViewerProps {
    log: any;
    onUpdate?: () => void; // Callback to refresh parent
}

export function ServiceLogViewer({ log, onUpdate }: ServiceLogViewerProps) {
    const { supabase, session } = useSupabase();
    const [signedUrls, setSignedUrls] = useState<string[]>([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSignedUrls = async () => {
            if (!log?.jobEvidence || log.jobEvidence.length === 0) return;
            
            setLoadingImages(true);
            try {
                const urls = await Promise.all(log.jobEvidence.map(async (path: string) => {
                    // If it's already a full URL (legacy), return it
                    if (path.startsWith('http')) return path;

                    // Otherwise create signed URL
                    const { data, error } = await supabase
                        .storage
                        .from('service-evidence')
                        .createSignedUrl(path, 3600); // 1 hour expiry

                    if (error) {
                        console.error("Error signing URL:", error);
                        return null;
                    }
                    return data.signedUrl;
                }));
                setSignedUrls(urls.filter(Boolean) as string[]);
            } catch (err) {
                console.error("Failed to sign URLs", err);
            } finally {
                setLoadingImages(false);
            }
        };

        if (!isEditing) fetchSignedUrls();
    }, [log, supabase, isEditing]);

    const handleUpdate = async (data: ServiceLogFormValues) => {
        setIsSaving(true);
        try {
            const api = createApiClient(session) as any;
            // Update logic here
            await api.serviceLogs.update(log.id, data);
            toast.success("Service Report Updated!");
            setIsEditing(false);
            if (onUpdate) onUpdate();
        } catch (error: any) {
            toast.error(error.message || "Failed to update report");
        } finally {
            setIsSaving(false);
        }
    }

    if (!log) return <div className="p-4 text-muted-foreground">No service log data available.</div>

    if (isEditing) {
        return (
            <ScrollArea className="h-[60vh] pr-4">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Edit Report</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
                <ServiceLogForm 
                    defaultValues={{
                        ...log,
                        service_date: log.serviceDate,
                        harga_service: log.hargaService,
                        teknisi_fee: log.teknisiFee,
                        service_type: log.serviceType,
                        // Fix evidence mapping if necessary
                        job_evidence: log.jobEvidence
                    }} 
                    onSubmit={handleUpdate} 
                    isLoading={isSaving}
                    isEditing={true}
                />
            </ScrollArea>
        )
    }

    return (
        <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
                 {/* Header & Edit Button */}
                 <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Report
                    </Button>
                 </div>

                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Service Date</p>
                        <p className="text-base">{log.serviceDate ? format(new Date(log.serviceDate), "PPP") : "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <Badge variant={log.serviceType === 'contract' ? 'default' : 'secondary'} className="mt-1">
                            {log.serviceType === 'contract' ? 'Contract' : 'On-Demand'}
                        </Badge>
                    </div>
                </div>

                {/* Customer & Location */}
                <div className="p-4 bg-slate-50 rounded-lg border">
                    <div className="mb-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
                        <p className="text-base font-semibold text-slate-900">{log.customerName || "Unknown Customer"}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Address / Location</p>
                        <p className="text-sm text-slate-700">{log.customerAddress || log.installationLocation || "No address provided"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Technician</p>
                        <p className="font-medium">{log.technicianName || "Unknown"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Model</p>
                        <p>{log.productModel || "-"}</p>
                    </div>
                </div>

                <Separator />

                {/* Job Description */}
                <div>
                     <p className="text-sm font-medium text-muted-foreground mb-1">Job Description (Pekerjaan)</p>
                     <div className="p-3 bg-white rounded-md text-sm border shadow-sm">
                        {log.pekerjaan || "No description provided."}
                     </div>
                </div>

                {/* Notes */}
                {log.notes && (
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm italic text-slate-600 border-l-2 border-slate-300 pl-3 py-1">{log.notes}</p>
                    </div>
                )}

                 <Separator />

                 {/* Financials */}
                 <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Service Price</p>
                        <p className="text-lg font-semibold text-slate-900">
                             {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(log.hargaService || 0)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Tech Fee</p>
                        <p className="text-lg font-semibold text-green-700">
                             {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(log.teknisiFee || 0)}
                        </p>
                    </div>
                 </div>

                 {/* Evidence */}
                 {log.jobEvidence && log.jobEvidence.length > 0 && (
                     <div>
                         <p className="text-sm font-medium text-muted-foreground mb-2">Service Evidence</p>
                         {loadingImages ? (
                             <div className="text-sm text-muted-foreground animate-pulse">Loading images...</div>
                         ) : (
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                 {signedUrls.map((url, idx) => (
                                     <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block relative group aspect-square bg-slate-100 rounded-md overflow-hidden border">
                                         <img 
                                            src={url} 
                                            alt={`Evidence ${idx + 1}`} 
                                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                                         />
                                     </a>
                                 ))}
                             </div>
                         )}
                     </div>
                 )}
            </div>
        </ScrollArea>
    )
}
