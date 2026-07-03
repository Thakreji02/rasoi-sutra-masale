import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axiosInstance from '../api/axios';
import { Filter, SortAsc, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [direction, setDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Load categories and products on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, direction, currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.warn('Failed to load categories, loading fallback...', err);
      // Fallback categories list
      setCategories([
        { id: '1', categoryName: 'Ground Spices' },
        { id: '2', categoryName: 'Whole Spices' },
        { id: '3', categoryName: 'Spice Blends' }
      ]);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build parameters using the new schema keys
      const params = {
        page: currentPage,
        size: 8,
        sortBy: sortBy,
        direction: direction
      };

      if (searchTerm && searchTerm.trim() !== '') {
        params.keyword = searchTerm;
      }

      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }

      if (priceRange.min !== '') {
        params.minPrice = parseFloat(priceRange.min);
      }
      if (priceRange.max !== '') {
        params.maxPrice = parseFloat(priceRange.max);
      }

      const res = await axiosInstance.get('/products', { params });
      if (res.data.success) {
        const { products, currentPage: page, totalPages: pages, totalItems: items } = res.data.data;
        setProducts(products);
        setCurrentPage(page);
        setTotalPages(pages);
        setTotalItems(items);
      } else {
        throw new Error(res.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.warn('Error fetching products from server, loading local fallback...', err);
      // Local fallback spices
      const localProducts = [
        {
          id: '1',
          productName: 'Premium Haldi Powder',
          slug: 'premium-haldi-powder',
          category: 'Ground Spices',
          brandName: 'Rasoi Sutra',
          shortDescription: '100% Pure & Natural premium turmeric powder with high curcumin content.',
          image: '/haldi.jpg',
          mrp: 120.0,
          sellingPrice: 99.0,
          discountPercentage: 17.5,
          stock: 150,
          unit: '200g',
          shelfLife: '12 Months',
          countryOfOrigin: 'India',
          isBestSeller: true,
          isFeatured: true,
          rating: 4.8,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          productName: 'Premium Lal Mirch Powder',
          slug: 'premium-lal-mirch-powder',
          category: 'Ground Spices',
          brandName: 'Rasoi Sutra',
          shortDescription: '100% Pure & Natural vibrant red chilli powder with mild pleasant heat.',
          image: '/chilli.jpg',
          mrp: 150.0,
          sellingPrice: 129.0,
          discountPercentage: 14.0,
          stock: 120,
          unit: '200g',
          shelfLife: '12 Months',
          countryOfOrigin: 'India',
          isBestSeller: true,
          isFeatured: true,
          rating: 4.9,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          productName: 'Premium Garam Masala',
          slug: 'premium-garam-masala',
          category: 'Spice Blends',
          brandName: 'Rasoi Sutra',
          shortDescription: 'Traditional blend of premium roasted whole spices for rich flavor and aroma.',
          image: '/garam_masala.jpg',
          mrp: 180.0,
          sellingPrice: 149.0,
          discountPercentage: 17.2,
          stock: 100,
          unit: '200g',
          shelfLife: '12 Months',
          countryOfOrigin: 'India',
          isBestSeller: true,
          isFeatured: true,
          rating: 4.7,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          productName: 'Premium Jeera Whole',
          slug: 'premium-jeera-whole',
          category: 'Whole Spices',
          brandName: 'Rasoi Sutra',
          shortDescription: '100% Pure & Natural bold cumin seeds with intense earthy aroma.',
          image: '/jeera.jpg',
          mrp: 160.0,
          sellingPrice: 135.0,
          discountPercentage: 15.6,
          stock: 180,
          unit: '200g',
          shelfLife: '12 Months',
          countryOfOrigin: 'India',
          isBestSeller: false,
          isFeatured: true,
          rating: 4.6,
          createdAt: new Date().toISOString()
        }
      ];

      let items = localProducts;
      if (selectedCategory !== 'All') {
        items = items.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
      }
      if (searchTerm && searchTerm.trim() !== '') {
        items = items.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (priceRange.min !== '') {
        items = items.filter(p => p.sellingPrice >= parseFloat(priceRange.min));
      }
      if (priceRange.max !== '') {
        items = items.filter(p => p.sellingPrice <= parseFloat(priceRange.max));
      }
      
      // Sort
      if (sortBy === 'sellingPrice') {
        items = [...items].sort((a, b) => direction === 'asc' ? a.sellingPrice - b.sellingPrice : b.sellingPrice - a.sellingPrice);
      } else {
        items = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setProducts(items);
      setTotalPages(1);
      setTotalItems(items.length);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchProducts();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('createdAt');
    setDirection('desc');
    setPriceRange({ min: '', max: '' });
    setCurrentPage(0);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === 'price-asc') {
      setSortBy('sellingPrice');
      setDirection('asc');
    } else if (value === 'price-desc') {
      setSortBy('sellingPrice');
      setDirection('desc');
    } else {
      setSortBy('createdAt');
      setDirection('desc');
    }
    setCurrentPage(0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#991B1B] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">Our Shop</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#451A03] mt-4">Premium Spice Collection</h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter and Control Panel */}
        <div className="bg-white rounded-3xl border border-amber-900/10 p-6 md:p-8 shadow-xl shadow-amber-900/5 mb-12">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
              <input
                type="text"
                placeholder="Search spices (e.g. Haldi, Lal Mirch)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#FAF6F0] border border-amber-900/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] transition-all"
              />
            </div>

            {/* Price Filter range */}
            <div className="lg:col-span-4 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900/50">Price:</span>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-20 px-3 py-2.5 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm focus:outline-none focus:border-[#991B1B]"
              />
              <span className="text-amber-900/30">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-20 px-3 py-2.5 bg-[#FAF6F0] border border-amber-900/10 rounded-xl text-sm focus:outline-none focus:border-[#991B1B]"
              />
              <button 
                type="button" 
                onClick={() => { setCurrentPage(0); fetchProducts(); }}
                className="px-3.5 py-2.5 bg-[#451A03] hover:bg-[#5C2018] text-white text-xs font-bold rounded-xl transition-all"
              >
                Go
              </button>
            </div>

            {/* Sorting */}
            <div className="lg:col-span-2 relative flex items-center gap-2">
              <SortAsc className="text-amber-900/40 shrink-0" size={18} />
              <select
                onChange={handleSortChange}
                className="w-full py-3 px-4 bg-[#FAF6F0] border border-amber-900/10 rounded-2xl text-sm font-semibold text-[#451A03] focus:outline-none focus:border-[#991B1B] cursor-pointer"
              >
                <option value="latest">Latest Spices</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Reset / Search Buttons */}
            <div className="lg:col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#991B1B] hover:bg-[#B91C1C] text-[#FAF6F0] text-sm font-bold rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearFilters}
                className="p-3 bg-amber-50 hover:bg-amber-100/50 text-[#78350F] rounded-2xl border border-amber-900/10 transition-all"
                title="Clear Filters"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </form>

          {/* Category Quick Filters */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-amber-900/5 overflow-x-auto no-scrollbar">
            <Filter size={16} className="text-[#991B1B] shrink-0" />
            <div className="flex gap-2">
              <button
                onClick={() => { setSelectedCategory('All'); setCurrentPage(0); }}
                className={`px-4 py-2 text-xs font-bold rounded-full border whitespace-nowrap transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-amber-500 text-[#451A03] border-amber-500 shadow-md'
                    : 'bg-[#FAF6F0] text-amber-900/70 border-amber-900/10 hover:border-amber-500'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.categoryName); setCurrentPage(0); }}
                  className={`px-4 py-2 text-xs font-bold rounded-full border whitespace-nowrap transition-all ${
                    selectedCategory === cat.categoryName
                      ? 'bg-amber-500 text-[#451A03] border-amber-500 shadow-md'
                      : 'bg-[#FAF6F0] text-amber-900/70 border-amber-900/10 hover:border-amber-500'
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid / Loaders / Empty States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-amber-900/10 border-l-[#991B1B] rounded-full animate-spin"></div>
            <p className="text-amber-950/60 font-semibold text-sm">Gathering fresh spices from organic fields...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 bg-red-50 text-red-800 rounded-3xl border border-red-200 shadow-sm max-w-xl mx-auto text-center gap-3">
            <AlertCircle size={28} className="text-red-600" />
            <p className="font-semibold text-sm leading-relaxed">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-amber-50/10 border border-dashed border-amber-900/10 rounded-3xl">
            <p className="text-amber-950/50 font-bold">No spices found matching your filter options. Try resetting.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2.5 bg-[#991B1B] text-white text-xs font-bold rounded-xl shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <button
                  onClick={() => setCurrentPage(c => Math.max(0, c - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 border border-amber-900/15 rounded-xl text-xs font-bold text-amber-950 hover:bg-amber-50 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`h-9 w-9 text-xs font-bold rounded-xl transition-all ${
                      currentPage === idx
                        ? 'bg-[#991B1B] text-white'
                        : 'border border-amber-900/15 text-amber-950 hover:bg-amber-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(c => Math.min(totalPages - 1, c + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 border border-amber-900/15 rounded-xl text-xs font-bold text-amber-950 hover:bg-amber-50 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
