import React, { useState } from 'react';
import { Tags, Plus, Search, Edit2, Trash2, X, FolderTree } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages', slug: 'beverages', aisle: 'Aisle 01', itemCount: 42, color: 'emerald' },
    { id: 2, name: 'Dairy & Eggs', slug: 'dairy', aisle: 'Chiller 03', itemCount: 28, color: 'blue' },
    { id: 3, name: 'Bakery & Bread', slug: 'bakery', aisle: 'Aisle 02', itemCount: 19, color: 'amber' },
    { id: 4, name: 'Snacks & Confectionery', slug: 'snacks', aisle: 'Aisle 04', itemCount: 54, color: 'purple' },
    { id: 5, name: 'Spices & Cooking Oil', slug: 'grocery', aisle: 'Aisle 05', itemCount: 65, color: 'rose' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', aisle: '' });

  const handleAddCategory = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      name: newCat.name,
      slug: newCat.name.toLowerCase().replace(/\s+/g, '-'),
      aisle: newCat.aisle || 'General Shelf',
      itemCount: 0,
      color: 'emerald'
    };
    setCategories([...categories, item]);
    setIsModalOpen(false);
    setNewCat({ name: '', aisle: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.aisle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Tags className="text-emerald-600" size={26} /> Product Categories & Aisles
          </h2>
          <p className="text-xs text-slate-500 font-medium">Organize supermarket aisles, racks, product groupings, and department taxonomy.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Category Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-black text-base text-slate-900">Supermarket Departments</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter categories or aisle..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(cat => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <FolderTree size={20} />
                </div>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1 rounded-lg text-slate-300 hover:text-rose-600 transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div>
                <h4 className="font-bold text-base text-slate-900">{cat.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {cat.aisle}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">• {cat.itemCount} items</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-black text-base text-slate-900">New Category / Department</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frozen Foods"
                  value={newCat.name}
                  onChange={e => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Aisle / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Deep Freezer 02"
                  value={newCat.aisle}
                  onChange={e => setNewCat({ ...newCat, aisle: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                />
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}