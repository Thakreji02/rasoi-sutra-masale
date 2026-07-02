import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B1E17] text-[#FAF6F0] border-t-4 border-amber-500 pt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Rasoi Sutra Logo" 
                className="h-10 w-10 rounded-full object-cover border border-amber-900/10 shadow-md"
              />
              <div className="flex flex-col">
                <h3 className="font-serif font-extrabold text-xl text-amber-400 tracking-wider leading-none">
                  RASOI SUTRA
                </h3>
                <span className="text-[0.65rem] font-bold text-amber-900/60 uppercase tracking-widest mt-0.5">
                  Masale
                </span>
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#FAF6F0]/60 mt-3 font-bold block">
              *Har Rasoi Ka Asli Swad*
            </span>
            <p className="mt-4 text-xs text-[#FAF6F0]/50 leading-relaxed">
              Product of <strong>Anubhav Food & Spices Pvt. Ltd.</strong>
            </p>
            <p className="mt-2 text-sm text-[#FAF6F0]/70 leading-relaxed">
              Premium quality masalas made from 100% natural, hand-picked ingredients. Sourced directly from local Indian farmers and ground carefully at low temperatures.
            </p>
            <div className="flex gap-3 mt-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-amber-500 hover:text-[#2B1E17] transition-all duration-300"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-amber-500 hover:text-[#2B1E17] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-amber-500 hover:text-[#2B1E17] transition-all duration-300"
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-9 w-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-amber-500 hover:text-[#2B1E17] transition-all duration-300"
                aria-label="Twitter"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col">
            <h4 className="font-serif font-bold text-lg text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-amber-500">
              Explore Brand
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Our Journey
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Spice Shop
                </Link>
              </li>
              <li>
                <Link to="/available-on" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Available On
                </Link>
              </li>
              <li>
                <Link to="/reviews" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Spice Categories Column */}
          <div className="flex flex-col">
            <h4 className="font-serif font-bold text-lg text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-amber-500">
              Spice Collections
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Turmeric" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Turmeric Powders
                </Link>
              </li>
              <li>
                <Link to="/products?category=Red Chilli" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Red Chilli Blends
                </Link>
              </li>
              <li>
                <Link to="/products?category=Coriander" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Coriander Ground
                </Link>
              </li>
              <li>
                <Link to="/products?category=Garam Masala" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Royal Garam Masalas
                </Link>
              </li>
              <li>
                <Link to="/products?category=Combo Packs" onClick={handleScrollTop} className="text-[#FAF6F0]/70 hover:text-amber-400 text-sm transition-colors">
                  Value Combo Packs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col">
            <h4 className="font-serif font-bold text-lg text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-amber-500">
              Corporate Office
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-sm text-[#FAF6F0]/70">
                <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span>Agro-Industrial Estate, Sangli - 416416, Maharashtra.</span>
              </li>
              <li className="flex gap-3 items-start text-sm text-[#FAF6F0]/70">
                <Phone size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 items-start text-sm text-[#FAF6F0]/70">
                <Mail size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <span>info@rasoisutramasale.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-[#FAF6F0]/10 py-6 text-xs text-[#FAF6F0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>
            © {currentYear} Rasoi Sutra. Manufactured by <strong>Anubhav Food & Spices Pvt. Ltd.</strong> All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
