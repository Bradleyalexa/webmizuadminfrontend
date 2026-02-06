"use client"

import { useState } from "react"
import { INVOICE_TEMPLATES, TemplateId } from "@/src/features/invoices/templates/registry"
import { InvoiceData } from "@/src/features/invoices/types"

const DUMMY_DATA: InvoiceData = {
  id: "INV-001",
  invoiceNo: "0090/SMFI/I/26",
  date: new Date(),
  customer: {
    name: "Bapak Antoni",
    address: "Tower 2 unit 37 F Apartement Botanica - Jakarta Selatan",
    phone: "08123456789"
  },
  amountInWords: "Satu Juta Seratus Lima Puluh Ribu Rupiah",
  items: [
    {
      description: "Pelunasan Ganti 1 (satu) Unit Catridge Filter air Toclas TWD 7",
      quantity: 1,
      price: 1150000,
      total: 1150000
    }
  ],
  subtotal: 1150000,
  total: 1150000,
  paymentInfo: {
    bankName: "BCA",
    accountNumber: "6275256998",
    accountHolder: "CV Surya Mizu Firuta Indowater"
  }
}

export default function InvoicePreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('bucket-v1')
  const [scale, setScale] = useState(1)
  
  const TemplateComponent = INVOICE_TEMPLATES[selectedTemplate].component

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
      <div className="flex items-center justify-between bg-white p-4 border-b shrink-0 z-10 sticky top-0 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Invoice Template Preview</h1>
        <div className="flex gap-4 items-center">
             <div className="flex items-center gap-2 border rounded p-1 bg-gray-50">
                <button 
                  onClick={() => setScale(s => Math.max(0.25, s - 0.1))}
                  className="p-1 hover:bg-gray-200 rounded px-2 font-bold"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="text-sm min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
                <button 
                  onClick={() => setScale(s => Math.min(3, s + 0.1))}
                  className="p-1 hover:bg-gray-200 rounded px-2 font-bold"
                  title="Zoom In"
                >
                  +
                </button>
                <button 
                  onClick={() => setScale(1)}
                  className="text-xs text-blue-600 hover:underline px-2"
                >
                  Reset
                </button>
             </div>

             <select 
                value={selectedTemplate} 
                onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
                className="p-2 border rounded text-sm min-w-[200px]"
             >
                {Object.entries(INVOICE_TEMPLATES).map(([id, tpl]) => (
                    <option key={id} value={id}>{tpl.name}</option>
                ))}
             </select>
             <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors" onClick={() => window.print()}>
                Print / Download
             </button>
        </div>
      </div>

      <div className="flex-1 w-full bg-gray-100 overflow-auto relative">
         <div className="min-w-full w-fit min-h-full flex justify-center items-start p-8">
            <div 
              style={{ 
                transform: `scale(${scale})`, 
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out'
              }}
              className="bg-white shadow-xl transition-all duration-200"
            >
                <TemplateComponent data={DUMMY_DATA} />
            </div>
         </div>
      </div>
    </div>
  )
}
