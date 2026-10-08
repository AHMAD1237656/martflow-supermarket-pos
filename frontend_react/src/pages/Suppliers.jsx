import React, { useState } from 'react';
import { Truck, Plus, Search, Phone, MapPin, X, Building2 } from 'lucide-react';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Engro Foods Distribution', contactPerson: 'Khurram Shehzad', phone: '0300-8877665', city: 'Faisalabad', category: 'Dairy & Beverages', status: 'Active' },
    { id: 2, name: 'Nestle Pakistan Wholesale', contactPerson: 'Tariq Mehmood', phone: '0321-4433221', city: 'Lahore', category: 'Water & Nutrition', status: 'Active' },
    { id: 3, name: 'Dawn Bread Agency', contactPerson: 'Rashid Khan', phone: '0333-9988776', city: 'Faisalabad', category: 'Bakery Supply', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    city: '',
    category: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const sup = {
      id: Date.now(),
      ...newSupplier,
      status: 'Active'
    };
    setSuppliers([...suppliers, sup]);
    setIsModalOpen(false);
    setNewSupplier({ name: '', contactPerson: '', phone: '', city: '', category: '' });
  };

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Truck className="text-emerald-600" size={26} /> Suppliers & Purchase Procurement
          </h2>
          <p className="text-xs text-slate-500 font-medium">Wholesale distributors, purchase logistics, procurement contacts, and supplier records.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition"
        >
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-black text-base text-slate-900">Approved Wholesale Suppliers</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vendor or phone..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="py-3 px-4">Distributor Company</th>
                <th className="py-3 px-4">Contact Representative</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Hub / City</th>
                <th className="py-3 px-4">Supply Category</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 size={16} className="text-emerald-600 shrink-0" />
                    {s.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{s.contactPerson}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-600">{s.phone}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.city}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-black text-base text-slate-900">Add Wholesale Supplier</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Distributor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unilever Pakistan"
                  value={newSupplier.name}
                  onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Asif Raza"
                    value={newSupplier.contactPerson}
                    onChange={e => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="0300-1122334"
                    value={newSupplier.phone}
                    onChange={e => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Faisalabad"
                    value={newSupplier.city}
                    onChange={e => setNewSupplier({ ...newSupplier, city: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Spices / Dairy"
                    value={newSupplier.category}
                    onChange={e => setNewSupplier({ ...newSupplier, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}