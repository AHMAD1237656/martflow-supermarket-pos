// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Store, 
//   LayoutDashboard, 
//   ShoppingCart, 
//   Package, 
//   ScanBarcode,
//   Tags, 
//   Boxes, 
//   Users, 
//   FileSliders,
//   Truck, 
//   ShieldCheck,
//   BarChart3, 
//   LogOut, 
//   Search, 
//   Bell, 
//   Menu, 
//   X,
//  Globe
// } from 'lucide-react';

// export default function SidebarLayout({ children }) {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   // Auto-close mobile drawer whenever a navigation link is clicked
//   useEffect(() => {
//     setMobileOpen(false);
//   }, [location.pathname]);

//   // Prevent background scrolling when mobile menu drawer is open
//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [mobileOpen]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const navItems = [
//     { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
//     { label: 'Sales / POS', path: '/pos', icon: ShoppingCart },
//     { label: 'Customer Online Store', path: '/store', icon: Globe },
//     { label: 'Products', path: '/products', icon: Package },
//     { label: 'Barcode Labels', path: '/barcodes', icon: ScanBarcode },
//     { label: 'Categories', path: '/categories', icon: Tags },
//     { label: 'Inventory & Stock', path: '/inventory', icon: Boxes },
//     { label: 'Client Ledgers', path: '/customers', icon: Users },
//     { label: 'Invoice Builder', path: '/invoice-builder', icon: FileSliders },
//     { label: 'Suppliers & PO', path: '/suppliers', icon: Truck },
//     { label: 'Users & Roles', path: '/users-roles', icon: ShieldCheck },
//     { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
//   ];

//   return (
//     <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
//       {/* 1. Mobile Backdrop Overlay */}
//       {mobileOpen && (
//         <div 
//           onClick={() => setMobileOpen(false)}
//           className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
//           aria-hidden="true"
//         />
//       )}

//       {/* 2. Responsive Emerald Green Sidebar */}
//       <aside
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className={`fixed lg:static inset-y-0 left-0 z-50 bg-emerald-700 border-r border-emerald-800 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none text-white ${
//           /* Mobile Drawer: Slides in/out smoothly */
//           mobileOpen 
//             ? 'w-72 sm:w-80 translate-x-0' 
//             : '-translate-x-full lg:translate-x-0'
//         } ${
//           /* Desktop/Tablet Hover Expansion */
//           isHovered ? 'lg:w-64' : 'lg:w-20'
//         }`}
//       >
//         <div className="flex flex-col flex-1 min-h-0">
          
//           {/* Brand Header */}
//           <div className="h-16 px-4 flex items-center justify-between border-b border-emerald-600/50 shrink-0">
//             <div className="flex items-center gap-3 overflow-hidden">
//               <div className="w-10 h-10 rounded-2xl bg-white text-emerald-700 flex items-center justify-center font-black shadow-md shrink-0">
//                 <Store size={22} />
//               </div>
//               <div className={`transition-opacity duration-200 whitespace-nowrap ${
//                 isHovered || mobileOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'
//               }`}>
//                 <h1 className="font-black text-lg tracking-tight text-white leading-tight">MartFlow</h1>
//                 <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Supermarket OS</p>
//               </div>
//             </div>

//             {/* Mobile Close Button */}
//             <button 
//               onClick={() => setMobileOpen(false)}
//               className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-600/50 lg:hidden transition cursor-pointer"
//               aria-label="Close menu"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Navigation Links with Custom Responsive Scroll */}
//           <div className="p-3 space-y-1.5 overflow-y-auto flex-1 custom-scroll">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   title={!isHovered && !mobileOpen ? item.label : undefined}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 group ${
//                       isActive
//                         ? 'bg-white text-emerald-800 shadow-md font-black'
//                         : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
//                     }`
//                   }
//                 >
//                   {({ isActive }) => (
//                     <>
//                       <Icon 
//                         size={19} 
//                         className={`shrink-0 transition-colors ${
//                           isActive 
//                             ? 'text-emerald-700' 
//                             : 'text-emerald-200 group-hover:text-white'
//                         }`} 
//                       />
//                       <span className={`whitespace-nowrap tracking-wide transition-all duration-200 ${
//                         isHovered || mobileOpen ? 'opacity-100 inline-block' : 'lg:opacity-0 lg:hidden'
//                       } ${isActive ? 'font-black' : 'font-semibold'}`}>
//                         {item.label}
//                       </span>
//                     </>
//                   )}
//                 </NavLink>
//               );
//             })}
//           </div>
//         </div>

//         {/* Sidebar Footer Logout */}
//         <div className="p-3 border-t border-emerald-600/50 shrink-0">
//           <button
//             onClick={handleLogout}
//             title={!isHovered && !mobileOpen ? "Logout" : undefined}
//             className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-200 hover:bg-rose-500/20 hover:text-white transition cursor-pointer"
//           >
//             <LogOut size={19} className="shrink-0" />
//             <span className={`whitespace-nowrap transition-all duration-200 ${
//               isHovered || mobileOpen ? 'opacity-100 inline-block' : 'lg:opacity-0 lg:hidden'
//             }`}>
//               Logout
//             </span>
//           </button>
//         </div>
//       </aside>

//       {/* 3. Main Application Container */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
//         {/* Top Header Bar */}
//         <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
          
//           <div className="flex items-center gap-3 flex-1 max-w-lg">
//             {/* Mobile Hamburger Toggle Button */}
//             <button 
//               onClick={() => setMobileOpen(true)}
//               className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden transition cursor-pointer"
//               aria-label="Open navigation menu"
//             >
//               <Menu size={22} />
//             </button>

//             {/* Global Search Bar (Responsive visibility) */}
//             <div className="relative w-full hidden sm:block">
//               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search products, client accounts, invoice #..."
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
//               />
//             </div>
//           </div>

//           {/* User Profile & Notification Badges */}
//           <div className="flex items-center gap-3">
//             <button 
//               className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition"
//               aria-label="Notifications"
//             >
//               <Bell size={18} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
//             </button>

//             <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
//               <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
//                 {user?.username ? user.username.slice(0, 2).toUpperCase() : 'AD'}
//               </div>
//               <div className="text-left hidden md:block">
//                 <p className="text-xs font-black text-slate-900 leading-tight">
//                   {user?.username || 'Admin'}
//                 </p>
//                 <p className="text-[10px] text-emerald-600 font-semibold">Store Manager</p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Dynamic Page Workspace with Independent Viewport Scroll */}
//         <main className="flex-1 overflow-y-auto overflow-x-hidden">
//           {children}
//         </main>
//       </div>

//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Store, 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ScanBarcode, 
  Tags, 
  Boxes, 
  Users, 
  FileSliders, 
  Truck, 
  ShieldCheck, 
  BarChart3, 
  LogOut, 
  Search, 
  Bell, 
  Menu, 
  X,
  Globe,
  PackageCheck
} from 'lucide-react';

export default function SidebarLayout({ children }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // --- Real-time Order Queue State ---
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const syncOrders = () => {
    const orders = JSON.parse(localStorage.getItem('martflow_online_orders') || '[]');
    setOnlineOrders(orders);
  };

  useEffect(() => {
    syncOrders();
    window.addEventListener('storage', syncOrders);
    const interval = setInterval(syncOrders, 2000);
    return () => {
      window.removeEventListener('storage', syncOrders);
      clearInterval(interval);
    };
  }, []);

  const pendingOrders = onlineOrders.filter(o => o.status === 'Pending Dispatch');

  const markDispatched = (orderId) => {
    const updated = onlineOrders.map(ord => 
      ord.orderId === orderId ? { ...ord, status: 'Dispatched & Completed' } : ord
    );
    setOnlineOrders(updated);
    localStorage.setItem('martflow_online_orders', JSON.stringify(updated));
  };
  // -----------------------------------

  // Auto-close mobile drawer whenever a navigation link is clicked
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Sales / POS', path: '/pos', icon: ShoppingCart },
    { label: 'Customer Online Store', path: '/store', icon: Globe },
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Barcode Labels', path: '/barcodes', icon: ScanBarcode },
    { label: 'Categories', path: '/categories', icon: Tags },
    { label: 'Inventory & Stock', path: '/inventory', icon: Boxes },
    { label: 'Client Ledgers', path: '/customers', icon: Users },
    { label: 'Invoice Builder', path: '/invoice-builder', icon: FileSliders },
    { label: 'Suppliers & PO', path: '/suppliers', icon: Truck },
    { label: 'Users & Roles', path: '/users-roles', icon: ShieldCheck },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* 1. Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 2. Responsive Emerald Green Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-emerald-700 border-r border-emerald-800 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none text-white ${
          mobileOpen 
            ? 'w-72 sm:w-80 translate-x-0' 
            : '-translate-x-full lg:translate-x-0'
        } ${
          isHovered ? 'lg:w-64' : 'lg:w-20'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-emerald-600/50 shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-white text-emerald-700 flex items-center justify-center font-black shadow-md shrink-0">
                <Store size={22} />
              </div>
              <div className={`transition-opacity duration-200 whitespace-nowrap ${
                isHovered || mobileOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'
              }`}>
                <h1 className="font-black text-lg tracking-tight text-white leading-tight">MartFlow</h1>
                <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Supermarket OS</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-600/50 lg:hidden transition cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links with Custom Responsive Scroll */}
          <div className="p-3 space-y-1.5 overflow-y-auto flex-1 custom-scroll">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={!isHovered && !mobileOpen ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 group ${
                      isActive
                        ? 'bg-white text-emerald-800 shadow-md font-black'
                        : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon 
                        size={19} 
                        className={`shrink-0 transition-colors ${
                          isActive 
                            ? 'text-emerald-700' 
                            : 'text-emerald-200 group-hover:text-white'
                        }`} 
                      />
                      <span className={`whitespace-nowrap tracking-wide transition-all duration-200 ${
                        isHovered || mobileOpen ? 'opacity-100 inline-block' : 'lg:opacity-0 lg:hidden'
                      } ${isActive ? 'font-black' : 'font-semibold'}`}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-3 border-t border-emerald-600/50 shrink-0">
          <button
            onClick={handleLogout}
            title={!isHovered && !mobileOpen ? "Logout" : undefined}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-200 hover:bg-rose-500/20 hover:text-white transition cursor-pointer"
          >
            <LogOut size={19} className="shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-200 ${
              isHovered || mobileOpen ? 'opacity-100 inline-block' : 'lg:opacity-0 lg:hidden'
            }`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* 3. Main Application Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs">
          
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Global Search Bar */}
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search products, client accounts, invoice #..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* User Profile & Notification Badges */}
          <div className="flex items-center gap-3">
            {/* Working Real-time Bell Icon */}
            <button 
              onClick={() => { syncOrders(); setShowDrawer(true); }}
              className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Online Orders Notifications"
            >
              <Bell size={18} className={pendingOrders.length > 0 ? 'text-rose-600 animate-bounce' : ''} />
              {pendingOrders.length > 0 ? (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-rose-600 text-white font-black text-[10px] rounded-full flex items-center justify-center px-1">
                  {pendingOrders.length}
                </span>
              ) : (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
              )}
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user?.username ? user.username.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-black text-slate-900 leading-tight">
                  {user?.username || 'Admin'}
                </p>
                <p className="text-[10px] text-emerald-600 font-semibold">Store Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Workspace with Independent Viewport Scroll */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* 4. Slide-out Dispatch Drawer for Customer Orders */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between font-sans">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Storefront Dispatch Queue</h3>
                  <p className="text-xs text-slate-500">Live incoming customer online orders</p>
                </div>
                <button 
                  onClick={() => setShowDrawer(false)} 
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 font-black cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 space-y-3 overflow-y-auto max-h-[75vh] pr-1">
                {onlineOrders.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 text-xs">
                    No customer store orders received yet.
                  </div>
                ) : (
                  onlineOrders.map((ord) => (
                    <div key={ord.orderId} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900">{ord.orderId}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ord.status.includes('Dispatched') 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-600">
                        <div className="font-bold text-slate-800">{ord.customer.name} ({ord.customer.phone})</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{ord.customer.address}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="font-mono font-black text-slate-900 text-sm">Rs. {ord.total}</span>
                        {ord.status !== 'Dispatched & Completed' && (
                          <button 
                            onClick={() => markDispatched(ord.orderId)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs"
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
              onClick={() => setShowDrawer(false)} 
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}