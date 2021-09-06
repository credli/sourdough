const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const Slugify = require('slugify');

const slugify = (s) => Slugify(s, { lower: true, remove: /[*+~.()''!:@]/g });

exports.createPages = async ({
  actions,
  graphql,
  createNodeId,
  createContentDigest,
}) => {
  const { createPage, createNode } = actions;

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
              templateKey
            }
          }
        }
      }
      categories: allCategoriesJson {
        edges {
          node {
            slug
            name
            count
          }
        }
      }
      products: allProductsJson {
        edges {
          node {
            slug
            name
            categories
            variants {
              slug
              name
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  // pages with markdown support
  result.data.allMarkdownRemark.edges.forEach((edge) => {
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
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // // Eliminate duplicate tags
  // tags = _.uniq(tags);

  // // Make tag pages
  // tags.forEach((tag) => {
  //   const tagPath = `/tags/${slugify(tag)}/`;

  //   createPage({
  //     path: tagPath,
  //     component: path.resolve(`src/templates/tags.js`),
  //     context: {
  //       tag,
  //     },
  //   });
  // });

  // shop page (categories)
  result.data.categories.edges.forEach((edge) => {
    if (edge.node.count === 0) return;
    createPage({
      path: `/shop/${edge.node.slug}`,
      component: path.resolve(`src/templates/shop-page.js`),
      context: {
        slug: edge.node.slug,
      },
    });
  });

  // product details page
  result.data.products.edges.forEach((edge) => {
    edge.node.categories.forEach((category) => {
      createPage({
        path: `/shop/${category}/${edge.node.slug}`,
        component: path.resolve(`src/templates/product-details.js`),
        context: {
          slug: edge.node.slug,
          category,
        },
      });
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = `
    # Hint: @link "by" should be the primary key of the linked entity (ex. products),
    # "from" must be foreign key in current entity (ex. relatedProducts.product)

    type SettingsJsonCategories implements Node {
      categoryObject: CategoriesJson @link(by: "slug", from: "category")
    }

    type SettingsJsonCategoriesProducts implements Node {
      productObject: ProductsJson @link(by: "slug", from: "product")
    }

    type SettingsJsonFeaturedProducts implements Node {
      productObject: ProductsJson @link(by: "slug", from: "product")
    }

    type ProductsJson implements Node {
      categoriesArray: [CategoriesJson] @link(by: "slug", from: "categories")
      productOptionsArray: [ProductOptionsJson] @link(by: "slug", from: "options")
    }

    type CategoriesJson implements Node {
      productsArray: [ProductsJson] @link(by: "categories", from: "slug")
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
  getNodesByType,
}) => {
  const { createNode } = actions;

  const createFetchedProductRecord = (product) => {
    const fetchedProduct = {
      slug: product.slug,
      name: product.name,
      image: product.image,
    };
    const nodeContent = JSON.stringify(fetchedProduct);
    const nodeMeta = {
      id: createNodeId(`product-image-${product.slug}`),
      parent: null,
      children: [],
      internal: {
        type: 'FetchedProduct',
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(fetchedProduct),
      },
    };
    const node = Object.assign({}, fetchedProduct, nodeMeta);
    createNode(node);
  };

  // get all products
  const products = getNodesByType(`ProductsJson`);
  products.forEach((product) => {
    createFetchedProductRecord(product);
    product.variants?.forEach((variant) => {
      createFetchedProductRecord(variant);
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode, getNodesByType }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }

  if (node.internal.type === `FetchedProduct`) {
    const imagePath = path.resolve(__dirname, `content/products/${node.image}`);
    const fileNodes = getNodesByType('File');
    const imageNode = fileNodes.find(
      (fileNode) => fileNode.absolutePath === imagePath
    );
    createNodeField({
      name: `image___NODE`,
      node,
      value: imageNode.id,
    });
  }
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    CategoriesJson: {
      count: {
        type: 'Int',
        resolve: async (source, args, context, info) => {
          const result = await context.nodeModel.runQuery({
            query: {
              filter: {
                templateKey: { eq: 'product' },
                categories: { in: [source.slug] },
              },
            },
            type: 'ProductsJson',
          });
          return result.length;
        },
      },
    },
  };
  createResolvers(resolvers);
};
