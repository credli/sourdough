import React, { useMemo } from 'react';
import { graphql, Link } from 'gatsby';
import { Col, Row, Container, Breadcrumb } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CategorySelector from '../components/shop/CategorySelector';
import ProductGrid from '../components/shop/ProductGrid';

function ShopPage({ data, pageContext: { slug } }) {
  const currentCategory = useMemo(
    () => data.categories.edges.find((e) => e.node.slug === slug)?.node,
    [slug, data.categories.edges]
  );

  return (
    <Layout>
      <Seo
        title={`${currentCategory.name} Collection`}
        description={`Place your order for ${currentCategory.name} today`}
      />
      <Container>
        <Row className='mt-3'>
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
              selectedCategory={slug}
            />
          </Col>
          <Col lg={9}>
            <ProductGrid
              category={currentCategory}
              products={data.products.edges.map((e) => e.node)}
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
    categories: allCategoriesJson(sort: { fields: [menuOrder], order: [ASC] }) {
      edges {
        node {
          slug
          name
          count
        }
      }
    }
    products: allProductsJson(filter: { categories: { in: [$slug] } }) {
      edges {
        node {
          slug
          name
          image {
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
`;
