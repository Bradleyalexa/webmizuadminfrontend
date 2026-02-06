import React from 'react';

// Define the interface for the dynamic data
export interface InvoiceData {
  invoiceNo: string;
  amountInWords: string;
  description: string;
  optRow1?: string;
  optRow2?: string;
  optRow3?: string;
  // Footer fields
  footerNote: string;
  paymentDetails: string;
  amountNumeric: string;
  locationDate: string;
  customerNameAddress: string;
}

// Reusable Component
export function InvoiceTemplate({ data }: { data: InvoiceData }) {
  const imageBaseUrl = 'https://gdfhhfcdomtpkelvmhui.supabase.co/storage/v1/object/public/invoices-public/templateToclas/';

  const styles = `
    /* Reset and Global Overrides for #invoice-mockup-root */
    #invoice-mockup-root * {
      box-sizing: border-box;
    }
    
    #invoice-mockup-root {
      line-height: 1;
      color: #1131aa;
      background: white;
      font-size: 16px; 
      font-family: TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif;
      font-size: 3.125rem;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0;
      text-decoration: none;
      width: 2552px; 
      height: 1760px; /* FIXED CANVAA HEIGHT for A4 Landscape approx ratio */
      overflow: hidden; /* STRICTLY PREVENT SPILLOVER */
      margin: 0 auto;
      position: relative;
    }

    @media print {
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      #invoice-mockup-root {
         page-break-inside: avoid;
         page-break-after: avoid;
         page-break-before: avoid;
      }
    }

    #invoice-mockup-root a { color: inherit; text-decoration: none; }
    #invoice-mockup-root ol, #invoice-mockup-root ul { list-style: none; }
    #invoice-mockup-root table { border-collapse: collapse; border-spacing: 0; }
    #invoice-mockup-root h1, #invoice-mockup-root h2, #invoice-mockup-root h3, 
    #invoice-mockup-root h4, #invoice-mockup-root h5, #invoice-mockup-root h6 { font-weight: bold; margin-top: 0; margin-bottom: 0; }
    
    #invoice-mockup-root .group:before,
    #invoice-mockup-root .group:after { content: " "; display: table; }
    #invoice-mockup-root .group:after { clear: both; }
    #invoice-mockup-root .group { zoom: 1; }
    
    #invoice-mockup-root embed, #invoice-mockup-root img, #invoice-mockup-root object { max-width: 100%; }
    
    /* Layout Classes */
    #invoice-mockup-root .global_container_ {
      float: none;
      height: 100%; /* Fill the fixed root */
      margin: 0 auto;
      padding: 40px 36px 0; /* REDUCED TOP PADDING TO LIFT CONTENT */
      position: relative;
      width: 2552px;
      background: url(${imageBaseUrl}images/layer_4.png) no-repeat;
      page-break-inside: avoid; /* PREVENT BREAKS */
    }
    #invoice-mockup-root .header {
      left: 66px;
      margin: 0 auto;
      position: relative;
      width: 2330px;
    }
    #invoice-mockup-root .col-3 {
      float: left;
      margin: 15px 0 0;
      position: relative;
      width: 337px;
    }
    #invoice-mockup-root .wrapper-6 {
      height: 307px;
      position: relative;
      width: 337px;
    }
    #invoice-mockup-root .layer-239 { left: 50%; position: absolute; top: 201px; margin-left: -117.5px; }
    #invoice-mockup-root .layer-239-copy { left: 50%; position: absolute; top: 142px; margin-left: -168.5px; }
    #invoice-mockup-root .layer-239-copy-2 { left: 50%; position: absolute; top: 173px; margin-left: -141.5px; }
    #invoice-mockup-root .layer-242 { left: 50%; position: absolute; top: 0; margin-left: -136.5px; }
    
    #invoice-mockup-root .text {
      margin: 1px 119px 0 69px;
      font-size: 3.645833rem;
      line-height: 50px;
      text-align: center;
    }
    #invoice-mockup-root .col-8 {
      float: right;
      position: relative;
      width: 1981px;
    }
    #invoice-mockup-root .text-2 { display: block; margin: 0 0 0 4px; position: relative; }
    #invoice-mockup-root .text-3 {
      margin: 34px 0 0 5px;
      position: relative;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
    #invoice-mockup-root .text-4 {
      margin: -4px 0 0 7px;
      position: relative;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
    #invoice-mockup-root .row-2 { margin: 10px 0 0; position: relative; }
    #invoice-mockup-root .col-10 { float: left; position: relative; width: 1299px; }
    #invoice-mockup-root .text-5 {
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 2.604167rem;
    }
    #invoice-mockup-root .text-6 {
      margin: 2px 0 0 7px;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 2.604167rem;
      line-height: 50px;
    }
    #invoice-mockup-root .text-7 {
      margin: 9px 0 0 6px;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 2.604167rem;
    }
    #invoice-mockup-root .text-8 {
      float: right;
      margin: 163px -2px 0 0;
      width: 404px;
      color: #000000;
      font-weight: bold;
    }
    #invoice-mockup-root .wrapper {
      height: 1290px;
      left: 32.5px;
      margin: 39px auto 0;
      position: relative;
      width: 2415px;
    }
    
    #invoice-mockup-root .col-2 {
      left: 50%;
      min-height: 1284px;
      padding: 225px 67px 71px; /* padding-top 225px, padding-left 67px */
      position: absolute;
      top: 6px;
      width: 2404px;
      background: url(${imageBaseUrl}images/layer_6.jpg) no-repeat;
      margin-left: -1196.5px;
    }
    
    #invoice-mockup-root .text-9 {
      margin: 0 489px;
      color: #000000;
      font-weight: bold;
    }
    
    #invoice-mockup-root .text-10 {
      margin: 99px 0 0 455px; /* relative to text-9 */
      color: #000000;
      font-weight: bold;
      /* Ensure description line height aligns with grid if needed */
      line-height: 1.2;
      max-height: 350px; /* Constrain growth */
      overflow: hidden;  /* Hide overflow */
    }

    #invoice-mockup-root .text-10-extra {
      /* margins handled by container styles */
      color: #000000;
      font-weight: bold;
      /* Reset line-height to be tighter */
      line-height: 1.2; 
      font-size: 3.125rem;
    }
    
    /* Footer styling handled by inline absolute positioning to ensure stability */
    #invoice-mockup-root .text-11,
    #invoice-mockup-root .text-12,
    #invoice-mockup-root .text-13 {
        color: #000000;
        font-weight: bold;
    }
    
    #invoice-mockup-root .text-13 {
      font-size: 3.645833rem;
      font-style: italic;
    }

    #invoice-mockup-root .text-14 {
      /* positioned by container */
      color: #000000;
      font-weight: bold;
      text-align: right;
    }
    
    #invoice-mockup-root .text-15 {
      color: #000000;
      font-weight: bold;
      text-align: right;
    }
    #invoice-mockup-root .shape-8 {
      height: 5px;
      left: 50%;
      position: absolute;
      top: 79px;
      width: 1840px;
      background: #2168c2;
      margin-left: -673.5px;
    }
  `;

  return (
    <div style={{ padding: 20 }}>
      {/* Dynamic Style Injection */}
      <style>{styles}</style>
      
      <div id="invoice-mockup-root">
        <div className="global_container_">
          <header className="header group">
            <div className="col-3">
              <div className="wrapper-6">
                <img className="layer-239" src={`${imageBaseUrl}images/layer_239.png`} alt="" width="190" height="106" />
                <img className="layer-239-copy" src={`${imageBaseUrl}images/layer_239_copy.png`} alt="" width="194" height="102" />
                <img className="layer-239-copy-2" src={`${imageBaseUrl}images/layer_239_copy_2.png`} alt="" width="194" height="101" />
                <img className="layer-242" src={`${imageBaseUrl}images/layer_242.png`} alt="" width="305" height="213" />
              </div>
              <p className="text">Mizu<br />Firuta</p>
            </div>
            <div className="col-8">
              <img className="text-2" src={`${imageBaseUrl}images/cv_surya_mizu_firuta_indo.png`} alt="CV. SURYA MIZU FIRUTA INDOWATER" width="1583" height="88" title="CV. SURYA MIZU FIRUTA INDOWATER" />
              <p className="text-3">Spesialist : Solar Water Heater - Water Purifirer - Pompa Air</p>
              <p className="text-4">Pantek Sumur - Bleaching Pipe - Hot &amp; Cold Water Instalation</p>
              <div className="row-2 group">
                <div className="col-10">
                  <p className="text-5">JL Waru Raya Ujung No. 25 A, Kapuk - Jakarta Barat 11720</p>
                  <p className="text-6">
                    Telp : 021 - 54360371, 021 - 29430479, 081584719898, 085287479898<br />
                    082124111778&nbsp;&nbsp;&nbsp;&nbsp;Fax : 021 - 54360371 Website : www.mizufiruta.com
                  </p>
                  <p className="text-7">E-mail : go.mizuindowater@gmail.com, go.mizu9898@gmail.com</p>
                </div>
                <p className="text-8">{data.invoiceNo}</p>
              </div>
            </div>
          </header>
          <div className="wrapper">
            <div className="col-2">
              {/* Customer Name - Absolutely positioned at the top "Received From" line */}
              <p className="text-15" style={{ position: 'absolute', top: '10px', left: '522px', width: '1800px', textAlign: 'left', zIndex: 999 }}>{data.customerNameAddress}</p>

              <p className="text-9">{data.amountInWords}</p>
              
              <p className="text-10">{data.description}</p>

              {/* Optional Rows - Absolutely positioned to snap to grid lines */}
              {/* Description is within normal flow, but optional rows are fixed overlays */}
              {data.optRow1 && <p className="text-10-extra" style={{ position: 'absolute', top: '430px', left: '522px', whiteSpace: 'nowrap' }}>{data.optRow1}</p>}
              {data.optRow2 && <p className="text-10-extra" style={{ position: 'absolute', top: '500px', left: '522px', whiteSpace: 'nowrap' }}>{data.optRow2}</p>}
              {data.optRow3 && <p className="text-10-extra" style={{ position: 'absolute', top: '570px', left: '522px', whiteSpace: 'nowrap' }}>{data.optRow3}</p>}

              {/* Anchored Footer Sections - STRICTLY FIXED POSITIONS */}
              <p className="text-11" style={{ position: 'absolute', top: '645px', left: '522px', width: '2000px', whiteSpace: 'nowrap' }}>{data.footerNote}</p>
              
              {/* Payment Details with Overflow Control */}
              <div style={{ position: 'absolute', top: '715px', left: '635px', width: '2000px', maxHeight: '100px', overflow: 'hidden' }}>
                 <p className="text-12" style={{ margin: 0 }}>{data.paymentDetails}</p>
              </div>
              
              {/* Signature and Date Section - Absolutely Positioned */}
              <div style={{ position: 'absolute', top: '850px', right: '120px', textAlign: 'right', zIndex: 254 }}>
                 <p className="text-14">{data.locationDate}</p>
                 <img 
                    className="layer-292" 
                    src={`${imageBaseUrl}images/layer_292.png`} 
                    alt="" 
                    width="440" 
                    height="328" 
                    style={{ 
                      display: 'block', 
                      margin: '-5px 0 0', 
                      position: 'relative', 
                      zIndex: 23,
                      printColorAdjust: 'exact',
                      WebkitPrintColorAdjust: 'exact'
                    }} 
                 />
              </div>

               {/* Amount Numeric - Absolutely Positioned at bottom */}
               <p className="text-13" style={{ position: 'absolute', top: '1020px', left: '566px', width: '500px', margin: 0, whiteSpace: 'nowrap' }}>Rp. &nbsp;{data.amountNumeric}</p>
            </div>
            
            <div className="shape-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
