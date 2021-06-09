const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const SITE_URL = process.env.SITE_URL || 'https://sourdough.me';

module.exports = {
  siteMetadata: {
    siteUrl: SITE_URL,
    company: 'Sourdough SAL',
    title: 'Sourdough',
    author: '@sourdoughlb',
    description:
      'Sourdough is a community-based artisan bakery that specializes in baking artisanal bread and pastry and delivering great experiences, located in Broumana - Lebanon. Through careful preparation and long fermentation, we produce authentic bread that is delicious and healthy.',
    phone: '+96124961223',
    mobile: '+96176667407',
    email: 'sourdoughbc@gmail.com',
    social: {
      instagram: 'http://instagram.com/sourdough_lebanon',
      facebook: 'https://www.facebook.com/sourdoughbreadcoffee/',
      twitter: 'https://twitter.com/sourdoughlb',
    },
    address: {
      street: '44th street, next to Broumana High School, Broumana Main Road',
      city: 'Broumana',
      region: 'Metn',
      country: 'Lebanon',
    },
    openingHours: '8AM till 9PM',
    coordinates: {
      lat: 33.88450514762558,
      lng: 35.624774325636075,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Yanone Kaffeesatz\:normal`,
          `Yanone Kaffeesatz\:light`,
          `Open Sans\:100,200,300,400`,
        ],
        display: 'swap',
      },
    },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: 'Yanone Kaffeesatz',
    //         variants: [`100`, `400`],
    //       },
    //       {
    //         family: 'Open Sans',
    //         variants: [`100`, `200`, `300`, `400`],
    //       },
    //     ],
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('node-sass'),
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
      __key: 'pages',
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-component`,
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'images',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-R6CD790R2Y',
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `sourdough_lebanon`,
        instagram_id: '13780395339',
        paginate: 100,
        maxPosts: 1000,
        hashtags: true,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
  ],
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
};
