import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Col, Row, Container, Breadcrumb } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CategorySelector from '../components/shop/CategorySelector';
import ProductGrid from '../components/shop/ProductGrid';

function ShopPage({ location }) {
  const data = useStaticQuery(graphql`
    {
      placeholderImage: file(relativePath: { eq: "product-placeholder.webp" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
        }
      }
      categories: allWpProductCategory(
        sort: { fields: [menuOrder], order: [ASC] }
        filter: { slug: { ne: "uncategorized" } }
      ) {
        edges {
          node {
            slug
            name
            count
          }
        }
      }
      products: allWpProduct(sort: { fields: [menuOrder], order: [ASC] }) {
        edges {
          node {
            __typename
            ... on WpSimpleProduct {
              productCategories {
                nodes {
                  name
                  slug
                }
              }
              slug
              sku
              name
              price
              salePrice
              image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
                  }
                }
              }
            }
            ... on WpVariableProduct {
              productCategories {
                nodes {
                  name
                  slug
                }
              }
              slug
              sku
              name
              variations {
                nodes {
                  sku
                  name
                  price
                  salePrice
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
                      }
                    }
                  }
                }
              }
              image {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get('category');

  return (
    <Layout>
      <Seo title='' description='' />
      <Container>
        <Row className='mt-4'>
          <Col>
            <h1 className='display-2'>Shop</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item
                linkProps={{
                  className: 'text-reset text-decoration-none',
                  to: '/',
                }}
                linkAs={Link}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkProps={{
                  className: 'text-reset text-decoration-none',
                  to: '/shop',
                }}
                linkAs={Link}
                active
              >
                Shop
              </Breadcrumb.Item>
            </Breadcrumb>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <CategorySelector
              categories={data.categories.edges.map((e) => e.node)}
              selectedCategory={selectedCategory}
            />
          </Col>
          <Col lg={9}>
            <ProductGrid
              products={data.products.edges.map((e) => e.node)}
              placeholderImage={data.placeholderImage}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShopPage;
