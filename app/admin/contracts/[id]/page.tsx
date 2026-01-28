"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { 
  FileText, Calendar, User, Box, Trash, Edit, 
  ExternalLink, CheckCircle, AlertCircle, Clock 
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ContractForm } from "@/src/features/contracts/components/contract-form"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Contract } from "@/src/types"
import { Spinner } from "@/components/ui/spinner"

export default function ContractDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { session } = useSupabase()
  const [contract, setContract] = useState<Contract | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const fetchContract = async () => {
    if (!session || !id) return
    try {
      const api = createApiClient(session)
      const res = await api.contracts.getOne(id as string)
      if ((res as any).success) {
        setContract((res as any).data)
      } else {
        toast.error("Failed to load contract data")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to load contract")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContract()
  }, [session, id])

  const handleDelete = async () => {
    if (!session || !contract) return
    try {
      const api = createApiClient(session)
      await api.contracts.delete(contract.id)
      toast.success("Contract deleted")
      router.push("/admin/contracts")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete contract")
    }
  }

  if (isLoading) return <div className="flex h-96 items-center justify-center"><Spinner className="h-8 w-8 text-[#00C49A]" /></div>
  if (!contract) return <div>Contract not found</div>

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Contract Details</h1>
          <p className="text-muted-foreground flex items-center gap-2">
             ID: {contract.id.slice(0, 8)}...
             <Badge variant={contract.status === "active" ? "default" : "secondary"} className={contract.status === "active" ? "bg-[#00C49A]" : ""}>
               {contract.status}
             </Badge>
          </p>
        </div>
        <div className="flex gap-2">
           <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
             <DialogTrigger asChild>
               <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
             </DialogTrigger>
             <DialogContent className="max-w-xl">
               <DialogHeader>
                 <DialogTitle>Edit Contract</DialogTitle>
               </DialogHeader>
               <ContractForm 
                 contract={contract} 
                 onSuccess={() => {
                   setIsEditOpen(false)
                   fetchContract()
                 }}
                 onCancel={() => setIsEditOpen(false)}
               />
             </DialogContent>
           </Dialog>

           <AlertDialog>
             <AlertDialogTrigger asChild>
               <Button variant="destructive"><Trash className="mr-2 h-4 w-4" /> Delete</Button>
             </AlertDialogTrigger>
             <AlertDialogContent>
               <AlertDialogHeader>
                 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                 <AlertDialogDescription>
                   This action cannot be undone. This will permanently delete the contract and associated schedules.
                 </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                 <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
               </AlertDialogFooter>
             </AlertDialogContent>
           </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contract Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#00C49A]" />
              Contract Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
               <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{format(new Date(contract.startDate), "dd MMM yyyy")}</p>
               </div>
               <div>
                  <p className="text-muted-foreground">End Date</p>
                  <p className="font-medium">{format(new Date(contract.endDate), "dd MMM yyyy")}</p>
               </div>
               <div>
                  <p className="text-muted-foreground">Interval</p>
                  <p className="font-medium">{contract.intervalMonths} Months</p>
               </div>
               <div>
                  <p className="text-muted-foreground">Total Services</p>
                  <p className="font-medium">{contract.totalService}</p>
               </div>
               <div className="col-span-2 bg-[#F6F9FC] p-3 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-muted-foreground text-xs mb-1">Contract Value</p>
                        <p className="text-xl font-bold text-[#0A2540]">
                           {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(contract.contractValue || 0)}
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-muted-foreground text-xs mb-1">Services Used</p>
                        <div className="flex items-baseline justify-end gap-2">
                           <span className="text-2xl font-bold text-[#0A2540]">{contract.servicesUsed}</span>
                           <span className="text-sm text-muted-foreground">/ {contract.totalService}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {contract.notes && (
                <div>
                   <p className="text-muted-foreground text-xs mb-1">Notes</p>
                   <p className="text-sm bg-muted/30 p-2 rounded">{contract.notes}</p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Customer & Product */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-[#0A2540]" />
              Customer & Product
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
               <p className="text-xs text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" /> Customer</p>
               <div className="flex justify-between items-center">
                  <p className="font-medium text-base">{contract.customerName}</p>
                  {/* Link to customer not easy as we need customerId but contract only has customerProductId. 
                      Ideally fetch full customer object. 
                      Assuming I can't link easily unless I fetch customer id (which IS in data join) 
                      Wait, repo returns `customers(name)`. It doesn't return `id`.
                      I should update repo to return id if I want to link. 
                      For now, just a button/link visual. */}
                  <Button variant="ghost" size="sm" className="h-6 text-[#00C49A]" disabled>View</Button>
               </div>
            </div>
            <Separator />
            <div className="space-y-1">
               <p className="text-xs text-muted-foreground flex items-center gap-1"><Box className="h-3 w-3" /> Product</p>
               <p className="font-medium text-base">{contract.productName}</p>
               {contract.installationLocation && (
                   <p className="text-sm text-muted-foreground italic">{contract.installationLocation}</p>
               )}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
             <CardTitle className="text-lg flex items-center gap-2">
               <FileText className="h-5 w-5 text-orange-500" />
               Documents
             </CardTitle>
          </CardHeader>
          <CardContent>
             {contract.contractUrl ? (
                 <a href={contract.contractUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-border rounded-lg bg-white hover:bg-slate-50 transition-colors">
                    <div className="bg-red-100 p-2 rounded">
                       <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="overflow-hidden">
                       <p className="font-medium text-sm truncate">Contract Document</p>
                       <p className="text-xs text-muted-foreground flex items-center gap-1">Click to view <ExternalLink className="h-3 w-3" /></p>
                    </div>
                 </a>
             ) : (
                 <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    No document attached
                 </div>
             )}
          </CardContent>
        </Card>

        {/* Schedule List */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-sm">
           <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                 <Calendar className="h-5 w-5 text-blue-500" />
                 Service Schedule
              </CardTitle>
           </CardHeader>
           <CardContent>
              {contract.schedules && contract.schedules.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {contract.schedules.map((schedule, idx) => (
                       <div key={schedule.id} className="border border-border rounded-lg p-3 bg-white flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                             <span className="text-xs font-bold text-muted-foreground">Service #{idx + 1}</span>
                             <Badge variant="outline" className="text-xs capitalize">{schedule.status}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[#0A2540]">
                             <Clock className="h-4 w-4 text-muted-foreground" />
                             <span className="font-medium">{format(new Date(schedule.expected_date), "dd MMM yyyy")}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              ) : (
                 <p className="text-muted-foreground">No schedules generated.</p>
              )}
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
