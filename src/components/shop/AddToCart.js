import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

import { CartContext } from '../../context/CartProvider.js';

function AddToCart({ product, qty, note, outOfStock, loadingEl }) {
  const { updateCartQty } = useContext(CartContext);

  const handleAddToCart = (e) => {
    const n = note.length > 0 ? note : null;
    updateCartQty(product, qty, n);
  };

  return (
    <>
      {!outOfStock && (
        <div className='d-grid gap-2'>
          <Button size='lg' variant='primary' onClick={handleAddToCart}>
            <i className='bi bi-basket me-2' />
            Add to Basket
          </Button>
        </div>
      )}
    </>
  );
}

AddToCart.propTypes = {
  product: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  loadingEl: PropTypes.node,
};

export default AddToCart;
