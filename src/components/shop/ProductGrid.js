import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';

const ProductItem = ({
  name,
  price,
  categorySlug,
  imageData,
  altText,
  slug,
}) => (
  <Col xs={6} lg={4}>
    <Link
      className='text-reset text-decoration-none'
      to={`/shop/${categorySlug}/${slug}`}
    >
      {imageData ? (
        <GatsbyImage image={imageData} alt={altText} />
      ) : (
        <StaticImage
          src='../../../static/img/product-placeholder.webp'
          alt={name}
        />
      )}
      <div className='mb-4'>
        <h3 className='mb-0 mt-2'>{name}</h3>
        <span
          className='text-muted'
          dangerouslySetInnerHTML={{ __html: price }}
        />
      </div>
    </Link>
  </Col>
);

function ProductGrid({ products }) {
  return (
    <Row>
      {products.map((product, idx) => (
        <ProductItem
          key={idx}
          slug={product.slug}
          categorySlug={product.productCategories.nodes[0].slug}
          name={product.name}
          price={product.price}
          imageData={product.image?.localFile.childImageSharp.gatsbyImageData}
          altText={product.image ? product.image.altText : product.name}
        />
      ))}
    </Row>
  );
}

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
  placeholderImage: PropTypes.object.isRequired,
};

export default ProductGrid;
