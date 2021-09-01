const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const SITE_URL = process.env.SITE_URL || 'https://sourdough.me';
const WP_GRAPHQL_ENDPOINT =
  process.env.WP_GRAPHQL_ENDPOINT || 'http://sourdough.local/graphql';

module.exports = {
  siteMetadata: {
    siteUrl: SITE_URL,
    company: 'Sourdough SAL',
    title: 'Sourdough',
    author: '@sourdoughlb',
    description:
      'Sourdough is a community-based artisan bakery that specializes in baking artisanal bread and pastry and delivering great experiences, located in Broumana - Lebanon. Through careful preparation and long fermentation, we produce authentic bread that is delicious and healthy.',
    phone: '+96124961223',
    mobile: '+96181141833',
    email: 'hello@sourdough.me',
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
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('node-sass'),
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
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/settings`,
        name: `settings`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/categories`,
        name: `categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/products`,
        name: `products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/product-options`,
        name: `productOptions`,
      },
    },
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
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-R6CD790R2Y',
      },
    },
    // {
    //   resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: `13780395339`,
    //     paginate: 100,
    //     maxPosts: 1000,
    //     hashtags: true,
    //   },
    // },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sourdough Bakery`,
        short_name: `Sourdough`,
        description: `Don't wait in line! Pre-order our products and collect loyalty points.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#1a1919`,
        theme_color: `#ffd474`,
        display: `standalone`,
        icon: `static/img/icon.png`,
        cache_busting_mode: `query`,
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          globPatterns: ['**/icon-path*'],
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
  ],
  developMiddleware: (app) => {
    app.use(
      '/api/',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        pathRewrite: {
          '/api/': '',
        },
      })
    );

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
