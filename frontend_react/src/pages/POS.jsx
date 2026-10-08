// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   ShoppingCart, 
//   Search, 
//   Plus, 
//   Minus, 
//   Trash2, 
//   CreditCard, 
//   Banknote, 
//   Printer, 
//   ScanBarcode, 
//   Volume2, 
//   X, 
//   CheckCircle2, 
//   AlertCircle 
// } from 'lucide-react';

// export default function Pos() {
//   const [search, setSearch] = useState('');
//   const [selectedCat, setSelectedCat] = useState('All');
//   const [cart, setCart] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState('Cash');
//   const [receiptModal, setReceiptModal] = useState(false);
//   const [lastOrder, setLastOrder] = useState(null);
//   const [scannerNotification, setScannerNotification] = useState(null);

//   const barcodeInputRef = useRef(null);

//   // Pakistan Supermarket Catalog with Real Barcode SKUs
//   const [products] = useState([
//     { id: 1, name: 'Nestle Pure Life 500ml', sku: '896400112233', price: 60, category: 'Beverages', stock: 97 },
//     { id: 2, name: "Olper's Full Cream Milk 1L", sku: '896400223344', price: 280, category: 'Dairy', stock: 45 },
//     { id: 3, name: 'Dawn Plain Bread (Large)', sku: '896400334455', price: 120, category: 'Bakery', stock: 18 },
//     { id: 4, name: 'Lays Masala 65g', sku: '896400445566', price: 100, category: 'Snacks', stock: 50 },
//     { id: 5, name: 'Knorr Chattpatta Noodles', sku: '896400556677', price: 55, category: 'Grocery', stock: 32 },
//     { id: 6, name: 'National Chilli Garlic Sauce 500g', sku: '896400667788', price: 360, category: 'Grocery', stock: 12 },
//     { id: 7, name: 'Tapal Danedar Tea 430g', sku: '896400778899', price: 650, category: 'Grocery', stock: 24 },
//   ]);

//   const categories = ['All', 'Beverages', 'Dairy', 'Bakery', 'Snacks', 'Grocery'];

//   // Terminal Beep Sound using Web Audio API (Zero External MP3 Dependency)
//   const playScannerBeep = () => {
//     try {
//       const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//       const osc = audioCtx.createOscillator();
//       const gain = audioCtx.createGain();
//       osc.type = 'sine';
//       osc.frequency.setValueAtTime(1800, audioCtx.currentTime); // Standard 1.8kHz POS scanner tone
//       gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
//       gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
//       osc.connect(gain);
//       gain.connect(audioCtx.destination);
//       osc.start();
//       osc.stop(audioCtx.currentTime + 0.08);
//     } catch (e) {
//       console.warn('Audio feedback blocked or not supported');
//     }
//   };

//   // Add Item to Cart
//   const addItemToCart = (product) => {
//     playScannerBeep();
//     setScannerNotification(`Scanned: ${product.name}`);
//     setTimeout(() => setScannerNotification(null), 2000);

//     setCart(prevCart => {
//       const existing = prevCart.find(item => item.id === product.id);
//       if (existing) {
//         return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
//       }
//       return [...prevCart, { ...product, qty: 1 }];
//     });
//   };

//   // Global Hardware Barcode Wedge Listener (Intercepts USB / Wireless Scanners)
//   useEffect(() => {
//     let barcodeBuffer = '';
//     let lastKeyTime = Date.now();

//     const handleHardwareScanner = (e) => {
//       // Don't intercept if user is actively typing in modal or general form
//       if (receiptModal) return;

//       const currentTime = Date.now();
//       const timeDiff = currentTime - lastKeyTime;
//       lastKeyTime = currentTime;

//       // Scanners type keystrokes extremely rapidly (< 40ms)
//       if (e.key === 'Enter') {
//         if (barcodeBuffer.length >= 3) {
//           const matched = products.find(p => p.sku === barcodeBuffer.trim());
//           if (matched) {
//             addItemToCart(matched);
//           } else {
//             setScannerNotification(`Unrecognized Barcode: ${barcodeBuffer}`);
//             setTimeout(() => setScannerNotification(null), 2500);
//           }
//           barcodeBuffer = '';
//           e.preventDefault();
//         }
//       } else if (e.key.length === 1) {
//         // Collect characters
//         if (timeDiff > 100) {
//           barcodeBuffer = ''; // Reset buffer if typed slowly by human
//         }
//         barcodeBuffer += e.key;
//       }
//     };

//     window.addEventListener('keydown', handleHardwareScanner);
//     return () => window.removeEventListener('keydown', handleHardwareScanner);
//   }, [products, receiptModal]);

//   // Keyboard Shortcuts: F2 Focus Barcode, F8 Checkout
//   useEffect(() => {
//     const handleShortcuts = (e) => {
//       if (e.key === 'F2') {
//         e.preventDefault();
//         barcodeInputRef.current?.focus();
//       } else if (e.key === 'F8') {
//         e.preventDefault();
//         if (cart.length > 0) handleCheckout();
//       } else if (e.key === 'Escape') {
//         setReceiptModal(false);
//       }
//     };
//     window.addEventListener('keydown', handleShortcuts);
//     return () => window.removeEventListener('keydown', handleShortcuts);
//   }, [cart]);

//   // Handle Manual Barcode Input Search & Press Enter
//   const handleBarcodeManualSubmit = (e) => {
//     if (e.key === 'Enter' && search.trim()) {
//       e.preventDefault();
//       const query = search.trim().toLowerCase();
//       const matched = products.find(p => p.sku.toLowerCase() === query || p.name.toLowerCase().includes(query));
//       if (matched) {
//         addItemToCart(matched);
//         setSearch('');
//       } else {
//         setScannerNotification(`No item matched for: ${search}`);
//         setTimeout(() => setScannerNotification(null), 2500);
//       }
//     }
//   };

//   const updateQty = (id, delta) => {
//     setCart(cart.map(item => {
//       if (item.id === id) {
//         const newQty = item.qty + delta;
//         return newQty > 0 ? { ...item, qty: newQty } : null;
//       }
//       return item;
//     }).filter(Boolean));
//   };

//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   const handleCheckout = () => {
//     if (cart.length === 0) return;
//     const order = {
//       orderId: 'INV-' + Math.floor(100000 + Math.random() * 900000),
//       items: [...cart],
//       total,
//       paymentMethod,
//       date: new Date().toLocaleString()
//     };
//     setLastOrder(order);
//     setReceiptModal(true);
//     setCart([]);
//   };

//   const filteredProducts = products.filter(p => {
//     const matchCat = selectedCat === 'All' || p.category === selectedCat;
//     const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search);
//     return matchCat && matchSearch;
//   });

//   return (
//     <div className="p-4 lg:p-6 h-[calc(100vh-4rem)] flex flex-col font-sans">
      
//       {/* Scanner Status Pop-up Notification */}
//       {scannerNotification && (
//         <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-slate-700">
//           <ScanBarcode size={16} className="text-emerald-400 animate-pulse" />
//           <span>{scannerNotification}</span>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 overflow-hidden">
//         {/* Left 8 Cols: Barcode Input + Products Catalog */}
//         <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          
//           {/* Top Barcode Reader Bar */}
//           <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
//             <div className="relative flex-1">
//               <ScanBarcode className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
//               <input
//                 ref={barcodeInputRef}
//                 type="text"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 onKeyDown={handleBarcodeManualSubmit}
//                 placeholder="Scan barcode or type name and press [Enter]..."
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
//               />
//             </div>
//             <div className="hidden sm:flex items-center gap-2">
//               <span className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold font-mono">
//                 Scanner Online
//               </span>
//               <span className="px-2.5 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 font-mono">
//                 [F2] Search
//               </span>
//             </div>
//           </div>

//           {/* Category Tabs */}
//           <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCat(cat)}
//                 className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
//                   selectedCat === cat
//                     ? 'bg-emerald-600 text-white shadow-xs'
//                     : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Product Items Grid */}
//           <div className="flex-1 overflow-y-auto pr-1">
//             <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
//               {filteredProducts.map(p => (
//                 <div
//                   key={p.id}
//                   onClick={() => addItemToCart(p)}
//                   className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
//                 >
//                   <div>
//                     <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
//                       {p.category}
//                     </span>
//                     <h4 className="font-bold text-xs text-slate-900 mt-2 line-clamp-2">{p.name}</h4>
//                     <p className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
//                       <ScanBarcode size={12} /> {p.sku}
//                     </p>
//                   </div>
//                   <div className="mt-3 flex justify-between items-center pt-2 border-t border-slate-100">
//                     <span className="text-xs font-black text-emerald-600">Rs. {p.price}</span>
//                     <span className="text-[10px] text-slate-500 font-semibold">{p.stock} units</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right 4 Cols: Active Cashier Order Cart */}
//         <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between overflow-hidden">
//           <div>
//             <div className="flex justify-between items-center pb-4 border-b border-slate-100">
//               <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
//                 <ShoppingCart className="text-emerald-600" size={18} /> Active Cart
//               </h3>
//               <button 
//                 onClick={() => setCart([])}
//                 className="text-[11px] font-bold text-rose-500 hover:underline"
//               >
//                 Clear All
//               </button>
//             </div>

//             {/* Cart Items List */}
//             <div className="overflow-y-auto max-h-[calc(100vh-25rem)] space-y-2 mt-3 pr-1">
//               {cart.length === 0 ? (
//                 <div className="text-center py-14 text-slate-400 text-xs">
//                   <ScanBarcode size={32} className="mx-auto text-slate-300 mb-2" />
//                   Cart is empty. Scan product barcode to bill items.
//                 </div>
//               ) : (
//                 cart.map(item => (
//                   <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
//                     <div className="flex-1 min-w-0 pr-2">
//                       <h5 className="font-bold text-xs text-slate-900 truncate">{item.name}</h5>
//                       <span className="text-[11px] font-bold text-emerald-600">
//                         Rs. {(item.price * item.qty).toLocaleString()}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-1.5 shrink-0">
//                       <button
//                         onClick={() => updateQty(item.id, -1)}
//                         className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
//                       >
//                         <Minus size={12} />
//                       </button>
//                       <span className="w-6 text-center font-black text-xs text-slate-800">{item.qty}</span>
//                       <button
//                         onClick={() => updateQty(item.id, 1)}
//                         className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100"
//                       >
//                         <Plus size={12} />
//                       </button>
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="ml-1 p-1 text-slate-400 hover:text-rose-600"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Bottom Billing Details */}
//           <div className="pt-4 border-t border-slate-100 space-y-3">
//             <div className="grid grid-cols-2 gap-2">
//               <button
//                 type="button"
//                 onClick={() => setPaymentMethod('Cash')}
//                 className={`py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
//                   paymentMethod === 'Cash'
//                     ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
//                     : 'border-slate-200 text-slate-600'
//                 }`}
//               >
//                 <Banknote size={14} /> Cash Settlement
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setPaymentMethod('Digital')}
//                 className={`py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
//                   paymentMethod === 'Digital'
//                     ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
//                     : 'border-slate-200 text-slate-600'
//                 }`}
//               >
//                 <CreditCard size={14} /> Raast / Digital
//               </button>
//             </div>

//             <div className="flex justify-between items-center pt-2">
//               <span className="text-xs font-bold text-slate-500 uppercase">Total Payable:</span>
//               <span className="text-2xl font-black text-emerald-600">
//                 Rs. {total.toLocaleString()}
//               </span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               disabled={cart.length === 0}
//               className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black py-3 rounded-2xl transition shadow-xs flex items-center justify-center gap-2 text-xs"
//             >
//               Complete Sale & Print Receipt [F8]
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Printable Receipt Modal */}
//       {receiptModal && lastOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 font-sans text-xs">
//             <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3">
//               <span className="font-bold text-emerald-600 flex items-center gap-1.5">
//                 <CheckCircle2 size={16} /> Bill Generated
//               </span>
//               <button onClick={() => setReceiptModal(false)}><X size={16} /></button>
//             </div>

//             <div className="text-center space-y-1 mb-4 font-mono">
//               <h4 className="font-black text-sm text-slate-900 font-sans">MartFlow Supermarket</h4>
//               <p className="text-[10px] text-slate-400">Order ID: {lastOrder.orderId}</p>
//               <p className="text-[10px] text-slate-400">{lastOrder.date}</p>
//             </div>

//             <div className="space-y-1.5 border-y border-dashed border-slate-200 py-3 my-2 font-mono">
//               {lastOrder.items.map(item => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>{item.qty}x {item.name}</span>
//                   <span className="font-bold">Rs. {item.price * item.qty}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between font-black text-sm py-2">
//               <span>TOTAL DUE:</span>
//               <span className="text-emerald-600">Rs. {lastOrder.total.toLocaleString()}</span>
//             </div>

//             <div className="flex gap-2 pt-4">
//               <button
//                 onClick={() => window.print()}
//                 className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
//               >
//                 <Printer size={14} /> Print Receipt
//               </button>
//               <button
//                 onClick={() => setReceiptModal(false)}
//                 className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  CreditCard, 
  CheckCircle2, 
  Bell, 
  PackageCheck, 
  ShoppingCart,
  User
} from 'lucide-react';

export default function Pos() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Nestle Pure Life 500ml', price: 60, stock: 97, sku: '896400112233' },
    { id: 2, name: "Olper's Milk 1 Litre", price: 280, stock: 45, sku: '896400223344' },
    { id: 3, name: 'Dawn Plain Bread (Large)', price: 120, stock: 18, sku: '896400334455' },
    { id: 4, name: 'Lays Masala 65g', price: 100, stock: 50, sku: '896400445566' },
    { id: 5, name: 'Knorr Chattpatta Noodles', price: 55, stock: 32, sku: '896400556677' },
    { id: 6, name: 'Tapal Danedar Tea 430g', price: 650, stock: 24, sku: '896400778899' },
  ]);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  
  // Online Warehouse Queue Sync
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [showQueue, setShowQueue] = useState(false);

  const loadOrders = () => {
    const orders = JSON.parse(localStorage.getItem('martflow_online_orders') || '[]');
    setOnlineOrders(orders);
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('storage', loadOrders);
    return () => window.removeEventListener('storage', loadOrders);
  }, []);

  const markDispatched = (orderId) => {
    const updated = onlineOrders.map(ord => 
      ord.orderId === orderId ? { ...ord, status: 'Dispatched & Completed' } : ord
    );
    setOnlineOrders(updated);
    localStorage.setItem('martflow_online_orders', JSON.stringify(updated));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const next = item.qty + delta;
        return next > 0 ? { ...item, qty: next } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => setCart(cart.filter(item => item.id !== id));

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handlePrintReceipt = () => {
    window.print();
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)
  );

  return (
    <div className="font-sans space-y-4">
      {/* Top POS Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs print:hidden">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Active POS Checkout Terminal</h2>
          <p className="text-xs text-slate-500">Live barcode wedge scanning & warehouse sync</p>
        </div>

        {/* Live Warehouse Orders Queue Trigger */}
        <button 
          onClick={() => { loadOrders(); setShowQueue(true); }}
          className="relative flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <Bell size={16} className={onlineOrders.some(o => o.status === 'Pending Dispatch') ? 'text-rose-600 animate-bounce' : 'text-emerald-700'} />
          <span>Online Store Queue</span>
          {onlineOrders.filter(o => o.status === 'Pending Dispatch').length > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {onlineOrders.filter(o => o.status === 'Pending Dispatch').length}
            </span>
          )}
        </button>
      </div>

      {/* POS Working Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Products Search & List (2 Columns) */}
        <div className="lg:col-span-2 space-y-4 print:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Scan SKU barcode or type product name..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map(p => (
              <div 
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-white border border-slate-200 hover:border-emerald-500 p-4 rounded-2xl shadow-xs transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-slate-400">{p.sku}</div>
                  <h4 className="font-bold text-slate-900 text-xs mt-1">{p.name}</h4>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-black text-emerald-700 text-sm font-mono">Rs. {p.price}</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Stock: {p.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Cart & Receipt Panel (1 Column) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between printable-document">
          <div>
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-emerald-600" />
                <h3 className="font-black text-slate-900 text-sm">Current Invoice</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">INV-{Math.floor(1000 + Math.random() * 9000)}</span>
            </div>

            <div className="mt-3 flex items-center gap-2 bg-slate-50 p-2 rounded-xl text-xs print:hidden">
              <User size={14} className="text-slate-400" />
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="bg-transparent w-full font-bold text-slate-800 focus:outline-none"
              />
            </div>

            {/* Cart Items */}
            <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">No items added to cart</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">Rs. {item.price} x {item.qty}</div>
                    </div>
                    <div className="flex items-center gap-2 print:hidden">
                      <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 bg-white border rounded font-bold flex items-center justify-center cursor-pointer">-</button>
                      <span className="font-bold font-mono">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 bg-white border rounded font-bold flex items-center justify-center cursor-pointer">+</button>
                      <button onClick={() => removeItem(item.id)} className="text-rose-500 hover:text-rose-700 ml-1 cursor-pointer"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Subtotal</span>
              <span className="font-mono font-bold text-slate-900">Rs. {total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold">Total Payable</span>
              <span className="font-black text-xl text-emerald-700 font-mono">Rs. {total}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 print:hidden">
              <button
                onClick={handlePrintReceipt}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Printer size={15} /> Print Slip
              </button>
              <button
                onClick={() => { setCart([]); alert("Sale completed successfully!"); }}
                disabled={cart.length === 0}
                className="py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <CreditCard size={15} /> Charge Cash
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Online Orders Side Drawer Modal */}
      {showQueue && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between font-sans">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Warehouse Dispatch Queue</h3>
                  <p className="text-xs text-slate-500">Live incoming customer store orders</p>
                </div>
                <button onClick={() => setShowQueue(false)} className="text-slate-400 hover:text-slate-700 font-black text-sm cursor-pointer">✕</button>
              </div>

              <div className="mt-4 space-y-3 overflow-y-auto max-h-[75vh] pr-1">
                {onlineOrders.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">No orders in queue right now.</div>
                ) : (
                  onlineOrders.map(ord => (
                    <div key={ord.orderId} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900">{ord.orderId}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          ord.status.includes('Dispatched') 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-600">
                        <div className="font-bold text-slate-800">{ord.customer.name} ({ord.customer.phone})</div>
                        <div className="text-[11px] text-slate-500">{ord.customer.address}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="font-mono font-black text-slate-900 text-xs">Rs. {ord.total}</span>
                        {ord.status !== 'Dispatched & Completed' && (
                          <button 
                            onClick={() => markDispatched(ord.orderId)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1"
                          >
                            <PackageCheck size={14} /> Dispatch Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowQueue(false)}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition cursor-pointer"
            >
              Close Queue Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}