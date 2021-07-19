import React from 'react';

import './src/components/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import InventoryProvider from './src/context/InventoryProvider';

export const wrapRootElement = ({ element }) => (
  <InventoryProvider>{element}</InventoryProvider>
);
