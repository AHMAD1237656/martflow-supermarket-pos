import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { 
  ScanBarcode, 
  Printer, 
  RefreshCw, 
  Search, 
  Layers, 
  Check, 
  Download 
} from 'lucide-react';

export default function BarcodeGenerator() {
  const [products] = useState([
    { id: 1, name: 'Nestle Pure Life 500ml', sku: '896400112233', price: 60, category: 'Beverages' },
    { id: 2, name: "Olper's Full Cream Milk 1L", sku: '896400223344', price: 280, category: 'Dairy' },
    { id: 3, name: 'Dawn Plain Bread (Large)', sku: '896400334455', price: 120, category: 'Bakery' },
    { id: 4, name: 'Lays Masala 65g', sku: '896400445566', price: 100, category: 'Snacks' },
    { id: 5, name: 'Knorr Chattpatta Noodles', sku: '896400556677', price: 55, category: 'Grocery' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [customSku, setCustomSku] = useState(products[0].sku);
  const [stickerCopies, setStickerCopies] = useState(12);
  const [stickerFormat, setStickerFormat] = useState('sheet'); // 'sheet' or 'thermal'
  const barcodeCanvasRef = useRef(null);

  // Draw preview barcode whenever selected product or SKU changes
  useEffect(() => {
    if (barcodeCanvasRef.current && customSku) {
      try {
        JsBarcode(barcodeCanvasRef.current, customSku, {
          format: 'CODE128',
          lineColor: '#0f172a',
          width: 2,
          height: 50,
          displayValue: true,
          font: 'Plus Jakarta Sans',
          fontSize: 14,
          textMargin: 4
        });
      } catch (err) {
        console.error('Barcode generation error:', err);
      }
    }
  }, [customSku]);

  const handleSelectProduct = (p) => {
    setSelectedProduct(p);
    setCustomSku(p.sku);
  };

  const generateRandomSku = () => {
    // Generate 12-digit supermarket EAN/Code128 format
    const randomCode = '896' + Math.floor(100000000 + Math.random() * 900000000);
    setCustomSku(randomCode);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ScanBarcode className="text-emerald-600" size={28} /> Barcode Sticker & Label Center
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Generate Code128 / EAN barcodes, customize label formats, and print thermal adhesive rolls.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition"
        >
          <Printer size={16} /> Print Barcode Stickers
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Product Selector & SKU Generator */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <h3 className="font-black text-base text-slate-900 border-b border-slate-100 pb-3">
            Select Product & Configure SKU
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Choose Product</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {products.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs transition flex justify-between items-center ${
                    selectedProduct?.id === p.id 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Current: {p.sku}</div>
                  </div>
                  <span className="font-bold">Rs. {p.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">Barcode Value (SKU / EAN)</label>
              <button
                type="button"
                onClick={generateRandomSku}
                className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw size={12} /> Auto Generate
              </button>
            </div>
            <input
              type="text"
              value={customSku}
              onChange={e => setCustomSku(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Label Copies</label>
              <input
                type="number"
                min="1"
                max="100"
                value={stickerCopies}
                onChange={e => setStickerCopies(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Print Medium</label>
              <select
                value={stickerFormat}
                onChange={e => setStickerFormat(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="sheet">A4 Multi-Sticker Sheet</option>
                <option value="thermal">Direct Thermal (40x25mm)</option>
              </select>
            </div>
          </div>

          {/* Single Sticker Master Preview */}
          <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Master Single Label</span>
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col items-center shadow-2xs">
              <span className="text-xs font-black text-slate-900 tracking-tight">{selectedProduct?.name}</span>
              <span className="text-[11px] font-bold text-emerald-700 font-mono">Retail: Rs. {selectedProduct?.price}.00</span>
              <canvas ref={barcodeCanvasRef} className="my-1 max-w-full"></canvas>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">MartFlow Supermarket</span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Live Print Sheet Preview (Printable View) */}
        <div className="lg:col-span-7 bg-slate-100 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Print Grid Preview ({stickerCopies} Stickers)
              </span>
              <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-lg border border-slate-200 text-slate-700">
                Format: {stickerFormat === 'sheet' ? '3x Columns Grid' : 'Continuous Thermal Roll'}
              </span>
            </div>

            {/* Printable Stickers Container */}
            <div className={`p-4 bg-white rounded-2xl border border-slate-200 max-h-[520px] overflow-y-auto ${
              stickerFormat === 'sheet' 
                ? 'grid grid-cols-2 sm:grid-cols-3 gap-3' 
                : 'flex flex-col items-center gap-3'
            }`}>
              {Array.from({ length: stickerCopies }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 border border-dashed border-slate-300 rounded-xl bg-white flex flex-col items-center text-center shadow-2xs"
                  style={{ width: stickerFormat === 'thermal' ? '180px' : 'auto' }}
                >
                  <p className="text-[11px] font-black text-slate-900 truncate w-full">{selectedProduct?.name}</p>
                  <p className="text-[11px] font-bold text-emerald-600 font-mono">Rs. {selectedProduct?.price}</p>
                  
                  {/* Visual Barcode SVG Simulation for Grid */}
                  <div className="my-1.5 flex flex-col items-center">
                    <div className="h-8 flex items-end gap-[1.5px] px-1">
                      {customSku.split('').map((char, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-slate-900 rounded-xs"
                          style={{
                            width: (cIdx % 2 === 0 ? '2px' : '1.5px'),
                            height: (parseInt(char, 10) % 2 === 0 ? '28px' : '20px')
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 font-bold tracking-wider mt-0.5">
                      {customSku}
                    </span>
                  </div>

                  <span className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold">MartFlow POS</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-4">
            Supports standard TSC, Xprinter, Zebra, and standard A4 laser sticker sheets.
          </p>
        </div>
      </div>
    </div>
  );
}