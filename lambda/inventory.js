const { devMode } = require('./env');
const { gql } = require('./odoo');

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const results = await gql(`
      {
        allProducts {
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
