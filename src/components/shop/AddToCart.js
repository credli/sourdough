import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

import { InventoryContext } from '../../context/InventoryProvider';

function AddToCart({ slug, loadingEl }) {
  return (
    <InventoryContext.Consumer>
      {({ loading, info, error }) => (
        <div className='d-grid gap-2'>
          {!loading ? (
            <>
              {info?.qty_available > 0 && (
                <Button size='lg' variant='primary'>
                  <i className='bi bi-basket me-2' />
                  Add to Cart
                </Button>
              )}
            </>
          ) : (
            <Spinner size='sm' />
          )}
        </div>
      )}
    </InventoryContext.Consumer>
  );
}

AddToCart.propTypes = {
  slug: PropTypes.string.isRequired,
  loadingEl: PropTypes.node,
};

export default AddToCart;
