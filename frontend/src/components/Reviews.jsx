import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Star, MessageSquarePlus, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', reviewText: '', rating: 5 });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get('/reviews');
      if (res.data.success) {
        setReviews(res.data.data);
      } else {
        throw new Error(res.data.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.warn('API review fetch failed, falling back to local database...', err);
      try {
        const localData = await import('../../../backend/data/db.json');
        if (localData && localData.reviews) {
          setReviews(localData.reviews);
        }
      } catch (innerErr) {
        setError('Failed to fetch product reviews.');
      }
    }
  };

  const handleRatingChange = (score) => {
    setFormData({ ...formData, rating: score });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.reviewText.trim()) return;

    try {
      const payload = {
        customerName: formData.name,
        rating: formData.rating,
        review: formData.reviewText
      };

      const res = await axiosInstance.post('/reviews', payload);
      if (res.data.success) {
        setReviews([res.data.data, ...reviews]);
        setFormSubmitted(true);
        setFormData({ name: '', reviewText: '', rating: 5 });
        toast.success('Thank you! Your feedback has been recorded.');
        setTimeout(() => setFormSubmitted(false), 4000);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.warn('Review API submit failed, adding locally to UI state...', err);
      // Simulate submission locally
      const mockReview = {
        id: 'mock_rev_' + Date.now(),
        customerName: formData.name,
        rating: formData.rating,
        review: formData.reviewText,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([mockReview, ...reviews]);
      setFormSubmitted(true);
      setFormData({ name: '', reviewText: '', rating: 5 });
      toast.success('Thank you! Your review has been recorded locally (Staging Mode).');
      setTimeout(() => setFormSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#991B1B] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#451A03] mt-4">Loved by Home Chefs</h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Review Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-amber-900/10 p-6 md:p-8 shadow-xl shadow-amber-900/5">
            <div className="flex items-center gap-2 text-[#991B1B] mb-2">
              <MessageSquarePlus size={22} />
              <h3 className="text-xl font-bold text-amber-950">Share Your Taste Experience</h3>
            </div>
            <p className="text-xs text-amber-900/50 mb-8 leading-relaxed">
              Tell us how Rasoi Sutra premium spices transformed your home cooking!
            </p>

            {formSubmitted ? (
              <div className="flex gap-3 items-center p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 text-sm font-bold animate-fade-in">
                <Check size={20} className="shrink-0" />
                <span>Thank you! Your review has been recorded.</span>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B]"
                    placeholder="E.g., Aarti Sharma"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Select Star Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={`text-2xl transition-transform hover:scale-110 ${
                          formData.rating >= star ? 'text-amber-500' : 'text-gray-200'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewText" className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Your Feedback</label>
                  <textarea
                    id="reviewText"
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    className="w-full h-28 px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B] resize-none"
                    placeholder="Write your experience with our masala..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-[#78350F] hover:from-[#78350F] hover:to-[#451A03] text-white font-bold rounded-2xl shadow-lg transition-all"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Reviews Grid Scroll */}
          <div className="lg:col-span-7 space-y-6">
            {error && (
              <div className="flex gap-2 items-center p-4 bg-red-50 text-red-800 rounded-xl border border-red-100 text-xs font-semibold">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            {reviews.length === 0 ? (
              <div className="text-center py-16 bg-white border border-amber-900/10 rounded-3xl">
                <p className="text-amber-950/40 font-bold">No reviews added yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[550px] overflow-y-auto pr-2 divide-y divide-amber-900/5">
                {reviews.map((rev, idx) => (
                  <motion.div 
                    key={rev.id || idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                    className="bg-white rounded-3xl border border-amber-900/10 p-6 shadow-sm hover:shadow-md transition-shadow pt-6 first:pt-6"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-sm text-amber-950">{rev.customerName}</h4>
                        <span className="text-[10px] text-amber-900/40">Verified Buyer</span>
                      </div>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-sm">
                            {rev.rating > i ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-amber-900/70 italic leading-relaxed">
                      "{rev.review}"
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
