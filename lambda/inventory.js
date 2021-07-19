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

const respond = (data = {}, statusCode = 200, opts = {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    statusCode,
    ...opts,
  };
};

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
            currency {
              symbol
              rate
            }
          }
        }
      `,
        { slug: data.slug }
      );
      const product = results.data.productBySlug;

      return respond({
        product,
      });
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
            currency {
              symbol
              rate
            }
          }
        }
      `);
      const products = results.data.allProducts;

      return respond({ products });
    }
  } catch (error) {
    console.log('ERROR CAUGHT:', error);
    return respond({ error: 'Request failed' }, 500);
  }
};
