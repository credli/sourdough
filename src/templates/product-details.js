import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { Breadcrumb, Container, Row, Col, Button } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ProductDetails from '../components/shop/ProductDetails';

const ProductDetailsPage = ({ data, location }) => {
  const mainCategory = data.product.categoriesArray[0];
  const showBackLink = location.state && location.state.from;

  return (
    <Layout>
      <Seo
        title={data.product.name}
        description={data.product.description}
        image={data.product.image}
      />
      <Container>
        <Row className='mt-3'>
          <Col>
            {showBackLink ? (
              <a
                href='#'
                className='text-reset text-decoration-none'
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <i className='bi-chevron-left me-1' />
                Back
              </a>
            ) : (
              <Breadcrumb>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{
                    to: `/shop`,
                    className: 'text-reset text-decoration-none',
                  }}
                >
                  Shop
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{
                    to: `/shop/${mainCategory.slug}`,
                    className: 'text-reset text-decoration-none',
                  }}
                >
                  {mainCategory.name}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{data.product.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
            <hr className='mb-0' />
          </Col>
        </Row>

        <ProductDetails product={data.product} />
      </Container>
    </Layout>
  );
};

export default ProductDetailsPage;

export const query = graphql`
  query ProductPageTemplate($slug: String!) {
    product: productsJson(slug: { eq: $slug }) {
      slug
      name
      categoriesArray {
        slug
        name
      }
      description
      image {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
        }
      }
      variants {
        slug
        name
        description
        outOfStock
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
          }
        }
      }
      gallery {
        title
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
          }
        }
      }
      attributes {
        title
        details
      }
      productOptionsArray {
        slug
        name
        description
        required
        type
        options {
          label
          value
          selected
        }
      }
    }
  }
`;
