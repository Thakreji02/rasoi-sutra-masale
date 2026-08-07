import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowRight } from 'lucide-react';

// Lazy load routing components for optimization
const About = lazy(() => import('./components/About'));
const MyOrders = lazy(() => import('./components/MyOrders'));
const ProductList = lazy(() => import('./components/ProductList'));
const AvailableOn = lazy(() => import('./components/AvailableOn'));
const Reviews = lazy(() => import('./components/Reviews'));
const Contact = lazy(() => import('./components/Contact'));
const Checkout = lazy(() => import('./components/Checkout'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const OurStory = lazy(() => import('./components/OurStory'));
const LabReports = lazy(() => import('./components/LabReports'));
const OurProcess = lazy(() => import('./components/OurProcess'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
    <div className="w-12 h-12 border-4 border-amber-900/10 border-l-[#991B1B] rounded-full animate-spin"></div>
    <p className="text-amber-950/60 font-semibold text-sm">Loading Rasoi Sutra...</p>
  </div>
);

function HomeContent() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAF6F0]">
      <Hero />
      <div id="about-section">
        <About />
      </div>
      
      {/* Featured Spice Showcase Teaser */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#FAF6F0] to-[#fffdfa]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-wider text-[#235e32] uppercase bg-[#e3eedf] px-3 py-1 rounded-full border border-[#cfe4be]">Featured</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2e1c13] mt-3">From Our Fields To Your Kitchen</h2>
            <p className="mt-3 text-amber-900/60 text-sm">Experience our hot-selling traditional Indian spices.</p>
          </div>
          
          <ProductList />
          
          <div className="mt-12">
            <button 
              onClick={() => {
                navigate('/products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#df432b] hover:bg-[#b92f18] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              View Full Spice Shop
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Farmers Sourcing Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#fffdfa] to-[#eef4e7]">
        <div className="max-w-5xl mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Info & Buttons */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#235e32] bg-[#e4efdf] px-3 py-1 rounded-full border border-[#cfe4be]">
                🌾 Farmers Across India
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2e1c13] leading-tight">
                Grow Spices? <span className="text-emerald-700">Partner With Rasoi Sutra.</span>
              </h2>
              <p className="text-sm text-[#6c594e] leading-relaxed">
                We invite farmers, FPOs, and spice growers across India to connect directly with us. Tell us what you grow, where your farm is located, and the quantity available.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[#df432b] hover:bg-[#b92f18] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  Sell Your Spices to Us →
                </Link>
                <a 
                  href="https://wa.me/910000000000?text=Hello%20Rasoi%20Sutra%2C%20I%20am%20a%20spice%20farmer%20and%20want%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-[#173f27] border border-[#cfe4be] hover:bg-[#e4efdf]/20 font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-sm transition-transform hover:scale-105"
                >
                  WhatsApp Directly
                </a>
              </div>
            </div>

            {/* Right Col: 3 Sourcing Pillars */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-amber-900/5 shadow-sm flex gap-4 items-start">
                <span className="text-2xl bg-amber-50 h-10 w-10 rounded-xl flex items-center justify-center shrink-0">🤝</span>
                <div>
                  <h4 className="font-bold text-[#2e1c13] text-sm">Direct Sourcing Conversation</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Connect with our team without a complicated process.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-amber-900/5 shadow-sm flex gap-4 items-start">
                <span className="text-2xl bg-amber-50 h-10 w-10 rounded-xl flex items-center justify-center shrink-0">🔍</span>
                <div>
                  <h4 className="font-bold text-[#2e1c13] text-sm">Quality-Based Evaluation</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Samples are assessed for aroma, cleanliness, and suitability.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-amber-900/5 shadow-sm flex gap-4 items-start">
                <span className="text-2xl bg-amber-50 h-10 w-10 rounded-xl flex items-center justify-center shrink-0">📍</span>
                <div>
                  <h4 className="font-bold text-[#2e1c13] text-sm">All-India Farmer Network</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Welcoming enquiries from every spice-growing region.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support Contact Section */}
      <div className="py-20 px-4 bg-white border-t border-amber-900/5">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#df432b] bg-[#fff4f0] px-3.5 py-1.5 rounded-full border border-[#f1b8ac]">
            We're Here to Help
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2e1c13]">
            Have a Question About Our Masalas?
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Need help choosing a product, placing an order, or tracking your delivery? Our Rasoi Sutra team is happy to help.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#df432b] hover:bg-[#b92f18] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Contact Us
            </Link>
            <a 
              href="https://wa.me/910000000000?text=Hello%20Rasoi%20Sutra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#173f27] hover:bg-[#235e32] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            <div className="bg-amber-50/30 p-5 rounded-2xl border border-amber-900/5">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-900/40 uppercase block">📞 Call or WhatsApp</span>
              <strong className="block text-sm text-[#2e1c13] mt-1">+91 00000 00000</strong>
            </div>
            <div className="bg-amber-50/30 p-5 rounded-2xl border border-amber-900/5">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-900/40 uppercase block">📦 Order Support</span>
              <strong className="block text-sm text-[#2e1c13] mt-1">Pan-India Delivery</strong>
            </div>
            <div className="bg-amber-50/30 p-5 rounded-2xl border border-amber-900/5">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-900/40 uppercase block">🌿 Product Questions</span>
              <strong className="block text-sm text-[#2e1c13] mt-1">Talk to Rasoi Sutra Team</strong>
            </div>
          </div>
        </div>
      </div>

      <Reviews />
    </div>
  );
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => setCartOpen(!cartOpen);
  
  const handleProceedToCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar onCartToggle={toggleCart} />

      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/our-process" element={<OurProcess />} />
            <Route path="/lab-reports" element={<LabReports />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/available-on" element={<AvailableOn />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout onBackToShop={handleBackToShop} />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </main>

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={toggleCart} 
        onCheckout={handleProceedToCheckout} 
      />

      <Footer />

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
