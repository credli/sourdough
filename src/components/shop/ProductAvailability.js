import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

import { badge } from './ProductAvailability.module.scss';

function ProductAvailability({ outOfStock, className = '' }) {
  return (
    <>
      {outOfStock && (
        <Badge
          className={`${badge} ${className} text-light fw-light bg-danger`}
        >
          Out of Stock
        </Badge>
      )}
    </>
  );
}

ProductAvailability.propTypes = {
  outOfStock: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default ProductAvailability;
