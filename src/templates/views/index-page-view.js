import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import rehypeReact from 'rehype-react';
import Hero from '../../components/Hero';
import { hero } from './index-page-view.module.scss';

import PreviewCompatibleImage from '../../components/PreviewCompatibleImage';

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

function IndexPageView({ pitch, carousel }) {
  return (
    <div>
      <Hero
        className={hero}
        items={carousel.map((m, idx) => ({
          image: m.image,
          title: m.title,
          subtitle: m.description,
          actions: m.actions,
        }))}
      />
      <Container className='py-0 py-lg-5'>
        <Row className='py-5 gy-3 g-lg-5'>
          <Col lg={6}>
            <PreviewCompatibleImage image={pitch.image} alt={pitch.title} />
          </Col>
          <Col lg={6} className='d-flex align-items-center'>
            <div>
              <h1 className='display-4'>{pitch.title}</h1>
              <p className='lead'>{pitch.description}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

IndexPageView.propTypes = {
  pitch: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    iamge: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  carousel: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          caption: PropTypes.string.isRequired,
          action: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
            .isRequired,
        })
      ),
    })
  ),
};

export default IndexPageView;
