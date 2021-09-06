import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const result = await axios.get(`/api/shop/cart`);
        if (result.data && result.data.length > 0) {
        }
        setCart(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const openDrawer = () => setDrawerOpen(true);

  const closeDrawer = () => setDrawerOpen(false);

  const updateCartDetails = async (note, deliveryDate, pickupDate) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (note) {
      params.append('note', note);
    }
    if (deliveryDate) {
      params.append('delivery_date', deliveryDate);
    }
    if (pickupDate) {
      params.append('pickup_date', pickupDate);
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      const result = await axios.post('/api/shop/cart', params, config);
      setCart(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await axios.delete('/api/shop/cart');
      setCart(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartQty = async (product, qty, note, moveUp = true) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('product', product);
      params.append('qty', Number(qty));
      if (moveUp) {
        params.append('move_up', true);
      }
      if (note) {
        params.append('note', note);
      }
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const result = await axios.put('/api/shop/cart', params, config);
      setCart(result.data);
      setDrawerOpen(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        error,
        cart,
        updateCartQty,
        updateCartDetails,
        clearCart,
        drawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
