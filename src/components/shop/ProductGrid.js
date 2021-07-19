import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import ProductItem from './ProductItem';

function ProductGrid({ products, placeholderImage }) {
  return (
    <Row>
      {products.map((product, idx) => {
        const defaultSku =
          product.__typename === 'WpVariableProduct'
            ? product.variations.nodes[0].sku
            : product.sku;

        return (
          <ProductItem
            key={idx}
            sku={defaultSku}
            slug={product.slug}
            categorySlug={product.productCategories.nodes[0].slug}
            name={product.name}
            imageData={product.image?.localFile.childImageSharp.gatsbyImageData}
            placeholderImage={placeholderImage}
            altText={product.image ? product.image.altText : product.name}
          />
        );
      })}
    </Row>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      sku: PropTypes.string,
      variations: PropTypes.shape({
        nodes: PropTypes.arrayOf(
          PropTypes.shape({
            sku: PropTypes.string,
          })
        ),
      }),
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string,
      image: PropTypes.object,
      altText: PropTypes.string,
    })
  ).isRequired,
  placeholderImage: PropTypes.object.isRequired,
};

export default ProductGrid;
