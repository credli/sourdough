import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Row, Col, Spinner } from 'react-bootstrap';

import ProductPrice from '../odoo/ProductPrice';
import ProductAvailability from '../odoo/ProductAvailability';
import AttributesTable from './AttributesTable';
import Addons from './Addons';
import AddToCart from '../odoo/AddToCart';

import { imageWrapper, availabilityBadge } from './ProductDetails.module.scss';

function ProductDetails({ product, addons }) {
  const isVariable = product.__typename === 'WpVariableProduct';
  const [selectedVariant, setSelectedVariant] = useState(
    isVariable ? product.variations.nodes[0] : product
  );

  return (
    <>
      <Row className='mt-3'>
        <Col className='d-flex align-items-center justify-content-between'>
          <h1 className='display-2'>{selectedVariant.name}</h1>
          <h2 className='text-muted display-6'>
            <ProductPrice
              sku={selectedVariant.sku}
              loadingEl={
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              }
            />
          </h2>
        </Col>
      </Row>

      <Row>
        <Col lg={5} className='order-1'>
          <div className={imageWrapper}>
            <GatsbyImage
              image={
                selectedVariant.image.localFile.childImageSharp.gatsbyImageData
              }
              alt={selectedVariant.image.altText}
            />
            <ProductAvailability
              className={availabilityBadge}
              sku={selectedVariant.sku}
            />
          </div>
        </Col>

        <Col lg={5} className='order-3 order-lg-2'>
          <div
            className='lead'
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <Addons addons={addons} />
        </Col>

        <Col lg={2} className='order-2 order-lg-3 my-3 my-lg-0'>
          <AddToCart sku={selectedVariant.sku} />
        </Col>
      </Row>

      {product.attributes && (
        <Row>
          <Col className='mt-3'>
            <AttributesTable attributes={product.attributes.nodes} />
          </Col>
        </Row>
      )}
    </>
  );
}

const imagePropTypes = {
  image: PropTypes.shape({
    altText: PropTypes.string,
    localFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        gatsbyImageData: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    __typename: PropTypes.oneOf(['WpSimpleProduct', 'WpVariableProduct'])
      .isRequired,
    sku: (props, propName, componentName) => {
      // only required if its a WpSimpleProduct
      if (
        props.__typename === 'WpSimpleProduct' &&
        (props[propName] === undefined || typeof props[propName] !== 'string')
      ) {
        return new Error('sku is required for WpSimpleProduct');
      }
    },
    name: PropTypes.string.isRequired,
    ...imagePropTypes,
    variations: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          sku: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          ...imagePropTypes,
        })
      ),
    }),
  }).isRequired,
  addons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          default: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ),
};

export default ProductDetails;
