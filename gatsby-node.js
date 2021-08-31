const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const Slugify = require('slugify');

const slugify = (s) => Slugify(s, { lower: true, remove: /[*+~.()'"!:@]/g });

exports.createPages = async (args) => {
  const { actions, graphql } = args;
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
      categories: allWpProductCategory(
        filter: { slug: { ne: "uncategorized" } }
        sort: { fields: [menuOrder], order: [ASC] }
      ) {
        edges {
          node {
            slug
            name
          }
        }
      }
      products: allWpProduct(
        filter: {
          productCategories: {
            nodes: { elemMatch: { slug: { nin: ["uncategorized"] } } }
          }
        }
      ) {
        nodes {
          ... on WpSimpleProduct {
            productCategories {
              nodes {
                name
                slug
              }
            }
            slug
            databaseId
          }
          ... on WpVariableProduct {
            productCategories {
              nodes {
                name
                slug
              }
            }
            slug
            databaseId
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const pages = result.data.allMarkdownRemark.edges;
  const categories = result.data.categories.edges;
  const products = result.data.products.nodes;

  // pages with markdown support
  pages.forEach((edge) => {
    const id = edge.node.id;
    createPage({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });

  // Tag pages:
  let tags = [];
  // Iterate through each page, putting all found tags into `tags`
  pages.forEach((edge) => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach((tag) => {
    const tagPath = `/tags/${slugify(tag)}/`;

    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag,
      },
    });
  });

  // shop page (categories)
  categories.forEach((edge) => {
    createPage({
      path: `/shop/${edge.node.slug}`,
      component: path.resolve(`src/templates/shop-page.js`),
      context: {
        slug: edge.node.slug,
        category: edge.node,
      },
    });
  });

  // product details
  products.forEach((node) => {
    const productCategories = node.productCategories.nodes.map((node) => node);
    createPage({
      path: `/shop/${productCategories[0].slug}/${node.slug}`,
      component: path.resolve(`src/templates/product-details.js`),
      context: {
        slug: node.slug,
        databaseId: node.databaseId,
        productCategories,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // TODO: remove, not needed since we no longer use json for ecommerce
  // if (node.internal.type.indexOf('Json') > -1) {
  //   const value = slugify(node.name);
  //   createNodeField({
  //     name: `slug`,
  //     node,
  //     value,
  //   });
  // }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
