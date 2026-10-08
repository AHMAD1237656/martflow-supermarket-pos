import React, { useState } from 'react';
import { 
  FileSliders, 
  Upload, 
  Printer, 
  Check, 
  Store, 
  Save, 
  RotateCcw,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

export default function InvoiceBuilder() {
  const defaultSettings = {
    businessName: 'MartFlow Supermarket',
    branchTitle: 'Branch #01 - Commercial Boulevard',
    phone: '+92 300 1234567',
    taxNumber: 'NTN: 8492019-3',
    address: 'Plot 42, Main Commercial Market, Faisalabad',
    footerMessage: 'Thank you for your business! Exchange valid within 7 days.',
    paperFormat: '80mm', // '80mm' (Thermal) or 'A4' (Full Page)
    headerAlignment: 'center', // 'left', 'center', 'right'
    showLogo: true,
    logoUrl: null
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('mf_invoice_template');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [savedAlert, setSavedAlert] = useState(false);

  // Logo file upload handler
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('mf_invoice_template', JSON.stringify(settings));
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('mf_invoice_template');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSliders className="text-emerald-600" size={26} /> Invoice & Receipt Format Builder
          </h2>
          <p className="text-xs text-slate-500 font-medium">Customize bill headers, upload company logo, choose alignment, and select thermal or standard A4 output.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          >
            <RotateCcw size={14} /> Reset Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition"
          >
            <Save size={14} /> Save Template
          </button>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
          <Check size={16} /> Invoice template configuration saved successfully.
        </div>
      )}

      {/* Main Grid: Controls (Left) + Real-time Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Columns: Customization Controls */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders size={18} className="text-emerald-600" />
            <h3 className="font-black text-base text-slate-900">Template Configurations</h3>
          </div>

          {/* Logo Upload Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Company Brand Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Store size={24} className="text-slate-400" />
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                  <Upload size={14} /> Upload New Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
                {settings.logoUrl && (
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, logoUrl: null }))}
                    className="block text-[11px] font-bold text-rose-500 hover:underline mt-1"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Paper Format Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Paper Format / Dimensions</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSettings(prev => ({ ...prev, paperFormat: '80mm' }))}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  settings.paperFormat === '80mm'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Thermal Roll (80mm)
              </button>
              <button
                type="button"
                onClick={() => setSettings(prev => ({ ...prev, paperFormat: 'A4' }))}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  settings.paperFormat === 'A4'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Standard Sheet (A4)
              </button>
            </div>
          </div>

          {/* Header Alignment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Header & Brand Alignment[cite: 4]</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { align: 'left', icon: AlignLeft, label: 'Left' },
                { align: 'center', icon: AlignCenter, label: 'Center' },
                { align: 'right', icon: AlignRight, label: 'Right' }
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.align}
                    type="button"
                    onClick={() => setSettings(prev => ({ ...prev, headerAlignment: opt.align }))}
                    className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      settings.headerAlignment === opt.align
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={14} /> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Information Fields */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Store / Business Name *</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={e => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Branch / Subtitle</label>
              <input
                type="text"
                value={settings.branchTitle}
                onChange={e => setSettings(prev => ({ ...prev, branchTitle: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={e => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tax / NTN / STRN</label>
                <input
                  type="text"
                  value={settings.taxNumber}
                  onChange={e => setSettings(prev => ({ ...prev, taxNumber: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Physical Address[cite: 4]</label>
              <input
                type="text"
                value={settings.address}
                onChange={e => setSettings(prev => ({ ...prev, address: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Footer Terms & Policy</label>
              <textarea
                rows="2"
                value={settings.footerMessage}
                onChange={e => setSettings(prev => ({ ...prev, footerMessage: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Real-Time Dynamic Sheet Preview */}
        <div className="lg:col-span-6 bg-slate-100 border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Format Preview[cite: 4]</span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
              {settings.paperFormat === '80mm' ? '80mm Thermal Slip' : 'A4 Invoice Page'}
            </span>
          </div>

          {/* The Actual Invoice Sheet Container */}
          <div className={`bg-white shadow-xl rounded-xl p-6 font-mono text-slate-900 border border-slate-200 w-full transition-all ${
            settings.paperFormat === '80mm' ? 'max-w-sm text-xs' : 'max-w-md text-xs'
          }`}>
            {/* Header Content with Dynamic Alignment */}
            <div className={`space-y-1 mb-4 ${
              settings.headerAlignment === 'center' ? 'text-center' :
              settings.headerAlignment === 'right' ? 'text-right' : 'text-left'
            }`}>
              {settings.logoUrl && (
                <div className={`mb-2 flex ${
                  settings.headerAlignment === 'center' ? 'justify-center' :
                  settings.headerAlignment === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  <img src={settings.logoUrl} alt="Logo" className="h-10 object-contain" />
                </div>
              )}
              <h4 className="font-black text-sm tracking-wide">{settings.businessName || 'Business Name'}</h4>
              <p className="text-[11px] text-slate-500">{settings.branchTitle}</p>
              <p className="text-[11px] text-slate-500">{settings.address}</p>
              <p className="text-[11px] text-slate-500">{settings.phone} • {settings.taxNumber}</p>
              <div className="border-b border-dashed border-slate-300 pt-2"></div>
            </div>

            {/* Bill Details */}
            <div className="flex justify-between text-[11px] text-slate-500 mb-2">
              <span>Invoice: #INV-2026-9041</span>
              <span>02-Oct-2026</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-3">
              Cashier: Admin (Terminal 01)
            </div>

            <div className="border-b border-dashed border-slate-300 mb-2"></div>

            {/* Sample Table */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between font-bold text-[11px] text-slate-600 uppercase">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <div>Cooking Oil 1L</div>
                  <div className="text-[10px] text-slate-400">2 x Rs. 480.00</div>
                </div>
                <span className="font-bold">Rs. 960.00</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <div>Basmati Rice 5kg</div>
                  <div className="text-[10px] text-slate-400">1 x Rs. 1,450.00</div>
                </div>
                <span className="font-bold">Rs. 1,450.00</span>
              </div>
            </div>

            <div className="border-b border-dashed border-slate-300 pt-1 mb-2"></div>

            {/* Summary */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>Rs. 2,410.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Sales Tax (0%):</span>
                <span>Rs. 0.00</span>
              </div>
              <div className="flex justify-between font-black text-sm pt-1 border-t border-dashed border-slate-300">
                <span>TOTAL DUE:</span>
                <span>Rs. 2,410.00</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Mode:</span>
                <span className="font-bold">CASH</span>
              </div>
            </div>

            <div className="border-b border-dashed border-slate-300 pt-2 mb-3"></div>

            {/* Dynamic Footer */}
            <div className="text-center text-[10px] text-slate-500 space-y-1">
              <p>{settings.footerMessage}</p>
              <p className="text-[9px] text-slate-400">Powered by MartFlow Terminal Engine</p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="mt-5 w-full max-w-sm bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-xs"
          >
            <Printer size={16} /> Test Print Layout[cite: 4]
          </button>
        </div>
      </div>
    </div>
  );
}