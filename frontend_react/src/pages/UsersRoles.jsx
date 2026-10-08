import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  KeyRound, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  X, 
  UserCheck, 
  SlidersHorizontal,
  Clock
} from 'lucide-react';

export default function UsersRoles() {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'roles'
  const [search, setSearch] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Available predefined system roles
  const [roles] = useState([
    {
      id: 'admin',
      name: 'System Administrator',
      badge: 'Full Access',
      color: 'purple',
      description: 'Unrestricted control over system configuration, ledgers, accounts, and reports.',
      permissions: ['POS Terminal Access', 'Manage Products & Stock', 'B2B Client Ledgers', 'Manage Users & Roles', 'Export Reports', 'Approve Discounts']
    },
    {
      id: 'manager',
      name: 'Store Manager',
      badge: 'Operational',
      color: 'emerald',
      description: 'Day-to-day mart oversight, inventory procurement, price adjustments, and shift reporting.',
      permissions: ['POS Terminal Access', 'Manage Products & Stock', 'B2B Client Ledgers', 'Export Reports', 'Approve Discounts']
    },
    {
      id: 'cashier',
      name: 'Cashier / POS Operator',
      badge: 'Sales Only',
      color: 'blue',
      description: 'High-speed barcode scanning, customer cash/card checkout, and basic receipt printing.',
      permissions: ['POS Terminal Access', 'Print Sales Slips']
    },
    {
      id: 'inventory_clerk',
      name: 'Inventory Officer',
      badge: 'Stock Only',
      color: 'amber',
      description: 'Warehouse stock entry, SKU barcode verification, supplier delivery reception, and batch tracking.',
      permissions: ['Manage Products & Stock', 'Supplier Purchase Orders', 'Stock Health Alerts']
    }
  ]);

  // Registered Users Directory
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin123',
      name: 'Muhammad Ahmad',
      email: 'ahmad@martflow.com',
      role: 'System Administrator',
      roleId: 'admin',
      terminal: 'Central HQ',
      status: 'Active',
      lastLogin: 'Today, 11:20 AM'
    },
    {
      id: 2,
      username: 'tariq_manager',
      name: 'Tariq Mehmood',
      email: 'tariq@martflow.com',
      role: 'Store Manager',
      roleId: 'manager',
      terminal: 'Floor Terminal 01',
      status: 'Active',
      lastLogin: 'Today, 09:14 AM'
    },
    {
      id: 3,
      username: 'bilal_pos',
      name: 'Bilal Hassan',
      email: 'bilal@martflow.com',
      role: 'Cashier / POS Operator',
      roleId: 'cashier',
      terminal: 'Checkout Counter 02',
      status: 'Active',
      lastLogin: 'Yesterday, 08:45 PM'
    },
    {
      id: 4,
      username: 'usman_stock',
      name: 'Usman Ali',
      email: 'usman@martflow.com',
      role: 'Inventory Officer',
      roleId: 'inventory_clerk',
      terminal: 'Warehouse Bay 04',
      status: 'Inactive',
      lastLogin: '28 Sep 2026'
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    roleId: 'cashier',
    terminal: 'Counter 01',
    password: '',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      username: '',
      email: '',
      roleId: 'cashier',
      terminal: 'Checkout Counter 01',
      password: '',
      status: 'Active'
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      terminal: user.terminal,
      password: '',
      status: user.status
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const assignedRole = roles.find(r => r.id === formData.roleId);

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { 
              ...u, 
              name: formData.name, 
              username: formData.username, 
              email: formData.email, 
              role: assignedRole?.name || u.role,
              roleId: formData.roleId,
              terminal: formData.terminal,
              status: formData.status
            } 
          : u
      ));
    } else {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        username: formData.username,
        email: formData.email,
        role: assignedRole?.name || 'Cashier',
        roleId: formData.roleId,
        terminal: formData.terminal,
        status: formData.status,
        lastLogin: 'Never'
      };
      setUsers([newUser, ...users]);
    }
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to deactivate or remove this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" size={28} /> Users & Role-Based Access Control
          </h2>
          <p className="text-xs text-slate-500 font-medium">Manage cashier permissions, operational roles, terminal access rights, and employee credentials.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition"
        >
          <UserPlus size={16} /> Add System User
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Registered Users</span>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-2">{users.length}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Across all terminals</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Operators</span>
          <div className="text-2xl font-black text-emerald-600 tracking-tight mt-2">
            {users.filter(u => u.status === 'Active').length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Authorized for terminal login</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Defined Roles</span>
          <div className="text-2xl font-black text-blue-600 tracking-tight mt-2">{roles.length} Roles</div>
          <p className="text-[11px] text-slate-400 mt-1">Granular RBAC profiles</p>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Security Protocol</span>
          <div className="text-2xl font-black text-purple-600 tracking-tight mt-2">JWT + RBAC</div>
          <p className="text-[11px] text-purple-600 font-semibold mt-1">Token session validation</p>
        </div>
      </div>

      {/* Navigation Tabs (Users vs Roles Matrix) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'users'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <UserCheck size={15} /> User Accounts
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'roles'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <KeyRound size={15} /> Roles & Permissions Matrix
            </button>
          </div>

          {activeTab === 'users' && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, role or username..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
          )}
        </div>

        {/* Tab 1: Users Table */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
                  <th className="py-3 px-4">Operator</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Terminal / Location</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-600">@{u.username}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{u.terminal}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-500 flex items-center gap-1.5 pt-4">
                      <Clock size={13} className="text-slate-400" /> {u.lastLogin}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        title="Edit User"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Roles & Permissions Matrix */}
        {activeTab === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roles.map((r) => (
              <div 
                key={r.id}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition shadow-2xs space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-base text-slate-900">{r.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.description}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0">
                    {r.badge}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Granted Permissions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.permissions.map((perm, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-slate-200 text-slate-700 flex items-center gap-1.5 shadow-2xs"
                      >
                        <CheckCircle2 size={12} className="text-emerald-600 shrink-0" /> {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl border border-slate-100 font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-5">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  {editingUser ? 'Edit System User' : 'Create New System Operator'}
                </h3>
                <p className="text-xs text-slate-400">Configure credentials, terminal, and access role level.</p>
              </div>
              <button onClick={() => setIsUserModalOpen(false)}>
                <X size={18} className="text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ullah"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. asad_pos"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="operator@martflow.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Terminal</label>
                  <input
                    type="text"
                    placeholder="e.g. Counter 03"
                    value={formData.terminal}
                    onChange={e => setFormData({ ...formData, terminal: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">System Role *</label>
                  <select
                    value={formData.roleId}
                    onChange={e => setFormData({ ...formData, roleId: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-bold text-slate-800 bg-white"
                  >
                    <option value="cashier">Cashier / POS Operator</option>
                    <option value="manager">Store Manager</option>
                    <option value="inventory_clerk">Inventory Officer</option>
                    <option value="admin">System Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Account Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-bold text-slate-800 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {!editingUser && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Login Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs"
                >
                  {editingUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}