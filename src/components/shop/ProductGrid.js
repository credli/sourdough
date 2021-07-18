import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import ProductPrice from '../odoo/ProductPrice';

const ProductItem = ({
  sku,
  name,
  price,
  categorySlug,
  imageData,
  altText,
  slug,
  placeholderImage,
}) => (
  <Col xs={6} lg={4}>
    <Link
      className='text-reset text-decoration-none'
      to={`/shop/${categorySlug}/${slug}`}
    >
      {imageData ? (
        <GatsbyImage image={imageData} alt={altText} />
      ) : (
        <GatsbyImage image={placeholderImage} alt={name} />
      )}
      <div className='mb-4'>
        <h3 className='mb-0 mt-2'>{name}</h3>
        <span className='text-muted'>
          <ProductPrice sku={sku} />
        </span>
      </div>
    </Link>
  </Col>
);

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
            price={product.price}
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
