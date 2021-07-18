import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { InventoryContext } from '../../context/InventoryProvider';

function ProductPrice({ sku, loading }) {
  return (
    <InventoryContext.Consumer>
      {({ getProduct, loading: invLoading }) => {
        if (invLoading) {
          return <>{loading ? loading : <Spinner />}</>;
        }
        const product = getProduct(sku);
        return (
          <>{product ? `LBP ${product.listPrice.toLocaleString()}` : 'N/A'}</>
        );
      }}
    </InventoryContext.Consumer>
  );
}

ProductPrice.propTypes = {
  sku: PropTypes.string.isRequired,
  loading: PropTypes.node,
};

export default ProductPrice;
