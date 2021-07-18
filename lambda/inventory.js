require('dotenv').config();
const axios = require('axios').default;
const baseUrl = process.env.ODOO_BASE_URL;
const apiKey = process.env.ODOO_API_KEY;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = {
  ['Content-Type']: 'application/json',
  ['api-key']: apiKey,
};

const devMode = (str) => process.env !== 'production' && console.log(str);

async function _execGQL(query, variables) {
  //   devMode(`--- REQUEST:
  // ${query}

  // vars: ${JSON.stringify(variables)}
  //   `);

  const response = await axios.post('graphql/sourdough', {
    query,
    variables,
  });

  //   devMode(`--- RESPONSE:
  // ${JSON.stringify(response.data, 0, 4)}
  //   `);

  return response.data;
}

exports.handler = async function (event, context) {
  try {
    const data = event.body ? JSON.parse(event.body) : null;
    if (data && data.slug) {
      const results = await _execGQL(
        `
        query GetProductBySlug($slug: String!) {
          productBySlug(slug: $slug) {
            id
            slug
            name
            listPrice
            produceDelay
            saleDelay
            qtyAvailable
          }
        }
      `,
        { slug: data.slug }
      );
      const product = results.data.productBySlug;

      return {
        statusCode: 200,
        body: JSON.stringify({
          product,
        }),
      };
    } else {
      const results = await _execGQL(`
        {
          allProducts {
            id
            slug
            name
            listPrice
            produceDelay
            saleDelay
            qtyAvailable
          }
        }
      `);
      const products = results.data.allProducts;

      return {
        statusCode: 200,
        body: JSON.stringify({
          products,
        }),
      };
    }
  } catch (error) {
    console.log('ERROR CAUGHT:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Request failed',
      }),
    };
  }
};
