import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      try {
        const result = await axios.post(`/api/inventory/products`);
        if (result.data && result.data.length > 0) {
          const hash = {};
          for (let i = 0; i < result.data.length; i++) {
            hash[result.data[i].slug] = result.data[i];
          }
          setInventory(hash);
        } else {
          throw new Error(
            'Invalid data received from backend service',
            result.data
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const getProduct = (sku) => inventory && inventory[sku];

  return (
    <InventoryContext.Provider
      value={{ loading, error, inventory, getProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
