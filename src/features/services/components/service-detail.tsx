"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, UserCog, Upload, Check, X, Clock, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/src/components/ui/status-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ServiceRequest, Technician } from "@/src/types"

const mockService: ServiceRequest = {
  id: "s1",
  customerProductId: "cp1",
  customerProduct: {
    id: "cp1",
    customerId: "1",
    productId: "p1",
    customer: {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      createdAt: "",
      updatedAt: "",
    },
    product: {
      id: "p1",
      name: "Air Conditioner Pro 5000",
      description: "",
      category: "HVAC",
      price: 1299,
    },
    purchaseDate: "2024-01-15",
    serialNumber: "AC-2024-001234",
  },
  status: "scheduled",
  description: "AC not cooling properly, needs inspection. Customer reports unusual noise during operation.",
  scheduledDate: "2024-12-15",
  technicianId: "t1",
  technician: {
    id: "t1",
    name: "Tom Wilson",
    email: "tom@company.com",
    phone: "+1 (555) 987-6543",
    specialization: "HVAC",
    isActive: true,
  },
  createdAt: "2024-12-10",
}

const mockTechnicians: Technician[] = [
  { id: "t1", name: "Tom Wilson", email: "", phone: "", specialization: "HVAC", isActive: true },
  { id: "t2", name: "Jane Cooper", email: "", phone: "", specialization: "Smart Home", isActive: true },
  { id: "t3", name: "Alex Martinez", email: "", phone: "", specialization: "General", isActive: true },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success"
    case "in-progress":
      return "info"
    case "scheduled":
      return "warning"
    case "pending":
      return "default"
    case "cancelled":
      return "error"
    default:
      return "default"
  }
}

export function ServiceDetail() {
  const router = useRouter()
  const service = mockService
  const [assignedTechnician, setAssignedTechnician] = useState(service.technicianId || "")
  const [rejectReason, setRejectReason] = useState("")

  const handleAssignTechnician = async () => {
    // Placeholder: await api.services.assignTechnician(service.id, assignedTechnician)
    console.log("Assigning technician:", assignedTechnician)
  }

  const handleUploadEvidence = async (files: FileList | null) => {
    if (!files) return
    // Placeholder: await api.services.uploadEvidence(service.id, Array.from(files))
    console.log("Uploading files:", files)
  }

  const handleApproveReschedule = async () => {
    // Placeholder: await api.services.approveReschedule(service.id)
    console.log("Approving reschedule")
  }

  const handleRejectReschedule = async () => {
    // Placeholder: await api.services.rejectReschedule(service.id, rejectReason)
    console.log("Rejecting reschedule:", rejectReason)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Service Request</h1>
            <StatusBadge status={service.status} variant={getStatusVariant(service.status)} />
          </div>
          <p className="text-sm text-muted-foreground">Created: {new Date(service.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
              >
                <Clock className="mr-2 h-4 w-4" />
                Reschedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reschedule Request</DialogTitle>
                <DialogDescription>A reschedule request is pending for this service.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Requested New Date</p>
                  <p className="text-[#333333]">December 20, 2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reason</p>
                  <p className="text-[#333333]">Customer unavailable on original date</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejection Reason (if rejecting)</p>
                  <Textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="mt-1"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={handleRejectReschedule}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-white bg-transparent"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button onClick={handleApproveReschedule} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-[#333333]">{service.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled Date</p>
                  <p className="text-[#333333]">
                    {service.scheduledDate ? new Date(service.scheduledDate).toLocaleDateString() : "Not scheduled"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <StatusBadge status={service.status} variant={getStatusVariant(service.status)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Customer & Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p className="text-[#333333]">{service.customerProduct?.customer?.name}</p>
                  <p className="text-sm text-muted-foreground">{service.customerProduct?.customer?.email}</p>
                  <p className="text-sm text-muted-foreground">{service.customerProduct?.customer?.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p className="text-[#333333]">{service.customerProduct?.customer?.address}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Product</p>
                  <p className="text-[#333333]">{service.customerProduct?.product?.name}</p>
                  <span className="inline-block rounded-full bg-[#00C49A]/10 px-2.5 py-0.5 text-xs font-medium text-[#00C49A]">
                    {service.customerProduct?.product?.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Serial Number</p>
                  <p className="font-mono text-[#333333]">{service.customerProduct?.serialNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Service Evidence</CardTitle>
              <label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUploadEvidence(e.target.files)}
                />
                <Button asChild className="bg-[#00C49A] text-white hover:bg-[#00a883] cursor-pointer">
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </span>
                </Button>
              </label>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border-2 border-dashed border-border bg-[#F6F9FC] flex items-center justify-center"
                  >
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
                <div className="aspect-square rounded-lg border-2 border-dashed border-[#00C49A]/30 bg-[#00C49A]/5 flex items-center justify-center cursor-pointer hover:bg-[#00C49A]/10 transition-colors">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-[#00C49A]" />
                    <p className="mt-1 text-xs text-[#00C49A]">Add Photo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Assigned Technician</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.technician ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00C49A]/10">
                      <UserCog className="h-6 w-6 text-[#00C49A]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#0A2540]">{service.technician.name}</p>
                      <p className="text-sm text-muted-foreground">{service.technician.specialization}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">{service.technician.email}</p>
                    <p className="text-muted-foreground">{service.technician.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No technician assigned</p>
              )}

              <div className="border-t border-border pt-4">
                <p className="mb-2 text-sm font-medium text-[#333333]">Reassign Technician</p>
                <div className="flex gap-2">
                  <Select value={assignedTechnician} onValueChange={setAssignedTechnician}>
                    <SelectTrigger className="flex-1 bg-white">
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
                  <Button onClick={handleAssignTechnician} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
                    Assign
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Service Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
                onClick={() => router.push(`/admin/services/${service.id}/log`)}
              >
                View Service Log
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
