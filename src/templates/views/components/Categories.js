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

const Categories = ({ categories }) => (
  <Row className='g-0'>
    {categories.map((category, index) => {
      const pluginImage = getImage(category.image);

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

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      }),
    })
  ),
};

export default Categories;
