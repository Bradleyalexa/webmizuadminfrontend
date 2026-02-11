import { NextRequest, NextResponse } from 'next/server';
import { InvoiceTemplate, InvoiceData } from '../../admin/invoices/mockup/InvoiceTemplate';
import React from 'react';

export const runtime = 'nodejs';
// Increase max duration for PDF generation if platform allows (e.g. Vercel)
export const maxDuration = 60; 

export async function POST(req: NextRequest) {
  try {
    const data: InvoiceData = await req.json();

    const { renderToStaticMarkup } = await import('react-dom/server');
    const componentHtml = renderToStaticMarkup(
      React.createElement(InvoiceTemplate, { data })
    );

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
             @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&display=swap');
             @page {
                size: A4 portrait;
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
          </style>
        </head>
        <body>
          ${componentHtml}
        </body>
      </html>
    `;

    let browser;
    
    if (process.env.NODE_ENV === 'production') {
      // Production: Use puppeteer-core + @sparticuz/chromium
      const chromium = await import('@sparticuz/chromium').then(mod => mod.default);
      const puppeteerCore = await import('puppeteer-core').then(mod => mod.default);

      // Specify the path to the chromium binary (hosted remotely to avoid 50MB limit/bundling issues)
      // Verify version compatibility with the installed package
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
      );

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: { width: 2552, height: 3610 },
        executablePath,
        headless: true,
      });
    } else {
      // Development: Use full puppeteer
      const puppeteer = await import('puppeteer').then(mod => mod.default);
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();
    
    // Set viewport to the template's native resolution
    await page.setViewport({
      width: 2552, 
      height: 3610, // A4 Portrait Height
      deviceScaleFactor: 1,
    });
    
    // Emulate screen media to match the browser preview rendering exactly
    await page.emulateMediaType('screen');

    await page.setContent(html, {
      waitUntil: 'networkidle0', // Wait for images to load
    });

    // Generate PDF
    // Scale: 2552px width -> A4 width (approx 8.27in). 2552/96 = 26.58in. 8.27/26.58 = ~0.31
    const pdfBuffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true, // Respect @page rules
      scale: 0.31, 
      pageRanges: '1', // Force single page
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: errorMessage, stack: errorStack }, 
      { status: 500 }
    );
  }
}
