import React from 'react';
import { Link, graphql } from 'gatsby';

import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ProductDetails from '../components/shop/ProductDetails';

const ProductDetailsPage = ({ data }) => {
  const productCategory = data.product.productCategories.nodes[0];

  return (
    <Layout>
      <Seo
        title={data.product.name}
        description={data.product.description}
        image={data.product.image.localFile}
      />
      <Container>
        <Row>
          <Col className='mt-3'>
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
                  to: `/shop/${productCategory.slug}`,
                  className: 'text-reset text-decoration-none',
                }}
              >
                {productCategory.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{data.product.name}</Breadcrumb.Item>
            </Breadcrumb>
            <hr className='mb-0' />
          </Col>
        </Row>

        <ProductDetails
          product={data.product}
          addons={data.gql.product.addons}
        />
      </Container>
    </Layout>
  );
};

export default ProductDetailsPage;

export const query = graphql`
  query ProductPageTemplate($slug: String!, $databaseId: ID!) {
    gql {
      product(id: $databaseId, idType: DATABASE_ID) {
        addons {
          controlType
          id
          description
          label
          options {
            default
            name
          }
          priority
          required
        }
      }
    }
    product: wpProduct(slug: { eq: $slug }) {
      __typename
      databaseId
      name
      description
      productCategories {
        nodes {
          name
          slug
        }
      }
      productTags {
        nodes {
          name
          slug
        }
      }
      attributes {
        nodes {
          ... on WpLocalProductAttribute {
            name
            options
          }
        }
      }
      image {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1.5
            )
          }
        }
      }
      galleryImages {
        nodes {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                aspectRatio: 1.5
              )
            }
          }
        }
      }
      ... on WpSimpleProduct {
        sku
      }
      ... on WpVariableProduct {
        variations {
          nodes {
            sku
            name
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    aspectRatio: 1.5
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
