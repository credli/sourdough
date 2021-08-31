import React from 'react';
import { graphql, Link } from 'gatsby';
import { Col, Row, Container, Breadcrumb } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CategorySelector from '../components/shop/CategorySelector';
import ProductGrid from '../components/shop/ProductGrid';

function ShopPage({ data, pageContext: { category } }) {
  return (
    <Layout>
      <Seo
        title={`${category.name} Collection`}
        description={`Place your order for ${category.name} today`}
      />
      <Container>
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
              selectedCategory={category.slug}
            />
          </Col>
          <Col lg={9}>
            <ProductGrid
              category={category.name}
              products={data.products.edges.map((e) => e.node)}
              placeholderImage={
                data.placeholderImage.childImageSharp.gatsbyImageData
              }
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShopPage;

export const query = graphql`
  query ShopPageQuery($slug: String!) {
    placeholderImage: file(relativePath: { eq: "product-placeholder.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
      }
    }
    categories: allWpProductCategory(
      filter: { slug: { ne: "uncategorized" } }
      sort: { fields: [menuOrder], order: [ASC] }
    ) {
      edges {
        node {
          slug
          name
          count
        }
      }
    }
    products: allWpProduct(
      filter: {
        productCategories: { nodes: { elemMatch: { slug: { in: [$slug] } } } }
      }
      sort: { fields: [menuOrder], order: [ASC] }
    ) {
      edges {
        node {
          __typename
          slug
          name
          productCategories {
            nodes {
              slug
              name
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
                      gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.5)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
