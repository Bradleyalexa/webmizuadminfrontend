import React from 'react'
import { InvoiceTemplateProps } from '../../types'

export default function ModernInvoiceTemplate({ data }: InvoiceTemplateProps) {
  return (
    <div className="p-8 border rounded">
      <h1>Modern Template (Placeholder)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
