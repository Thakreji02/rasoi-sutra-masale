import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: 'General Inquiry', 
    message: '' 
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    
    try {
      setLoading(true);
      const res = await axiosInstance.post('/contacts/submit', formData);
      if (res.data.success) {
        setSent(true);
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
        toast.success('Message submitted successfully!');
        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#991B1B] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">Get in Touch</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#451A03] mt-4">Connect with Rasoi Sutra</h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact info & Map Placeholder */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-950">We'd Love to Hear From You</h3>
              <p className="mt-1 text-xs text-amber-900/40 uppercase tracking-wider font-bold">
                Anubhav Food & Spices Pvt. Ltd.
              </p>
              <p className="mt-3 text-sm text-amber-900/60 leading-relaxed max-w-xl">
                Whether you are a retail customer looking for premium spices, or a bulk distributor/restaurateur interested in wholesaling, reach out to us!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-amber-50 text-[#991B1B] rounded-2xl border border-amber-100 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Spicery & Factory Address</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Anubhav Food & Spices Pvt. Ltd. (Rasoi Sutra Factory), Agro-Industrial Estate, Sangli - 416416, Maharashtra, India.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-amber-50 text-[#991B1B] rounded-2xl border border-amber-100 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Call / WhatsApp Support</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    +91 98765 43210 (Mon-Sat, 9:00 AM - 6:00 PM)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-amber-50 text-[#991B1B] rounded-2xl border border-amber-100 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Email Assistance</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    info@rasoisutramasale.com / sales@rasoisutramasale.com
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder Card */}
            <div className="h-52 bg-gradient-to-r from-amber-100 to-amber-200/20 border border-amber-900/10 rounded-3xl flex items-center justify-center p-6 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-amber-900/5 shadow-xl text-center max-w-sm z-10 flex flex-col items-center">
                <div className="h-9 w-9 bg-red-100 text-[#991B1B] rounded-full flex items-center justify-center animate-bounce mb-2">
                  <MapPin size={18} />
                </div>
                <span className="block font-bold text-xs text-amber-950">Sangli Spice Processing Factory</span>
                <span className="block text-[10px] text-gray-400 mt-0.5">Latitude: 16.8524° N, Longitude: 74.5816° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-amber-900/10 p-6 md:p-8 shadow-xl shadow-amber-900/5">
            <h3 className="text-2xl font-bold text-amber-950">Send a Message</h3>
            <p className="text-xs text-amber-900/50 mt-1 mb-8">We typically respond to inquiries within 12-24 hours.</p>

            {sent ? (
              <div className="flex gap-4 items-start p-6 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-3xl animate-fade-in">
                <Check size={24} className="shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Thank you. Our support representative will review your inquiry and get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B]"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B]"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Subject / Inquiry Type</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-semibold text-amber-950 focus:outline-none focus:border-[#991B1B] cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Wholesale & Bulk Orders">Wholesale & Bulk Orders</option>
                    <option value="Distribution Request">Distribution Request</option>
                    <option value="Custom Blending Request">Custom Blending Request</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Your Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full h-28 px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B] resize-none"
                    placeholder="Describe how we can help you..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-[#78350F] hover:from-[#78350F] hover:to-[#451A03] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting Inquiry...' : 'Send Message'}
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
