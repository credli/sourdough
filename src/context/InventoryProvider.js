import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [data, setData] = useState({
    loading: false,
    error: null,
    inventory: null,
    getProduct,
  });
  const getProduct = (sku) => data.inventory && data.inventory[sku];

  const fetchInventory = async (slug) => {
    setData({ ...data, loading: true, inventory: null, error: null });
    try {
      console.log('slug:', slug);
      const result = await axios.post(`/.netlify/functions/inventory`, {
        slug,
      });
      setData({ ...data, inventory: result.data.inventory });
    } catch (error) {
      setData({ ...data, error });
    } finally {
      setData({ ...data, loading: false });
    }
  };

  useEffect(() => fetchInventory(), []);

  return (
    <InventoryContext.Provider value={data}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
