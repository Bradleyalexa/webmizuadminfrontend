import React from 'react';

// Define the interface for the dynamic data
export interface InvoiceData {
  invoiceNo: string;
  amountInWords: string;
  row1: string;
  row2?: string;
  row3?: string;
  row4?: string;
  row5?: string;
  row6?: string;
  row7?: string;
  amountNumeric: string;
  locationDate: string;
  customerNameAddress: string;
}

// Reusable Component
export function InvoiceTemplate({ data }: { data: InvoiceData }) {
  const imageBaseUrl = 'https://gdfhhfcdomtpkelvmhui.supabase.co/storage/v1/object/public/invoices-public/templateToclas/';

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&display=swap');

    /* Reset and Global Overrides for #invoice-mockup2-root */
    #invoice-mockup2-root * {
      box-sizing: border-box;
    }
    
    #invoice-mockup2-root p {
      margin: 0;
      padding: 0;
    }

    #invoice-mockup2-root {
      line-height: 1;
      color: #1131aa;
      background: white;
      font-size: 16px; 
      font-family: 'Times New Roman', Tinos, Times, Baskerville, Georgia, serif;
      font-size: 50px;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0;
      text-decoration: none;
      width: 2552px; 
      height: 3508px; /* A4 Portrait Height */
      overflow: hidden; /* STRICTLY PREVENT SPILLOVER */
      margin: 0 auto;
      position: relative;
      /* CENTERING LOGIC - True Center */
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    /* ... rest of styles ... */

    #invoice-mockup2-root .text-13 {
      font-size: 58.33px;
      font-style: italic;
      font-family: 'Times New Roman', Times, serif;
    }

    @media print {
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      #invoice-mockup2-root {
         page-break-inside: avoid;
         page-break-after: avoid;
         page-break-before: avoid;
         height: 100%; /* Reset for print if needed, or keep fixed? Usually better to fit page */
         display: block; /* Remove flex for print usually? or keep? */
      }
    }

    #invoice-mockup2-root a { color: inherit; text-decoration: none; }
    #invoice-mockup2-root ol, #invoice-mockup2-root ul { list-style: none; }
    #invoice-mockup2-root table { border-collapse: collapse; border-spacing: 0; }
    #invoice-mockup2-root h1, #invoice-mockup2-root h2, #invoice-mockup2-root h3, 
    #invoice-mockup2-root h4, #invoice-mockup2-root h5, #invoice-mockup2-root h6 { font-weight: bold; margin-top: 0; margin-bottom: 0; }
    
    #invoice-mockup2-root .group:before,
    #invoice-mockup2-root .group:after { content: " "; display: table; }
    #invoice-mockup2-root .group:after { clear: both; }
    #invoice-mockup2-root .group { zoom: 1; }
    
    #invoice-mockup2-root embed, #invoice-mockup2-root img, #invoice-mockup2-root object { max-width: 100%; }
    
    /* Layout Classes */
    #invoice-mockup2-root .global_container_ {
      float: none;
      height: 1760px; /* Fixed height for content to preserve layout */
      margin: 0 auto;
      padding: 40px 36px 0; /* REDUCED TOP PADDING TO LIFT CONTENT */
      position: relative;
      left: -50px;
      width: 2552px;
      padding-top: 40px; /* Standardize top padding for both preview and PDF */
      background: url(${imageBaseUrl}images/layer_4.png) no-repeat;
      page-break-inside: avoid; /* PREVENT BREAKS */
    }
    #invoice-mockup2-root .header {
      left: 66px;
      margin: 0 auto;
      position: relative;
      width: 2330px;
    }
    #invoice-mockup2-root .col-3 {
      float: left;
      margin: 15px 0 0;
      position: relative;
      width: 337px;
    }
    #invoice-mockup2-root .wrapper-6 {
      height: 307px;
      position: relative;
      width: 337px;
    }
    #invoice-mockup2-root .layer-239 { left: 50%; position: absolute; top: 201px; margin-left: -117.5px; }
    #invoice-mockup2-root .layer-239-copy { left: 50%; position: absolute; top: 142px; margin-left: -168.5px; }
    #invoice-mockup2-root .layer-239-copy-2 { left: 50%; position: absolute; top: 173px; margin-left: -141.5px; }
    #invoice-mockup2-root .layer-242 { left: 50%; position: absolute; top: 0; margin-left: -136.5px; }
    
    #invoice-mockup2-root .text {
      margin: 1px 119px 0 69px;
      font-size: 58.33px;
      line-height: 50px;
      text-align: center;
    }
    #invoice-mockup2-root .col-8 {
      float: right;
      position: relative;
      width: 1981px;
    }
    #invoice-mockup2-root .text-2 { display: block; margin: 0 0 0 4px; position: relative; }
    #invoice-mockup2-root .text-3 {
      margin: 34px 0 0 5px;
      position: relative;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
    #invoice-mockup2-root .text-4 {
      margin: -4px 0 0 7px;
      position: relative;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-weight: bold;
    }
    #invoice-mockup2-root .row-2 { margin: 10px 0 0; position: relative; }
    #invoice-mockup2-root .col-10 { float: left; position: relative; width: 1299px; }
    #invoice-mockup2-root .text-5 {
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 41.67px;
    }
    #invoice-mockup2-root .text-6 {
      margin: 2px 0 0 7px;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 41.67px;
      line-height: 50px;
    }
    #invoice-mockup2-root .text-7 {
      margin: 0px 0 0 0px;
      font-family: 'Segoe UI', Frutiger, 'Frutiger Linotype', 'Dejavu Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 41.67px;
    }
    #invoice-mockup2-root .text-8 {
      float: right;
      margin: 163px -2px 0 0;
      width: 404px;
      color: #000000;
      font-weight: bold;
    }
    #invoice-mockup2-root .wrapper {
      height: 1290px;
      left: 32.5px;
      margin: 39px auto 0;
      position: relative;
      width: 2415px;
    }
    
    #invoice-mockup2-root .col-2 {
      left: 50%;
      min-height: 1284px;
      padding: 225px 67px 71px; /* padding-top 225px, padding-left 67px */
      position: absolute;
      top: 6px;
      width: 2404px;
      background: url(${imageBaseUrl}images/layer_6.jpg) no-repeat;
      margin-left: -1196.5px;
    }
    
    #invoice-mockup2-root .text-9 {
      margin: 0 489px;
      color: #000000;
      font-weight: bold;
    }
    
    #invoice-mockup2-root .text-10 {
      margin: 99px 0 0 455px; /* relative to text-9 */
      color: #000000;
      font-weight: bold;
      /* Ensure description line height aligns with grid if needed */
      line-height: 1.2;
      max-height: 350px; /* Constrain growth */
      overflow: hidden;  /* Hide overflow */
    }

    #invoice-mockup2-root .text-10-extra {
      /* margins handled by container styles */
      color: #000000;
      font-weight: bold;
      /* Reset line-height to be tighter */
      line-height: 1.2; 
      font-size: 50px;
    }
    
    /* Footer styling handled by inline absolute positioning to ensure stability */
    #invoice-mockup2-root .text-11,
    #invoice-mockup2-root .text-12,
    #invoice-mockup2-root .text-13 {
        color: #000000;
        font-weight: bold;
    }
    
    #invoice-mockup2-root .text-13 {
      font-size: 58.33px;
      font-style: italic;
      font-family: 'Times New Roman', Tinos, Times, serif;
    }

    #invoice-mockup2-root .text-14 {
      /* positioned by container */
      color: #000000;
      font-weight: bold;
      text-align: right;
    }
    
    #invoice-mockup2-root .text-15 {
      color: #000000;
      font-weight: bold;
      text-align: right;
    }
    #invoice-mockup2-root .shape-8 {
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
    <>
      {/* Dynamic Style Injection */}
      <style>{styles}</style>
      
      <div id="invoice-mockup2-root">
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
              {/* Customer Name - Adjusted Top */}
              <p className="text-15" style={{ position: 'absolute', top: '10px', left: '522px', width: '1800px', textAlign: 'left', zIndex: 999 }}>{data.customerNameAddress}</p>

              <p className="text-9">{data.amountInWords}</p>
              
              <p className="text-10">{data.row1}</p>

              {/* Optional Rows - Absolutely positioned to snap to grid lines */}
              {/* Description is within normal flow, but optional rows are fixed overlays */}
              {data.row2 && <p className="text-10-extra" style={{ position: 'absolute', top: '435px', left: '522px', whiteSpace: 'nowrap' }}>{data.row2}</p>}
              {data.row3 && <p className="text-10-extra" style={{ position: 'absolute', top: '500px', left: '525px', whiteSpace: 'nowrap' }}>{data.row3}</p>}
              {data.row4 && <p className="text-10-extra" style={{ position: 'absolute', top: '570px', left: '645px', whiteSpace: 'nowrap' }}>{data.row4}</p>}

              {/* Anchored Footer Sections - STRICTLY FIXED POSITIONS */}
              <p className="text-11" style={{ position: 'absolute', top: '645px', left: '645px', width: '2000px', whiteSpace: 'nowrap' }}>{data.row5}</p>
              
              {/* Payment Details with Overflow Control */}
              <div style={{ position: 'absolute', top: '715px', left: '645px', width: '2000px', maxHeight: '100px', overflow: 'hidden' }}>
                 <p className="text-12" style={{ margin: 0 }}>{data.row6}</p>
              </div>
              
              {/* Extra Note Below Payment Details */}
              {data.row7 && (
                 <p className="text-12" style={{ position: 'absolute', top: '785px', left: '645px', width: '2000px', margin: 0, whiteSpace: 'nowrap' }}>
                   {data.row7}
                 </p>
              )}
              
              {/* Signature and Date Section - Absolutely Positioned */}
              <div style={{ position: 'absolute', top: '850px', right: '80px', textAlign: 'right', zIndex: 254 }}>
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
    </>
  );
}
