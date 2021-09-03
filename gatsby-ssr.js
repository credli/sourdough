import React from 'react';

import './src/components/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import InventoryProvider from './src/context/InventoryProvider';
import CartProvider from './src/context/CartProvider';

export const wrapRootElement = ({ element }) => (
  <InventoryProvider>
    <CartProvider>{element}</CartProvider>
  </InventoryProvider>
);
