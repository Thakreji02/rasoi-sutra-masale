import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, getFinalPrice } = useCart();
  
  // Parse weight options (e.g. from array or list)
  const options = product.weight && product.weight.length > 0 ? product.weight : ['100g'];
  
  const [selectedWeight, setSelectedWeight] = useState(options[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Compute final price based on selected weight package
  const finalPrice = getFinalPrice(product.price, selectedWeight);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
      {/* Product Image Box */}
      <div className="relative h-56 overflow-hidden bg-amber-50/20 flex items-center justify-center">
        <img 
          src={
            product.images && product.images[0]
              ? product.images[0].includes('chilli')
                ? '/chilli.jpg'
                : product.images[0].includes('turmeric')
                ? '/turmeric.jpg'
                : product.images[0].includes('garam')
                ? '/garam_masala.jpg'
                : product.images[0]
              : '/hero_spices.jpg'
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/hero_spices.jpg';
          }}
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <span className="absolute top-4 left-4 bg-[#991B1B] text-amber-100 text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {product.brand}
        </span>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-4 right-4 bg-orange-100 text-orange-800 text-[0.65rem] font-extrabold px-2.5 py-1 rounded-lg border border-orange-200">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-4 right-4 bg-gray-800 text-gray-100 text-[0.65rem] font-extrabold px-2.5 py-1 rounded-lg">
            Sold Out
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-lg text-amber-950 group-hover:text-[#991B1B] transition-colors leading-tight">
          {product.name}
        </h3>
        <p className="mt-2 text-xs text-amber-900/60 leading-relaxed line-clamp-3 flex-grow">
          {product.description}
        </p>

        {/* Weight Selector */}
        <div className="mt-4 pt-4 border-t border-amber-900/5">
          <span className="block text-[0.7rem] font-bold text-amber-900/60 uppercase tracking-widest mb-2">
            Select Pack Weight:
          </span>
          <div className="flex flex-wrap gap-2">
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedWeight(opt)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  selectedWeight === opt 
                    ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-md' 
                    : 'bg-[#FDFBF7] text-[#451A03] border-amber-900/10 hover:border-[#991B1B] hover:text-[#991B1B]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="mt-5 pt-4 border-t border-amber-900/5 flex items-center justify-between">
          <div className="flex items-baseline text-[#991B1B] gap-0.5">
            <span className="text-sm font-semibold">₹</span>
            <span className="font-sans text-xl font-bold tracking-normal">{finalPrice}</span>
          </div>

          <div className="flex items-center bg-[#FAF6F0] border border-amber-900/10 rounded-lg overflow-hidden shadow-inner">
            <button 
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center text-[#991B1B] font-bold hover:bg-amber-50 transition-colors"
            >
              -
            </button>
            <span className="text-xs font-bold w-6 text-center text-amber-950">{quantity}</span>
            <button 
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#991B1B] font-bold hover:bg-amber-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-4 w-full py-3.5 flex items-center justify-center gap-2 font-bold rounded-xl shadow-lg transition-all duration-300 ${
            added 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10' 
              : 'bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white shadow-red-900/10 hover:shadow-xl'
          } disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:border-transparent`}
        >
          <ShoppingCart size={16} />
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
