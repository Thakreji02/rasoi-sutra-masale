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

  const addToCart = (product, quantity = 1, weightSelected) => {
    setCartItems(prevItems => {
      // Find if item with same ID AND same weight selection already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.weightSelected === weightSelected
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Create a unique identifier for items of different weight
        const cartItemId = `${product.id}-${weightSelected.replace(/\s+/g, '')}`;
        return [
          ...prevItems,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            price: product.price,
            imagePath: product.imagePath,
            weightSelected,
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
    // Add extra price multiplier based on weight if necessary, but price in product is base price.
    // For simplicity, we assume price remains the base price, or weight package scales price.
    // Let's implement weight-based scale if needed.
    // Let's assume standard base prices and the weight options represent packages of that price.
    // E.g., "100g" is the base price. "250g" could be base * 2.2, "500g" base * 4.
    // Let's check how we want to scale it. Let's make it super simple:
    // We can parse the weight selection to see if it's 250g or 500g and scale price:
    let multiplier = 1;
    if (item.weightSelected.includes('250g')) multiplier = 2.2;
    else if (item.weightSelected.includes('500g')) multiplier = 4.0;
    
    const finalItemPrice = Math.round(item.price * multiplier);
    return total + (finalItemPrice * item.quantity);
  }, 0);

  const getFinalPrice = (price, weightSelected) => {
    let multiplier = 1;
    if (weightSelected.includes('250g')) multiplier = 2.2;
    else if (weightSelected.includes('500g')) multiplier = 4.0;
    return Math.round(price * multiplier);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      getFinalPrice
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
