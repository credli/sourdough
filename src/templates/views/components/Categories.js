import React from 'react';
import { Link } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import { getImage } from 'gatsby-plugin-image';
import { BgImage } from 'gbimage-bridge';
import PropTypes from 'prop-types';

import {
  categoryBox,
  categoryImage,
  categoryTitleWrapper,
} from './Categories.module.scss';

function Categories({ categories }) {
  return (
    <Row className='g-0'>
      {categories.edges
        .map((e) => e.node)
        .map((category, index) => {
          const pluginImage = getImage(
            category.image.childImageSharp.gatsbyImageData
          );

          return (
            <Col key={index} lg={3}>
              <Link to={`/shop/${category.slug}`}>
                <div className={categoryBox}>
                  <BgImage
                    className={categoryImage}
                    image={pluginImage}
                    alt={category.altText}
                  >
                    <div
                      className={`${categoryTitleWrapper} d-flex justify-content-center align-items-center`}
                    >
                      <h3 className='display-5'>{category.name}</h3>
                    </div>
                  </BgImage>
                </div>
              </Link>
            </Col>
          );
        })}
    </Row>
  );
}

Categories.propTypes = {
  categories: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          slug: PropTypes.string,
          name: PropTypes.string,
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        }),
      })
    ),
  }),
};

export default Categories;
