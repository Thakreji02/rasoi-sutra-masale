import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogIn, User, LogOut, ClipboardList, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import logoImg from '../assets/logo.jpg';
import axiosInstance from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onCartToggle }) => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogoutClick = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const handleMyOrdersClick = () => {
    setProfileDropdownOpen(false);
    navigate('/my-orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavedAddressesClick = async () => {
    setProfileDropdownOpen(false);
    try {
      const res = await axiosInstance.get('/v1/addresses/my-addresses');
      const addrs = res.data.data || [];
      if (addrs.length === 0) {
        alert("No saved addresses found. You can add them during checkout!");
      } else {
        const addrList = addrs.map((a, i) => `${i+1}. ${a.recipientName}, ${a.buildingDetails || ''} ${a.street || ''}, ${a.city} - ${a.pincode}`).join('\n');
        alert(`Saved Addresses:\n\n${addrList}`);
      }
    } catch (e) {
      alert("Failed to load saved addresses.");
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-amber-900/10 py-2 sm:py-3' 
            : 'bg-[#fffdfa]/95 backdrop-blur-md border-b border-amber-900/5 py-2.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand Link (Two-Color Typography without image logo) */}
            <Link to="/" className="flex flex-col text-left group select-none">
              <div className="flex items-baseline gap-1 font-serif font-black tracking-tight leading-none text-xl sm:text-2xl lg:text-[1.7rem]">
                <span className="text-[#df432b] group-hover:opacity-90 transition-opacity">RASOI</span>
                <span className="text-[#2e1c13] group-hover:text-[#df432b] transition-colors">SUTRA</span>
              </div>
              <span className="text-[0.58rem] sm:text-[0.62rem] font-extrabold text-[#235e32] tracking-[0.22em] uppercase mt-0.5">
                ✦ PURE HERITAGE SPICES ✦
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center">
              <ul className="flex items-center gap-2 m-0 p-0 list-none">
                {/* Home */}
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'text-[#df432b] bg-[#fff4f0]'
                          : 'text-amber-950 hover:text-[#df432b] hover:bg-amber-50/30'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>

                {/* Shop (Megamenu) */}
                <li className="relative group">
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1 ${
                        isActive
                          ? 'text-[#df432b] bg-[#fff4f0]'
                          : 'text-amber-950 hover:text-[#df432b] hover:bg-amber-50/30'
                      }`
                    }
                  >
                    Shop
                    <span className="w-1.5 h-1.5 border-r-2 border-b-2 border-current rotate-45 -translate-y-0.5 ml-1 transition-transform group-hover:rotate-[225deg]" />
                  </NavLink>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] p-5 bg-[#fffdfa] border border-amber-900/10 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to="/products" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">✦</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Shop All</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">Explore the complete range</small>
                        </div>
                      </Link>
                      <Link 
                        to="/products?category=Ground Spices" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">🥣</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Ground Spices</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">Fresh everyday powders</small>
                        </div>
                      </Link>
                      <Link 
                        to="/products?category=Whole Spices" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">🌿</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Whole Spices</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">Whole-spice aroma & quality</small>
                        </div>
                      </Link>
                      <Link 
                        to="/products?category=Spice Blends" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">🎁</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Spice Blends</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">Royal mixes for family cooking</small>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>

                {/* Bestsellers */}
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'text-[#df432b] bg-[#fff4f0]'
                          : 'text-amber-950 hover:text-[#df432b] hover:bg-amber-50/30'
                      }`
                    }
                  >
                    Bestsellers
                  </NavLink>
                </li>

                {/* Why Rasoi Sutra */}
                <li className="relative group">
                  <NavLink
                    to="/our-story"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1 ${
                        isActive
                          ? 'text-[#df432b] bg-[#fff4f0]'
                          : 'text-amber-950 hover:text-[#df432b] hover:bg-amber-50/30'
                      }`
                    }
                  >
                    Why Rasoi Sutra
                    <span className="w-1.5 h-1.5 border-r-2 border-b-2 border-current rotate-45 -translate-y-0.5 ml-1 transition-transform group-hover:rotate-[225deg]" />
                  </NavLink>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[420px] p-5 bg-[#fffdfa] border border-amber-900/10 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="grid grid-cols-1 gap-1">
                      <Link 
                        to="/our-story" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">♥</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Our Story</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">Why purity became personal</small>
                        </div>
                      </Link>
                      <Link 
                        to="/our-process" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">☀</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Our Process</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">From whole spice fields to jar</small>
                        </div>
                      </Link>
                      <Link 
                        to="/lab-reports" 
                        className="grid grid-cols-[34px_1fr] gap-3 items-center p-3 rounded-2xl hover:bg-[#fff4f0] text-amber-950 hover:text-[#df432b] transition-all duration-200"
                      >
                        <span className="h-9.5 w-9.5 rounded-xl bg-amber-50 flex items-center justify-center text-base">🔬</span>
                        <div className="flex flex-col text-left">
                          <strong className="text-xs font-bold font-serif leading-snug">Lab Reports</strong>
                          <small className="text-[0.68rem] text-amber-900/50 mt-0.5">See independent purity reports</small>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>

            {/* Action Area */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Cart Icon Trigger */}
              <button
                onClick={onCartToggle}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-[#f1b8ac] bg-[#fff4f0] hover:bg-[#ffe8e0] text-[#b82f1c] font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
                aria-label="Toggle Shopping Cart"
              >
                <ShoppingCart size={15} className="shrink-0" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-[#df432b] text-white text-[0.62rem] font-bold h-4.5 min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Login/Profile Action */}
              <div className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-1 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-amber-50/70 border border-amber-900/10 text-xs font-bold text-[#451A03] hover:bg-amber-100/50 transition-all cursor-pointer"
                    >
                      <User size={13} className="text-[#df432b] shrink-0" />
                      <span className="max-w-[65px] sm:max-w-none truncate">{user.fullName ? user.fullName.split(' ')[0] : 'User'}</span>
                    </button>
                    
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-900/10 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 animate-fade-in">
                        <button
                          onClick={handleMyOrdersClick}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-amber-950 hover:bg-amber-50/50 hover:text-[#991B1B] flex items-center gap-2"
                        >
                          <ClipboardList size={14} />
                          My Orders
                        </button>
                        <button
                          onClick={handleSavedAddressesClick}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-[#451A03] hover:bg-amber-50/50 hover:text-[#991B1B] flex items-center gap-2"
                        >
                          <MapPin size={14} />
                          Saved Addresses
                        </button>
                        {user.role === 'ROLE_ADMIN' && (
                          <Link
                            to="/admin"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="block px-4 py-2 text-left text-xs font-bold text-amber-950 hover:bg-amber-50/50 hover:text-[#991B1B] flex items-center gap-2"
                          >
                            <User size={14} />
                            Admin Dashboard
                          </Link>
                        )}
                        <hr className="border-amber-900/5 my-1" />
                        <button
                          onClick={handleLogoutClick}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut size={14} />
                          Log Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-[#df432b] hover:bg-[#b92f18] text-xs font-bold text-white shadow-md hover:scale-[1.03] transition-all cursor-pointer"
                  >
                    <LogIn size={13} className="shrink-0" />
                    <span>Login</span>
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="md:hidden p-1.5 sm:p-2 rounded-xl text-amber-950 hover:bg-amber-50/50 transition-colors cursor-pointer border border-amber-900/10"
                aria-label="Toggle Navigation Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Desi Aroma Style Off-Canvas) - Rendered outside header to avoid backdrop-filter trapping */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden">
            {/* Dark background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Slide-out Drawer container */}
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-[10000] w-[290px] sm:w-[320px] bg-[#fffdfa] shadow-2xl p-5 sm:p-6 overflow-y-auto flex flex-col justify-between border-l border-amber-900/10"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3.5">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col text-left">
                    <div className="flex items-baseline gap-1 font-serif font-black tracking-tight leading-none text-xl">
                      <span className="text-[#df432b]">RASOI</span>
                      <span className="text-[#2e1c13]">SUTRA</span>
                    </div>
                    <span className="text-[0.55rem] font-extrabold text-[#235e32] tracking-[0.18em] uppercase mt-0.5">
                      ✦ PURE SPICES ✦
                    </span>
                  </Link>
                  <button 
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full border border-amber-900/10 hover:bg-amber-50 cursor-pointer text-amber-950"
                    aria-label="Close navigation menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Search Bar teaser */}
                <Link 
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white border border-amber-900/10 rounded-xl text-xs font-semibold text-amber-900/60 hover:bg-amber-50/30"
                >
                  <span>🔎</span> Search spice catalog...
                </Link>

                {/* Group 1: Shop */}
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#df432b] uppercase mb-1">Shop Collections</span>
                  <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Shop All <span>→</span>
                  </Link>
                  <Link to="/products?category=Ground Spices" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Ground Spices <span>→</span>
                  </Link>
                  <Link to="/products?category=Whole Spices" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Whole Spices <span>→</span>
                  </Link>
                  <Link to="/products?category=Spice Blends" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Spice Blends <span>→</span>
                  </Link>
                </div>

                {/* Group 2: Sourcing story */}
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#df432b] uppercase mb-1">Why Rasoi Sutra</span>
                  <Link to="/our-story" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Our Story <span>→</span>
                  </Link>
                  <Link to="/our-process" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Our Process <span>→</span>
                  </Link>
                  <Link to="/lab-reports" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Lab Reports <span>→</span>
                  </Link>
                  <Link to="/reviews" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Reviews & Testimonials <span>→</span>
                  </Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-900/5 text-xs font-bold text-amber-950 hover:text-[#df432b] flex items-center justify-between">
                    Contact Us <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Trust Badge at the bottom */}
              <div className="mt-6 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-[0.68rem] font-medium leading-relaxed text-left space-y-1.5 border border-emerald-100 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold">
                  <span>✓</span> 100% Cold-Ground Spices
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span>🔬</span> Lab Tested & FSSAI Licensed
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span>🚚</span> PAN India Safe Delivery
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Login / Registration Dialog */}
      <LoginModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
