import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import rehypeReact from 'rehype-react';
import Hero from '../../components/Hero';
import { hero } from './index-page-view.module.scss';

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

function IndexPageView({ title, heroImage, pitch, mosaic, htmlAst, html }) {
  return (
    <div>
      <Hero
        className={hero}
        items={mosaic.map((m, idx) => ({
          image: m.image,
          title: `Title ${idx + 1}`,
          subtitle: `Sub title for # ${idx + 1} goes here`,
        }))}
      />
      <Container>
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          renderAst(htmlAst)
        )}
      </Container>
    </div>
  );
}

IndexPageView.propTypes = {
  title: PropTypes.string,
  heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pitch: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  mosaic: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
  htmlAst: PropTypes.object,
  html: PropTypes.any,
};

export default IndexPageView;
