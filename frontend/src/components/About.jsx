import React from 'react';
import farmerImg from '../assets/farmer.jpg';
import { ShieldCheck, HeartHandshake, Award, Sparkles, Leaf, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] relative overflow-hidden">
      {/* Decorative Spice Background Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-wider text-[#991B1B] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100"
          >
            Our Roots
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif font-extrabold text-[#451A03] mt-4"
          >
            The Story of Rasoi Sutra
          </motion.h2>
          <p className="text-[0.65rem] text-amber-900/50 mt-1.5 uppercase tracking-widest font-bold">
            Flagship Brand of Anubhav Food & Spices Pvt. Ltd.
          </p>
          <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Farmer Image Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src={farmerImg} 
                alt="Farmer in Organic Spice Farm" 
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-white rounded-2xl p-5 shadow-2xl border border-amber-100 max-w-[260px] backdrop-blur-md bg-white/95">
              <span className="block font-serif text-3xl font-extrabold text-[#991B1B]">100%</span>
              <span className="block text-[0.7rem] font-bold text-amber-900/80 uppercase tracking-widest mt-1">
                Direct Farmer Sourcing & Fair Trade
              </span>
            </div>
          </motion.div>

          {/* Right Side: Mission & Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-[#451A03]"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
              Nurturing Taste, Preserving Tradition
            </h3>
            <p className="text-lg text-amber-950/80 font-medium leading-relaxed">
              At Rasoi Sutra, we believe that the secret to delicious food lies in the purity of its spices. Our journey starts in the fertile fields of India, working side-by-side with local farmers who cultivate authentic spice varieties using organic, natural farming methods.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Traditional Indian cuisine relies heavily on the healing and flavor properties of natural oils found within spices. Modern mass production methods overheat spices, destroying these aromatic oils. To bring you the true flavor, Rasoi Sutra spices are cold-ground at low temperatures, preserving their natural oils, vibrant colors, and authentic health benefits.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-amber-900/10">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-amber-50 text-[#991B1B] border border-amber-100 shrink-0">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base">Organic Spices</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Directly sourced from organic growers with zero pesticides.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-amber-50 text-[#991B1B] border border-amber-100 shrink-0">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base">No Preservatives</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    100% natural, unadulterated spices with no artificial coloring or fillers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-amber-50 text-[#991B1B] border border-amber-100 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base">Quality Assurance</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Rigorous cleaning and 3-stage inspection for peak quality.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-amber-50 text-[#991B1B] border border-amber-100 shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base">Premium Packaging</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Air-tight packaging to lock in aroma and freshness for longer.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
