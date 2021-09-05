import { graphql, useStaticQuery } from 'gatsby';

export default function useFetchedProduct() {
  const data = useStaticQuery(graphql`
    {
      allFetchedProduct {
        edges {
          node {
            slug
            name
            fields {
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    width: 80
                    height: 80
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
            }
          }
        }
      }
    }
  `);

  const products = data.allFetchedProduct.edges.map((edge) => {
    const {
      slug,
      name,
      fields: { image },
    } = edge.node;
    return {
      slug,
      name,
      image,
    };
  });

  const getProduct = (slug) => products.find((p) => p.slug === slug);

  return { products, getProduct };
}
