import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SidebarLayout from './components/SidebarLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pos from './pages/Pos';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import InvoiceBuilder from './pages/InvoiceBuilder';
import Suppliers from './pages/Suppliers';
import UsersRoles from './pages/UsersRoles';
import Reports from './pages/Reports';
import BarcodeGenerator from './pages/BarcodeGenerator';
import Storefront from './pages/Storefront';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<SidebarLayout><Dashboard /></SidebarLayout>} />
          <Route path="/pos" element={<SidebarLayout><Pos /></SidebarLayout>} />
          <Route path="/products" element={<SidebarLayout><Products /></SidebarLayout>} />
          <Route path="/barcodes" element={<SidebarLayout><BarcodeGenerator /></SidebarLayout>} />
          <Route path="/categories" element={<SidebarLayout><Categories /></SidebarLayout>} />
          <Route path="/inventory" element={<SidebarLayout><Inventory /></SidebarLayout>} />
          <Route path="/customers" element={<SidebarLayout><Customers /></SidebarLayout>} />
          <Route path="/invoice-builder" element={<SidebarLayout><InvoiceBuilder /></SidebarLayout>} />
          <Route path="/suppliers" element={<SidebarLayout><Suppliers /></SidebarLayout>} />
          <Route path="/users-roles" element={<SidebarLayout><UsersRoles /></SidebarLayout>} />
          <Route path="/reports" element={<SidebarLayout><Reports /></SidebarLayout>} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/store" element={<Storefront />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}