import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sprout, ShieldCheck, Sun, CheckCircle, MessageCircle, HelpCircle } from 'lucide-react';
import farmerImg from '../assets/farmer.jpg';

const OurStory = () => {
  const [lang, setLang] = useState('en'); // 'en' or 'hi'

  const content = {
    en: {
      tag: 'A Mother\'s Promise',
      title: 'Purity Born from a Mother\'s Love',
      subtitle: 'For us, spices are not just ingredients—they are the shield of your family\'s health.',
      btnLang: 'हिंदी में पढ़ें 🇮🇳',
      sec1Title: 'The Magic of Maa\'s Kitchen',
      sec1Text1: 'Every Indian home has a beautiful memory of cooking aromas wafting from the kitchen. Our grandmothers (Dadi-Nani) didn\'t just choose spices for taste; they chose them as natural remedies, building blocks of immunity, and guardians of family health. When a mother adds turmeric to warm milk or a pinch of cumin to dal, it isn\'t just cooking—it is pure care.',
      sec1Text2: 'But today, industrial processing has changed everything. Mass-manufactured spices are ground at blistering speeds, creating extreme temperatures that burn away natural essential oils. Fillers, artificial colors, and starch are added to increase weight. What was meant to heal instead became a compromise.',
      sec1Text3: 'We created Rasoi Sutra to restore this sacred bond. We wanted to make spices that are as pure as the ones ground on traditional stone silbattas at home. No chemicals, no shortcuts. Just honest spices, ground cold, to protect your children and your parents.',
      statTitle: '100% Honest Sourcing',
      statLabel: 'Direct Farm Partnership',
      pillarHead: 'Our Sacred Promises to You',
      pillars: [
        {
          title: 'Motherly Purity',
          desc: 'Absolutely zero preservatives, artificial colors, or cheap starch fillers. Every pinch is pure goodness.'
        },
        {
          title: 'Cold-RPM Grind',
          desc: 'We grind our spices slowly to avoid harsh friction heat, sealing in the therapeutic essential oils.'
        },
        {
          title: 'Empowering Farmers',
          desc: 'By working directly with small farm growers across India, we ensure they earn fair, sustainable prices.'
        }
      ],
      // New Sourcing Suffix English Content
      journeyHead: 'The Sourcing Pilgrimage',
      journeyDesc: 'We don\'t buy spices from anonymous wholesale markets. We travel directly to the source to bring you the best crop of the season.',
      journeySteps: [
        { place: 'Salem, Tamil Nadu', spice: 'Premium Haldi', benefit: 'Tested high in natural Curcumin (3.95%) for maximum anti-inflammatory benefits.' },
        { place: 'Guntur, Andhra Pradesh', spice: 'Vibrant Lal Mirch', benefit: 'Sun-dried naturally for rich red color without any artificial chemical dyes.' },
        { place: 'Ramganj Mandi, Rajasthan', spice: 'Earthy Dhania', benefit: 'Grown sustainably in rich clay soils, preserving cool essential oils.' }
      ],
      purityHead: 'Our Non-Negotiable Standards',
      purityChecklist: [
        'Zero Lead Chromate or Metanil Yellow (dangerous chemical dyes)',
        'Zero starch fillers, wood dust, or added chalk powders',
        'Strictly batch-tested for heavy metals (Lead, Arsenic, Mercury)',
        'Packed hygienically in moisture-lock airtight jars'
      ],
      contactHead: 'Talk Directly to Our Family',
      contactDesc: 'Have a question about our spices, recipes, or how they can benefit your family\'s health? We believe in 100% transparency. Chat directly with the founders on WhatsApp.',
      contactBtn: 'Connect on WhatsApp'
    },
    hi: {
      tag: 'एक माँ का संकल्प',
      title: 'माँ की ममता और शुद्धता की कहानी',
      subtitle: 'हमारे लिए मसाले केवल स्वाद का साधन नहीं हैं—ये आपके परिवार के स्वास्थ्य की ढाल हैं।',
      btnLang: 'Read in English 🇬🇧',
      sec1Title: 'माँ की रसोई का जादू',
      sec1Text1: 'हर भारतीय घर में रसोई से उठने वाली मसालों की भीनी-भीनी खुशबू की एक प्यारी याद बसी होती है। हमारी दादी-नानी मसालों को केवल स्वाद के लिए नहीं चुनती थीं; वे हमारे लिए प्राकृतिक औषधि, रोग-प्रतिरोधक क्षमता (immunity) की कुंजी और स्वास्थ्य की रक्षक थीं। जब एक माँ दूध में हल्दी मिलाती है या दाल में जीरे का तड़का लगाती है, तो वह केवल भोजन नहीं बनाती—वह अपना असीम स्नेह परोसती है।',
      sec1Text2: 'लेकिन आज की भागदौड़ में सब कुछ बदल गया है। फैक्ट्रियों में मसालों को बेहद तेज गति की मशीनों में पीसा जाता है, जिससे उठने वाली भीषण गर्मी उनके प्राकृतिक और औषधीय तेलों (essential oils) को जला देती है। वजन बढ़ाने के लिए उनमें मिलावट, केमिकल और हानिकारक रंग मिला दिए जाते हैं। जो मसाले हमारे स्वास्थ्य को संवारने के लिए थे, वे स्वयं एक समझौता बन गए।',
      sec1Text3: 'हमने रसोई सूत्र (Rasoi Sutra) की शुरुआत इसी पवित्र रिश्ते को दोबारा जीवित करने के लिए की है। हम आपके लिए उतने ही शुद्ध मसाले बनाना चाहते थे, जितने हमारी माँ पुराने समय में सिलबट्टे पर अपने हाथों से पीसती थीं। कोई रसायन नहीं, कोई मिलावट नहीं। केवल 100% सच्चे मसाले, जो आपके बच्चों और बुजुर्गों के स्वास्थ्य की रक्षा करें।',
      statTitle: '100% सच्ची सोर्सिंग',
      statLabel: 'किसानों के साथ सीधा जुड़ाव',
      pillarHead: 'आपके लिए हमारे पवित्र संकल्प',
      pillars: [
        {
          title: 'माँ जैसी शुद्धता',
          desc: 'कोई प्रिजर्वेटिव नहीं, कोई कृत्रिम रंग नहीं, कोई स्टार्च नहीं। हर एक दाना पूर्ण रूप से शुद्ध और प्राकृतिक है।'
        },
        {
          title: 'धीमी पिसाई (Cold Grind)',
          desc: 'हम मसालों को बहुत धीमी गति (Low-RPM) पर पीसते हैं ताकि घर्षण की गर्मी उनके प्राकृतिक तैलीय गुणों को नष्ट न करे।'
        },
        {
          title: 'सच्चा किसान समर्थन',
          desc: 'हम भारत के छोटे किसानों के साथ सीधे काम करते हैं, जिससे उन्हें अपनी फसल का सही और सम्मानजनक मूल्य मिल सके।'
        }
      ],
      // New Sourcing Suffix Hindi Content
      journeyHead: 'हमारी खोज यात्रा',
      journeyDesc: 'हम मसालों को किसी अनजान मंडी से नहीं खरीदते। हम सीधे उन क्षेत्रों की यात्रा करते हैं जहां सबसे बेहतरीन फसल उगती है।',
      journeySteps: [
        { place: 'सलेम, तमिलनाडु', spice: 'प्रीमियम हल्दी', benefit: 'उच्च प्राकृतिक करक्यूमिन (3.95%) युक्त, जो शरीर के दर्द और इम्युनिटी में अत्यंत गुणकारी है।' },
        { place: 'गुंटूर, आंध्र प्रदेश', spice: 'तीखी लाल मिर्च', benefit: 'धूप में प्राकृतिक रूप से सुखाई गई, जिसमें किसी भी प्रकार के केमिकल रंग की मिलावट नहीं है।' },
        { place: 'रामगंज मंडी, राजस्थान', spice: 'सुगंधित धनिया', benefit: 'प्राकृतिक चिकनी मिट्टी में उपजाया गया, जिससे इसके प्राकृतिक तेल पूरी तरह सुरक्षित रहते हैं।' }
      ],
      purityHead: 'हमारे अटल सुरक्षा नियम',
      purityChecklist: [
        'लीड क्रोमेट या मेटानिल येलो (हानिकारक रासायनिक रंग) का शून्य उपयोग',
        'वजन बढ़ाने के लिए कोई हानिकारक स्टार्च, लकड़ी का बुरादा या चॉक पाउडर नहीं',
        'भारी धातुओं (Lead, Arsenic, Mercury) का कड़ा बैच-परीक्षण',
        'नमी से सुरक्षित रखने के लिए हवा-बंद स्वच्छ जार में पैकिंग'
      ],
      contactHead: 'सीधे हमारे परिवार से बात करें',
      contactDesc: 'मसालों की शुद्धता, रेसिपी या परिवार की सेहत से जुड़ा कोई भी सवाल है? हम 100% पारदर्शिता पर विश्वास करते हैं। सीधे संस्थापक परिवार से व्हाट्सएप्प पर बात करें।',
      contactBtn: 'व्हाट्सएप्प पर संपर्क करें'
    }
  };

  const t = content[lang];

  return (
    <div className="w-full bg-[#FAF6F0] py-12 md:py-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Language Translator Header Action (Only visible on this page) */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#df432b] border border-[#f1b8ac] font-bold text-xs shadow-sm hover:bg-[#fff4f0] transition-all cursor-pointer"
          >
            {t.btnLang}
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            key={`${lang}-tag`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#235e32] bg-[#e3eedf] px-4 py-1.5 rounded-full border border-[#cfe4be]"
          >
            {t.tag}
          </motion.span>
          <motion.h1 
            key={`${lang}-title`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-serif font-black text-[#2e1c13] mt-4 leading-tight"
          >
            {t.title}
          </motion.h1>
          <p 
            key={`${lang}-sub`}
            className="text-xs md:text-sm text-[#df432b] mt-3 font-extrabold uppercase tracking-widest"
          >
            {t.subtitle}
          </p>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            key={`${lang}-narrative`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-6 text-left"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#2e1c13] font-serif leading-snug">
              {t.sec1Title}
            </h2>
            <p className="text-sm md:text-base text-[#6c594e] leading-relaxed">
              {t.sec1Text1}
            </p>
            <p className="text-xs md:text-sm text-[#6c594e] leading-relaxed italic">
              {t.sec1Text2}
            </p>
            <p className="text-xs md:text-sm text-emerald-800 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 leading-relaxed font-medium">
              {t.sec1Text3}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src={farmerImg} 
                alt="Rasoi Sutra Organic Sourcing" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#fffdfa]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-amber-900/10 max-w-[200px]">
              <span className="block text-2xl font-black text-[#df432b]">{t.statTitle}</span>
              <span className="block text-[0.6rem] font-bold text-amber-950/70 uppercase tracking-widest mt-0.5">{t.statLabel}</span>
            </div>
          </motion.div>
        </div>

        {/* Pillars Section */}
        <div className="border-t border-amber-900/10 pt-16 text-center mb-20">
          <h3 className="font-serif text-2xl md:text-3xl font-black text-[#2e1c13] mb-12">
            {t.pillarHead}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-amber-900/5 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-[#e4efdf] text-[#235e32] flex items-center justify-center mx-auto mb-6 text-lg">
                    {idx === 0 ? <Heart className="text-emerald-700" /> : idx === 1 ? <Sun className="text-emerald-700" /> : <Sprout className="text-emerald-700" />}
                  </div>
                  <h4 className="font-bold text-[#2e1c13] text-base mb-3">{pillar.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Section 1: Sourcing Journey Timeline */}
        <div className="border-t border-amber-900/10 pt-16 text-left mb-20">
          <h3 className="font-serif text-2xl md:text-3xl font-black text-[#2e1c13] text-center mb-2">
            {t.journeyHead}
          </h3>
          <p className="text-xs text-gray-500 text-center max-w-lg mx-auto mb-12">
            {t.journeyDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.journeySteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-amber-900/5 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-[#df432b] bg-[#fff4f0] px-2.5 py-1 rounded-full mb-4">
                    {step.place}
                  </span>
                  <h4 className="font-bold text-sm text-[#2e1c13]">{step.spice}</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {step.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Section 2: Purity Checklist */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-amber-900/5 shadow-xl shadow-amber-900/5 text-left mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif text-2xl font-black text-[#2e1c13]">
              {t.purityHead}
            </h3>
            <div className="w-12 h-1 bg-[#df432b] mt-4 rounded-full"></div>
            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              We understand that what goes inside your stomach affects your life. That is why we maintain strict, chemical-free testing protocols.
            </p>
          </div>
          <ul className="space-y-3.5">
            {t.purityChecklist.map((item, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-xs text-[#6c594e]">
                <CheckCircle size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* New Section 3: WhatsApp Contact Founders Widget */}
        <div className="bg-gradient-to-br from-[#df432b]/5 to-[#df432b]/10 border border-[#df432b]/20 rounded-3xl p-8 text-center flex flex-col items-center">
          <div className="h-14 w-14 rounded-full bg-[#df432b] flex items-center justify-center text-white text-2xl shadow-md mb-6">
            <MessageCircle size={28} />
          </div>
          <h3 className="font-serif text-2xl font-black text-[#2e1c13] mb-3">
            {t.contactHead}
          </h3>
          <p className="text-xs text-[#6c594e] leading-relaxed max-w-xl mb-6">
            {t.contactDesc}
          </p>
          <a
            href="https://wa.me/919669349555?text=Namaste%20Rasoi%20Sutra%2C%20I%20have%20a%20question%20about%20your%20spices%20and%20health."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#df432b] hover:bg-[#b92f18] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            {t.contactBtn}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
