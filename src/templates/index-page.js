import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

import IndexPageView from './views/index-page-view';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.pitch.description}
        image={frontmatter.heroImage}
      />
      <IndexPageView
        title={frontmatter.title}
        heroImage={frontmatter.heroImage}
        pitch={frontmatter.pitch}
        mosaic={frontmatter.mosaic}
        htmlAst={data.markdownRemark.htmlAst}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
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
      }),
      html: PropTypes.any,
    }),
  }),
};

export default IndexPage;

export const query = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heroImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              height: 700
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        pitch {
          title
          description
        }
        mosaic {
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, height: 700)
            }
          }
          title
        }
      }
      htmlAst
    }
  }
`;
