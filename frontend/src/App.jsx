import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowRight } from 'lucide-react';

// Lazy load routing components for optimization
const About = lazy(() => import('./components/About'));
const ProductList = lazy(() => import('./components/ProductList'));
const AvailableOn = lazy(() => import('./components/AvailableOn'));
const Reviews = lazy(() => import('./components/Reviews'));
const Contact = lazy(() => import('./components/Contact'));
const Checkout = lazy(() => import('./components/Checkout'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

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
      <div className="py-20 px-4 bg-gradient-to-b from-[#FAF6F0] to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-wider text-[#991B1B] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">Featured</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#451A03] mt-3">From Our Fields To Your Kitchen</h2>
            <p className="mt-3 text-amber-900/60 text-sm">Experience our hot-selling traditional Indian spices.</p>
          </div>
          
          <ProductList />
          
          <div className="mt-12">
            <button 
              onClick={() => {
                navigate('/products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#991B1B] hover:bg-[#B91C1C] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              View Full Spice Shop
              <ArrowRight size={18} />
            </button>
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
            <Route path="/products" element={<ProductList />} />
            <Route path="/available-on" element={<AvailableOn />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout onBackToShop={handleBackToShop} />} />
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
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
