"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, User, Package, Wrench } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { session } = useSupabase()
  const router = useRouter()
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      if (!session) return
      try {
        const api = createApiClient(session) as any
        const res = await api.schedules.getOne(params.id)
        setService(res.data)
      } catch (err: any) {
        console.error(err)
        toast.error("Failed to load service details")
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [session, params.id])

  if (loading) return <div className="p-6">Loading...</div>
  if (!service) return <div className="p-6">Service not found</div>

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Button>

      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-3xl font-bold text-[#0A2540]">{service.jobName || "Service Request"}</h1>
           <p className="text-muted-foreground mt-1">ID: {service.id}</p>
        </div>
        <Badge variant={service.status === 'pending' ? 'secondary' : service.status === 'done' ? 'default' : 'destructive'}>
            {service.status?.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#00C49A]" /> Schedule Details
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div>
                      <span className="text-sm text-muted-foreground block">Expected Date</span>
                      <span className="font-medium">{service.expectedDate ? format(new Date(service.expectedDate), "PPP p") : "Not scheduled"}</span>
                  </div>
                  <div>
                      <span className="text-sm text-muted-foreground block">Address</span>
                      <div className="flex items-start gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span>{service.address || "No address provided"}</span>
                      </div>
                  </div>
              </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                       <User className="h-5 w-5 text-[#00C49A]" /> Customer
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div>
                      <span className="text-sm text-muted-foreground block">Name</span>
                      <span className="font-medium text-lg">{service.customerName}</span>
                  </div>
                  <div>
                      <span className="text-sm text-muted-foreground block">Product</span>
                      <div className="flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{service.productName}</span>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>
      
      {/* Add more sections like Tasks, Notes, Photos later */}
    </div>
  )
}
