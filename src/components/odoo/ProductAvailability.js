import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

import { InventoryContext } from '../../context/InventoryProvider';

import { badge } from './ProductAvailability.module.scss';

function ProductAvailability({ sku, className = '' }) {
  return (
    <InventoryContext.Consumer>
      {({ getProduct, loading }) => {
        const product = getProduct(sku);
        if (!product) return null;
        const outOfStock = product.qty_available < 1;

        return (
          outOfStock && (
            <Badge
              className={`${badge} ${className} text-light fw-light bg-danger`}
            >
              Out of Stock
            </Badge>
          )
        );
      }}
    </InventoryContext.Consumer>
  );
}

ProductAvailability.propTypes = {
  sku: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ProductAvailability;
