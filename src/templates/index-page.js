import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

import IndexPageView from './views/index-page-view';
import Categories from './views/components/Categories';
import Newsletter from './views/components/Newsletter';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.index;
  const categories = data.settings.categories.map((c) => c.categoryObject);

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
      <Categories categories={categories} />
      <Newsletter />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    index: PropTypes.shape({
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
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      })
    ),
  }),
};

export default IndexPage;

export const query = graphql`
  query IndexPageTemplate {
    index: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        carousel {
          image {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 1.77
                # height: 700
                quality: 100
                placeholder: NONE
                blurredOptions: { width: 200 }
                transformOptions: { cropFocus: CENTER, fit: COVER }
              )
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
    settings: settingsJson {
      categories {
        categoryObject {
          slug
          name
          image {
            childImageSharp {
              gatsbyImageData(layout: FIXED, placeholder: BLURRED, height: 400)
            }
          }
        }
      }
    }
  }
`;
