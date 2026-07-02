import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PlatformLogo = ({ name }) => {
  if (name === 'Amazon') {
    return (
      <div className="flex flex-col items-center select-none">
        <span className="font-black text-3xl text-slate-800 tracking-tight lowercase">amazon</span>
        <svg className="w-20 h-3 text-orange-500 -mt-1" viewBox="0 0 100 15" fill="currentColor">
          <path d="M5 2 C 30 12, 70 12, 95 2 C 90 6, 80 8, 70 8 C 50 8, 20 8, 5 2" />
          <polygon points="93,1 97,5 91,7" />
        </svg>
      </div>
    );
  }
  if (name === 'Flipkart') {
    return (
      <div className="flex items-center gap-2 select-none">
        <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-amber-400 font-extrabold text-xl shadow-md border border-blue-500">
          F
        </div>
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-2xl text-blue-600 tracking-tight italic">Flipkart</span>
          <span className="text-[0.55rem] font-bold text-amber-500 uppercase tracking-widest leading-none mt-0.5">Explore Plus</span>
        </div>
      </div>
    );
  }
  if (name === 'BigBasket') {
    return (
      <div className="flex flex-col items-center select-none">
        <div className="flex items-center gap-1.5">
          <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-black shadow-sm">bb</span>
          <span className="font-extrabold text-xl text-green-700 tracking-tight">bigbasket</span>
        </div>
        <span className="text-[0.5rem] font-bold text-gray-400 mt-1.5 uppercase tracking-widest">India's Online Spicery</span>
      </div>
    );
  }
  return null;
};

const AvailableOn = () => {
  const marketplaces = [
    {
      name: 'Amazon',
      description: 'Shop our entire premium range of organic spices on Amazon. Enjoy fast shipping and exclusive Prime deals.',
      buttonText: 'Buy on Amazon',
      url: 'https://www.amazon.in',
      color: 'border-orange-500 hover:shadow-orange-100',
      badgeColor: 'bg-orange-500'
    },
    {
      name: 'Flipkart',
      description: 'Explore Rasoi Sutra Masale on Flipkart Supermart. Get amazing discount bundles and combo savings.',
      buttonText: 'Buy on Flipkart',
      url: 'https://www.flipkart.com',
      color: 'border-blue-500 hover:shadow-blue-100',
      badgeColor: 'bg-blue-600'
    },
    {
      name: 'BigBasket',
      description: 'Order fresh spices along with your daily groceries on BigBasket. Get delivered to your doorstep within hours.',
      buttonText: 'Buy on BigBasket',
      url: 'https://www.bigbasket.com',
      color: 'border-green-600 hover:shadow-green-100',
      badgeColor: 'bg-green-600'
    }
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-amber-50/50 to-orange-50/20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-wider text-[#991B1B] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">Partner Channels</span>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold mt-4 text-[#451A03]">Available on Marketplaces</h2>
          <p className="mt-4 text-sm text-amber-900/60 max-w-2xl mx-auto leading-relaxed">
            Can't wait for delivery? Purchase our authentic, hand-ground spices on your favorite grocery platforms with official brand guarantees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {marketplaces.map((platform, idx) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className={`bg-white rounded-3xl border-2 p-8 flex flex-col justify-between items-center transition-all duration-300 shadow-xl shadow-amber-900/5 ${platform.color}`}
            >
              <div className="flex flex-col items-center text-center w-full">
                {/* Logo wrapper with gradient backdrop */}
                <div className="h-28 w-full flex items-center justify-center p-4 bg-amber-50/30 rounded-2xl mb-6">
                  <PlatformLogo name={platform.name} />
                </div>
                <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold text-white uppercase ${platform.badgeColor} mb-4`}>
                  Official Store
                </span>
                <h3 className="text-xl font-bold text-amber-950 font-serif">{platform.name}</h3>
                <p className="mt-3 text-xs text-gray-500 leading-relaxed min-h-[64px]">
                  {platform.description}
                </p>
              </div>

              <div className="w-full mt-8">
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group text-sm"
                >
                  <ShoppingBag size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  {platform.buttonText}
                  <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Promise Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-900 to-[#78350F] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-left flex flex-col md:flex-row items-center justify-between">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 max-w-xl">
            <h4 className="text-lg font-bold text-amber-300 font-serif">Why buy from our partners?</h4>
            <p className="mt-2 text-amber-100 text-xs md:text-sm leading-relaxed">
              We list directly on major online marketplaces. We guarantee that all products shipped through our channels are 100% authentic, fresh, and undergo the same strict quality checks as our factory orders.
            </p>
          </div>
          <div className="mt-6 md:mt-0 relative z-10 flex flex-col items-center md:items-end">
            <span className="text-4xl font-extrabold text-amber-300">100%</span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200 mt-1 font-bold">Authentic Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableOn;
