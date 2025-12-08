"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Send, CheckCircle, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Invoice } from "@/src/types"

const mockInvoice: Invoice = {
  id: "inv1",
  customerId: "1",
  customer: {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    createdAt: "",
    updatedAt: "",
  },
  type: "contract",
  referenceId: "c1",
  amount: 299,
  status: "sent",
  dueDate: "2024-12-31",
  createdAt: "2024-12-01",
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "paid":
      return "success"
    case "sent":
      return "info"
    case "draft":
      return "default"
    case "overdue":
      return "error"
    default:
      return "default"
  }
}

export function InvoiceDetail() {
  const router = useRouter()
  const invoice = mockInvoice

  const handleSend = async () => {
    // Placeholder: await api.invoices.send(invoice.id)
    console.log("Sending invoice:", invoice.id)
  }

  const handleMarkPaid = async () => {
    // Placeholder: await api.invoices.markPaid(invoice.id)
    console.log("Marking as paid:", invoice.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-[#0A2540] hover:bg-[#F6F9FC]">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-[#0A2540]">Invoice {invoice.id.toUpperCase()}</h1>
            <StatusBadge status={invoice.status} variant={getStatusVariant(invoice.status)} />
          </div>
          <p className="text-sm text-muted-foreground">Created: {new Date(invoice.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          {invoice.status === "draft" && (
            <Button onClick={handleSend} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          )}
          {invoice.status === "sent" && (
            <Button onClick={handleMarkPaid} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Paid
            </Button>
          )}
          <Button
            variant="outline"
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button
            variant="outline"
            className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-white shadow-sm lg:col-span-2">
          <CardContent className="p-8">
            {/* Invoice Template */}
            <div className="rounded-lg border border-border p-6">
              <div className="flex items-start justify-between border-b border-border pb-6">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-[#0A2540]">INVOICE</h2>
                  <p className="mt-1 font-mono text-lg text-muted-foreground">{invoice.id.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-xl font-bold text-[#0A2540]">Your Company</p>
                  <p className="text-sm text-muted-foreground">123 Business Ave</p>
                  <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium uppercase text-muted-foreground">Bill To</p>
                  <p className="mt-2 font-medium text-[#0A2540]">{invoice.customer?.name}</p>
                  <p className="text-[#333333]">{invoice.customer?.email}</p>
                  <p className="text-[#333333]">{invoice.customer?.address}</p>
                </div>
                <div className="text-right">
                  <div className="mb-3">
                    <p className="text-sm font-medium uppercase text-muted-foreground">Invoice Date</p>
                    <p className="text-[#333333]">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase text-muted-foreground">Due Date</p>
                    <p className="text-[#333333]">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-[#F6F9FC]">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2540]">Description</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-[#0A2540]">Type</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-[#0A2540]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-4 text-[#333333]">
                        {invoice.type === "contract" && "Annual Maintenance Contract"}
                        {invoice.type === "service" && "Service Request"}
                        {invoice.type === "order" && "Product Order"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="rounded-full bg-[#0A2540]/10 px-2.5 py-0.5 text-xs font-medium text-[#0A2540] capitalize">
                          {invoice.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-[#0A2540]">
                        ${invoice.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="px-4 py-4 text-right font-heading font-semibold text-[#0A2540]">
                        Total Due
                      </td>
                      <td className="px-4 py-4 text-right font-heading text-2xl font-bold text-[#00C49A]">
                        ${invoice.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Thank you for your business. Please make payment by the due date.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <StatusBadge status={invoice.status} variant={getStatusVariant(invoice.status)} className="mt-1" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <p className="font-heading text-2xl font-bold text-[#0A2540]">${invoice.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="capitalize text-[#333333]">{invoice.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reference ID</p>
                <p className="font-mono text-[#333333]">{invoice.referenceId}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-medium text-[#0A2540]">{invoice.customer?.name}</p>
              <p className="text-sm text-muted-foreground">{invoice.customer?.email}</p>
              <p className="text-sm text-muted-foreground">{invoice.customer?.phone}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/customers/${invoice.customerId}`)}
                className="w-full border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
              >
                View Customer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
