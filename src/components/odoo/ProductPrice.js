import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import { InventoryContext } from '../../context/InventoryProvider';
import CurrencyFormatter from '../CurrencyFormatter';

function ProductPrice({ sku, loadingEl }) {
  return (
    <InventoryContext.Consumer>
      {({ getProduct, inventory, loading }) => {
        if (loading) {
          return <>{loadingEl ? loadingEl : <Spinner />}</>;
        }
        const product = getProduct(sku, inventory);
        return (
          <>
            {product ? (
              <CurrencyFormatter
                currency={product.currency.symbol}
                amount={product.listPrice}
              />
            ) : (
              'N/A'
            )}
          </>
        );
      }}
    </InventoryContext.Consumer>
  );
}

ProductPrice.propTypes = {
  sku: PropTypes.string.isRequired,
  loadingEl: PropTypes.node,
};

export default ProductPrice;
