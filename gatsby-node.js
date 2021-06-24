const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const Slugify = require('slugify');

const slugify = (s) => Slugify(s, { lower: true, remove: /[*+~.()'"!:@]/g });

exports.createPages = async ({ actions, graphql }) => {
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
    }
  `);

  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const pages = result.data.allMarkdownRemark.edges;

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
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type.indexOf('Json') > -1) {
    const value = slugify(node.name);
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
