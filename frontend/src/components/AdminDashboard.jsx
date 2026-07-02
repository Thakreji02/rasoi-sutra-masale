import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { 
  LayoutDashboard, ShoppingBag, ClipboardList, Plus, Trash2, Edit2, LogOut, CheckCircle, 
  Package, MessageSquare, Mail, DollarSign, TrendingUp, AlertCircle 
} from 'lucide-react';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard view selection
  const [adminTab, setAdminTab] = useState('overview');

  // Database Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Product Form State (for adding/updating)
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    discount: '0',
    stock: '100',
    weight: '100g, 250g, 500g',
    ingredients: '100% Raw Spices',
    featured: false
  });

  useEffect(() => {
    // Check local storage for persistent token
    const savedToken = localStorage.getItem('rasoi_sutra_admin_token');
    if (savedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminData();
      fetchCategories();
      setupSSEConnection();
    }
  }, [isLoggedIn]);

  // Real-time SSE orders notification listener
  const setupSSEConnection = () => {
    const sseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/orders/stream`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      try {
        if (event.data === 'connected') return;
        const orderData = JSON.parse(event.data);
        
        // Play sweet electronic notification chime
        playNotificationChime();
        toast.info(`🔔 New Live Order received! Amount: ₹${orderData.totalAmount}`);

        // Fetch refreshed orders list
        fetchOrders();
      } catch (err) {
        console.error('Error handling SSE notification:', err);
      }
    };

    eventSource.onerror = (e) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  // Audio synthesizer for fresh order chiming
  const playNotificationChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.45);
    } catch (e) {
      console.warn('Browser audio synthesis failed:', e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
        if (res.data.data.length > 0 && !productForm.categoryId) {
          setProductForm(prev => ({ ...prev, categoryId: res.data.data[0].id }));
        }
      }
    } catch (err) {
      console.error('Categories error', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products', { params: { size: 100 } });
      if (res.data.success) setProducts(res.data.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get('/admin/orders');
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get('/reviews');
      if (res.data.success) setReviews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get('/admin/contacts');
      if (res.data.success) setContacts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdminData = () => {
    fetchProducts();
    fetchOrders();
    fetchReviews();
    fetchContacts();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const res = await axiosInstance.post('/auth/login', { username, password });
      if (res.data.success) {
        localStorage.setItem('rasoi_sutra_admin_token', res.data.data.token);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        toast.success('Admin authenticated successfully!');
      } else {
        setLoginError(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login failed', err);
      setLoginError('Invalid admin credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rasoi_sutra_admin_token');
    setIsLoggedIn(false);
    toast.info('Logged out from Admin Dashboard.');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    // Parse weight and ingredients lists
    const weightsList = productForm.weight.split(',').map(w => w.trim());
    const ingredientsList = productForm.ingredients.split(',').map(i => i.trim());

    const productPayload = {
      name: productForm.name,
      description: productForm.description,
      categoryId: productForm.categoryId || (categories[0] ? categories[0].id : ''),
      price: parseFloat(productForm.price),
      discount: parseFloat(productForm.discount),
      stock: parseInt(productForm.stock),
      weight: weightsList,
      ingredients: ingredientsList,
      featured: productForm.featured,
      isAvailable: true
    };

    try {
      if (editingProduct) {
        const res = await axiosInstance.put(`/admin/products/${editingProduct.id}`, productPayload);
        if (res.data.success) {
          toast.success('Product updated successfully!');
          fetchProducts();
          closeProductForm();
        }
      } else {
        const res = await axiosInstance.post('/admin/products', productPayload);
        if (res.data.success) {
          toast.success('Product added successfully!');
          fetchProducts();
          closeProductForm();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit product data.');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price.toString(),
      discount: product.discount.toString(),
      stock: product.stock.toString(),
      weight: product.weight.join(', '),
      ingredients: product.ingredients.join(', '),
      featured: product.featured || false
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await axiosInstance.delete(`/admin/products/${id}`);
      if (res.data.success) {
        toast.success('Product deleted successfully!');
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product.');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axiosInstance.put(`/admin/orders/${orderId}/status`, null, {
        params: { status: newStatus }
      });
      if (res.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status.');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this customer review?')) return;
    try {
      const res = await axiosInstance.delete(`/admin/reviews/${id}`);
      if (res.data.success) {
        toast.success('Review deleted.');
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact message log?')) return;
    try {
      const res = await axiosInstance.delete(`/admin/contacts/${id}`);
      if (res.data.success) {
        toast.success('Contact message log deleted.');
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      categoryId: categories[0] ? categories[0].id : '',
      price: '',
      discount: '0',
      stock: '100',
      weight: '100g, 250g, 500g',
      ingredients: '100% Raw Spices',
      featured: false
    });
  };

  // Stats summaries
  const totalSales = orders
    .filter(o => o.paymentStatus === 'PAID')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const pendingOrders = orders.filter(o => o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELLED').length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF6F0] py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-amber-900/10 p-8 shadow-xl shadow-amber-900/5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-black text-amber-950">Admin Authentication</h2>
            <p className="text-amber-900/50 mt-1 text-sm">Protected business control panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="flex gap-2 items-center p-4 bg-red-50 text-red-800 rounded-xl border border-red-100 text-xs font-semibold">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B]"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#991B1B]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white font-bold rounded-2xl shadow-lg transition-all"
            >
              Sign In to Terminal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#2B1E17] text-[#FAF6F0] shrink-0 flex flex-col justify-between py-8 px-4 border-r border-amber-900/20">
        <div className="space-y-8">
          <div className="text-center md:text-left px-4">
            <h3 className="font-serif font-black text-xl text-amber-400">Admin Control</h3>
            <span className="text-[0.6rem] font-bold text-[#FAF6F0]/40 uppercase tracking-widest">Rasoi Sutra Masale</span>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setAdminTab('overview')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                adminTab === 'overview' ? 'bg-amber-500 text-[#2B1E17]' : 'hover:bg-[#faf6f0]/10 text-[#FAF6F0]/70 hover:text-white'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setAdminTab('products')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                adminTab === 'products' ? 'bg-amber-500 text-[#2B1E17]' : 'hover:bg-[#faf6f0]/10 text-[#FAF6F0]/70 hover:text-white'
              }`}
            >
              <Package size={18} />
              <span>Manage Products</span>
            </button>

            <button
              onClick={() => setAdminTab('orders')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                adminTab === 'orders' ? 'bg-amber-500 text-[#2B1E17]' : 'hover:bg-[#faf6f0]/10 text-[#FAF6F0]/70 hover:text-white'
              }`}
            >
              <ClipboardList size={18} />
              <span>Manage Orders</span>
              {pendingOrders > 0 && (
                <span className="ml-auto bg-red-600 text-white font-extrabold text-[0.65rem] px-2 py-0.5 rounded-full">
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('reviews')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                adminTab === 'reviews' ? 'bg-amber-500 text-[#2B1E17]' : 'hover:bg-[#faf6f0]/10 text-[#FAF6F0]/70 hover:text-white'
              }`}
            >
              <MessageSquare size={18} />
              <span>Reviews</span>
            </button>

            <button
              onClick={() => setAdminTab('contacts')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                adminTab === 'contacts' ? 'bg-amber-500 text-[#2B1E17]' : 'hover:bg-[#faf6f0]/10 text-[#FAF6F0]/70 hover:text-white'
              }`}
            >
              <Mail size={18} />
              <span>Inquiries</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#FAF6F0]/10 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm font-bold transition-colors w-full py-2"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* VIEW 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-amber-950 font-serif">Overview Dashboard</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><DollarSign size={24} /></div>
                <div>
                  <span className="block text-xs font-bold text-amber-900/40 uppercase tracking-widest">Total Sales</span>
                  <span className="block text-2xl font-serif font-black text-amber-950 mt-1">₹{totalSales}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><ClipboardList size={24} /></div>
                <div>
                  <span className="block text-xs font-bold text-amber-900/40 uppercase tracking-widest">Total Orders</span>
                  <span className="block text-2xl font-serif font-black text-amber-950 mt-1">{orders.length}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-red-50 text-[#991B1B] rounded-2xl"><Package size={24} /></div>
                <div>
                  <span className="block text-xs font-bold text-amber-900/40 uppercase tracking-widest">Products</span>
                  <span className="block text-2xl font-serif font-black text-amber-950 mt-1">{products.length}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><MessageSquare size={24} /></div>
                <div>
                  <span className="block text-xs font-bold text-amber-900/40 uppercase tracking-widest">Reviews</span>
                  <span className="block text-2xl font-serif font-black text-amber-950 mt-1">{reviews.length}</span>
                </div>
              </div>
            </div>

            {/* Sales Chart placeholder or sales overview log list */}
            <div className="bg-white border border-amber-900/10 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-amber-950 mb-4">Sales & Operations Summary</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>Welcome to Rasoi Sutra Masale operations panel. Here you can monitor guest order transactions, shipping logistics, customer complaints/reviews, and bulk inquiries.</p>
                <div className="p-4 bg-amber-50 border border-amber-200/50 rounded-2xl flex items-center gap-3 text-amber-900">
                  <TrendingUp size={20} />
                  <span><strong>Live stream monitor active:</strong> Any orders checkout from customer screen will immediately sound notification and refresh logs.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCTS */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-amber-950 font-serif">Product Catalog Management</h2>
              <button 
                onClick={() => setShowProductForm(true)}
                className="flex items-center gap-2 px-5 py-3 bg-[#991B1B] text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={16} />
                <span>Add Spice Product</span>
              </button>
            </div>

            {/* Product form overlay */}
            {showProductForm && (
              <div className="fixed inset-0 z-50 bg-[#2B1E17]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl border border-amber-900/10 p-6 md:p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="font-serif font-bold text-2xl text-amber-950 mb-6">
                    {editingProduct ? 'Update Spice Product' : 'Add New Spice Product'}
                  </h3>

                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Product Name</label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Category</label>
                        <select
                          value={productForm.categoryId}
                          onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                        >
                          {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.categoryName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        required
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full h-24 px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Base Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Discount (₹)</label>
                        <input
                          type="number"
                          value={productForm.discount}
                          onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Stock</label>
                        <input
                          type="number"
                          required
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Weight Options (comma-sep)</label>
                        <input
                          type="text"
                          value={productForm.weight}
                          onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                          placeholder="100g, 250g, 500g"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-amber-950 uppercase tracking-widest mb-2">Ingredients (comma-sep)</label>
                        <input
                          type="text"
                          value={productForm.ingredients}
                          onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-xl focus:outline-none"
                          placeholder="Ingredients list..."
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={productForm.featured}
                        onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                        className="accent-[#991B1B]"
                      />
                      <span className="text-sm font-bold text-amber-950">Show in Featured Products Section</span>
                    </label>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={closeProductForm}
                        className="flex-1 py-3 bg-amber-50 text-[#78350F] font-bold rounded-xl border border-amber-900/10"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#991B1B] text-white font-bold rounded-xl"
                      >
                        Submit Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products Table list */}
            <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF6F0] text-amber-950 text-xs font-bold uppercase tracking-wider border-b border-amber-900/10">
                      <th className="p-4 pl-6">Spice Name</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Weights</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/5 text-sm text-gray-700">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-amber-50/20">
                        <td className="p-4 pl-6 font-bold text-amber-950">{p.name}</td>
                        <td className="p-4 font-semibold text-[#991B1B]">₹{p.price}</td>
                        <td className="p-4">{p.stock} units</td>
                        <td className="p-4 text-xs font-mono">{p.weight ? p.weight.join(', ') : ''}</td>
                        <td className="p-4 pr-6 text-right space-x-2">
                          <button 
                            onClick={() => handleEditProduct(p)}
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg inline-flex"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ORDERS */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-950 font-serif">Customer Orders Pipeline</h2>
            
            <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF6F0] text-amber-950 text-xs font-bold uppercase tracking-wider border-b border-amber-900/10">
                      <th className="p-4 pl-6">ID / Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4 pr-6 text-right">Update Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/5 text-sm text-gray-700">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-amber-50/20">
                        <td className="p-4 pl-6">
                          <span className="block font-mono font-bold text-amber-950">#{o.id ? o.id.substring(o.id.length - 6).toUpperCase() : ''}</span>
                          <span className="text-[10px] text-gray-400 mt-1 block">{o.orderDate ? new Date(o.orderDate).toLocaleString() : ''}</span>
                        </td>
                        <td className="p-4">
                          <span className="block font-semibold text-amber-950">{o.customerName}</span>
                          <span className="text-xs text-gray-400">{o.mobile} | {o.city}</span>
                        </td>
                        <td className="p-4 font-bold text-[#991B1B]">₹{o.totalAmount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                            o.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                            o.orderStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                            o.orderStatus === 'PROCESSING' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${
                            o.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                          }`}>
                            {o.paymentStatus} ({o.paymentMethod})
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className="px-2.5 py-1.5 bg-[#FAF6F0] border border-amber-900/10 rounded-lg text-xs font-bold text-amber-950 focus:outline-none"
                          >
                            <option value="PLACED">Placed</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: REVIEWS */}
        {adminTab === 'reviews' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-950 font-serif">Customer Reviews List</h2>
            
            <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF6F0] text-amber-950 text-xs font-bold uppercase tracking-wider border-b border-amber-900/10">
                      <th className="p-4 pl-6">Customer</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Review content</th>
                      <th className="p-4 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/5 text-sm text-gray-700">
                    {reviews.map(r => (
                      <tr key={r.id} className="hover:bg-amber-50/20">
                        <td className="p-4 pl-6 font-bold text-amber-950">{r.customerName}</td>
                        <td className="p-4 font-bold text-amber-500">★ {r.rating} / 5</td>
                        <td className="p-4 text-xs italic text-gray-600 max-w-md truncate">{r.review}</td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => handleDeleteReview(r.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg inline-flex"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: INQUIRIES */}
        {adminTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-950 font-serif">Bulk & Corporate Inquiries</h2>
            
            <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF6F0] text-amber-950 text-xs font-bold uppercase tracking-wider border-b border-amber-900/10">
                      <th className="p-4 pl-6">Contact info</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Message Log</th>
                      <th className="p-4 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/5 text-sm text-gray-700">
                    {contacts.map(c => (
                      <tr key={c.id} className="hover:bg-amber-50/20">
                        <td className="p-4 pl-6">
                          <span className="block font-bold text-amber-950">{c.name}</span>
                          <span className="text-xs text-gray-400">{c.email} | {c.phone}</span>
                        </td>
                        <td className="p-4 font-semibold text-gray-700">{c.subject}</td>
                        <td className="p-4 text-xs text-gray-500 max-w-sm">{c.message}</td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg inline-flex"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
