// import React, { useState } from 'react';
// import { 
//   BarChart3, 
//   Download, 
//   Printer, 
//   FileSpreadsheet, 
//   Calendar, 
//   TrendingUp, 
//   Filter, 
//   DollarSign, 
//   Package, 
//   Users,
//   CheckCircle2
// } from 'lucide-react';

// export default function Reports() {
//   const [activeTab, setActiveTab] = useState('sales'); // 'sales', 'inventory', 'ledgers'
//   const [dateRange, setDateRange] = useState('30days');
//   const [exportNotice, setExportNotice] = useState('');

//   // Sample Datasets for Pakistan Retail Context
//   const salesData = [
//     { id: 'INV-9041', date: '2026-10-02', cashier: 'Admin', items: 6, total: 3450, method: 'Cash', status: 'Settled' },
//     { id: 'INV-9040', date: '2026-10-02', cashier: 'Bilal', items: 3, total: 1820, method: 'Raast / Digital', status: 'Settled' },
//     { id: 'INV-9039', date: '2026-10-01', cashier: 'Admin', items: 12, total: 8400, method: 'Cash', status: 'Settled' },
//     { id: 'INV-9038', date: '2026-09-30', cashier: 'Usman', items: 4, total: 2950, method: 'Card', status: 'Settled' },
//     { id: 'INV-9037', date: '2026-09-29', cashier: 'Bilal', items: 8, total: 5600, method: 'Cash', status: 'Settled' },
//   ];

//   const inventoryData = [
//     { sku: 'MF-DAIRY-01', name: "Olper's Full Cream Milk 1L", category: 'Dairy', inStock: 142, unitCost: 260, salePrice: 280, val: 36920, status: 'In Stock' },
//     { sku: 'MF-BAKE-04', name: 'Dawn Plain Bread (Large)', category: 'Bakery', inStock: 38, unitCost: 105, salePrice: 120, val: 3990, status: 'Normal' },
//     { sku: 'MF-BEV-08', name: 'Nestle Pure Life 500ml', category: 'Beverages', inStock: 220, unitCost: 50, salePrice: 60, val: 11000, status: 'In Stock' },
//     { sku: 'MF-NOOD-11', name: 'Knorr Chattpatta Noodles', category: 'Grocery', inStock: 8, unitCost: 45, salePrice: 55, val: 360, status: 'Critical Low' },
//     { sku: 'MF-SAUCE-02', name: 'National Chilli Garlic Sauce 500g', category: 'Grocery', inStock: 12, unitCost: 320, salePrice: 360, val: 3840, status: 'Low Stock' },
//   ];

//   const clientLedgerSummary = [
//     { name: 'Haji Aslam General Store', phone: '0300-7654321', city: 'Faisalabad', totalDebit: 43500, totalCredit: 15000, balance: 28500, status: 'Receivable' },
//     { name: 'Bismillah Bakers & Sweets', phone: '0321-9876543', city: 'Lahore', totalDebit: 24200, totalCredit: 10000, balance: 14200, status: 'Receivable' },
//     { name: 'Chaudhry Super Mart', phone: '0333-1122334', city: 'Gujranwala', totalDebit: 5000, totalCredit: 5000, balance: 0, status: 'Cleared' },
//   ];

//   // CSV Exporter Utility Function
//   const exportToCSV = (data, filename) => {
//     if (!data || !data.length) return;
//     const headers = Object.keys(data[0]).join(',');
//     const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(','));
//     const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.setAttribute('href', encodedUri);
//     link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setExportNotice(`${filename}.csv exported successfully.`);
//     setTimeout(() => setExportNotice(''), 3000);
//   };

//   const handleDownload = () => {
//     if (activeTab === 'sales') exportToCSV(salesData, 'MartFlow_Sales_Report');
//     if (activeTab === 'inventory') exportToCSV(inventoryData, 'MartFlow_Inventory_Valuation_Report');
//     if (activeTab === 'ledgers') exportToCSV(clientLedgerSummary, 'MartFlow_Client_Receivables_Ledger');
//   };

//   return (
//     <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
//       {/* Top Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
//             <BarChart3 className="text-emerald-600" size={26} /> Financial Reports & Analytics
//           </h2>
//           <p className="text-xs text-slate-500 font-medium">Export multi-format business statements, inventory valuation, and party ledger balances.</p>
//         </div>

//         {/* Action Controls */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => window.print()}
//             className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs transition"
//           >
//             <Printer size={15} /> Print Report
//           </button>
//           <button
//             onClick={handleDownload}
//             className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition"
//           >
//             <FileSpreadsheet size={15} /> Export Excel / CSV
//           </button>
//         </div>
//       </div>

//       {exportNotice && (
//         <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
//           <CheckCircle2 size={16} /> {exportNotice}
//         </div>
//       )}

//       {/* KPI Overview Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//         <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
//           <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
//             <span>Period Gross Revenue</span>
//             <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign size={15} /></span>
//           </div>
//           <div className="text-2xl font-black text-slate-900 font-mono mt-2">Rs. 184,500</div>
//           <p className="text-[11px] text-emerald-600 font-semibold mt-1">+14.2% compared to previous cycle</p>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
//           <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
//             <span>Inventory Asset Value</span>
//             <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Package size={15} /></span>
//           </div>
//           <div className="text-2xl font-black text-blue-600 font-mono mt-2">Rs. 842,000</div>
//           <p className="text-[11px] text-slate-500 mt-1">Calculated across 148 active SKUs</p>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
//           <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
//             <span>Total Party Receivables</span>
//             <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><Users size={15} /></span>
//           </div>
//           <div className="text-2xl font-black text-rose-600 font-mono mt-2">Rs. 42,700</div>
//           <p className="text-[11px] text-rose-500 font-semibold mt-1">Pending recovery from registered clients</p>
//         </div>
//       </div>

//       {/* Navigation Tabs and Date Filter */}
//       <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
//           {/* Category Tabs */}
//           <div className="flex gap-2">
//             {[
//               { id: 'sales', label: 'Sales & Invoices Report' },
//               { id: 'inventory', label: 'Inventory Valuation' },
//               { id: 'ledgers', label: 'Client Balances & Ledgers' },
//             ].map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
//                   activeTab === tab.id
//                     ? 'bg-emerald-600 text-white shadow-xs'
//                     : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Date Filter */}
//           <div className="flex items-center gap-2">
//             <Calendar size={15} className="text-slate-400" />
//             <select
//               value={dateRange}
//               onChange={e => setDateRange(e.target.value)}
//               className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
//             >
//               <option value="today">Today's Transactions</option>
//               <option value="7days">Last 7 Days</option>
//               <option value="30days">Last 30 Days (Current Month)</option>
//               <option value="quarter">Last Quarter (90 Days)</option>
//             </select>
//           </div>
//         </div>

//         {/* Tab 1: Sales Invoices Table */}
//         {activeTab === 'sales' && (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse text-xs">
//               <thead>
//                 <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
//                   <th className="py-3 px-4">Invoice #</th>
//                   <th className="py-3 px-4">Date</th>
//                   <th className="py-3 px-4">Cashier</th>
//                   <th className="py-3 px-4 text-center">Items</th>
//                   <th className="py-3 px-4 text-right">Bill Total</th>
//                   <th className="py-3 px-4">Payment Method</th>
//                   <th className="py-3 px-4 text-center">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 font-mono">
//                 {salesData.map((row) => (
//                   <tr key={row.id} className="hover:bg-slate-50/80">
//                     <td className="py-3.5 px-4 font-bold text-slate-900">{row.id}</td>
//                     <td className="py-3.5 px-4 text-slate-600">{row.date}</td>
//                     <td className="py-3.5 px-4 font-sans text-slate-800">{row.cashier}</td>
//                     <td className="py-3.5 px-4 text-center text-slate-700">{row.items}</td>
//                     <td className="py-3.5 px-4 text-right font-black text-slate-900">Rs. {row.total.toLocaleString()}</td>
//                     <td className="py-3.5 px-4 font-sans text-slate-600">{row.method}</td>
//                     <td className="py-3.5 px-4 text-center">
//                       <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
//                         {row.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Tab 2: Inventory Valuation Table */}
//         {activeTab === 'inventory' && (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse text-xs">
//               <thead>
//                 <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
//                   <th className="py-3 px-4">SKU</th>
//                   <th className="py-3 px-4">Item Name</th>
//                   <th className="py-3 px-4">Category</th>
//                   <th className="py-3 px-4 text-center">In Stock</th>
//                   <th className="py-3 px-4 text-right">Unit Cost</th>
//                   <th className="py-3 px-4 text-right">Sale Price</th>
//                   <th className="py-3 px-4 text-right font-bold">Total Stock Value</th>
//                   <th className="py-3 px-4 text-center">Health</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 font-mono">
//                 {inventoryData.map((row) => (
//                   <tr key={row.sku} className="hover:bg-slate-50/80">
//                     <td className="py-3.5 px-4 text-slate-500 font-bold">{row.sku}</td>
//                     <td className="py-3.5 px-4 font-sans font-bold text-slate-900">{row.name}</td>
//                     <td className="py-3.5 px-4 font-sans text-slate-600">{row.category}</td>
//                     <td className="py-3.5 px-4 text-center font-bold text-slate-800">{row.inStock}</td>
//                     <td className="py-3.5 px-4 text-right text-slate-600">Rs. {row.unitCost}</td>
//                     <td className="py-3.5 px-4 text-right text-slate-900">Rs. {row.salePrice}</td>
//                     <td className="py-3.5 px-4 text-right font-black text-emerald-600">Rs. {row.val.toLocaleString()}</td>
//                     <td className="py-3.5 px-4 text-center">
//                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
//                         row.status === 'Critical Low'
//                           ? 'bg-rose-50 text-rose-700 border-rose-200'
//                           : row.status === 'Low Stock'
//                           ? 'bg-amber-50 text-amber-700 border-amber-200'
//                           : 'bg-emerald-50 text-emerald-700 border-emerald-200'
//                       }`}>
//                         {row.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Tab 3: Client Ledgers Balance Sheet */}
//         {activeTab === 'ledgers' && (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse text-xs">
//               <thead>
//                 <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
//                   <th className="py-3 px-4">Client / Party Name</th>
//                   <th className="py-3 px-4">Contact</th>
//                   <th className="py-3 px-4">City</th>
//                   <th className="py-3 px-4 text-right text-rose-600 font-bold">Total Debit (Udhaar)</th>
//                   <th className="py-3 px-4 text-right text-emerald-600 font-bold">Total Credit (Received)</th>
//                   <th className="py-3 px-4 text-right font-black">Net Receivable</th>
//                   <th className="py-3 px-4 text-center">Account Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 font-mono">
//                 {clientLedgerSummary.map((row) => (
//                   <tr key={row.name} className="hover:bg-slate-50/80">
//                     <td className="py-3.5 px-4 font-sans font-bold text-slate-900">{row.name}</td>
//                     <td className="py-3.5 px-4 text-slate-600">{row.phone}</td>
//                     <td className="py-3.5 px-4 font-sans text-slate-600">{row.city}</td>
//                     <td className="py-3.5 px-4 text-right text-rose-600 font-bold">Rs. {row.totalDebit.toLocaleString()}</td>
//                     <td className="py-3.5 px-4 text-right text-emerald-600 font-bold">Rs. {row.totalCredit.toLocaleString()}</td>
//                     <td className="py-3.5 px-4 text-right font-black text-slate-900">Rs. {row.balance.toLocaleString()}</td>
//                     <td className="py-3.5 px-4 text-center">
//                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
//                         row.status === 'Receivable'
//                           ? 'bg-rose-50 text-rose-700 border-rose-200'
//                           : 'bg-emerald-50 text-emerald-700 border-emerald-200'
//                       }`}>
//                         {row.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  Printer, 
  Calendar,
  FileSpreadsheet,
  BarChart3
} from 'lucide-react';

export default function Reports() {
  const [reportPeriod, setReportPeriod] = useState('Month'); // 'Today' | 'Week' | 'Month'

  // Dynamic Financial Datasets with Custom SVG Vector Curves
  const reportConfigs = {
    Today: {
      revenue: 18400,
      cogs: 13800,
      expenses: 1100,
      orders: 18,
      chartLabel: "Today's Hourly Profit Margins (8 AM - 10 PM)",
      labels: ['8 AM', '11 AM', '2 PM', '5 PM', '8 PM', '10 PM'],
      revPoints: "30,170 180,130 350,110 520,70 690,50 820,30",
      profitPoints: "30,185 180,165 350,150 520,130 690,120 820,105",
      polyRev: "0,200 30,170 180,130 350,110 520,70 690,50 820,30 850,200",
      polyProfit: "0,200 30,185 180,165 350,150 520,130 690,120 820,105 850,200"
    },
    Week: {
      revenue: 98600,
      cogs: 73950,
      expenses: 5400,
      orders: 84,
      chartLabel: "Weekly Turnover vs Realized Margins",
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revPoints: "30,160 160,140 300,120 440,110 580,75 710,50 820,30",
      profitPoints: "30,180 160,170 300,155 440,150 580,135 710,120 820,110",
      polyRev: "0,200 30,160 160,140 300,120 440,110 580,75 710,50 820,30 850,200",
      polyProfit: "0,200 30,180 160,170 300,155 440,150 580,135 710,120 820,110 850,200"
    },
    Month: {
      revenue: 384500,
      cogs: 288375,
      expenses: 18200,
      orders: 142,
      chartLabel: "Monthly Financial Trajectory (Revenue vs Net Margins)",
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      revPoints: "30,165 290,130 550,85 820,35",
      profitPoints: "30,180 290,160 550,140 820,110",
      polyRev: "0,200 30,165 290,130 550,85 820,35 850,200",
      polyProfit: "0,200 30,180 290,160 550,140 820,110 850,200"
    }
  };

  const active = reportConfigs[reportPeriod];
  const grossProfit = active.revenue - active.cogs;
  const netProfit = grossProfit - active.expenses;
  const marginPercentage = ((netProfit / active.revenue) * 100).toFixed(1);

  const categoryProfits = [
    { category: 'Beverages', revenue: 78500, cogs: 54950, margin: '30.0%', percentage: 80, color: 'bg-emerald-500' },
    { category: 'Dairy & Eggs', revenue: 112000, cogs: 95200, margin: '15.0%', percentage: 50, color: 'bg-blue-500' },
    { category: 'Bakery & Bread', revenue: 42000, cogs: 31500, margin: '25.0%', percentage: 65, color: 'bg-amber-500' },
    { category: 'Grocery & Spices', revenue: 98000, cogs: 73500, margin: '25.0%', percentage: 65, color: 'bg-purple-500' },
    { category: 'Snacks & Confectionery', revenue: 54000, cogs: 33225, margin: '38.5%', percentage: 92, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6 font-sans pb-12">
      
      {/* Top Header & Export Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Audited Ledger
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Profit & Loss Financial Statement
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time margin audits, Cost of Goods Sold (COGS), and operational expenditure breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Period Selector */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {['Today', 'Week', 'Month'].map((p) => (
              <button
                key={p}
                onClick={() => setReportPeriod(p)}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                  reportPeriod === p 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p === 'Month' ? 'This Month' : p === 'Week' ? 'This Week' : 'Today'}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Printer size={15} />
            <span>Print P&L</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Health Cards (Clean White Backgrounds - No Card Color Gradients) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Gross Turnover */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Gross Turnover</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign size={16} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              Rs. {active.revenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              From {active.orders} Settled Orders
            </div>
          </div>
        </div>

        {/* Cost of Goods (COGS) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Cost of Goods (COGS)</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FileSpreadsheet size={16} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              Rs. {active.cogs.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Direct supplier purchase cost
            </div>
          </div>
        </div>

        {/* OpEx & Overheads */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">OpEx & Overheads</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Calendar size={16} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              Rs. {active.expenses.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Utilities, electricity & staff
            </div>
          </div>
        </div>

        {/* Net Realized Profit */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Net Realized Profit</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp size={16} /></span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-emerald-600 tracking-tight font-mono">
              Rs. {netProfit.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1">
              <ArrowUpRight size={14} /> Net Margin: {marginPercentage}%
            </div>
          </div>
        </div>

      </div>

      {/* Main Interactive Dual Financial Graph (Revenue vs Profit) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-emerald-700" />
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{active.chartLabel}</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Dual comparative curves tracking gross turnover against actual cash-in-hand profit.
            </p>
          </div>

          {/* Graph Legend Indicators */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span className="text-slate-700">Gross Turnover</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="text-slate-700">Net Profit</span>
            </div>
          </div>
        </div>

        {/* Dynamic Dual-Curve SVG */}
        <div className="relative w-full h-64 bg-slate-50/70 rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
          <svg className="w-full h-44 overflow-visible" viewBox="0 0 850 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="repEmeraldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="repBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Guidelines */}
            <line x1="0" y1="50" x2="850" y2="50" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="0" y1="110" x2="850" y2="110" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="0" y1="170" x2="850" y2="170" stroke="#E2E8F0" strokeDasharray="4 4" />

            {/* Area Fills */}
            <polygon fill="url(#repEmeraldGradient)" points={active.polyRev} />
            <polygon fill="url(#repBlueGradient)" points={active.polyProfit} />

            {/* 1. Gross Revenue Line (Emerald) */}
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={active.revPoints}
            />

            {/* 2. Net Profit Line (Blue) */}
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={active.profitPoints}
            />
          </svg>

          {/* Timeline Labels */}
          <div className="flex justify-between text-[11px] font-bold text-slate-600 px-2 pt-2 border-t border-slate-200">
            {active.labels.map((lbl, idx) => (
              <span key={idx}>{lbl}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Category-wise Margin Table & Progress Bars */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs printable-document">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-black text-slate-900 text-base">Departmental Margin Breakdown & Performance</h3>
            <p className="text-xs text-slate-500">Unit economics, cost ratio, and visual profit contribution</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
            Fiscal 2026 Audit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-black tracking-wider uppercase text-[10px]">
                <th className="py-3 px-3">Product Category</th>
                <th className="py-3 px-3">Gross Sales</th>
                <th className="py-3 px-3">Direct COGS</th>
                <th className="py-3 px-3">Gross Margin</th>
                <th className="py-3 px-3">Margin Contribution Bar</th>
                <th className="py-3 px-3 text-right">Performance Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoryProfits.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{item.category}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">Rs. {item.revenue.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-500">Rs. {item.cogs.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono font-black text-emerald-700">{item.margin}</td>
                  <td className="py-3.5 px-3 w-48">
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {item.percentage}% Efficiency
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}