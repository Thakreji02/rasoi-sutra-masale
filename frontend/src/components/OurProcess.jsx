import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, RefreshCw, Layers, CheckCircle2, ShieldAlert, ThermometerSnowflake, HeartHandshake } from 'lucide-react';

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: '🔎',
      title: '1. Select Whole Spices',
      shortDesc: 'Ingredient selection before grinding.',
      longDesc: 'We evaluate raw whole spices directly at sourcing zones. We reject any material that does not match our parameters for characteristic aroma, cleanliness, maturity, and moisture suitable for safe processing.'
    },
    {
      id: 2,
      icon: '🥣',
      title: '2. Clean & Sort',
      shortDesc: 'Removing impurities and dust.',
      longDesc: 'Whole spices undergo physical cleaning and sorting. Dust, foreign particles, undersized seeds, and defective pieces are completely sifted out to guarantee only 100% pure raw material moves to preparation.'
    },
    {
      id: 3,
      icon: '☀️',
      title: '3. Dry or Roast',
      shortDesc: 'Optimizing moisture and aroma.',
      longDesc: 'Depending on the recipe, the spice is either solar-dried or gently roasted at low temperatures. This critical step reduces moisture levels to prevent spoilage while unlocking natural essential oils.'
    },
    {
      id: 4,
      icon: '❄️',
      title: '4. Low-RPM Cold Grind',
      shortDesc: 'Low-speed grinding for essential oils.',
      longDesc: 'We grind our spices using slow-speed, low-RPM machinery. Unlike standard high-speed industrial mills that generate harsh heat and burn away volatile oils, cold grinding keeps temperatures low, sealing the original aroma, taste, and color inside.'
    },
    {
      id: 5,
      icon: '🫙',
      title: '5. Quality Check & Pack',
      shortDesc: 'Hygienic moisture-lock packaging.',
      longDesc: 'The finished batch is verified for moisture levels, screen mesh size, and color. It is then immediately packed into food-grade, airtight glass jars or pouches to prevent humidity absorption and retain maximum freshness.'
    }
  ];

  return (
    <div className="w-full bg-[#FAF6F0] py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Hero */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#235e32] bg-[#e3eedf] px-3.5 py-1 rounded-full border border-[#cfe4be]">
            From Source to Small Batch
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2e1c13] mt-4">
            Whole Spices In. <span>Honest Flavour Out.</span>
          </h1>
          <p className="text-xs text-[#df432b] mt-3 font-extrabold uppercase tracking-widest">
            How a whole spice becomes Rasoi Sutra masale
          </p>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Introduction note */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-900/5 shadow-sm text-left mb-16">
          <p className="text-[#6c594e] text-sm md:text-base leading-relaxed">
            We begin with carefully evaluated whole spices—not anonymous pre-ground powders. Each spice is cleaned, sorted, prepared, and ground in controlled small batches under strict hygiene protocols to preserve its volatile essential oils.
          </p>
          <div className="mt-4 p-4 bg-amber-50/50 rounded-2xl border border-amber-900/5 text-xs text-amber-900/70">
            <span className="font-bold block text-[#78350F] mb-1">🌾 Transparent Sourcing Disclaimer:</span>
            Rasoi Sutra works closely with direct farmers and certified farming cooperatives across India. This process model represents our sourcing standards and preparation journey, and does not imply that every farm or crop comes from land owned by us.
          </div>
        </div>

        {/* 5 Visible Steps Section */}
        <div className="mb-20">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-[#2e1c13] text-center mb-12">
            The 5 Steps of Sourcing & Preparation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Step Selection Left */}
            <div className="md:col-span-5 space-y-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-white border-[#df432b] shadow-md scale-[1.01]'
                      : 'bg-transparent border-transparent hover:bg-white/40'
                  }`}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <h3 className="text-xs font-bold text-[#2e1c13]">{step.title}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">{step.shortDesc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Description Right */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-amber-900/5 shadow-xl shadow-amber-900/5 text-left min-h-[280px] flex flex-col justify-between">
              <div>
                <span className="text-4xl">{steps[activeStep - 1].icon}</span>
                <h3 className="font-serif text-xl font-bold text-[#2e1c13] mt-4">
                  {steps[activeStep - 1].title}
                </h3>
                <p className="text-xs text-[#6c594e] leading-relaxed mt-4">
                  {steps[activeStep - 1].longDesc}
                </p>
              </div>
              <div className="mt-8 flex gap-3 text-[10px] font-bold text-emerald-800 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100/50">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-700" />
                <span>Supervised small-batch clearance: Batch verified by master grinders.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Gates Section */}
        <div className="mb-20 text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-[#2e1c13] text-center mb-4">
            Our Quality Gates
          </h2>
          <p className="text-xs text-gray-500 text-center max-w-xl mx-auto mb-12">
            Simple checks, clear reasons. We focus on the parameters that directly affect purity, safety, volatile oils, and consistency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-amber-900/5">
              <h3 className="font-serif font-bold text-base text-[#2e1c13] border-b border-amber-900/5 pb-2">Aroma</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Does the raw crop smell fresh, clean, and characteristic of its high-grade variety?
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-amber-900/5">
              <h3 className="font-serif font-bold text-base text-[#2e1c13] border-b border-amber-900/5 pb-2">Cleanliness</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Has all visible crop dust, foreign organic material, and undersized grain been sifted?
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-amber-900/5">
              <h3 className="font-serif font-bold text-base text-[#2e1c13] border-b border-amber-900/5 pb-2">Moisture</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Is the moisture content within the exact safety threshold suitable for low-RPM grinding?
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-amber-900/5">
              <h3 className="font-serif font-bold text-base text-[#2e1c13] border-b border-amber-900/5 pb-2">Batch Fit</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Will this crop deliver the exact balance of taste, color, and volatile oil oils for the recipe?
              </p>
            </div>
          </div>
        </div>

        {/* Sourcing WhatsApp CTA */}
        <div className="bg-gradient-to-r from-[#173f27] to-[#235e32] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden text-left flex flex-col md:flex-row items-center justify-between">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f3cc76]">Growers & Farmers Sourcing</span>
            <h3 className="text-2xl font-serif font-black text-[#f3cc76] mt-2">Sell Your Crop to Rasoi Sutra</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed mt-2">
              Are you a farmer or local grower cultivating organic, premium spice crops? Connect directly with us to discuss varieties, harvests, samples, and fair trade pricing.
            </p>
          </div>
          <div className="relative z-10 mt-6 md:mt-0">
            <a 
              href="https://wa.me/919999999999?text=Namaste%20Rasoi%20Sutra%2C%20I%20am%20a%20spice%20farmer%20and%20would%20like%20to%20discuss%20selling%20my%20crop."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#df432b] hover:bg-[#b92f18] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              <HeartHandshake size={16} />
              Sell Your Crop →
            </a>
          </div>
        </div>

        {/* Process FAQs */}
        <div className="mt-20 border-t border-amber-900/10 pt-16 text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-black text-[#2e1c13] text-center mb-12">
            Questions Answered Honestly
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#2e1c13]">Do you own every farm?</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                No. We source directly from farmers and trusted certified farming cooperatives. This ensures raw material authenticity while helping small-scale Indian farmers receive fair pricing.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#2e1c13]">What is low-RPM cold grinding?</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                RPM stands for Rotations Per Minute. High-speed industrial grinding generates thermal friction that evaporates volatile aromatic oils. Cold grinding runs slowly and keeps grinding chambers cool to lock in oils.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#2e1c13]">Are all spices sun-dried and roasted?</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Different spices require different care. Turmeric is dried, cumin is roasted, other tender spices are vacuum-dried. We use the specific method appropriate for each spice batch.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#2e1c13]">Are all Rasoi Sutra products lab tested?</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Yes, every batch undergoes standard chemical and heavy metal tests before packaging. Real-time batch-level NABL lab reports are posted on our dedicated Lab Reports page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
