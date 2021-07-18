import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import InventoryContext from '../../context/InventoryProvider';

function ProductPrice({ sku }) {
  const { loading, getProduct } = useContext(InventoryContext);
  const product = getProduct(sku);

  if (loading) {
    return <Spinner />;
  }

  return (
    <h2 className='text-muted display-6'>
      {product ? `LBP ${product.listPrice}` : 'N/A'}
    </h2>
  );
}

ProductPrice.propTypes = {
  sku: PropTypes.string.isRequired,
};

export default ProductPrice;
