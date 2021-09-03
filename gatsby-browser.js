import React from 'react';

import './src/components/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import InventoryProvider from './src/context/InventoryProvider';
import CartProvider from './src/context/CartProvider';

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};

export const wrapRootElement = ({ element }) => (
  <InventoryProvider>
    <CartProvider>{element}</CartProvider>
  </InventoryProvider>
);
