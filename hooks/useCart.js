"use client";

import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("tourCart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        localStorage.removeItem("tourCart");
      } finally {
        setIsLoaded(true);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("tourCart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isLoaded]);

  const addToCart = (tourData) => {
    const cartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tourName: tourData.tourName,
      selectedDate: tourData.selectedDate,
      selectedTime: tourData.selectedTime,
      participants: tourData.participants,
      totalPrice: tourData.totalPrice,
      duration: tourData.duration,
      tourImage: tourData.tourImage,
      addedAt: new Date().toISOString(),
      bookingData: tourData.bookingData,
    };

    setCartItems((prev) => [...prev, cartItem]);
    return cartItem.id;
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem("tourCart");
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handlePaymentResult = (if_payment_success, itemId = null) => {
    if (if_payment_success) {
      // Payment successful - remove the specific item or clear all
      if (itemId) {
        removeFromCart(itemId);
      } else {
        clearCart();
      }
    }
    // If payment failed, items remain in cart
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
        handlePaymentResult,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // Return default values instead of throwing error
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      getCartCount: () => 0,
      getCartTotal: () => 0,
      handlePaymentResult: () => {},
      isLoaded: false,
    };
  }
  return context;
};
