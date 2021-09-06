import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import ProductItem from './ProductItem';

const ProductGrid = ({ category, products, showHeader = true }) => (
  <Row className='mb-5'>
    {showHeader && category && (
      <h2 className='display-5 mb-4'>{category.name}</h2>
    )}
    {products.map((product, idx) => {
      return (
        <ProductItem
          key={idx}
          slug={product.slug}
          categorySlug={category.slug}
          name={product.name}
          imageData={product.image}
          altText={product.image ? product.image.altText : product.name}
        />
      );
    })}
  </Row>
);

ProductGrid.propTypes = {
  category: PropTypes.object.isRequired,
  showHeader: PropTypes.bool,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string,
      image: PropTypes.object,
      altText: PropTypes.string,
    })
  ).isRequired,
};

export default ProductGrid;
