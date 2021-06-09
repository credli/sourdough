import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            siteUrl
            company
            title
            author
            description
            phone
            mobile
            email
            social {
              instagram
              facebook
              twitter
            }
            address {
              street
              city
              region
              country
            }
            openingHours
            coordinates {
              lat
              lng
            }
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
