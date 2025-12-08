"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockServiceLog = {
  id: "sl1",
  serviceRequestId: "s1",
  technicianId: "t1",
  technician: { id: "t1", name: "Tom Wilson", specialization: "HVAC" },
  notes:
    "Inspected the AC unit. Found clogged filters and low refrigerant levels. Cleaned filters and topped up refrigerant. System now operating normally. Recommended regular filter replacement every 3 months.",
  evidenceUrls: ["/ac-filter-before-cleaning.jpg", "/ac-filter-after-cleaning.jpg", "/refrigerant-gauge-reading.jpg"],
  completedAt: "2024-12-15T14:30:00",
}

export function ServiceLogDetail() {
  const router = useRouter()
  const log = mockServiceLog

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Service Log</h1>
          <p className="text-sm text-muted-foreground">Completed: {new Date(log.completedAt).toLocaleString()}</p>
        </div>
        <Button className="bg-[#00C49A] text-white hover:bg-[#00a883]">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Service Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#333333] leading-relaxed">{log.notes}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Technician</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-[#0A2540]">{log.technician.name}</p>
            <p className="text-sm text-muted-foreground">{log.technician.specialization}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Evidence Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {log.evidenceUrls.map((url, index) => (
              <img
                key={index}
                src={url || "/placeholder.svg"}
                alt={`Evidence ${index + 1}`}
                className="aspect-video w-full rounded-lg object-cover bg-[#F6F9FC]"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
