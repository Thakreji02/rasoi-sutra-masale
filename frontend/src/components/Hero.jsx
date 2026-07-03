import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroSpices from '../assets/hero_spices.jpg';
import logoImg from '../assets/logo.jpg';
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#FDFBF7] via-[#FDFBF7] to-[#FAEFE2] py-20 px-4 overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-amber-900/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-amber-900/5 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Brand Name, Tagline, CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
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
            className="text-base sm:text-lg text-amber-950/70 max-w-xl leading-relaxed font-medium"
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
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white font-bold rounded-2xl shadow-xl shadow-red-900/10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Shop Spice Catalog
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('about-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white hover:bg-amber-50/50 text-[#78350F] font-bold rounded-2xl border-2 border-amber-900/15 hover:border-amber-900/30 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Our Sourcing Story
            </button>
          </motion.div>
          
          {/* Trust Badges - Business Trust Integration */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-amber-900/10 w-full text-left"
          >
            <div className="flex flex-col">
              <span className="font-serif text-lg font-black text-[#991B1B] flex items-center gap-1">
                <Leaf size={16} className="text-emerald-600" /> Pure Spices
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-amber-900/50 mt-1">Authentic Blends</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-black text-[#991B1B] flex items-center gap-1">
                <HeartHandshake size={16} className="text-amber-500" /> Direct Sourced
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-amber-900/50 mt-1">From Indian Farmers</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-black text-[#991B1B] flex items-center gap-1">
                <ShieldCheck size={16} className="text-blue-600" /> Hygenic Pack
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-amber-900/50 mt-1">Packed Airtight</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-black text-[#991B1B] flex items-center gap-1">
                <Award size={16} className="text-red-600" /> Quality Tested
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-amber-900/50 mt-1">Strict Quality Audit</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Spice Platter Rotating Wheel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Glowing ring */}
          <div className="absolute w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-amber-500/10 to-red-500/5 blur-xl pointer-events-none animate-pulse"></div>
          
          {/* Outer circle backdrop */}
          <div className="absolute w-[370px] h-[370px] sm:w-[450px] sm:h-[450px] rounded-full border-2 border-dashed border-amber-900/10 animate-[spin_120s_linear_infinite]"></div>

          {/* Spice Image Wheel */}
          <motion.img 
            src={heroSpices} 
            alt="Rasoi Sutra Premium Indian Spices Platter" 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] max-w-none rounded-full object-cover shadow-2xl z-10" 
          />

          {/* Static Center Brand Logo - Statically Positioned, DOES NOT SPIN */}
          <div className="absolute z-20 w-[140px] h-[140px] sm:w-[172px] sm:h-[172px] rounded-full flex items-center justify-center">
            <img 
              src={logoImg} 
              alt="Rasoi Sutra Brand Logo" 
              className="w-full h-full rounded-full object-cover z-30" 
            />
          </div>
          
          {/* Floating Freshness Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-[#78350F] to-[#451A03] text-white py-3.5 px-6 rounded-full border border-amber-400/30 shadow-xl z-20 flex flex-col items-center"
          >
            <span className="font-bold text-[0.8rem] tracking-widest text-amber-300">FARM FRESH</span>
            <span className="text-[0.6rem] font-medium tracking-wide text-amber-100 uppercase mt-0.5">Premium Quality</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
