import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LayoutDashboard, LogOut, Store } from 'lucide-react';

export default function Navbar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400">
          <Store size={22} />
        </div>
        <div>
          <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
            MartFlow <span className="text-emerald-400 text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10">POS</span>
          </span>
          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Supermarket System</span>
        </div>
      </div>

      {/* Navigation Links (POS vs Dashboard) */}
      <nav className="flex items-center gap-2 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
        <Link
          to="/pos"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
            isActive('/pos')
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <ShoppingCart size={16} />
          Terminal
        </Link>
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
            isActive('/dashboard')
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>
      </nav>

      {/* User Session & Logout */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <div className="text-xs font-bold text-white capitalize">{user?.username || 'Admin'}</div>
          <div className="text-[10px] text-emerald-400 font-mono font-semibold">ROLE: ADMIN</div>
        </div>
        <button
          onClick={logout}
          title="Sign out of system"
          className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}