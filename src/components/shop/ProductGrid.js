import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import ProductItem from './ProductItem';

const ProductGrid = ({ category, products }) => (
  <Row className='mb-5'>
    {category && <h2 className='display-5 mb-4'>{category.name}</h2>}
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
