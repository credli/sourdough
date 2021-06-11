import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

function Seo({ title, description, author, image }) {
  const { pathname } = useLocation();
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          title
          author
          description
          address {
            street
            city
            region
            country
          }
        }
      }
    }
  `);

  const defaults = data.site.siteMetadata;

  title = title || defaults.title;
  description = description || defaults.description;
  author = author || defaults.author;
  image = image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    ? new URL(
        image.childImageSharp.gatsbyImageData.images.fallback.src,
        defaults.siteUrl
      )
    : false;
  const url = new URL(pathname, defaults.siteUrl);

  return (
    <Helmet>
      <title>Sourdough | {title}</title>
      <link rel='canonical' href={url} />
      <meta name='description' content={description} />
      {image && <meta name='image' content={image} />}

      <meta property='og:url' content={url} />
      <meta property='og:type' content='business.business' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {image && <meta property='og:image' content={image} />}
      <meta
        property='business:contact_data:street_address'
        content={defaults.address.street}
      />
      <meta
        property='business:contact_data:locality'
        content={defaults.address.city}
      />
      <meta
        property='business:contact_data:region'
        content={defaults.address.region}
      />
      <meta
        property='business:contact_data:country_name'
        content={defaults.address.country}
      />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content={author} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      {image && <meta name='twitter:image' content={image} />}
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({
        images: PropTypes.shape({
          fallback: PropTypes.shape({
            src: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
};

export default Seo;
