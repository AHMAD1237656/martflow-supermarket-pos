import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { djangoApi } from '../api/client';
import { 
  Store, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(username.trim(), password.trim());
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await djangoApi.post('/register/', {
        username: username.trim(),
        email: email.trim(),
        password: password.trim()
      });

      setSuccessMsg(res.data?.message || 'Account created successfully! Please sign in.');
      setIsRegistering(false);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error("Registration failed:", err);
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Registration failed. Try a different username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-white text-slate-800">
      
      {/* LEFT HALF: Minimal, High-End Supermarket Illustration Banner */}
      <div className="lg:w-1/2 bg-emerald-600 p-8 sm:p-14 lg:p-20 flex flex-col justify-between text-white relative overflow-hidden">
        
        {/* Subtle decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Brand Logo & Name */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/10">
            <Store size={26} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none text-white">MartFlow</h1>
            <p className="text-[11px] font-bold text-emerald-200 uppercase tracking-widest mt-1">Supermarket POS</p>
          </div>
        </div>

        {/* Center Modern Visual Graphic Card */}
        <div className="relative z-10 my-auto py-10 flex flex-col items-center text-center max-w-md mx-auto">
          
          {/* Animated Illustrated Icon Graphic */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center shadow-xl">
              <ShoppingBag size={46} className="text-emerald-100" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
            Smart Retail Management
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            Fast checkout billing, live stock controls, and customer ledger management built for modern supermarkets.
          </p>

          {/* Quick Modern Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 backdrop-blur-xs text-[11px] font-bold border border-white/15 text-white">
              <Zap size={13} className="text-emerald-200" /> Fast Scanning
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 backdrop-blur-xs text-[11px] font-bold border border-white/15 text-white">
              <ShieldCheck size={13} className="text-emerald-200" /> Secure Terminal
            </span>
          </div>
        </div>

        {/* Minimal Bottom Label */}
        <div className="relative z-10 text-[11px] text-emerald-200/80 font-medium text-center lg:text-left">
          MartFlow POS • Version 2.4
        </div>
      </div>

      {/* RIGHT HALF: Clean, Bright Sign In & Sign Up Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8FAFC]">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
          
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {isRegistering 
                ? 'Register cashier or management terminal credentials' 
                : 'Enter your credentials to access the register'}
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white font-medium transition"
                />
              </div>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@martflow.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white font-medium transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white font-medium transition"
                />
              </div>
            </div>

            {isRegistering && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white font-medium transition"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-md shadow-emerald-600/20 mt-2 cursor-pointer"
            >
              {loading ? (
                'Authenticating...'
              ) : isRegistering ? (
                <>Register Account <ArrowRight size={15} /></>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Toggle Button */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            {isRegistering ? (
              <p className="text-xs text-slate-500 font-medium">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(false);
                    setError('');
                  }}
                  className="text-emerald-600 hover:underline font-bold ml-1 cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500 font-medium">
                Need access?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(true);
                    setError('');
                  }}
                  className="text-emerald-600 hover:underline font-bold ml-1 cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}