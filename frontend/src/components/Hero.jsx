import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroSpicesJars from '../assets/hero_spices_jars.jpg';
import { ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF6F0]">
      {/* Hero split-screen container */}
      <section 
        style={{
          '--desktop-bg': `linear-gradient(90deg, rgba(250, 246, 240, 1) 0%, rgba(250, 246, 240, 1) 48%, rgba(250, 246, 240, 0.75) 60%, rgba(250, 246, 240, 0.1) 85%, rgba(250, 246, 240, 0) 100%), url(${heroSpicesJars})`
        }}
        className="relative min-h-[520px] lg:min-h-[580px] flex items-center bg-[#FAF6F0] lg:[background-image:var(--desktop-bg)] lg:bg-[right_center] lg:bg-[length:auto_100%] lg:bg-no-repeat py-12 lg:py-20 px-4 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Brand Name, Tagline, CTAs */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                <Leaf size={14} className="animate-pulse" />
                <span>100% Pure & Natural Ingredients</span>
              </motion.div>

              <div className="space-y-3 w-full">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-5xl sm:text-7xl font-serif font-black text-[#451A03] tracking-tight leading-none"
                >
                  Rasoi Sutra
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-xl sm:text-2xl font-serif italic font-extrabold text-[#991B1B] tracking-wide mt-2"
                >
                  "Har Rasoi Ka Asli Swad"
                </motion.p>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base sm:text-lg text-amber-950/70 leading-relaxed font-medium"
              >
                Experience the royal heritage of pure Indian spices. Sourced directly from local farmers, hygienically packed, and cold-ground to preserve natural essential oils and authentic aroma.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button 
                  onClick={() => navigate('/products')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white font-bold rounded-2xl shadow-xl shadow-red-900/10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  Shop Spice Catalog
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('about-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white hover:bg-amber-50/50 text-[#78350F] font-bold rounded-2xl border-2 border-amber-900/15 hover:border-amber-900/30 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Our Sourcing Story
                </button>
              </motion.div>
              
              {/* Special Promotion offer badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="flex flex-col gap-1 text-left border-t border-amber-900/10 pt-4 w-full"
              >
                <strong className="text-emerald-700 font-bold text-base sm:text-lg">Everyday Kitchen Combo ₹499</strong>
                <span className="text-xs sm:text-sm text-amber-950/60 font-semibold">4 Essential Spices (500g) + FREE Handcrafted Wooden Masala Spoon</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Image Container - displayed below the text content on mobile screens */}
      <div className="block lg:hidden w-full border-t border-amber-900/5">
        <img 
          src={heroSpicesJars} 
          alt="Rasoi Sutra Premium Spices Range" 
          className="w-full h-auto object-cover" 
        />
      </div>

      {/* Dedicated Trust Strip Section */}
      <section className="bg-white border-y border-amber-900/5 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center text-center border-r border-amber-900/10 last:border-r-0">
            <strong className="font-serif text-xl sm:text-2xl font-black text-[#991B1B]">★ 4.9</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-900/50 mt-1">Google Rating</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-r border-amber-900/10 last:border-r-0">
            <strong className="font-serif text-xl sm:text-2xl font-black text-[#991B1B]">5,000+</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-900/50 mt-1">Kitchens Served</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center lg:border-r border-amber-900/10 last:border-r-0">
            <strong className="font-serif text-xl sm:text-2xl font-black text-[#991B1B]">✓ Lab Tested</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-900/50 mt-1">Pure & Safe</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <strong className="font-serif text-xl sm:text-2xl font-black text-[#991B1B]">PAN India</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-900/50 mt-1">Fast Delivery</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
