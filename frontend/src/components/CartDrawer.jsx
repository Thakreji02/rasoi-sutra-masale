import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, getFinalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2B1E17]/60 backdrop-blur-[4px] transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-amber-900/10 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#991B1B]">
                  <ShoppingBag size={20} />
                  <h2 className="font-serif font-bold text-lg">Your Spice Basket</h2>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-1 rounded-full text-amber-950 hover:bg-amber-50 hover:text-[#991B1B] transition-colors"
                  aria-label="Close Basket"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <ShoppingBag size={64} className="text-amber-900/15 mb-4" />
                    <h3 className="font-serif font-bold text-amber-950 text-xl">Your basket is empty</h3>
                    <p className="mt-2 text-sm text-amber-900/60 max-w-xs leading-relaxed">
                      Fill it with the authentic taste of Rasoi Sutra premium organic spices.
                    </p>
                    <button 
                      onClick={onClose}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-[#991B1B] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white font-bold rounded-xl shadow-lg transition-all"
                    >
                      Shop Spices Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => {
                      const finalUnitPrice = getFinalPrice(item.price, item.weightSelected);
                      const itemSubtotal = finalUnitPrice * item.quantity;
                      
                      return (
                        <div key={item.cartItemId} className="flex gap-4 items-center pb-5 border-b border-amber-900/5">
                          <img 
                            src={item.imagePath || '/src/assets/hero_spices.jpg'} 
                            alt={item.name} 
                            className="w-16 h-16 rounded-xl object-cover border border-amber-900/10 shrink-0 bg-white" 
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-amber-950 truncate leading-snug">
                              {item.name}
                            </h4>
                            <div className="flex gap-3 text-xs text-amber-900/50 mt-1">
                              <span>Weight: {item.weightSelected}</span>
                              <span>•</span>
                              <span>Price: ₹{finalUnitPrice}</span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center bg-white border border-amber-900/10 rounded-lg overflow-hidden shadow-inner">
                                <button 
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center text-[#991B1B] font-bold hover:bg-amber-50"
                                >
                                  -
                                </button>
                                <span className="text-xs font-bold w-5 text-center text-amber-950">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-[#991B1B] font-bold hover:bg-amber-50"
                                >
                                  +
                                </button>
                              </div>

                              <button 
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-amber-900/40 hover:text-red-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="font-serif font-bold text-amber-950 text-base shrink-0">
                            ₹{itemSubtotal}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {cartItems.length > 0 && (
                <div className="px-6 py-6 bg-white border-t border-amber-900/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-amber-950">Subtotal:</span>
                    <span className="font-serif font-black text-2xl text-[#991B1B]">₹{cartTotal}</span>
                  </div>
                  <p className="text-[0.7rem] text-amber-900/50 leading-relaxed mb-4">
                    Standard flat shipping charges are calculated at checkout.
                  </p>
                  <button 
                    onClick={onCheckout}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-[#78350F] hover:from-[#78350F] hover:to-[#451A03] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Proceed to Secure Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
