import React, { useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Row, Col, Spinner } from 'react-bootstrap';

// import ProductPrice from '../odoo/ProductPrice';
import ProductAvailability from '../odoo/ProductAvailability';
import AttributesTable from './AttributesTable';
import Addons from './Addons';
import AddToCart from '../odoo/AddToCart';
import { InventoryContext } from '../../context/InventoryProvider';

import {
  imageWrapper,
  availabilityBadge,
  variationImage,
  selected,
} from './ProductDetails.module.scss';

function ProductDetails({ product, addons }) {
  const { getProduct, loading, error } = useContext(InventoryContext);
  const isVariable = product.__typename === 'WpVariableProduct';
  const [selectedVariant, setSelectedVariant] = useState(
    isVariable ? product.variations.nodes[0] : product
  );

  const products = useMemo(() => {
    if (product.__typename === 'WpVariableProduct') {
      return product.variations.nodes.map((n) => n);
    }
    return [product];
  }, [product]);

  const inventoryProduct = useMemo(() => {
    return getProduct(selectedVariant.sku);
  }, [selectedVariant, loading]);

  const handleProductVariationClick = (e, product) => {
    setSelectedVariant(product);
  };

  return (
    <>
      <Row className='mt-3'>
        <Col className='d-flex align-items-center justify-content-between'>
          <h1 className='display-2'>{selectedVariant.name}</h1>
          <h2 className='text-muted display-6'>
            {loading ? (
              <Spinner />
            ) : (
              inventoryProduct && inventoryProduct.price_formatted
            )}
          </h2>
        </Col>
      </Row>

      <Row className='mb-4'>
        <Col lg={5} className='order-1'>
          <Row className='mb-2'>
            <Col>
              <div className={imageWrapper}>
                <GatsbyImage
                  image={
                    selectedVariant.image.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  alt={selectedVariant.image.altText}
                />
                <ProductAvailability
                  className={availabilityBadge}
                  sku={selectedVariant.sku}
                />
              </div>
            </Col>
          </Row>
          <Row className='g-2 row-cols-3'>
            {products.length > 1 &&
              products.map((p, idx) => (
                <Col key={idx}>
                  <div
                    onClick={(e) => handleProductVariationClick(e, p)}
                    className={`${variationImage} ${
                      p.sku === selectedVariant.sku ? selected : ''
                    }`}
                  >
                    <GatsbyImage
                      image={p.image.localFile.childImageSharp.gatsbyImageData}
                      alt={p.image.altText || p.name}
                    />
                  </div>
                </Col>
              ))}
          </Row>
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
        <Row className='mb-4'>
          <Col>
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
