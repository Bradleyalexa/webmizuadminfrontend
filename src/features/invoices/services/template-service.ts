
import { SupabaseClient } from '@supabase/supabase-js'
import { InvoiceData } from '../types'
import { format } from 'date-fns'

/**
 * Validates and transforms the Supabase Storage HTML template.
 */
export class InvoiceTemplateService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Fetches the template files, handles asset links (CSS/Images) by converting them 
   * to Signed URLs, and injects the invoice data.
   */
  async getRenderedTemplate(templateId: string, templateFolder: string, data: InvoiceData): Promise<string> {
    const bucket = 'invoices-public'
    
    // 1. Get Public URL for index.html
    const indexPath = `${templateFolder}/index.html`
    const { data: publicData } = this.supabase.storage.from(bucket).getPublicUrl(indexPath)
    const publicUrl = publicData.publicUrl

    // 2. Fetch HTML content
    const htmlResponse = await fetch(publicUrl)
    if (!htmlResponse.ok) {
        throw new Error(`Failed to load template from Public URL: ${publicUrl} (Status: ${htmlResponse.status}). Ensure specific file exists and Bucket is set to PUBLIC in Supabase Dashboard.`)
    }
    const htmlString = await htmlResponse.text()

    // 3. Parse HTML to find assets (CSS, Images)
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    // 4. Process CSS Links
    const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[]
    for (const link of links) {
      const href = link.getAttribute('href')
      if (href && !href.startsWith('http')) {
        // Sanitize path (remove leading duplicate slashes or dot-slashes)
        const cleanHref = href.replace(/^\.?\//, '')
        const assetPath = `${templateFolder}/${cleanHref}`
        const cssUrl = this.getPublicUrl(bucket, assetPath)
        
        console.log(`[TemplateService] Rewriting CSS: ${href} -> ${cssUrl}`)

        const cssRes = await fetch(cssUrl)
        if (cssRes.ok) {
            let cssText = await cssRes.text()
            
            // Rewrite url('...') inside CSS
            const urlRegex = /url\((['"]?)(?!http|data:)(.+?)\1\)/g
            let match
            const replacements = []
            while ((match = urlRegex.exec(cssText)) !== null) {
                replacements.push({ fullMatch: match[0], relativeUrl: match[2] })
            }
            
            for (const { fullMatch, relativeUrl } of replacements) {
                const cleanRel = relativeUrl.replace(/^\.?\//, '')
                const imagePath = `${templateFolder}/${cleanRel}`
                const publicImgUrl = this.getPublicUrl(bucket, imagePath)
                
                // console.log(`[TemplateService] Rewriting CSS Asset: ${relativeUrl} -> ${publicImgUrl}`)
                cssText = cssText.replace(fullMatch, `url("${publicImgUrl}")`)
            }
            
            const styleFn = doc.createElement('style')
            styleFn.textContent = cssText
            doc.head.appendChild(styleFn)
            link.remove()
        } else {
             console.warn(`[TemplateService] CSS Fetch Failed: ${cssUrl} (${cssRes.status})`)
        }
      }
    }

    // 5. Process Images
    const images = Array.from(doc.querySelectorAll('img')) as HTMLImageElement[]
    for (const img of images) {
      const src = img.getAttribute('src')
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
         const cleanSrc = src.replace(/^\.?\//, '')
         const assetPath = `${templateFolder}/${cleanSrc}`
         const newUrl = this.getPublicUrl(bucket, assetPath)
         
         console.log(`[TemplateService] Rewriting IMG: ${src} -> ${newUrl}`)
         img.src = newUrl
      }
    }

    // 6. Interpolate Data
    this.injectData(doc, data)

    // 7. Responsive Style Injection (Safe Mode)
    const responsiveStyle = doc.createElement('style')
    responsiveStyle.textContent = `
        @media screen {
            /* Make the body fill the iframe */
            body {
                margin: 0;
                padding: 20px;
                background: #f3f4f6; /* Gray background for contrast */
                min-height: 100vh;
                display: flex;
                justify-content: center;
            }
            /* Target common invoice wrappers */
            .invoice-box, .page, .container {
                width: 100% !important;
                max-width: 1000px !important; /* Cap it so it doesn't get ridiculous */
                margin: 0 auto;
                background: #fff;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                box-sizing: border-box;
            }
            /* Ensure images scale */
            img {
                max-width: 100%;
                height: auto;
            }
        }
    `
    doc.head.appendChild(responsiveStyle)

    return doc.documentElement.outerHTML
  }

  private getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }

  private injectData(doc: Document, data: InvoiceData) {
    // Helper to safely set text content
    const setText = (selector: string, value: string) => {
      const els = doc.querySelectorAll(selector)
      els.forEach(el => el.textContent = value)
    }

    // Specific Mappings requested by user
    // <p class="text-8">0852/SMFI/XII/25</p> -> Invoice No
    setText('.text-8', data.invoiceNo)

    // <p class="text-9">Tiga &nbsp;Juta &nbsp;Rupiah</p> -> Amount in Words
    setText('.text-9', data.amountInWords)

    // <p class="text-10">Pelunasan...</p> -> Items Description (Joined)
    const itemsDesc = data.items.map(i => `${i.description} (Qty: ${i.quantity})`).join(', ')
    setText('.text-10', itemsDesc)

    // <p class="text-11">Ket: ...</p> -> Notes
    setText('.text-11', `Ket: ${data.notes || 'Harga Sudah Termasuk Ongkos Kerja Team Teknisi di Lapangan'}`)

    // <p class="text-12">Transfer...</p> -> Bank Info
    if (data.paymentInfo) {
        setText('.text-12', `Transfer Rekening ${data.paymentInfo.bankName} : ${data.paymentInfo.accountNumber} - ${data.paymentInfo.accountHolder}`)
    }

    // <p class="text-13">Rp. 5.000.000,-</p> -> Total
    setText('.text-13', `Rp. ${data.total.toLocaleString('id-ID')},-`)

    // <p class="text-14">Jakarta, 13 Desember 2025</p> -> Date
    setText('.text-14', `Jakarta, ${format(data.date, 'd MMMM yyyy')}`)
  }
}
