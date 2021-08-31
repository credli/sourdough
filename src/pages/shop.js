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
      placeholderImage: file(relativePath: { eq: "product-placeholder.jpg" }) {
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
            menuOrder
          }
        }
      }
      groupedProducts: allWpProduct(
        sort: { fields: [menuOrder], order: [ASC] }
      ) {
        group(field: productCategories___nodes___name) {
          fieldValue
          edges {
            node {
              __typename
              ... on WpSimpleProduct {
                productCategories {
                  nodes {
                    name
                    slug
                    menuOrder
                  }
                }
                slug
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
    }
  `);

  const groupedProducts = useMemo(() => {
    const grouped = data.groupedProducts.group.map((g) => {
      const matchedCategory = data.categories.edges.find(
        (e) => e.node.name === g.fieldValue
      );
      g.menuOrder = matchedCategory.node.menuOrder;
      return g;
    });
    return _.sortBy(grouped, 'menuOrder');
  }, [data.categories, data.groupedProducts]);

  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get('category');

  return (
    <Layout>
      <Seo title='Shop Products' description='Place your order today' />
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
              selectedCategory={selectedCategory}
            />
          </Col>
          <Col lg={9}>
            {groupedProducts.map((grp, grpIdx) => (
              <ProductGrid
                key={grpIdx}
                category={grp.fieldValue}
                products={grp.edges.map((e) => e.node)}
                placeholderImage={
                  data.placeholderImage.childImageSharp.gatsbyImageData
                }
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShopPage;
