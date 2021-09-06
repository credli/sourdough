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
  `);

  const categories = data.settings.categories
    .filter((c) => c.products && c.products.length > 0) // skip empty categoriess
    .map((category) => {
      const { categoryObject, products } = category;
      return {
        ...categoryObject,
        products: products.map((p) => p.productObject),
      };
    });

  return (
    <Layout>
      <Seo title='Shop Products' description='Place your order today' />
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
            <CategorySelector categories={categories} />
          </Col>
          <Col lg={9}>
            {categories.map((category, categoryIdx) => (
              <ProductGrid
                key={categoryIdx}
                category={category}
                products={category.products}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShopPage;
