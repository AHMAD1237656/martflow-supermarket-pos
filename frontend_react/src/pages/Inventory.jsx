import React, { useState } from 'react';
import { Boxes, Search, AlertTriangle, ArrowUpDown, Filter, Printer } from 'lucide-react';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all');

  const stockItems = [
    { sku: 'MF-001', name: 'Nestle Pure Life 500ml', category: 'Beverages', inStock: 97, threshold: 30, costPrice: 48, salePrice: 60, status: 'Adequate' },
    { sku: 'MF-002', name: "Olper's Milk 1L", category: 'Dairy', inStock: 45, threshold: 25, costPrice: 245, salePrice: 280, status: 'Adequate' },
    { sku: 'MF-003', name: 'Dawn Plain Bread (Large)', category: 'Bakery', inStock: 18, threshold: 20, costPrice: 95, salePrice: 120, status: 'Low Stock' },
    { sku: 'MF-004', name: 'Knorr Chattpatta Noodles', category: 'Grocery', inStock: 8, threshold: 30, costPrice: 42, salePrice: 55, status: 'Critical' },
    { sku: 'MF-005', name: 'National Chilli Garlic 500g', category: 'Grocery', inStock: 12, threshold: 25, costPrice: 310, salePrice: 360, status: 'Low Stock' },
    { sku: 'MF-006', name: 'Lipton Yellow Label 400g', category: 'Tea', inStock: 5, threshold: 20, costPrice: 580, salePrice: 660, status: 'Critical' },
  ];

  const filtered = stockItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.includes(search);
    const matchFilter = 
      stockFilter === 'all' || 
      (stockFilter === 'low' && (item.status === 'Low Stock' || item.status === 'Critical'));
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Boxes className="text-emerald-600" size={26} /> Inventory & Stock Valuation
          </h2>
          <p className="text-xs text-slate-500 font-medium">Track on-hand stock quantities, reorder points, asset valuation, and stock alerts.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition"
        >
          <Printer size={15} /> Print Stock Sheet
        </button>
      </div>

      {/* Inventory KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Stock Count</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-2">185 Units</div>
          <p className="text-[11px] text-slate-400 mt-1">Across active inventory catalog</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Asset Value</span>
          <div className="text-2xl font-black text-emerald-600 font-mono mt-2">Rs. 48,250</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Calculated at wholesale cost</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Replenishment Alerts</span>
          <div className="text-2xl font-black text-rose-600 font-mono mt-2">4 Items Low</div>
          <p className="text-[11px] text-rose-500 font-semibold mt-1">Reorder orders recommended</p>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-black text-base text-slate-900">Stock Levels & Health</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search SKU or item name..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
            <select
              value={stockFilter}
              onChange={e => setStockFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Items</option>
              <option value="low">Low Stock Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">In Stock</th>
                <th className="py-3 px-4 text-center">Safety Limit</th>
                <th className="py-3 px-4 text-right">Cost Price</th>
                <th className="py-3 px-4 text-right">Retail Price</th>
                <th className="py-3 px-4 text-center">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filtered.map(item => (
                <tr key={item.sku} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-400">{item.sku}</td>
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900">{item.name}</td>
                  <td className="py-3.5 px-4 font-sans text-slate-600">{item.category}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">{item.inStock}</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">{item.threshold}</td>
                  <td className="py-3.5 px-4 text-right text-slate-600">Rs. {item.costPrice}</td>
                  <td className="py-3.5 px-4 text-right text-slate-900 font-black">Rs. {item.salePrice}</td>
                  <td className="py-3.5 px-4 text-center font-sans">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.status === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : item.status === 'Low Stock'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {item.status}
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