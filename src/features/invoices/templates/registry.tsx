import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { InvoiceTemplateProps } from '../types'

export type TemplateId = 'legacy' | 'modern' | 'bucket-v1'

export const INVOICE_TEMPLATES: Record<TemplateId, {
  name: string
  component: ComponentType<InvoiceTemplateProps>
}> = {
  legacy: {
    name: 'Legacy (Blue/Red)',
    component: dynamic(() => import('./legacy/legacy-template')),
  },
  'bucket-v1': {
    name: 'Supabase Bucket (template-01)',
    // We wrap the component to pass the specific folder name
    component: dynamic(async () => {
        const mod = await import('./bucket/bucket-template')
        return (props: any) => <mod.default {...props} templateFolder="templateToclas" />
    }),
  },
  modern: {
    name: 'Modern Simple',
    component: dynamic(() => import('./modern/modern-template')), // Placeholder
  }
}
