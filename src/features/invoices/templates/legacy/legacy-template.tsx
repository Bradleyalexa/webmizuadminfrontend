import React from 'react'
import { InvoiceTemplateProps } from '../../types'
import { format } from 'date-fns'

export default function LegacyInvoiceTemplate({ data }: InvoiceTemplateProps) {
  return (
    <div className="w-[800px] min-h-[1000px] bg-white text-black font-sans relative" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
          <img src="/layer_6.jpg" alt="Invoice Background" className="w-full h-full object-cover opacity-100" />
      </div>
      
      {/* Dynamic Content Overlay */}
      <div className="relative z-10 w-full h-full"> 
          
          {/* Header Section Adjustments */}
          <div className="absolute top-8 left-8">
             <img src="/company logo.png" alt="Mizu Firuta" className="w-40 h-auto object-contain" />
          </div>
          
          {/* Company Text Image */}
          <div className="absolute top-8 right-8 w-[500px]">
             <img src="/cv_surya_mizu_firuta_indo.png" alt="Company Header" className="w-full h-auto" />
          </div>

          
          {/* Invoice Number */}
          <div className="absolute top-[160px] right-[50px] text-right">
             <p className="text-blue-900 font-bold text-sm">
                NO. : {data.invoiceNo}
             </p>
          </div>

          {/* Customer Name */}
          <div className="absolute top-[240px] left-[220px] w-[500px]">
            <p className="font-bold text-black text-sm">
                {data.customer.name} {data.customer.address && ` / ${data.customer.address}`}
            </p>
          </div>

          {/* Amount In Words */}
          <div className="absolute top-[285px] left-[220px] w-[500px] h-[35px] flex items-center">
             <p className="font-bold italic text-black text-sm pl-2">
                {data.amountInWords}
             </p>
          </div>

          {/* Payment For / Items */}
          <div className="absolute top-[340px] left-[220px] w-[520px]">
             <div className="font-bold text-black text-sm leading-8">
                {data.items.map(item => (
                    <span key={item.description} className="block">
                        {item.description}
                    </span>
                ))}
             </div>
          </div>

          {/* Notes */}
          <div className="absolute top-[480px] left-[220px] w-[500px] text-xs font-bold text-black space-y-1">
             <p>Ket: {data.notes || "Harga Sudah Termasuk Ongkos Kerja Team Teknisi di Lapangan"}</p>
             {data.paymentInfo && (
                <p>Transfer Rekening {data.paymentInfo.bankName} : {data.paymentInfo.accountNumber} - {data.paymentInfo.accountHolder}</p>
             )}
          </div>

          {/* Footer - Amount */}
          <div className="absolute bottom-[200px] left-[160px]">
             <div className="font-bold text-xl text-black ml-4 mt-2 -skew-x-12">
                 Rp. {data.total.toLocaleString('id-ID')},-
             </div>
          </div>

          {/* Footer - Date & Signature */}
          <div className="absolute bottom-[180px] right-[60px] text-center w-[250px]">
              <p className="font-bold text-black text-sm mb-8">
                  Jakarta, {format(data.date, 'd MMMM yyyy')}
              </p>
              
              {/* Signature Image */}
              <div className="relative w-full flex justify-center">
                   <img src="/signature footer.png" alt="Signed" className="w-32 h-auto object-contain" />
              </div>
          </div>

      </div>
    </div>
  )
}
