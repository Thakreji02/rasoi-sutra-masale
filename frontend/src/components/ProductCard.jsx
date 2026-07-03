import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant ? selectedVariant.unit : (product.unit || '200g'));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const mrpVal = selectedVariant ? selectedVariant.mrp : product.mrp;
  const sellingPriceVal = selectedVariant ? selectedVariant.sellingPrice : product.sellingPrice;
  const discountPercentageVal = selectedVariant ? selectedVariant.discountPercentage : product.discountPercentage;
  const stockVal = selectedVariant ? selectedVariant.stock : product.stock;
  const unitVal = selectedVariant ? selectedVariant.unit : (product.unit || '200g');

  const hasDiscount = mrpVal && mrpVal > sellingPriceVal;

  return (
    <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
      {/* Product Image Box */}
      <div className="relative h-56 overflow-hidden bg-amber-50/20 flex items-center justify-center">
        <img 
          src={product.image || '/hero_spices.jpg'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/hero_spices.jpg';
          }}
          alt={product.productName} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <span className="absolute top-4 left-4 bg-[#991B1B] text-amber-100 text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {product.brandName || 'Rasoi Sutra'}
        </span>
        {product.isBestSeller && (
          <span className="absolute bottom-4 left-4 bg-amber-500 text-amber-950 text-[0.65rem] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
            Best Seller
          </span>
        )}
        {stockVal <= 5 && stockVal > 0 && (
          <span className="absolute top-4 right-4 bg-orange-100 text-orange-800 text-[0.65rem] font-extrabold px-2.5 py-1 rounded-lg border border-orange-200">
            Only {stockVal} left
          </span>
        )}
        {stockVal === 0 && (
          <span className="absolute top-4 right-4 bg-gray-800 text-gray-100 text-[0.65rem] font-extrabold px-2.5 py-1 rounded-lg">
            Sold Out
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[0.7rem] font-extrabold uppercase tracking-widest text-[#B45309] bg-amber-50 px-2.5 py-0.5 rounded-md">
            {product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <h3 className="font-serif font-bold text-lg text-amber-950 group-hover:text-[#991B1B] transition-colors leading-tight">
          {product.productName} <span className="text-sm font-sans font-normal text-amber-900/60">({unitVal})</span>
        </h3>
        <p className="mt-2 text-xs text-amber-900/60 leading-relaxed line-clamp-3 flex-grow">
          {product.shortDescription}
        </p>

        {/* Quantity Selection Dropdown */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-3">
            <label className="block text-[0.65rem] font-bold text-amber-900/50 uppercase tracking-wider mb-1">Select Net Weight</label>
            <select
              value={selectedVariant ? selectedVariant.unit : ''}
              onChange={(e) => {
                const variant = product.variants.find(v => v.unit === e.target.value);
                setSelectedVariant(variant);
              }}
              className="w-full bg-[#FAF6F0] border border-amber-900/10 rounded-xl px-3 py-2 text-xs font-bold text-amber-950 focus:outline-none focus:border-[#991B1B]"
            >
              {product.variants.map((variant, idx) => (
                <option key={idx} value={variant.unit}>
                  {variant.unit} - ₹{variant.sellingPrice} {variant.stock === 0 ? '(Out of Stock)' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Info badges */}
        <div className="mt-4 pt-3 border-t border-amber-900/5 flex justify-between text-[0.65rem] text-amber-900/60 font-semibold">
          <span>Shelf Life: {product.shelfLife || '12 Months'}</span>
          <span>Origin: {product.countryOfOrigin || 'India'}</span>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="mt-4 pt-4 border-t border-amber-900/5 flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-amber-900/40 line-through">
                ₹{mrpVal}
              </span>
            )}
            <div className="flex items-baseline text-[#991B1B] gap-0.5">
              <span className="text-sm font-semibold">₹</span>
              <span className="font-sans text-xl font-bold tracking-normal">{sellingPriceVal}</span>
              {hasDiscount && discountPercentageVal && (
                <span className="ml-2 text-[0.7rem] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {Math.round(discountPercentageVal)}% OFF
                </span>
              )}
            </div>
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
          disabled={stockVal === 0}
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
