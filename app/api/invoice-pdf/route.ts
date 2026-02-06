import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { InvoiceTemplate, InvoiceData } from '../../admin/invoices/mockup/InvoiceTemplate';
import React from 'react';

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  try {
    const data: InvoiceData = await req.json();

    // Render the component to static HTML
    const { renderToStaticMarkup } = await import('react-dom/server');
    const componentHtml = renderToStaticMarkup(
      React.createElement(InvoiceTemplate, { data })
    );

    // Full HTML document structure
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
             /* Print-specific layout locks */
             @page {
                size: A4 landscape; /* Standard A4 landscape */
                margin: 0;
             }
             body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                /* Ensure background colors are printed */
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
             }
             /* Force specific width to match the template's design logic */
             /* The template uses 2552px width. We need to scale this to fit A4 */
             /* A4 Landscape is approx 297mm x 210mm */
             /* 297mm at 96dpi is ~1123px. */
             /* 2552px is very high res. We will use CSS zoom/transform or Puppeteer scaling */
          </style>
        </head>
        <body>
          ${componentHtml}
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Set viewport to the template's native resolution to ensure correct layout calculation
    await page.setViewport({
      width: 2552, 
      height: 1800, // Enough height for the invoice
      deviceScaleFactor: 1,
    });

    await page.setContent(html, {
      waitUntil: 'networkidle0', // Wait for images to load
    });

    // Generate PDF
    // We scale the 2552px content down to fit A4 Landscape
    // A4 width (landscape) is appx 11.7 inches. 
    // 2552px / 96dpi = 26.58 inches.
    // Scale factor needed: 11.7 / 26.58 = ~0.44
    // However, it's safer to use 'printBackground' and prefer CSS @page size.
    // Let's try fitting it via PDF options safely.
    
    const pdfBuffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true, // Respect @page rules
      scale: 0.43, // Tweak scale slightly tighter to ensure fit
      pageRanges: '1', // FORCE SINGLE PAGE
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    await browser.close();

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice_${data.invoiceNo.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
