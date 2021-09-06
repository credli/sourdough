import React from 'react';
import { graphql, Link } from 'gatsby';
import { Col, Row, Container, Breadcrumb } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CategorySelector from '../components/shop/CategorySelector';
import ProductGrid from '../components/shop/ProductGrid';

function ShopPage({ data, pageContext: { slug } }) {
  const categories = data.settings.categories
    .filter((c) => c.products && c.products.length > 0) // skip empty categoriess
    .map((c) => ({
      ...c.categoryObject,
      products: c.products,
    }));
  const currentCategory = categories.find((c) => c.slug === slug);
  const products = currentCategory.products.map((p) => p.productObject);

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
            <CategorySelector categories={categories} selectedCategory={slug} />
          </Col>
          <Col lg={9}>
            <ProductGrid category={currentCategory} products={products} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShopPage;

export const query = graphql`
  query ShopPageQuery {
    settings: settingsJson {
      categories {
        slug: category
        categoryObject {
          slug
          name
          count
        }
        products {
          slug: product
          productObject {
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
  }
`;
