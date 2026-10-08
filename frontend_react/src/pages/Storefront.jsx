// import React, { useState } from 'react';
// import { 
//   Store, 
//   ShoppingCart, 
//   Search, 
//   Plus, 
//   Minus, 
//   Trash2, 
//   CheckCircle2, 
//   ShoppingBag,
//   ArrowRight,
//   Phone,
//   MapPin,
//   Clock,
//   PackageCheck
// } from 'lucide-react';

// export default function Storefront() {
//   const [catalog, setCatalog] = useState([
//     { id: 1, name: 'Nestle Pure Life 500ml', price: 60, stock: 97, category: 'Beverages', sku: '896400112233' },
//     { id: 2, name: "Olper's Milk 1 Litre", price: 280, stock: 45, category: 'Dairy', sku: '896400223344' },
//     { id: 3, name: 'Dawn Plain Bread (Large)', price: 120, stock: 18, category: 'Bakery', sku: '896400334455' },
//     { id: 4, name: 'Lays Masala 65g', price: 100, stock: 50, category: 'Snacks', sku: '896400445566' },
//     { id: 5, name: 'Knorr Chattpatta Noodles', price: 55, stock: 32, category: 'Grocery', sku: '896400556677' },
//     { id: 6, name: 'Tapal Danedar Tea 430g', price: 650, stock: 24, category: 'Grocery', sku: '896400778899' },
//   ]);

//   const [cart, setCart] = useState([]);
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [search, setSearch] = useState('');
//   const [orderModal, setOrderModal] = useState(false);
//   const [orderConfirmed, setOrderConfirmed] = useState(null);

//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     address: '',
//     deliveryType: 'Delivery'
//   });

//   const categories = ['All', 'Beverages', 'Dairy', 'Bakery', 'Snacks', 'Grocery'];

//   const addToCart = (product) => {
//     if (product.stock <= 0) return;
//     setCart((prev) => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         if (existing.qty >= product.stock) return prev;
//         return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
//       }
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const updateQty = (id, delta) => {
//     setCart(cart.map(item => {
//       if (item.id === id) {
//         const prod = catalog.find(p => p.id === id);
//         const next = item.qty + delta;
//         if (next > prod.stock) return item;
//         return next > 0 ? { ...item, qty: next } : null;
//       }
//       return item;
//     }).filter(Boolean));
//   };

//   const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

//   const handlePlaceOrder = (e) => {
//     e.preventDefault();
//     const orderData = {
//       orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
//       items: [...cart],
//       total,
//       customer: customerInfo,
//       date: new Date().toLocaleString(),
//       status: 'Order Placed (Pending Dispatch)'
//     };

//     // Deduct stock in real-time
//     setCatalog(prev => prev.map(p => {
//       const cartItem = cart.find(ci => ci.id === p.id);
//       return cartItem ? { ...p, stock: p.stock - cartItem.qty } : p;
//     }));

//     setOrderConfirmed(orderData);
//     setCart([]);
//     setOrderModal(false);
//   };

//   const filtered = catalog.filter(p => {
//     const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
//     const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
//     return matchCat && matchSearch;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans pb-16">
//       {/* Header */}
//       <header className="bg-emerald-700 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 bg-white text-emerald-700 rounded-2xl flex items-center justify-center font-black shadow-sm">
//               <Store size={24} />
//             </div>
//             <div>
//               <h1 className="text-xl font-black tracking-tight leading-none">MartFlow Express</h1>
//               <p className="text-[11px] text-emerald-200 font-semibold mt-1">Customer Online Mart & Stock Ordering</p>
//             </div>
//           </div>

//           <button 
//             onClick={() => setOrderModal(true)}
//             className="relative flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 border border-emerald-600 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition cursor-pointer"
//           >
//             <ShoppingCart size={18} />
//             <span>My Cart ({cart.reduce((a, b) => a + b.qty, 0)})</span>
//             {cart.length > 0 && (
//               <span className="ml-1 bg-white text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-black">
//                 Rs. {total}
//               </span>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Catalog */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
//         <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="relative w-full sm:w-96">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
//             <input
//               type="text"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search products in stock..."
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
//             />
//           </div>

//           <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setCategoryFilter(cat)}
//                 className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
//                   categoryFilter === cat 
//                     ? 'bg-emerald-600 text-white' 
//                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {filtered.map(p => (
//             <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between">
//               <div>
//                 <div className="flex justify-between items-start">
//                   <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
//                     {p.category}
//                   </span>
//                   <span className={`text-[10px] font-bold ${p.stock > 10 ? 'text-emerald-600' : 'text-amber-600'}`}>
//                     {p.stock > 0 ? `${p.stock} Available` : 'Out of Stock'}
//                   </span>
//                 </div>
//                 <h3 className="font-bold text-slate-900 text-sm mt-3">{p.name}</h3>
//                 <p className="text-[11px] font-mono text-slate-400 mt-0.5">SKU: {p.sku}</p>
//               </div>

//               <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
//                 <div>
//                   <span className="text-[10px] text-slate-400 block font-semibold">Price</span>
//                   <span className="font-black text-slate-900 text-base">Rs. {p.price}</span>
//                 </div>
//                 <button
//                   onClick={() => addToCart(p)}
//                   disabled={p.stock <= 0}
//                   className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shadow-xs cursor-pointer"
//                 >
//                   <Plus size={14} /> Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Order Confirmation Card */}
//       {orderConfirmed && (
//         <div className="max-w-xl mx-auto mt-8 bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-3">
//           <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
//             <CheckCircle2 size={24} />
//           </div>
//           <h2 className="font-black text-slate-900 text-lg">Order #{orderConfirmed.orderId} Placed!</h2>
//           <p className="text-xs text-slate-600">
//             Thank you <b>{orderConfirmed.customer.name}</b>. Your order for <b>Rs. {orderConfirmed.total}</b> has been received and routed to our warehouse terminal.
//           </p>
//           <button 
//             onClick={() => setOrderConfirmed(null)}
//             className="text-xs font-bold text-emerald-700 underline cursor-pointer"
//           >
//             Place Another Order
//           </button>
//         </div>
//       )}

//       {/* Checkout Modal */}
//       {orderModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-100 font-sans space-y-4 max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center pb-3 border-b border-slate-100">
//               <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
//                 <ShoppingBag size={18} className="text-emerald-600" /> Customer Checkout
//               </h3>
//               <button onClick={() => setOrderModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer">✕</button>
//             </div>

//             <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
//               {cart.length === 0 ? (
//                 <div className="text-center py-6 text-slate-400 text-xs">Your basket is currently empty.</div>
//               ) : (
//                 cart.map(i => (
//                   <div key={i.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
//                     <div>
//                       <div className="font-bold text-slate-800">{i.name}</div>
//                       <div className="text-emerald-600 font-bold">Rs. {i.price * i.qty}</div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button onClick={() => updateQty(i.id, -1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center font-bold cursor-pointer">-</button>
//                       <span className="font-bold font-mono">{i.qty}</span>
//                       <button onClick={() => updateQty(i.id, 1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center font-bold cursor-pointer">+</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {cart.length > 0 && (
//               <form onSubmit={handlePlaceOrder} className="space-y-3 pt-3 border-t border-slate-100 text-xs">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
//                     <input
//                       type="text"
//                       required
//                       placeholder="e.g. Asad Mehmood"
//                       value={customerInfo.name}
//                       onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                       className="w-full border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
//                     <input
//                       type="text"
//                       required
//                       placeholder="0300-1234567"
//                       value={customerInfo.phone}
//                       onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                       className="w-full border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-emerald-500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block font-bold text-slate-700 mb-1">Delivery Option</label>
//                   <div className="grid grid-cols-2 gap-2">
//                     <button
//                       type="button"
//                       onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'Delivery' })}
//                       className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
//                         customerInfo.deliveryType === 'Delivery' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-200'
//                       }`}
//                     >
//                       Doorstep Delivery
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'Pickup' })}
//                       className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
//                         customerInfo.deliveryType === 'Pickup' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-200'
//                       }`}
//                     >
//                       Counter Pickup
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block font-bold text-slate-700 mb-1">Complete Address / Notes</label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="House/Street/Sector or Shop name..."
//                     value={customerInfo.address}
//                     onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
//                     className="w-full border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
//                   />
//                 </div>

//                 <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
//                   <div>
//                     <span className="text-[10px] text-slate-400 block font-bold">TOTAL DUE</span>
//                     <span className="font-black text-lg text-emerald-700 font-mono">Rs. {total}</span>
//                   </div>
//                   <button
//                     type="submit"
//                     className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
//                   >
//                     Confirm & Place Order
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { 
  Store, 
  ShoppingCart, 
  Search, 
  Plus, 
  CheckCircle2, 
  ShoppingBag
} from 'lucide-react';

export default function Storefront() {
  const [catalog, setCatalog] = useState([
    { id: 1, name: 'Nestle Pure Life 500ml', price: 60, stock: 97, category: 'Beverages', sku: '896400112233' },
    { id: 2, name: "Olper's Milk 1 Litre", price: 280, stock: 45, category: 'Dairy', sku: '896400223344' },
    { id: 3, name: 'Dawn Plain Bread (Large)', price: 120, stock: 18, category: 'Bakery', sku: '896400334455' },
    { id: 4, name: 'Lays Masala 65g', price: 100, stock: 50, category: 'Snacks', sku: '896400445566' },
    { id: 5, name: 'Knorr Chattpatta Noodles', price: 55, stock: 32, category: 'Grocery', sku: '896400556677' },
    { id: 6, name: 'Tapal Danedar Tea 430g', price: 650, stock: 24, category: 'Grocery', sku: '896400778899' },
  ]);

  const [cart, setCart] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [orderModal, setOrderModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'Delivery'
  });

  const categories = ['All', 'Beverages', 'Dairy', 'Bakery', 'Snacks', 'Grocery'];

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const prod = catalog.find(p => p.id === id);
        const next = item.qty + delta;
        if (next > prod.stock) return item;
        return next > 0 ? { ...item, qty: next } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderData = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      total,
      customer: customerInfo,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending Dispatch'
    };

    // Shared storage for POS & Warehouse Dispatch Queue
    const existingOrders = JSON.parse(localStorage.getItem('martflow_online_orders') || '[]');
    localStorage.setItem('martflow_online_orders', JSON.stringify([orderData, ...existingOrders]));

    // Real-time stock deduction
    setCatalog(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.qty } : p;
    }));

    setOrderConfirmed(orderData);
    setCart([]);
    setOrderModal(false);
  };

  const filtered = catalog.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white text-emerald-700 rounded-2xl flex items-center justify-center font-black shadow-sm">
              <Store size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none">MartFlow Express</h1>
              <p className="text-[11px] text-emerald-200 font-semibold mt-1">Customer Online Mart & Stock Ordering</p>
            </div>
          </div>

          <button 
            onClick={() => setOrderModal(true)}
            className="relative flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 border border-emerald-600 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <ShoppingCart size={18} />
            <span>My Cart ({cart.reduce((a, b) => a + b.qty, 0)})</span>
            {cart.length > 0 && (
              <span className="ml-1 bg-white text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-black">
                Rs. {total}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Catalog & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products in stock..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {p.category}
                  </span>
                  <span className={`text-[10px] font-bold ${p.stock > 10 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {p.stock > 0 ? `${p.stock} Available` : 'Out of Stock'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-3">{p.name}</h3>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">SKU: {p.sku}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Price</span>
                  <span className="font-black text-slate-900 text-base">Rs. {p.price}</span>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  disabled={p.stock <= 0}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shadow-xs cursor-pointer"
                >
                  <Plus size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Box */}
      {orderConfirmed && (
        <div className="max-w-xl mx-auto mt-8 bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="font-black text-slate-900 text-lg">Order #{orderConfirmed.orderId} Placed!</h2>
          <p className="text-xs text-slate-600">
            Thank you <b>{orderConfirmed.customer.name}</b>. Your order has been placed successfully and sent to the counter queue.
          </p>
          <button 
            onClick={() => setOrderConfirmed(null)}
            className="text-xs font-bold text-emerald-700 underline cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Customer Form Modal */}
      {orderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-100 font-sans space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <ShoppingBag size={18} className="text-emerald-600" /> Customer Checkout
              </h3>
              <button onClick={() => setOrderModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer">✕</button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">Your cart is empty.</div>
              ) : (
                cart.map(i => (
                  <div key={i.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{i.name}</div>
                      <div className="text-emerald-600 font-bold">Rs. {i.price * i.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(i.id, -1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center font-bold cursor-pointer">-</button>
                      <span className="font-bold font-mono">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, 1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center font-bold cursor-pointer">+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <form onSubmit={handlePlaceOrder} className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Mehmood"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="0300-1234567"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'Delivery' })}
                      className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
                        customerInfo.deliveryType === 'Delivery' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-200'
                      }`}
                    >
                      Doorstep Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'Pickup' })}
                      className={`py-2 rounded-xl font-bold border transition cursor-pointer ${
                        customerInfo.deliveryType === 'Pickup' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-200'
                      }`}
                    >
                      Counter Pickup
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Address / Note</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Street details..."
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">TOTAL DUE</span>
                    <span className="font-black text-lg text-emerald-700 font-mono">Rs. {total}</span>
                  </div>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Confirm & Place Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}