export interface InvoiceData {
  id: string
  invoiceNo: string
  date: Date
  customer: {
    name: string
    address?: string
    phone?: string
  }
  items: {
    description: string
    quantity: number
    price: number
    total: number
  }[]
  subtotal: number
  tax?: number
  total: number
  amountInWords: string // Required for legacy template "Terbilang"
  notes?: string
  paymentInfo?: {
    bankName: string
    accountNumber: string
    accountHolder: string
  }
}

export interface InvoiceTemplateProps {
  data: InvoiceData
  scale?: number
}
