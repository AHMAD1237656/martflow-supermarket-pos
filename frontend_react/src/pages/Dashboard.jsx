// import React, { useState, useEffect } from 'react';
// import { djangoApi } from '../api/client';
// import { 
//   TrendingUp, 
//   ArrowUpRight, 
//   DollarSign, 
//   ShoppingCart, 
//   AlertTriangle
// } from 'lucide-react';

// export default function Dashboard() {
//   const [timeRange, setTimeRange] = useState('30D'); // 7D, 30D, 90D
//   const [stats, setStats] = useState({
//     total_revenue: 184500,
//     total_sales: 142,
//     net_profit: 42800,
//     low_stock_count: 3
//   });

//   const [topProducts, setTopProducts] = useState([
//     { id: 1, name: 'Nestle Pure Life 500ml', category: 'Beverages', sales: 420, revenue: 'Rs. 25,200' },
//     { id: 2, name: "Olper's Milk 1 Litre", category: 'Dairy', sales: 310, revenue: 'Rs. 86,800' },
//     { id: 3, name: 'Dawn Plain Bread Large', category: 'Bakery', sales: 240, revenue: 'Rs. 28,800' },
//   ]);

//   const [lowStockItems, setLowStockItems] = useState([
//     { id: 1, name: 'Knorr Noodles Chattpatta', remaining: 8, threshold: 30 },
//     { id: 2, name: 'National Chilli Garlic 500g', remaining: 12, threshold: 25 },
//     { id: 3, name: 'Lipton Yellow Label 400g', remaining: 5, threshold: 20 },
//   ]);

//   // Dynamic Graph Points based on 7D, 30D, 90D
//   const graphConfigs = {
//     '7D': {
//       label: 'Last 7 Days Sales Trend',
//       points: "30,170 160,140 290,150 420,110 550,120 680,60 810,40",
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       total: 'Rs. 94,200',
//       growth: '+14.5%'
//     },
//     '30D': {
//       label: 'Last 30 Days Sales Trend',
//       points: "30,165 110,155 190,140 270,145 350,130 430,115 510,120 590,95 670,85 750,55 830,35",
//       labels: ['1 Sep', '4 Sep', '8 Sep', '12 Sep', '16 Sep', '20 Sep', '24 Sep', '28 Sep', '30 Sep'],
//       total: 'Rs. 384,500',
//       growth: '+18.2%'
//     },
//     '90D': {
//       label: 'Last Quarter (90 Days) Performance',
//       points: "30,175 180,150 330,130 480,110 630,70 780,50 830,25",
//       labels: ['Jul 2026', 'Aug 2026', 'Sep 2026'],
//       total: 'Rs. 1,420,000',
//       growth: '+26.8%'
//     }
//   };

//   const currentGraph = graphConfigs[timeRange];

//   return (
//     <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
//       {/* Top Header & Range Filters */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h2 className="text-2xl font-black tracking-tight text-slate-900">
//             Executive Performance Overview
//           </h2>
//           <p className="text-xs text-slate-500 font-medium">Real-time revenue, gross margins, and inventory health.</p>
//         </div>

//         {/* 7 Days / 30 Days / 90 Days Date Switcher */}
//         <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
//           {['7D', '30D', '90D'].map((range) => (
//             <button
//               key={range}
//               onClick={() => setTimeRange(range)}
//               className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
//                 timeRange === range
//                   ? 'bg-emerald-600 text-white shadow-xs'
//                   : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
//               }`}
//             >
//               {range === '7D' ? '7 Days' : range === '30D' ? '30 Days' : '90 Days'}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* KPI Statistic Cards (Modern Geometric Typography) */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Gross Turnover</span>
//             <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign size={16} /></span>
//           </div>
//           <div className="mt-3">
//             <div className="text-2xl font-black text-slate-900 tracking-tight">{currentGraph.total}</div>
//             <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold mt-1.5">
//               <ArrowUpRight size={14} /> {currentGraph.growth} <span className="text-slate-400 font-normal">vs prev cycle</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Net Profit</span>
//             <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp size={16} /></span>
//           </div>
//           <div className="mt-3">
//             <div className="text-2xl font-black text-blue-600 tracking-tight">Rs. {stats.net_profit.toLocaleString()}</div>
//             <div className="flex items-center gap-1 text-xs text-blue-600 font-bold mt-1.5">
//               <ArrowUpRight size={14} /> +12.3% <span className="text-slate-400 font-normal">margin: 18.5%</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invoices Issued</span>
//             <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><ShoppingCart size={16} /></span>
//           </div>
//           <div className="mt-3">
//             <div className="text-2xl font-black text-slate-900 tracking-tight">{stats.total_sales} Orders</div>
//             <div className="text-xs text-slate-500 font-medium mt-1.5">100% Cash / Digital Settled</div>
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
//           <div className="flex justify-between items-start">
//             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inventory Alerts</span>
//             <span className="p-2 bg-rose-50 text-rose-600 rounded-xl"><AlertTriangle size={16} /></span>
//           </div>
//           <div className="mt-3">
//             <div className="text-2xl font-black text-rose-600 tracking-tight">{lowStockItems.length} SKUs Low</div>
//             <div className="text-xs text-rose-500 font-semibold mt-1.5">Immediate restock required</div>
//           </div>
//         </div>
//       </div>

//       {/* Main Interactive Revenue Graph */}
//       <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
//           <div>
//             <h3 className="text-lg font-black text-slate-900 tracking-tight">{currentGraph.label}</h3>
//             <p className="text-xs text-slate-500 font-medium">Aggregated revenue timeline curve with dynamic period filtering.</p>
//           </div>
//           <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl">
//             Fiscal Period 2026
//           </span>
//         </div>

//         {/* Dynamic SVG Visual Curve */}
//         <div className="relative w-full h-64 bg-slate-50/60 rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
//           <svg className="w-full h-44 overflow-visible" viewBox="0 0 850 200" preserveAspectRatio="none">
//             <defs>
//               <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
//                 <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
//               </linearGradient>
//             </defs>

//             {/* Horizontal Grid lines */}
//             <line x1="0" y1="40" x2="850" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" />
//             <line x1="0" y1="100" x2="850" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" />
//             <line x1="0" y1="160" x2="850" y2="160" stroke="#E2E8F0" strokeDasharray="4 4" />

//             {/* Area polygon fill */}
//             <polygon
//               fill="url(#curveGradient)"
//               points={`0,200 ${currentGraph.points} 850,200`}
//             />

//             {/* Sharp Emerald Line */}
//             <polyline
//               fill="none"
//               stroke="#059669"
//               strokeWidth="3.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               points={currentGraph.points}
//             />
//           </svg>

//           {/* Timeline markers */}
//           <div className="flex justify-between text-[11px] font-bold text-slate-600 px-2 pt-2 border-t border-slate-200">
//             {currentGraph.labels.map((lbl, idx) => (
//               <span key={idx}>{lbl}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Grid: Top Selling Products & Low Stock Alerts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Selling Products */}
//         <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
//           <div className="flex justify-between items-center mb-5">
//             <div>
//               <h3 className="font-black text-base text-slate-900 tracking-tight">Top Selling Products</h3>
//               <p className="text-xs text-slate-500 font-medium">Ranked by volumetric units dispatched</p>
//             </div>
//             <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
//           </div>

//           <div className="space-y-3">
//             {topProducts.map((p, idx) => (
//               <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition">
//                 <div className="flex items-center gap-3.5">
//                   <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
//                     #{idx + 1}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
//                     <span className="text-[11px] font-semibold text-slate-500">{p.category}</span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-black text-xs text-emerald-600">{p.sales} Units Sold</div>
//                   <div className="text-[11px] font-bold text-slate-700">{p.revenue}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Low Stock Alerts */}
//         <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
//           <div className="flex justify-between items-center mb-5">
//             <div>
//               <h3 className="font-black text-base text-slate-900 tracking-tight">Stock Replenishment Alerts</h3>
//               <p className="text-xs text-slate-500 font-medium">Items currently below critical safety limits</p>
//             </div>
//             <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-100 text-xs font-bold rounded-xl">
//               Action Required
//             </span>
//           </div>

//           <div className="space-y-3">
//             {lowStockItems.map((item) => (
//               <div key={item.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
//                 <div>
//                   <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
//                   <span className="text-[11px] text-slate-500 font-medium">Min Threshold: {item.threshold} Units</span>
//                 </div>
//                 <div className="text-right">
//                   <span className="px-3 py-1 bg-rose-100 text-rose-700 font-black text-xs rounded-lg border border-rose-200">
//                     {item.remaining} Remaining
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { djangoApi } from '../api/client';
import { 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  ShoppingCart, 
  AlertTriangle
} from 'lucide-react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30D'); // 7D, 30D, 90D
  const [stats, setStats] = useState({
    total_revenue: 184500,
    total_sales: 142,
    net_profit: 42800,
    low_stock_count: 3
  });

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: 'Nestle Pure Life 500ml', category: 'Beverages', sales: 420, revenue: 'Rs. 25,200' },
    { id: 2, name: "Olper's Milk 1 Litre", category: 'Dairy', sales: 310, revenue: 'Rs. 86,800' },
    { id: 3, name: 'Dawn Plain Bread Large', category: 'Bakery', sales: 240, revenue: 'Rs. 28,800' },
  ]);

  const [lowStockItems, setLowStockItems] = useState([
    { id: 1, name: 'Knorr Noodles Chattpatta', remaining: 8, threshold: 30 },
    { id: 2, name: 'National Chilli Garlic 500g', remaining: 12, threshold: 25 },
    { id: 3, name: 'Lipton Yellow Label 400g', remaining: 5, threshold: 20 },
  ]);

  // Dynamic Graph Points based on 7D, 30D, 90D
  const graphConfigs = {
    '7D': {
      label: 'Last 7 Days Sales Trend',
      points: "30,170 160,140 290,150 420,110 550,120 680,60 810,40",
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      total: 'Rs. 94,200',
      growth: '+14.5%'
    },
    '30D': {
      label: 'Last 30 Days Sales Trend',
      points: "30,165 110,155 190,140 270,145 350,130 430,115 510,120 590,95 670,85 750,55 830,35",
      labels: ['1 Sep', '4 Sep', '8 Sep', '12 Sep', '16 Sep', '20 Sep', '24 Sep', '28 Sep', '30 Sep'],
      total: 'Rs. 384,500',
      growth: '+18.2%'
    },
    '90D': {
      label: 'Last Quarter (90 Days) Performance',
      points: "30,175 180,150 330,130 480,110 630,70 780,50 830,25",
      labels: ['Jul 2026', 'Aug 2026', 'Sep 2026'],
      total: 'Rs. 1,420,000',
      growth: '+26.8%'
    }
  };

  const currentGraph = graphConfigs[timeRange];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Executive Performance Overview
          </h2>
          <p className="text-xs text-slate-500 font-medium">Real-time revenue, gross margins, and inventory health.</p>
        </div>

        {/* 7 Days / 30 Days / 90 Days Date Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          {['7D', '30D', '90D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                timeRange === range
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {range === '7D' ? '7 Days' : range === '30D' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Upgraded Vibrant / Gheraa Colorful KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. Gross Turnover (Deep Rich Emerald) */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-100">Gross Turnover</span>
            <span className="p-2 bg-white/20 text-white rounded-xl backdrop-blur-md shadow-xs"><DollarSign size={18} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white tracking-tight font-mono">{currentGraph.total}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-200 font-bold mt-1.5">
              <ArrowUpRight size={15} /> {currentGraph.growth} <span className="text-emerald-100/70 font-normal">vs prev cycle</span>
            </div>
          </div>
        </div>

        {/* 2. Net Profit (Deep Vibrant Cobalt Blue) */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-100">Net Profit</span>
            <span className="p-2 bg-white/20 text-white rounded-xl backdrop-blur-md shadow-xs"><TrendingUp size={18} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white tracking-tight font-mono">Rs. {stats.net_profit.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-blue-200 font-bold mt-1.5">
              <ArrowUpRight size={15} /> +12.3% <span className="text-blue-100/70 font-normal">margin: 18.5%</span>
            </div>
          </div>
        </div>

        {/* 3. Invoices Issued (Deep Royal Purple / Violet) */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-indigo-900 text-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-100">Invoices Issued</span>
            <span className="p-2 bg-white/20 text-white rounded-xl backdrop-blur-md shadow-xs"><ShoppingCart size={18} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white tracking-tight font-mono">{stats.total_sales} Orders</div>
            <div className="text-xs text-purple-200 font-semibold mt-1.5">100% Cash / Digital Settled</div>
          </div>
        </div>

        {/* 4. Inventory Alerts (Deep Crimson Red / Rose) */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-rose-600 to-red-800 text-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-100">Inventory Alerts</span>
            <span className="p-2 bg-white/20 text-white rounded-xl backdrop-blur-md shadow-xs"><AlertTriangle size={18} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white tracking-tight font-mono">{lowStockItems.length} SKUs Low</div>
            <div className="text-xs text-rose-200 font-bold mt-1.5">Immediate restock required</div>
          </div>
        </div>

      </div>

      {/* Main Interactive Revenue Graph */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{currentGraph.label}</h3>
            <p className="text-xs text-slate-500 font-medium">Aggregated revenue timeline curve with dynamic period filtering.</p>
          </div>
          <span className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl">
            Fiscal Period 2026
          </span>
        </div>

        {/* Dynamic SVG Visual Curve */}
        <div className="relative w-full h-64 bg-slate-50/60 rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
          <svg className="w-full h-44 overflow-visible" viewBox="0 0 850 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="40" x2="850" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="850" y2="100" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="0" y1="160" x2="850" y2="160" stroke="#E2E8F0" strokeDasharray="4 4" />

            {/* Area polygon fill */}
            <polygon
              fill="url(#curveGradient)"
              points={`0,200 ${currentGraph.points} 850,200`}
            />

            {/* Sharp Emerald Line */}
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={currentGraph.points}
            />
          </svg>

          {/* Timeline markers */}
          <div className="flex justify-between text-[11px] font-bold text-slate-600 px-2 pt-2 border-t border-slate-200">
            {currentGraph.labels.map((lbl, idx) => (
              <span key={idx}>{lbl}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Selling Products & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-black text-base text-slate-900 tracking-tight">Top Selling Products</h3>
              <p className="text-xs text-slate-500 font-medium">Ranked by volumetric units dispatched</p>
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer">View All</button>
          </div>

          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition">
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">{p.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xs text-emerald-600">{p.sales} Units Sold</div>
                  <div className="text-[11px] font-bold text-slate-700">{p.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-black text-base text-slate-900 tracking-tight">Stock Replenishment Alerts</h3>
              <p className="text-xs text-slate-500 font-medium">Items currently below critical safety limits</p>
            </div>
            <span className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-100 text-xs font-bold rounded-xl">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <span className="text-[11px] text-slate-500 font-medium">Min Threshold: {item.threshold} Units</span>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 font-black text-xs rounded-lg border border-rose-200">
                    {item.remaining} Remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
