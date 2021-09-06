import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { Col } from 'react-bootstrap';

import { imageContainer } from './ProductItem.module.scss';

const ProductItem = ({
  name,
  price_formatted,
  categorySlug,
  imageData,
  altText,
  slug,
}) => {
  const data = useStaticQuery(graphql`
    {
      placeholderImage: file(relativePath: { eq: "product-placeholder.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
        }
      }
    }
  `);

  return (
    <Col xs={6} lg={4}>
      <Link
        className='text-reset text-decoration-none'
        to={`/shop/${categorySlug}/${slug}`}
        state={{ from: 'shop' }}
      >
        <div className={imageContainer}>
          {imageData ? (
            <GatsbyImage
              image={getImage(imageData)}
              alt={altText ? altText : name}
            />
          ) : (
            <GatsbyImage image={getImage(data.placeholderImage)} alt={name} />
          )}
        </div>
        <div className='mb-4'>
          <h3 className='mb-0 mt-2'>{name}</h3>
          <span className='text-muted'>{price_formatted}</span>
        </div>
      </Link>
    </Col>
  );
};

ProductItem.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  categorySlug: PropTypes.string.isRequired,
  imageData: PropTypes.object,
  altText: PropTypes.string,
};

export default ProductItem;
