import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('rasoi_sutra_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('rasoi_sutra_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, unitSelected) => {
    const selectedUnit = unitSelected || (product.variants && product.variants.length > 0 ? product.variants[0].unit : (product.unit || '200g'));
    const cartItemId = `${product.id}-${selectedUnit}`;

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.cartItemId === cartItemId
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        const variant = product.variants && product.variants.length > 0
          ? product.variants.find(v => v.unit === selectedUnit)
          : null;
        const price = variant ? variant.sellingPrice : (product.sellingPrice || 0);

        return [
          ...prevItems,
          {
            cartItemId,
            id: product.id,
            productName: product.productName,
            sellingPrice: price,
            image: product.image,
            unit: selectedUnit,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.sellingPrice * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
