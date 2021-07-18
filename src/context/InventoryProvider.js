import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async (slug) => {
    setLoading(true);
    try {
      const result = await axios.post(`/.netlify/functions/inventory`);
      console.log('result:', result);
      setInventory(result.data.products);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchInventory, []);

  const getProduct = (sku) =>
    inventory && inventory.find((p) => p.slug === sku);

  return (
    <InventoryContext.Provider
      value={{ loading, error, inventory, getProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
