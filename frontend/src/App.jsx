import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductList from './components/ProductList';
import AvailableOn from './components/AvailableOn';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowRight } from 'lucide-react';

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
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/available-on" element={<AvailableOn />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout onBackToShop={handleBackToShop} />} />
          <Route path="/admin/login" element={<AdminDashboard />} />
        </Routes>
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
