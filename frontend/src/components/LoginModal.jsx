import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, Eye, EyeOff } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (mobileNumber !== 'admin' && !/^\d{10}$/.test(mobileNumber)) {
      setErrorMsg('Mobile number must be a valid 10-digit number.');
      return;
    }

    setLoading(true);

    if (isLogin) {
      const res = await login(mobileNumber, password);
      if (res.success) {
        onClose();
        resetForm();
      } else {
        setErrorMsg(res.message);
      }
    } else {
      const res = await register(fullName, mobileNumber, email, password);
      if (res.success) {
        setIsLogin(true);
        resetForm(true); // reset fields but keep login toggle
      } else {
        setErrorMsg(res.message);
      }
    }
    setLoading(false);
  };

  const resetForm = (keepMobile = false) => {
    setFullName('');
    if (!keepMobile) setMobileNumber('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#FDFBF7] w-full max-w-md rounded-3xl border border-amber-900/10 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-amber-50 text-amber-950/60 hover:text-amber-950 transition-colors"
          aria-label="Close Authentication Form"
        >
          <X size={20} />
        </button>

        {/* Top Branding Section */}
        <div className="bg-gradient-to-r from-amber-900 to-[#78350F] p-8 text-center text-white">
          <h3 className="font-serif font-extrabold text-2xl tracking-wide">RASOI SUTRA</h3>
          <p className="text-amber-100/70 text-xs font-semibold uppercase tracking-widest mt-1">Swad Aur Sehat Ka Bandhan</p>
        </div>

        {/* Form Container */}
        <div className="p-8 overflow-y-auto">
          <div className="mb-6 text-center">
            <h4 className="text-xl font-bold text-[#451A03]">
              {isLogin ? 'Welcome Back!' : 'Create An Account'}
            </h4>
            <p className="text-amber-900/60 text-xs mt-1">
              {isLogin ? 'Log in using your Mobile Number to continue.' : 'Register to save addresses and track orders.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (only for register) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-amber-950/70 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-900/40">
                    <User size={18} />
                  </span>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-amber-50/30 border border-amber-900/10 focus:border-[#991B1B] focus:ring-2 focus:ring-[#991B1B]/10 outline-none text-[#451A03] text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            )}

            {/* Mobile Number field */}
            <div>
              <label className="block text-xs font-bold text-amber-950/70 uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-900/40">
                  <Phone size={18} />
                </span>
                <input 
                  type="tel" 
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-amber-50/30 border border-amber-900/10 focus:border-[#991B1B] focus:ring-2 focus:ring-[#991B1B]/10 outline-none text-[#451A03] text-sm font-semibold transition-all"
                />
              </div>
            </div>

            {/* Email field (only for register) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-amber-950/70 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-900/40">
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email address"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-amber-50/30 border border-amber-900/10 focus:border-[#991B1B] focus:ring-2 focus:ring-[#991B1B]/10 outline-none text-[#451A03] text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password field */}
            <div>
              <label className="block text-xs font-bold text-amber-950/70 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-900/40">
                  <Lock size={18} />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-amber-50/30 border border-amber-900/10 focus:border-[#991B1B] focus:ring-2 focus:ring-[#991B1B]/10 outline-none text-[#451A03] text-sm font-semibold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-amber-900/40 hover:text-[#991B1B] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#991B1B] hover:bg-[#B91C1C] text-white font-bold rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-amber-900/40 flex items-center justify-center gap-2 mt-2 text-sm cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-l-white rounded-full animate-spin"></div>
              ) : isLogin ? (
                'Login to Account'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Screen */}
          <div className="mt-6 text-center text-xs">
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg('');
              }}
              className="text-[#991B1B] hover:underline font-bold cursor-pointer"
            >
              {isLogin ? 'New to Rasoi Sutra? Create an Account' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
