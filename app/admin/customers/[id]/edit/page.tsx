"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PageHeader } from "@/src/components/ui/page-header"
import { CustomerForm } from "@/src/features/customers/components/customer-form"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { Customer } from "@/src/types"
import { Loader2 } from "lucide-react"

export default function EditCustomerPage() {
  const params = useParams()
  const id = params?.id as string
  const { session, isLoading: isSessionLoading } = useSupabase()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    if (!id || !session) return

    const fetchCustomer = async () => {
      try {
        const client = createApiClient(session)
        const response: any = await client.customers.getOne(id)
        if (response.success) {
          setCustomer(response.data)
        } else {
          setError(response.message || "Failed to fetch customer")
        }
      } catch (err: any) {
        console.error("Error fetching customer:", err)
        setError(err.message || "An unexpected error occurred")
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchCustomer()
  }, [id, session])

  if (isSessionLoading || (isDataLoading && !error)) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00C49A]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Edit Customer" description="Update customer information." />
      {customer && <CustomerForm mode="edit" customer={customer} />}
    </div>
  )
}
