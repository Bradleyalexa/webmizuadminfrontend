"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Package, History, FileText, Plus, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/src/components/ui/data-table"
import { StatusBadge } from "@/src/components/ui/status-badge"
import { useSupabase } from "@/src/components/providers/supabase-provider"
import { createApiClient } from "@/src/lib/api/client"
import { toast } from "sonner"
import type { Customer, CustomerProduct, Contract, ServiceLog } from "@/src/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomerProductForm } from "@/src/features/customer-products/components/customer-product-form"
import { CustomerAddressForm } from "@/src/features/customers/components/customer-address-form"

const productColumns = [
  {
    key: "product",
    header: "Product",
    render: (item: CustomerProduct) => (
      <div className="flex flex-col">
        <span className="font-medium text-[#0A2540]">{item.product_name || "Unknown Product"}</span>
        <span className="text-xs text-muted-foreground">{item.product_model}</span>
      </div>
    ),
  },
  {
    key: "purchaseDate",
    header: "Purchase Date",
    render: (item: CustomerProduct) => (item.installation_date ? new Date(item.installation_date).toLocaleDateString() : "-"),
  },
  {
    key: "price",
    header: "Price",
    render: (item: CustomerProduct) =>
      item.cust_product_price
        ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.cust_product_price)
        : "-",
  },
  {
    key: "technician",
    header: "Installer",
    render: (item: CustomerProduct) => item.technician_name || "-",
  },
  {
    key: "contractStatus",
    header: "Contract",
    render: (item: CustomerProduct) => (
      <StatusBadge
        status={item.contract_status || "No Contract"}
        variant={item.contract_status === "Active" ? "success" : item.contract_status === "Expired" ? "error" : "default"}
      />
    ),
  },
]

export function CustomerDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const { supabase } = useSupabase()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [products, setProducts] = useState<CustomerProduct[]>([])
  const [activeContracts, setActiveContracts] = useState<Contract[]>([])
  const [recentServices, setRecentServices] = useState<ServiceLog[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)

  const fetchData = async () => {
    if (!id) return

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const api = createApiClient(sessionData.session)

      // Fetch Customer
      const customerRes = await api.customers.getOne(id)
      if ((customerRes as any).success) {
        const custData = (customerRes as any).data
        setCustomer(custData)
        if (custData.addresses && custData.addresses.length > 0) {
          const primary = custData.addresses.find((a: any) => a.isPrimary)
          if (!selectedAddressId) {
            setSelectedAddressId(primary ? primary.id : custData.addresses[0].id)
          }
        }
      }

      // Fetch Products
      const productsRes = await api.customerProducts.getByCustomer(id)
      if ((productsRes as any).success) {
        setProducts((productsRes as any).data)
      }

      // Fetch Active Contracts
      const contractsRes = await api.contracts.findAll({ customerId: id, status: "active" })
      if ((contractsRes as any).success) {
        setActiveContracts((contractsRes as any).data)
      }

      // Fetch Service Logs
      const logsRes = await api.serviceLogs.findAll({ customerId: id })
      if ((logsRes as any).success) {
        setRecentServices((logsRes as any).data)
      }
    } catch (error: any) {
      console.error("Failed to fetch customer details", error)
      toast.error("Failed to load customer details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id, supabase])

  if (loading) return <div>Loading...</div>
  if (!customer) return <div>Customer not found</div>

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to deactivate this customer?")) return
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const api = createApiClient(sessionData.session)
      await api.customers.delete(customer.id)
      toast.success("Customer deactivated successfully")
      router.push("/admin/customers")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete customer")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold text-[#0A2540]">{customer.name}</h1>
          <p className="text-sm text-muted-foreground">
            Customer since {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/customers/${customer.id}/edit`)}
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="border-destructive text-destructive hover:bg-destructive hover:text-white bg-transparent"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="bg-white shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-[#333333]">{customer.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-[#333333]">{customer.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <StatusBadge status={customer.status} variant={customer.status === "active" ? "success" : "error"} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-[#333333]">
                {customer.updatedAt ? new Date(customer.updatedAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Addresses</CardTitle>
            <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="border-[#00C49A] text-[#00C49A] hover:bg-[#00C49A]/10">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Address
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                            Enter the details of the new address for this customer.
                        </DialogDescription>
                    </DialogHeader>
                    <CustomerAddressForm 
                        customerId={customer.id} 
                        currentAddresses={customer.addresses || []}
                        onSuccess={() => {
                            setIsAddAddressOpen(false)
                            fetchData() // Refresh list
                        }} 
                        onCancel={() => setIsAddAddressOpen(false)}
                    />
                </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {customer.addresses && customer.addresses.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {customer.addresses.map((addr: any) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md ${
                      selectedAddressId === addr.id
                        ? "border-[#00C49A] bg-[#00C49A]/5 shadow-sm ring-1 ring-[#00C49A]"
                        : "border-border bg-white hover:border-[#00C49A]/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0A2540] capitalize">{addr.addressType}</span>
                        {addr.isPrimary && (
                          <span className="rounded-full bg-[#00C49A]/10 px-2 py-0.5 text-[10px] font-medium text-[#00C49A]">
                            Primary
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-[#333333] break-words">{addr.custAddress}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                No addresses found
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedAddressId && (
        <Card className="bg-white shadow-sm mb-6">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
            <div>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">
                Owned Products at this Address
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {customer.addresses?.find((a: any) => a.id === selectedAddressId)?.custAddress}
              </p>
            </div>

            <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#00C49A] text-white hover:bg-[#00a883]">
                  <Package className="mr-2 h-4 w-4" />
                  Assign Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Assign Product to Customer</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to assign a new product to this selected address.
                  </DialogDescription>
                </DialogHeader>
                <CustomerProductForm
                  customerId={customer.id}
                  addressId={selectedAddressId}
                  onSuccess={() => {
                    setIsAssignOpen(false)
                    fetchData() // Refresh list
                  }}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={productColumns}
              data={products.filter(
                (p: any) =>
                  p.installation_address_id === selectedAddressId ||
                  (!p.installation_address_id && customer.addresses?.find((a: any) => a.id === selectedAddressId)?.isPrimary),
              )}
              onRowClick={(product) => router.push(`/admin/products/customer-products/${product.id}`)}
              emptyMessage="No products assigned to this address"
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#00C49A]/10 rounded-lg text-[#00C49A]">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Active Contracts</CardTitle>
            </div>
            <Link href={`/admin/contracts?customerId=${customer.id}`}>
              <Button variant="link" className="text-[#00C49A] hover:text-[#00a883]">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activeContracts.length > 0 ? (
              <div className="space-y-3">
                {activeContracts.map((contract: Contract) => {
                  const used = contract.servicesUsed || 0;
                  const total = contract.totalService || 1;
                  const pct = Math.round((used / total) * 100);
                  return (
                    <Link
                      key={contract.id}
                      href={`/admin/contracts/${contract.id}`}
                      className="block group"
                    >
                      <div className="rounded-lg border p-3 hover:border-[#00C49A] hover:shadow-sm transition-all cursor-pointer bg-white">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-[#0A2540] truncate">{contract.productName || "Contract"}</span>
                              <ExternalLink className="h-3 w-3 text-[#00C49A] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </div>
                            {contract.installationLocation && (
                              <span className="text-[11px] text-muted-foreground truncate mt-0.5">{contract.installationLocation}</span>
                            )}
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {contract.startDate ? new Date(contract.startDate).toLocaleDateString("id-ID") : "-"}{" "}
                              → {contract.endDate ? new Date(contract.endDate).toLocaleDateString("id-ID") : "-"}
                            </span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-[#00C49A]">{used} / {total}</div>
                            <div className="text-[10px] text-muted-foreground">Services</div>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-[#00C49A] transition-all"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 text-right">{pct}% completed</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No active contracts</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <History className="h-5 w-5" />
              </div>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Service History</CardTitle>
            </div>
            <Link href={`/admin/services?customerId=${customer.id}`}>
              <Button variant="link" className="text-[#00C49A] hover:text-[#00a883]">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentServices.length > 0 ? (
              <div className="space-y-4">
                {recentServices.slice(0, 5).map((log: ServiceLog) => (
                  <div key={log.id} className="flex items-center gap-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0A2540] truncate">
                        {log.productName || (log as any).product_name || "Service"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>
                          {log.serviceDate
                            ? new Date(log.serviceDate).toLocaleDateString()
                            : (log as any).completed_at
                              ? new Date((log as any).completed_at).toLocaleDateString()
                              : "-"}
                        </span>
                        <span>•</span>
                        <span>{log.technicianName || (log as any).technician?.name || "Technician"}</span>
                      </div>
                    </div>
                    <StatusBadge status={log.serviceType || "Completed"} variant="default" className="text-[10px]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No service history</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
