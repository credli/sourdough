import React, { useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Row, Col, Spinner } from 'react-bootstrap';

// import ProductPrice from '../odoo/ProductPrice';
import ProductAvailability from './ProductAvailability';
import AttributesTable from './AttributesTable';
import ProductOptions, { ProductOptionsPropTypes } from './ProductOptions';
import AddToCart from './AddToCart';
import { InventoryContext } from '../../context/InventoryProvider';

import {
  imageWrapper,
  availabilityBadge,
  variationImage,
  selected,
} from './ProductDetails.module.scss';

function ProductDetails({ product }) {
  const { getProduct, loading, error } = useContext(InventoryContext);
  const hasVariants = product.variants?.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants[0] : product
  );

  const products = useMemo(() => {
    if (hasVariants) {
      return product.variants;
    }
    return [product];
  }, [hasVariants, product]);

  const inventoryProduct = useMemo(() => {
    if (!loading) {
      return getProduct(selectedVariant.slug);
    }
  }, [selectedVariant, getProduct, loading]);

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
                  image={selectedVariant.image.childImageSharp.gatsbyImageData}
                  alt={selectedVariant.name}
                />
                {console.log(selectedVariant)}
                <ProductAvailability
                  className={availabilityBadge}
                  outOfStock={selectedVariant.outOfStock}
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
                      p.slug === selectedVariant.slug ? selected : ''
                    }`}
                  >
                    <GatsbyImage
                      image={p.image.childImageSharp.gatsbyImageData}
                      alt={p.name}
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </Col>

        <Col lg={5} className='order-3 order-lg-2'>
          <Row className='mb-4'>
            <Col>
              <div
                className='lead'
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </Col>
          </Row>
          {product.productOptionsArray?.length > 0 && (
            <Row>
              <Col>
                <ProductOptions options={product.productOptionsArray} />
              </Col>
            </Row>
          )}
        </Col>

        <Col lg={2} className='order-2 order-lg-3 my-3 my-lg-0'>
          <AddToCart slug={selectedVariant.slug} />
        </Col>
      </Row>

      {product.attributes && (
        <Row className='mb-4'>
          <Col>
            <AttributesTable attributes={product.attributes} />
          </Col>
        </Row>
      )}
    </>
  );
}

const imagePropTypes = {
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      gatsbyImageData: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired.isRequired,
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    outOfStock: PropTypes.bool.isRequired,
    ...imagePropTypes,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ...imagePropTypes,
        outOfStock: PropTypes.bool.isRequired,
      })
    ),
  }).isRequired,
  productOptionsArray: ProductOptionsPropTypes,
};

export default ProductDetails;
