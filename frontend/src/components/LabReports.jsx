import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, CheckCircle, ShieldCheck, Download, Search } from 'lucide-react';

const LabReports = () => {
  const [activeReport, setActiveReport] = useState('turmeric');

  const reports = {
    turmeric: {
      title: 'Premium Turmeric Powder (Haldi)',
      batch: 'RS-TUR-2026-08',
      date: 'August 02, 2026',
      status: 'Passed (Zero Volatiles Lost)',
      parameters: [
        { name: 'Curcumin Content', spec: 'Min 3.0%', result: '3.95%', status: 'Excellent' },
        { name: 'Moisture Content', spec: 'Max 10.0%', result: '7.82%', status: 'Passed' },
        { name: 'Pesticide Residue', spec: 'Not Detected', result: 'Nil', status: 'Passed' },
        { name: 'Lead (Pb)', spec: 'Max 2.5 ppm', result: 'Not Detected', status: 'Passed' },
        { name: 'Starch/Fillers', spec: 'Negative', result: 'Negative', status: 'Passed' }
      ]
    },
    chilli: {
      title: 'Premium Lal Mirch Powder',
      batch: 'RS-CHL-2026-08',
      date: 'August 03, 2026',
      status: 'Passed (Natural Oils Intact)',
      parameters: [
        { name: 'Capsaicin (Heat)', spec: '15,000 - 25,000 SHU', result: '19,250 SHU', status: 'Passed' },
        { name: 'Moisture Content', spec: 'Max 11.0%', result: '8.14%', status: 'Passed' },
        { name: 'Added Artificial Colors', spec: 'Negative', result: 'Negative', status: 'Passed' },
        { name: 'Aflatoxin', spec: 'Max 15 ppb', result: 'Not Detected', status: 'Passed' },
        { name: 'Sudan Dye (I-IV)', spec: 'Negative', result: 'Negative', status: 'Passed' }
      ]
    },
    garam_masala: {
      title: 'Premium Garam Masala',
      batch: 'RS-GRM-2026-07',
      date: 'July 28, 2026',
      status: 'Passed (Premium Blend)',
      parameters: [
        { name: 'Volatile Oil Content', spec: 'Min 1.5%', result: '2.14%', status: 'Excellent' },
        { name: 'Total Ash', spec: 'Max 8.0%', result: '5.23%', status: 'Passed' },
        { name: 'Acid Insoluble Ash', spec: 'Max 1.5%', result: '0.41%', status: 'Passed' },
        { name: 'Insect Damage', spec: 'Negative', result: 'Negative', status: 'Passed' },
        { name: 'Salmonella (in 25g)', spec: 'Absent', result: 'Absent', status: 'Passed' }
      ]
    }
  };

  const reportKeys = Object.keys(reports);

  return (
    <div className="w-full bg-[#FAF6F0] py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#235e32] bg-[#e3eedf] px-3.5 py-1 rounded-full border border-[#cfe4be]">
            100% Transparency
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2e1c13] mt-4">
            Independent Lab Reports
          </h1>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            At Rasoi Sutra, we believe you have the right to know exactly what goes into your food. We test every single batch in independent, NABL-accredited government labs.
          </p>
          <div className="w-20 h-1 bg-[#df432b] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {reportKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveReport(key)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeReport === key
                  ? 'bg-[#173f27] text-white shadow-md'
                  : 'bg-white text-[#2e1c13] border border-amber-900/5 hover:bg-amber-50/50'
              }`}
            >
              {reports[key].title.split(' ')[1] || reports[key].title}
            </button>
          ))}
        </div>

        {/* Report Card */}
        <motion.div
          key={activeReport}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-amber-900/5 p-6 md:p-10 shadow-xl shadow-amber-900/5 text-left"
        >
          {/* Certificate header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-amber-900/10 pb-6 mb-8">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Batch Verified
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">
                {reports[activeReport].title}
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                <span><strong>Batch Code:</strong> {reports[activeReport].batch}</span>
                <span>•</span>
                <span><strong>Tested On:</strong> {reports[activeReport].date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-amber-50/50 px-4 py-3 rounded-2xl border border-amber-900/5 w-full md:w-auto">
              <ShieldCheck className="text-emerald-700 shrink-0" size={24} />
              <div className="text-xs">
                <span className="block font-bold text-[#2e1c13]">Purity Status</span>
                <span className="text-emerald-700 font-bold">{reports[activeReport].status}</span>
              </div>
            </div>
          </div>

          {/* Test parameters list */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2e1c13] mb-4">Chemical Analysis Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-amber-900/5 text-gray-400">
                    <th className="pb-3 text-left font-extrabold uppercase tracking-wider">Test Parameter</th>
                    <th className="pb-3 text-left font-extrabold uppercase tracking-wider">Safety Standard</th>
                    <th className="pb-3 text-left font-extrabold uppercase tracking-wider">Rasoi Sutra Results</th>
                    <th className="pb-3 text-right font-extrabold uppercase tracking-wider">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/5">
                  {reports[activeReport].parameters.map((param, index) => (
                    <tr key={index} className="hover:bg-amber-50/10">
                      <td className="py-4 font-bold text-[#2e1c13]">{param.name}</td>
                      <td className="py-4 text-gray-500">{param.spec}</td>
                      <td className="py-4 font-black text-emerald-800">{param.result}</td>
                      <td className="py-4 text-right">
                        <span className="inline-block bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px]">
                          {param.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification CTA */}
          <div className="mt-8 pt-8 border-t border-amber-900/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-gray-400 max-w-md text-center sm:text-left leading-relaxed">
              * Reports are compiled using standard AOAC methods at NABL certified labs. Curcumin concentration tested via HPLC chromatography.
            </p>
            <button 
              onClick={() => alert(`Downloading Batch Certificate: ${reports[activeReport].batch}.pdf`)}
              className="flex items-center gap-2 px-6 py-3 bg-[#df432b] hover:bg-[#b92f18] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Download size={14} />
              Download Official PDF
            </button>
          </div>
        </motion.div>

        {/* FSSAI Seal Box */}
        <div className="mt-16 bg-[#e3eedf] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border border-[#cfe4be]">
          <div className="text-left max-w-xl">
            <h3 className="font-serif font-black text-lg text-[#173f27]">FSSAI License & Certification</h3>
            <p className="text-xs text-emerald-800/80 leading-relaxed mt-1">
              Rasoi Sutra products are packed in a state-of-the-art facility certified by FSSAI (License No. 11524039000213). Every batch undergoes mandatory pesticide residue and aflatoxin contamination clearance tests before dispatch.
            </p>
          </div>
          <div className="h-16 w-32 border-2 border-emerald-800/20 bg-white rounded-2xl flex items-center justify-center font-black text-[#173f27] text-lg shadow-inner">
            fssai
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReports;
