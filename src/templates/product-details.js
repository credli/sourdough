import React, { useState, useEffect, useContext } from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Spinner,
} from 'react-bootstrap';

import InventoryContext, {
  InventoryProvider,
} from '../context/InventoryProvider';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ProductPrice from '../components/odoo/ProductPrice';

const ProductDetailsPage = ({ data }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const productCategory = data.product.productCategories.nodes[0];
  const isVariable = data.product.__typename === 'WpVariableProduct';

  useEffect(() => {
    setSelectedVariant(
      isVariable ? data.product.variations.nodes[0] : data.product
    );
  }, []);

  return (
    <Layout>
      <Seo
        title={data.product.name}
        description={data.product.description}
        image={selectedVariant.image.localFile}
      />
      <InventoryProvider sku={selectedVariant.sku}>
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

          <Row className='mt-3'>
            <Col className='d-flex align-items-center justify-content-between'>
              <h1 className='display-2'>{selectedVariant.name}</h1>
              <ProductPrice sku={selectedVariant.sku} />
            </Col>
          </Row>

          <Row>
            <Col lg={5} className='order-1'>
              <GatsbyImage
                image={
                  selectedVariant.image.localFile.childImageSharp
                    .gatsbyImageData
                }
                alt={selectedVariant.image.altText}
              />
            </Col>

            <Col lg={5} className='order-3 order-lg-2'>
              <div
                className='lead'
                dangerouslySetInnerHTML={{ __html: data.product.description }}
              />
              <Addons data={data.gql.product.addons} />
            </Col>

            <InventoryContext.Consumer>
              {({ loading, info, error }) => (
                <Col lg={2} className='order-2 order-lg-3 my-3 my-lg-0'>
                  <div className='d-grid gap-2'>
                    {!loading ? (
                      <>
                        {info?.qtyAvailable > 0 && (
                          <Button size='lg' variant='primary'>
                            <i className='bi bi-basket me-2' />
                            Add to Cart
                          </Button>
                        )}
                      </>
                    ) : (
                      <Spinner size='sm' />
                    )}
                  </div>
                </Col>
              )}
            </InventoryContext.Consumer>
          </Row>

          {data.product.attributes && (
            <Row>
              <Col className='mt-3'>
                <AttributesTable attributes={data.product.attributes} />
              </Col>
            </Row>
          )}
        </Container>
      </InventoryProvider>
    </Layout>
  );
};

export default ProductDetailsPage;

const Addons = ({ data }) =>
  data.map((addon, idx) => (
    <div key={idx}>
      <Form>
        <Form.Label>
          <h4>{addon.label}</h4>
          <p className='mb-0 fs-6'>{addon.description}</p>
        </Form.Label>
        <fieldset>
          <Form.Group>
            {addon.options.map((opt, optIdx) => (
              <Form.Check
                id={`option-${optIdx}`}
                key={optIdx}
                type='radio'
                name={addon.id}
                radioGroup={addon.id}
                label={opt.name}
                defaultChecked={opt.default === 1}
              />
            ))}
          </Form.Group>
        </fieldset>
      </Form>
    </div>
  ));

const AttributesTable = ({ attributes }) => (
  <Table striped>
    <tbody>
      {attributes.nodes
        .filter((a) => !!a.name)
        .map((attribute, idx) => (
          <tr key={idx}>
            <td className='fw-bold'>{attribute.name}</td>
            <td>
              {attribute.options.length > 1 ? (
                <ul className='mb-0 ps-3'>
                  {attribute.options.map((opt, optIdx) => (
                    <li key={optIdx}>{opt}</li>
                  ))}
                </ul>
              ) : (
                attribute.options[0]
              )}
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
);

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
        price
        salePrice
      }
      ... on WpVariableProduct {
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
