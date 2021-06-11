import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

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
        carousel={frontmatter.carousel}
        pitch={frontmatter.pitch}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        pitch: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        }),
        carousel: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            actions: PropTypes.arrayOf(
              PropTypes.shape({
                caption: PropTypes.string.isRequired,
                actionType: PropTypes.string,
                action: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
                  .isRequired,
              })
            ),
          })
        ),
      }),
    }),
  }),
};

export default IndexPage;

export const query = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        carousel {
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, height: 700)
            }
          }
          title
          description
          actions {
            caption
            actionType
            action
          }
        }
        pitch {
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, height: 400)
            }
          }
        }
      }
    }
  }
`;
