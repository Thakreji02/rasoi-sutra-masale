import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroSpicesJars from '../assets/hero_spices_jars.jpg';
import { ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F5EFE6]">
      {/* Full-bleed hero banner covering entire section */}
      <section 
        style={{
          '--hero-bg': `linear-gradient(90deg, rgba(245, 239, 230, 0.98) 0%, rgba(245, 239, 230, 0.94) 38%, rgba(245, 239, 230, 0.45) 58%, rgba(245, 239, 230, 0) 78%), url(${heroSpicesJars})`
        }}
        className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-[#F5EFE6] lg:[background-image:var(--hero-bg)] lg:bg-[right_bottom] lg:bg-cover lg:bg-no-repeat py-12 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Brand Name, Tagline, CTAs */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl">
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3eedf] text-[#235e32] border border-[#cfe4be] font-extrabold text-xs uppercase tracking-wider shadow-sm"
              >
                <Leaf size={14} className="text-emerald-700 animate-pulse shrink-0" />
                <span>100% Pure & Cold-Ground Masale</span>
              </motion.div>

              <div className="space-y-3 w-full">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-[#2e1c13] tracking-tight leading-[1.08]"
                >
                  Rasoi Sutra
                  <span className="block text-[#df432b] text-3xl sm:text-5xl lg:text-6xl mt-1">
                    Har Rasoi Ka Asli Swad.
                  </span>
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-[#5c4a3e] leading-relaxed font-medium"
              >
                Experience the authentic heritage of traditional Indian spices. Made from whole, hand-picked harvests and slowly cold-ground at low RPM to preserve natural essential oils, rich aroma, and pure health.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
              >
                <button 
                  onClick={() => navigate('/products')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#df432b] hover:bg-[#b92f18] text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-red-900/15 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  Shop Spices Catalog
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => navigate('/our-story')}
                  className="px-8 py-4 bg-white/90 hover:bg-white text-[#2e1c13] hover:text-[#df432b] font-extrabold text-sm uppercase tracking-wider rounded-2xl border-2 border-amber-900/15 hover:border-[#df432b] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Our Story & Values
                </button>
              </motion.div>
              
              {/* Special Promotion offer badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-1 text-left border-t border-amber-900/10 pt-4 w-full"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🎁</span>
                  <strong className="text-[#168329] font-bold text-base sm:text-lg">
                    Everyday Kitchen Combo ₹499
                  </strong>
                </div>
                <span className="text-xs sm:text-sm text-amber-950/70 font-semibold pl-6">
                  4 Everyday Spices + FREE Handcrafted Wooden Masala Spoon
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Image Container - displayed below the text content on mobile screens */}
      <div className="block lg:hidden w-full border-t border-amber-900/5 bg-[#F5EFE6]">
        <img 
          src={heroSpicesJars} 
          alt="Rasoi Sutra Premium Spices Range" 
          className="w-full h-auto object-cover" 
        />
      </div>

      {/* Dedicated Trust Strip Section */}
      <section className="bg-white border-y border-amber-900/5 py-6 sm:py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col items-center justify-center text-center border-r border-amber-900/10 last:border-r-0 p-2">
            <strong className="font-serif text-lg sm:text-2xl font-black text-[#df432b]">★ 4.9</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-950/60 mt-0.5">Google Rating</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-r border-amber-900/10 last:border-r-0 p-2">
            <strong className="font-serif text-lg sm:text-2xl font-black text-[#df432b]">10,000+</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-950/60 mt-0.5">Happy Kitchens</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center lg:border-r border-amber-900/10 last:border-r-0 p-2">
            <strong className="font-serif text-lg sm:text-2xl font-black text-[#168329]">✓ FSSAI & Lab Tested</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-950/60 mt-0.5">100% Purity Tested</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2">
            <strong className="font-serif text-lg sm:text-2xl font-black text-[#df432b]">🚚 PAN India</strong>
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-amber-950/60 mt-0.5">Fast Safe Delivery</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
