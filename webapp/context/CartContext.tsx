'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  variationId?: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number, variationId?: number) => void;
  updateQuantity: (id: number, quantity: number, variationId?: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number; // Tương đương subtotal để tương thích ngược
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shopping-cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart items to localStorage when they change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('shopping-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items, isHydrated]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.variationId === newItem.variationId
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      // Item does not exist, add it
      return [...prevItems, { ...newItem, quantity }];
    });
    // Open the cart automatically when adding an item
    setIsOpen(true);
  };

  const removeFromCart = (id: number, variationId?: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.variationId === variationId))
    );
  };

  const updateQuantity = (id: number, quantity: number, variationId?: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variationId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.variationId === variationId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 && subtotal < 5000000 ? 35000 : 0;
  const grandTotal = subtotal + shippingFee;
  const totalPrice = subtotal; // Tương thích ngược

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        subtotal,
        shippingFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
