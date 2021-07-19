import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      try {
        const result = await axios.post(`/.netlify/functions/inventory`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('result:', result);
        setInventory(result.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const getProduct = (sku, inv) => inv && inv.find((p) => p.slug === sku);

  return (
    <InventoryContext.Provider
      value={{ loading, error, inventory, getProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
