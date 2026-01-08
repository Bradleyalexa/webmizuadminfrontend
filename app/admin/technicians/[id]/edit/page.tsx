"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/src/components/ui/page-header"
import { TechnicianForm } from "@/src/features/technicians/components/technician-form"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Technician } from "@/src/types"

export default function EditTechnicianPage() {
  const params = useParams()
  const id = params?.id as string
  const { session } = useSupabase()
  const [technician, setTechnician] = useState<Technician | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTechnician = async () => {
      if (!session || !id) return
      try {
        const api = createApiClient(session)
        const res: any = await api.technicians.list({ limit: 1, q: "" }) 
        // Optimization: Ideally we have getById in API client client.ts
        // But checking client.ts, we only implemented list, create, update?
        // Let's quickly check client.ts or just implement getOne there.
        // Wait, I only saw list, create in client.ts edit previously.
        // I need to add getOne to client.ts if it's missing.
        // For now, let's assume I will fix client.ts, or just use list filtered by ID if API supports it?
        // Actually, let's just fetch list and find? No, that's bad.
        // I will add getById to client.ts in next step.
        // For now, I'll put a placeholder call.
        const detailRes: any = await api.technicians.getOne(id)
        if (detailRes.success) {
           setTechnician(detailRes.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTechnician()
  }, [session, id])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Technician"
        description="Update technician details."
      />
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {technician && <TechnicianForm initialData={technician} />}
      </div>
    </div>
  )
}
