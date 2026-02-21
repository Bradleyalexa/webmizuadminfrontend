'use client';

import React from 'react';
import { InvoiceTemplate, InvoiceData } from './InvoiceTemplate';

// Page Component
export default function Mockup4InvoicePage() {
  const [isFormOpen, setIsFormOpen] = React.useState(true);
  const [data, setData] = React.useState<InvoiceData>({
    invoiceNo: '0852/SMFI/II/26',
    amountInWords: 'Tujuh Belas Juta Rupiah',
    row1: 'Pelunasan Pasang 1 (satu) Unit Filter air Mizu Firuta Type MFS 1T Tabung Full',
    row2: 'Stainless Steel + 1 (satu) Bh Spare part WRV + Instalasi Pipa Induk Apartemen',
    row3: 'Ket: 3 (Tiga) Tahun Garansi Tabung Filter air Mizu Firuta MFS 1T',
    row4: '1 (Satu) Tahun Garansi Spare Part Filter air Mizu Firuta MFS 1T',
    row5: '2 (Dua) kali Free Maintenance untuk Tahun Pertama Periode 6 Bulan Sekali',
    row6: 'Kunjungan Service, Ganti Media Multi Catridge',
    row7: 'Transfer Rekening BCA : 6275256998 - CV Surya Mizu Firuta Indowater',
    amountNumeric: '17.000.000,-',
    locationDate: 'Jakarta, 13 Desember 2025',
    customerNameAddress: 'Mr Jiye Lim / Amala 2508 Apartemen Pondok Indah Residence - Jakarta Selatan'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Export Dialog State
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  const [exportFilename, setExportFilename] = React.useState('');
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportClick = () => {
    setExportFilename(data.invoiceNo);
    setIsExportDialogOpen(true);
  };

  const confirmExport = async () => {
    if (!exportFilename) return;
    
    // Use the entered filename/title for the PDF file only, do not change the invoice content
    setIsExportDialogOpen(false);
    
    await processExport(data, exportFilename);
  };

  const processExport = async (dataToExport: InvoiceData, filename: string) => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/invoice-pdf4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToExport),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('PDF Export Server Error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Use the custom filename provided by the user
      a.download = `${filename.replace(/[^a-zA-Z0-9\s-_]/g, '')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // Clean up
      document.body.removeChild(a);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Failed to export PDF. Check console.');
    } finally {
      setIsExporting(false);
    }
  };

  const dummyHandleExport = () => {}; // Placeholder to avoid lint if needed, but we replace usage.

  // Scale calculation for "Fit to Screen"
  const previewContainerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0.5);

  React.useLayoutEffect(() => {
    if (!previewContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use contentRect for precise content box measurement
        const containerWidth = entry.contentRect.width;
        // Invoice width is 2552px. Add some padding (e.g. 20px)
        const calculatedScale = Math.min((containerWidth - 20) / 2552, 1);
        setScale(calculatedScale);
      }
    });
    //t

    observer.observe(previewContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array as observer handles changes

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', width: '100vw', overflow: 'hidden', background: '#f0f0f0', position: 'relative' }}>
      {/* Toggle Button - Show only when closed */}
      {!isFormOpen && (
        <button 
          onClick={() => setIsFormOpen(true)}
          style={{
            position: 'fixed', // Use fixed to float above everything including scroll
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
            background: '#1131aa',
            color: 'white',
            border: 'none',
            borderRadius: '50px', // Pill shape or circle
            padding: '12px 24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontWeight: 'bold',
            fontSize: '1rem',
            opacity: 0.9
          }}
        >
          ✎ Edit Invoice
        </button>
      )}

      {/* Editor Panel */}
      <div style={{ 
        width: isFormOpen ? '400px' : '0px', 
        padding: isFormOpen ? '20px' : '0px', 
        background: 'white', 
        borderRight: '1px solid #ddd', 
        overflowY: 'auto',
        transition: 'width 0.3s ease, padding 0.3s ease',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        flexShrink: 0 // Prevent shrinking
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <button 
                 onClick={() => setIsFormOpen(false)}
                 style={{
                   background: 'none',
                   border: 'none',
                   cursor: 'pointer',
                   fontSize: '1.2rem',
                   marginRight: '10px',
                   padding: '5px'
                 }}
               >
                 ◄
               </button>
               <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Invoice Editor</h2>
             </div>
             <button
               onClick={handleExportClick}
               disabled={isExporting}
               style={{
                 padding: '8px 16px',
                 backgroundColor: isExporting ? '#ccc' : '#28a745',
                 color: 'white',
                 border: 'none',
                 borderRadius: '4px',
                 cursor: isExporting ? 'not-allowed' : 'pointer',
                 fontWeight: 'bold',
                 fontSize: '0.875rem'
               }}
             >
               {isExporting ? 'Exporting...' : 'Export'}
             </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Invoice Number</label>
            <input 
              type="text" 
              name="invoiceNo"
              value={data.invoiceNo}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Customer Name & Address</label>
            <textarea 
              name="customerNameAddress"
              value={data.customerNameAddress}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Amount (Words)</label>
            <input 
              type="text" 
              name="amountInWords"
              value={data.amountInWords}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 1</label>
            <textarea 
              name="row1"
              value={data.row1}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 2</label>
            <input 
              type="text" 
              name="row2"
              value={data.row2 || ''}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 3</label>
            <input 
              type="text" 
              name="row3"
              value={data.row3 || ''}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 4</label>
            <input 
              type="text" 
              name="row4"
              value={data.row4 || ''}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 5</label>
            <textarea 
              name="row5"
              value={data.row5 || ''}
              onChange={handleChange}
              rows={2}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 6</label>
            <textarea 
              name="row6"
              value={data.row6 || ''}
              onChange={handleChange}
              rows={2}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Row 7</label>
            <input 
              type="text" 
              name="row7"
              value={data.row7 || ''}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Amount (Numeric)</label>
            <input 
              type="text" 
              name="amountNumeric"
              value={data.amountNumeric}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.875rem', fontWeight: 500 }}>Location & Date</label>
            <input 
              type="text" 
              name="locationDate"
              value={data.locationDate}
              onChange={handleChange}
              style={{ width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '2px' }}
            />
          </div>

        </div>
      </div>

      {/* Preview Panel */}
      <div 
        ref={previewContainerRef}
        style={{ flex: 1, minWidth: 0, overflow: 'auto', background: '#e5e5e5', position: 'relative' }}
      >
        <div style={{
          position: 'relative',
          width: `${2552 * scale}px`,
          height: `${3610 * scale}px`,
          margin: '20px auto', // Center if smaller, scroll if larger
          overflow: 'hidden'
        }}>
          <div 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'top left',
              height: '3610px', 
              width: '2552px',
              boxShadow: '0 0 20px rgba(0,0,0,0.1)',
              background: 'white'
            }}
          >
            <InvoiceTemplate data={data} />
          </div>
        </div>
      </div>
      {/* Export Dialog Modal */}
      {isExportDialogOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            width: '400px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.25rem', fontWeight: 'bold' }}>Export PDF</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Invoice Name / Title</label>
              <input 
                type="text" 
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                autoFocus
              />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                This will be the title of the PDF file.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsExportDialogOpen(false)}
                style={{
                  padding: '10px 20px',
                  background: 'none',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmExport}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
