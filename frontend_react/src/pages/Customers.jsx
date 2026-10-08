import React, { useState } from 'react';
import { 
  BookOpen, 
  UserPlus, 
  Search, 
  Phone, 
  MapPin, 
  Printer, 
  PlusCircle, 
  FileSpreadsheet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  X, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  CreditCard,
  Banknote,
  Receipt,
  Clock,
  Lock,
  Unlock
} from 'lucide-react';

export default function Customers() {
  // Client Directory with Aging, Credit Freeze, and Cheque Tracking
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Haji Aslam General Store',
      owner: 'Haji Aslam',
      phone: '03007654321',
      city: 'Faisalabad',
      address: 'Main Bazar, Ghulam Muhammad Abad',
      creditLimit: 50000,
      balance: 28500,
      isFrozen: false,
      aging: { current: 6500, days30: 22000, days60Plus: 0 },
      status: 'Active',
      transactions: [
        { id: 'TX-101', date: '2026-08-15', desc: 'Opening Ledger Balance', ref: 'SYS-INIT', debit: 15000, credit: 0, balance: 15000, method: 'Initial Record', chequeStatus: '-' },
        { id: 'TX-102', date: '2026-09-02', desc: 'Credit Sale Invoice #INV-9821', ref: 'INV-9821', debit: 22000, credit: 0, balance: 37000, method: 'Goods Dispatched', chequeStatus: '-' },
        { id: 'TX-103', date: '2026-09-20', desc: 'Payment via Clearing Cheque', ref: 'HBL-99120', debit: 0, credit: 15000, balance: 22000, method: 'Cheque Deposit', chequeStatus: 'Cleared' },
        { id: 'TX-104', date: '2026-09-29', desc: 'Credit Sale Invoice #INV-9904', ref: 'INV-9904', debit: 6500, credit: 0, balance: 28500, method: 'Goods Dispatched', chequeStatus: '-' },
      ]
    },
    {
      id: 2,
      name: 'Bismillah Bakers & Sweets',
      owner: 'Muhammad Tariq',
      phone: '03219876543',
      city: 'Lahore',
      address: 'Shop #12, Commercial Market, Gulberg',
      creditLimit: 30000,
      balance: 14200,
      isFrozen: false,
      aging: { current: 14200, days30: 0, days60Plus: 0 },
      status: 'Active',
      transactions: [
        { id: 'TX-201', date: '2026-09-18', desc: 'Bakery Supplies Bulk Order', ref: 'INV-9844', debit: 24200, credit: 0, balance: 24200, method: 'Goods Dispatched', chequeStatus: '-' },
        { id: 'TX-202', date: '2026-09-26', desc: 'Cash Payment Received', ref: 'RCP-4410', debit: 0, credit: 10000, balance: 14200, method: 'Cash Counter', chequeStatus: '-' },
      ]
    },
    {
      id: 3,
      name: 'Chaudhry Super Mart',
      owner: 'Zahid Chaudhry',
      phone: '03331122334',
      city: 'Gujranwala',
      address: 'GT Road, Near Model Town Gate',
      creditLimit: 75000,
      balance: 42000,
      isFrozen: true,
      aging: { current: 0, days30: 12000, days60Plus: 30000 },
      status: 'Overdue',
      transactions: [
        { id: 'TX-301', date: '2026-07-10', desc: 'Beverages Wholesale Dispatch', ref: 'INV-9799', debit: 42000, credit: 0, balance: 42000, method: 'Goods Dispatched', chequeStatus: '-' },
        { id: 'TX-302', date: '2026-08-01', desc: 'Payment Cheque Returned/Bounced', ref: 'MCB-00812', debit: 0, credit: 0, balance: 42000, method: 'Cheque Deposit', chequeStatus: 'Bounced' },
      ]
    }
  ]);

  const [selectedClientId, setSelectedClientId] = useState(1);
  const [search, setSearch] = useState('');
  const [txFilter, setTxFilter] = useState('ALL');
  const [feedback, setFeedback] = useState('');

  // Modals
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  // New Transaction Form State
  const [newTx, setNewTx] = useState({
    type: 'DEBIT',
    amount: '',
    desc: '',
    ref: '',
    method: 'Cash Counter',
    chequeStatus: '-',
    date: new Date().toISOString().split('T')[0]
  });

  // New Client Form State
  const [newClient, setNewClient] = useState({
    name: '',
    owner: '',
    phone: '',
    city: '',
    address: '',
    creditLimit: '50000',
    openingBalance: '0'
  });

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const totalMarketReceivables = clients.reduce((acc, c) => acc + c.balance, 0);

  // WhatsApp Reminder Link Generator
  const handleSendWhatsAppReminder = () => {
    const rawPhone = selectedClient.phone.replace(/[^0-9]/g, '');
    const intlPhone = rawPhone.startsWith('0') ? '92' + rawPhone.slice(1) : rawPhone;
    const msg = `Assalam-o-Alaikum ${selectedClient.name},\nThis is an account statement update from MartFlow Supermarket.\nYour current outstanding balance is Rs. ${selectedClient.balance.toLocaleString()}.\nPlease arrange clearance at your earliest convenience.\nThank you!`;
    const url = `https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Toggle Account Freeze
  const handleToggleFreeze = () => {
    const updated = clients.map(c => 
      c.id === selectedClient.id ? { ...c, isFrozen: !c.isFrozen } : c
    );
    setClients(updated);
    setFeedback(`Account status updated: ${!selectedClient.isFrozen ? 'Credit Line Frozen' : 'Credit Line Unfrozen'}`);
    setTimeout(() => setFeedback(''), 3000);
  };

  // Add Transaction Handler
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(newTx.amount) || 0;
    if (amountNum <= 0) return;

    const isDebit = newTx.type === 'DEBIT';
    const newBalance = isDebit 
      ? selectedClient.balance + amountNum 
      : selectedClient.balance - amountNum;

    const txItem = {
      id: 'TX-' + Math.floor(100 + Math.random() * 900),
      date: newTx.date,
      desc: newTx.desc || (isDebit ? 'Credit Sale Invoice' : 'Payment Received'),
      ref: newTx.ref || 'DIR-MANUAL',
      debit: isDebit ? amountNum : 0,
      credit: !isDebit ? amountNum : 0,
      balance: newBalance,
      method: newTx.method,
      chequeStatus: newTx.method === 'Cheque Deposit' ? newTx.chequeStatus : '-'
    };

    const updatedClients = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          balance: newBalance,
          status: newBalance <= 0 ? 'Cleared' : (newBalance > c.creditLimit ? 'Overdue' : 'Active'),
          transactions: [...c.transactions, txItem]
        };
      }
      return c;
    });

    setClients(updatedClients);
    setIsTxModalOpen(false);
    setNewTx({
      type: 'DEBIT',
      amount: '',
      desc: '',
      ref: '',
      method: 'Cash Counter',
      chequeStatus: '-',
      date: new Date().toISOString().split('T')[0]
    });
    setFeedback('Transaction entry successfully posted.');
    setTimeout(() => setFeedback(''), 3000);
  };

  // Create Client
  const handleCreateClient = (e) => {
    e.preventDefault();
    const opBal = parseFloat(newClient.openingBalance) || 0;
    const cLimit = parseFloat(newClient.creditLimit) || 50000;

    const created = {
      id: Date.now(),
      name: newClient.name,
      owner: newClient.owner || newClient.name,
      phone: newClient.phone,
      city: newClient.city || 'Local',
      address: newClient.address || 'Commercial Market',
      creditLimit: cLimit,
      balance: opBal,
      isFrozen: false,
      aging: { current: opBal, days30: 0, days60Plus: 0 },
      status: opBal > 0 ? 'Active' : 'Cleared',
      transactions: opBal > 0 ? [
        {
          id: 'TX-001',
          date: new Date().toISOString().split('T')[0],
          desc: 'Opening Ledger Balance',
          ref: 'INIT',
          debit: opBal,
          credit: 0,
          balance: opBal,
          method: 'Initial Record',
          chequeStatus: '-'
        }
      ] : []
    };

    setClients([created, ...clients]);
    setSelectedClientId(created.id);
    setIsNewClientModalOpen(false);
    setNewClient({
      name: '',
      owner: '',
      phone: '',
      city: '',
      address: '',
      creditLimit: '50000',
      openingBalance: '0'
    });
    setFeedback('New client ledger registered.');
    setTimeout(() => setFeedback(''), 3000);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!selectedClient?.transactions?.length) return;
    const headers = ['Tx ID,Date,Description,Reference,Method,Debit,Credit,Balance,Cheque Status'];
    const rows = selectedClient.transactions.map(t => 
      `"${t.id}","${t.date}","${t.desc}","${t.ref}","${t.method}",${t.debit},${t.credit},${t.balance},"${t.chequeStatus}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `${selectedClient.name.replace(/\s+/g, '_')}_Statement.csv`;
    link.click();
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTransactions = selectedClient.transactions.filter(t => {
    if (txFilter === 'DEBIT') return t.debit > 0;
    if (txFilter === 'CREDIT') return t.credit > 0;
    return true;
  });

  const creditUsagePercent = Math.min(100, Math.round((selectedClient.balance / selectedClient.creditLimit) * 100));

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="text-emerald-600" size={26} /> B2B Client Ledgers & Credit Control
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage wholesale party accounts, track debit/credit invoices, aging cycles, and WhatsApp reminders[cite: 4, 9].
          </p>
        </div>

        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition"
        >
          <UserPlus size={16} /> Create New Account
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 size={16} /> {feedback}
        </div>
      )}

      {/* Overview Cards with Aging Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Market Receivables</span>
          <div className="text-2xl font-black text-rose-600 tracking-tight mt-2">
            Rs. {totalMarketReceivables.toLocaleString()}
          </div>
          <p className="text-[11px] text-rose-500 font-semibold mt-1">Pending across commercial network</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current Cycle (0-30 Days)</span>
          <div className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            Rs. {clients.reduce((acc, c) => acc + (c.aging?.current || 0), 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Healthy collection window</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Overdue (&gt;60 Days Risk)</span>
          <div className="text-2xl font-black text-amber-600 tracking-tight mt-2">
            Rs. {clients.reduce((acc, c) => acc + (c.aging?.days60Plus || 0), 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">Follow-up suggested</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Selected Client Net Balance</span>
          <div className="text-2xl font-black text-emerald-600 tracking-tight mt-2">
            Rs. {selectedClient.balance.toLocaleString()}[cite: 9]
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">{selectedClient.name}[cite: 9]</p>
        </div>
      </div>

      {/* Main Dual-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Client Directory */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">Client Directory[cite: 9]</h3>
              <span className="text-xs font-bold text-slate-400 font-mono">{clients.length} Parties</span>
            </div>

            <div className="relative mt-3 mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search party or phone..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Client Cards */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredClients.map(c => {
                const isSelected = c.id === selectedClient.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedClientId(c.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition text-xs flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">{c.name}</h4>
                          {c.isFrozen && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[9px] font-bold flex items-center gap-0.5">
                              <Lock size={9} /> Frozen
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-1">
                          <span className="flex items-center gap-1 font-mono"><Phone size={11} /> {c.phone}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin size={11} /> {c.city}</span>
                        </div>
                      </div>
                      <span className={`font-black text-xs ${c.balance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        Rs. {c.balance.toLocaleString()}[cite: 9]
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Limit: Rs. {c.creditLimit.toLocaleString()}</span>
                        <span className="font-bold text-slate-600">{Math.round((c.balance / c.creditLimit) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            (c.balance / c.creditLimit) > 0.8 ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, (c.balance / c.creditLimit) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Statement, Aging, Cheques & Action Controls */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            {/* Header with WhatsApp & Freeze Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Account Statement[cite: 9]
                  </span>
                  {selectedClient.isFrozen ? (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      Credit Line Frozen
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Credit Active
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">{selectedClient.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                  <span>Phone: <b className="font-mono text-slate-700">{selectedClient.phone}</b></span>
                  <span>•</span>
                  <span>Location: <b className="text-slate-700">{selectedClient.city}</b></span>
                  <span>•</span>
                  <span>Owner: <b className="text-slate-700">{selectedClient.owner}</b></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSendWhatsAppReminder}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition cursor-pointer"
                  title="Send instant WhatsApp payment reminder with statement balance"
                >
                  <MessageCircle size={15} /> WhatsApp Reminder
                </button>
                <button
                  onClick={handleToggleFreeze}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    selectedClient.isFrozen
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700'
                  }`}
                >
                  {selectedClient.isFrozen ? <Unlock size={14} /> : <Lock size={14} />}
                  {selectedClient.isFrozen ? 'Unfreeze Credit' : 'Freeze Credit'}
                </button>
                <button
                  onClick={() => setIsTxModalOpen(true)}
                  disabled={selectedClient.isFrozen}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white shadow-xs transition cursor-pointer"
                >
                  <PlusCircle size={15} /> Add Transaction[cite: 9]
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs transition"
                >
                  <Printer size={15} /> Print[cite: 9]
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-xs transition"
                >
                  <FileSpreadsheet size={15} /> Export[cite: 4]
                </button>
              </div>
            </div>

            {/* Aging Cycle Cards for Active Party */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">0 - 30 Days Due</span>
                <div className="text-sm font-black text-slate-900 mt-1">Rs. {selectedClient.aging?.current?.toLocaleString() || '0'}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">31 - 60 Days Due</span>
                <div className="text-sm font-black text-amber-600 mt-1">Rs. {selectedClient.aging?.days30?.toLocaleString() || '0'}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">&gt; 60 Days Overdue</span>
                <div className="text-sm font-black text-rose-600 mt-1">Rs. {selectedClient.aging?.days60Plus?.toLocaleString() || '0'}</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs font-bold text-slate-700">Financial History</span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                {['ALL', 'DEBIT', 'CREDIT'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTxFilter(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      txFilter === t
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t === 'ALL' ? 'All Entries' : t === 'DEBIT' ? 'Debits (+)' : 'Credits (-)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions Table with Cheque Status Tracking */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Description & Ref</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4 text-center">Cheque Status</th>
                    <th className="py-3 px-4 text-right text-rose-600">Debit (+)</th>
                    <th className="py-3 px-4 text-right text-emerald-600">Credit (-)</th>
                    <th className="py-3 px-4 text-right font-black">Net Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-sans text-slate-600 whitespace-nowrap">{tx.date}</td>
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-bold text-slate-900">{tx.desc}</div>
                        <div className="text-[11px] font-mono text-slate-400">Ref: {tx.ref}</div>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold border border-slate-200">
                          {tx.method}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        {tx.chequeStatus !== '-' ? (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            tx.chequeStatus === 'Cleared'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : tx.chequeStatus === 'Bounced'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {tx.chequeStatus}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right text-rose-600 font-bold">
                        {tx.debit > 0 ? `Rs. ${tx.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-right text-emerald-600 font-bold">
                        {tx.credit > 0 ? `Rs. ${tx.credit.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                        Rs. {tx.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-500">
            <span className="font-medium">
              Registered Address: <b className="text-slate-700">{selectedClient.address}</b>
            </span>
            <span className="font-black text-slate-900 text-sm font-mono">
              Total Outstanding: <span className="text-rose-600">Rs. {selectedClient.balance.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Modal 1: Add Transaction (Debit / Credit + Cheque Management) */}
      {isTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Post Transaction / Voucher</h3>
                <p className="text-xs text-slate-400">Account: {selectedClient.name}</p>
              </div>
              <button onClick={() => setIsTxModalOpen(false)}><X size={18} className="text-slate-400" /></button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewTx({ ...newTx, type: 'DEBIT' })}
                  className={`py-2.5 rounded-xl font-bold border flex items-center justify-center gap-1.5 transition ${
                    newTx.type === 'DEBIT'
                      ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-xs'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <ArrowUpRight size={16} /> Debit (New Udhaar / Sale)
                </button>
                <button
                  type="button"
                  onClick={() => setNewTx({ ...newTx, type: 'CREDIT' })}
                  className={`py-2.5 rounded-xl font-bold border flex items-center justify-center gap-1.5 transition ${
                    newTx.type === 'CREDIT'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <ArrowDownLeft size={16} /> Credit (Payment Received)
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Transaction Amount (Rs.) *</label>
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  value={newTx.amount}
                  onChange={e => setNewTx({ ...newTx, amount: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-black text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={newTx.method}
                    onChange={e => setNewTx({ ...newTx, method: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Cash Counter">Cash Counter</option>
                    <option value="Raast / Digital">Raast / Digital</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque Deposit">Cheque Deposit</option>
                    <option value="Goods Dispatched">Goods Dispatched</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reference / Cheque #</label>
                  <input
                    type="text"
                    placeholder="e.g. HBL-00918"
                    value={newTx.ref}
                    onChange={e => setNewTx({ ...newTx, ref: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {newTx.method === 'Cheque Deposit' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cheque Clearance Status</label>
                  <select
                    value={newTx.chequeStatus}
                    onChange={e => setNewTx({ ...newTx, chequeStatus: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800"
                  >
                    <option value="Pending Clearance">Pending Clearance</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Bounced">Bounced / Returned</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Partial recovery or grocery cartons dispatch"
                  value={newTx.desc}
                  onChange={e => setNewTx({ ...newTx, desc: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTxModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Create New Client Account */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl border border-slate-100 font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-black text-base text-slate-900">Register New Client Account</h3>
                <p className="text-xs text-slate-400">Add B2B merchant, wholesale buyer, or institutional party.</p>
              </div>
              <button onClick={() => setIsNewClientModalOpen(false)}><X size={18} className="text-slate-400" /></button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Madina Cash & Carry"
                    value={newClient.name}
                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Owner / Representative</label>
                  <input
                    type="text"
                    placeholder="e.g. Sheikh Irfan"
                    value={newClient.owner}
                    onChange={e => setNewClient({ ...newClient, owner: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="03001234567"
                    value={newClient.phone}
                    onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Faisalabad"
                    value={newClient.city}
                    onChange={e => setNewClient({ ...newClient, city: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Credit Limit (Rs.)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={newClient.creditLimit}
                    onChange={e => setNewClient({ ...newClient, creditLimit: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opening Udhaar Balance (Rs.)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newClient.openingBalance}
                    onChange={e => setNewClient({ ...newClient, openingBalance: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery / Commercial Address</label>
                <input
                  type="text"
                  placeholder="e.g. Shop #4, Anarkali Bazar"
                  value={newClient.address}
                  onChange={e => setNewClient({ ...newClient, address: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

