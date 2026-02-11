
import React, { useEffect, useState } from 'react'
import { InvoiceTemplateProps } from '../../types'

import { InvoiceTemplateService } from '../../services/template-service'
import { useSupabase } from '@/src/components/providers/supabase-provider'

interface BucketTemplateProps extends InvoiceTemplateProps {
  templateFolder: string
}

export default function BucketTemplate({ data, templateFolder }: BucketTemplateProps) {
  const { supabase } = useSupabase()
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const templateService = new InvoiceTemplateService(supabase)
        const html = await templateService.getRenderedTemplate('ignored', templateFolder, data)
        setHtmlContent(html)
      } catch (err: any) {
        console.error('Template Load Error:', err)
        setError(err.message || 'Failed to load template')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [data, templateFolder, supabase])

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Template...</div>
  
  if (error) return (
      <div className="p-8 text-center space-y-4">
          <div className="text-red-500 font-medium">Failed to load invoice template</div>
          <div className="text-sm text-gray-400">{error}</div>
      </div>
  )

  return (
    <div className="w-full max-w-[210mm] h-[297mm] bg-white relative mx-auto shadow-lg my-8 print:w-full print:max-w-none print:shadow-none print:my-0 print:h-auto">
       <iframe 
         srcDoc={htmlContent}
         title="Invoice"
         className="w-full h-full absolute inset-0 border-none"
         sandbox="allow-same-origin allow-scripts" 
       />
    </div>
  )
}
