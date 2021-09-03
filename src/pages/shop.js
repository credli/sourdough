import React, { useMemo } from 'react';
import _ from 'lodash';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Col, Row, Container, Breadcrumb } from 'react-bootstrap';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CategorySelector from '../components/shop/CategorySelector';
import ProductGrid from '../components/shop/ProductGrid';

function ShopPage({ location }) {
  const data = useStaticQuery(graphql`
    {
      categories: allCategoriesJson(
        sort: { fields: [menuOrder], order: [ASC] }
      ) {
        edges {
          node {
            slug
            name
            count
            menuOrder
          }
        }
      }
      groupedProducts: allProductsJson(
        sort: { fields: [menuOrder], order: [ASC] }
      ) {
        group(field: categoriesArray___name) {
          fieldValue
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
    }
  `);

  const groupedProducts = useMemo(() => {
    const grouped = data.groupedProducts.group.map((g) => {
      const matchedCategory = data.categories.edges.find(
        (e) => e.node.name === g.fieldValue
      );
      g.category = matchedCategory.node;
      return g;
    });
    return _.sortBy(grouped, 'category.menuOrder');
  }, [data.categories, data.groupedProducts]);

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
            <CategorySelector
              categories={data.categories.edges.map((e) => e.node)}
            />
          </Col>
          <Col lg={9}>
            {groupedProducts.map((grp, grpIdx) => (
              <ProductGrid
                key={grpIdx}
                category={grp.category}
                products={grp.edges.map((e) => e.node)}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShopPage;
