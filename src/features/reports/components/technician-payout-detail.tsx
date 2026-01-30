"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"
import { ArrowLeft, User, Calendar, MapPin, Download } from "lucide-react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TechnicianPayoutDetailProps {
  technicianId: string
  startDate?: string
  endDate?: string
}

export function TechnicianPayoutDetail({ technicianId, startDate, endDate }: TechnicianPayoutDetailProps) {
  const router = useRouter()
  const { session, supabase } = useSupabase()
  const [technician, setTechnician] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalFee, setTotalFee] = useState(0)
  
  // Store customer product details in a map for easy lookup
  const [customerProducts, setCustomerProducts] = useState<Record<string, any>>({})

  useEffect(() => {
    if (!session || !technicianId) return

    const fetchData = async () => {
      setLoading(true)
      try {
        // 1. Fetch Technician Details
        const api = createApiClient(session)
        const techRes: any = await api.technicians.getOne(technicianId)
        if (techRes.success) {
          setTechnician(techRes.data)
        }

        // 2. Fetch Logs (Without Customer Join initially to avoid breakage)
        if (startDate && endDate) {
            const { data: logData, error } = await supabase
            .from('service_log')
            .select(`
                *,
                jobs (name)
            `)
            .eq('technician_id', technicianId)
            .gte('service_date', startDate)
            .lte('service_date', endDate)
            .order('service_date', { ascending: true })

           if (error) {
             console.error("Supabase Log Fetch Error:", error)
             throw error
           }

           const currentLogs = logData || []
           
           // 3. Manually Fetch Related Customer Info (Graceful Degradation)
           // Extract unique customer_product_ids
           const rawIds = currentLogs.map((l: any) => l.customer_product_id)
           const cpIds = Array.from(new Set(rawIds.filter(Boolean)))
           
           if (cpIds.length > 0) {
               const { data: cpData, error: cpError } = await supabase
                .from('customer_products')
                .select('id, description, product_catalog (name), customers (phone, address)')
                .in('id', cpIds)
               
               if (!cpError && cpData) {
                   // Build Map
                   const cpMap: Record<string, any> = {}
                   cpData.forEach((item: any) => {
                       cpMap[item.id] = item
                   })
                   setCustomerProducts(cpMap)
               } else {
                   console.error("CP Fetch Error:", cpError)
               }
           }

           setLogs(currentLogs)
           
           const total = currentLogs.reduce((acc: number, log: any) => acc + Number(log.teknisi_fee || 0), 0)
           setTotalFee(total)
        }

      } catch (err) {
        console.error("Fetch Data Error:", err)
        toast.error("Failed to load details: " + (err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [session, technicianId, startDate, endDate])

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Reports
      </Button>

      {/* Technician Header */}
      <Card className="bg-white shadow-sm border-l-4 border-l-[#00C49A]">
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border">
                        {technician?.photo_url ? (
                            <img src={technician.photo_url} alt={technician.name} className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-8 w-8 text-slate-400" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#0A2540]">{technician?.name || "Loading..."}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {startDate} - {endDate}</span>
                            <span>|</span>
                            <span>{technician?.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Payout</p>
                    <p className="text-3xl font-bold text-[#00C49A]">Rp {totalFee.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{logs.length} Tasks Completed</p>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Service Logs</CardTitle>
            <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="p-8 text-center">Loading data...</div>
            ) : logs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No records found for this period.</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Job / Pekerjaan</TableHead>
                            <TableHead className="text-right">Fee</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => {
                            const fee = Number(log.teknisi_fee || 0)
                            
                            // Lookup customer info from map
                            const cp = customerProducts[log.customer_product_id]
                            const customer = cp?.customers
                            const productName = cp?.product_catalog?.name || cp?.description || "-"
                            
                            const jobName = log.pekerjaan || log.jobs?.name || "-"
                            
                            return (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        {format(new Date(log.service_date), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {customer?.phone || "Unknown"}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate" title={customer?.address}>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3 text-muted-foreground" />
                                            {customer?.address || "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={productName}>
                                        {productName}
                                    </TableCell>
                                    <TableCell>
                                        {jobName}
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-[#0A2540]">
                                        Rp {fee.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
    </div>
  )
}

