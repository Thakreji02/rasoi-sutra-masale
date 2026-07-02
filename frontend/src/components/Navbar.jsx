import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.jpg';

const Navbar = ({ onCartToggle }) => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/available-on', label: 'Available On' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-900/10 py-3' 
          : 'bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-amber-900/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand Link */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="Rasoi Sutra Official Logo" 
              className="h-10 w-10 rounded-full object-cover border border-amber-900/10 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-xl sm:text-2xl text-[#78350F] tracking-tight group-hover:text-[#991B1B] transition-colors leading-none">
                RASOI SUTRA
              </span>
              <span className="text-[0.65rem] font-bold text-amber-900/60 uppercase tracking-widest mt-0.5">
                Masale
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-[#991B1B] bg-red-50/50'
                      : 'text-amber-950 hover:text-[#991B1B] hover:bg-amber-50/30'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {/* Cart Icon Trigger */}
            <button
              onClick={onCartToggle}
              className="relative p-2.5 rounded-full hover:bg-amber-50/50 text-[#451A03] hover:text-[#991B1B] transition-all duration-300"
              aria-label="Toggle Shopping Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#991B1B] text-amber-100 text-[0.65rem] font-extrabold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-amber-950 hover:bg-amber-50/50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-amber-900/10 shadow-inner px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-bold tracking-wide transition-all ${
                  isActive
                    ? 'text-[#991B1B] bg-red-50'
                    : 'text-amber-950 hover:text-[#991B1B] hover:bg-amber-50/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
