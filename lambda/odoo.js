const { devMode } = require('./env.js');
const axios = require('axios').default;

const baseUrl = process.env.ODOO_BASE_URL;
const apiKey = process.env.ODOO_API_KEY;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = {
  ['Content-Type']: 'application/json',
  ['api-key']: apiKey,
};

exports.gql = async function _execGQL(query, variables) {
  devMode(`--- REQUEST:
${query}

vars: ${JSON.stringify(variables)}
  `);

  const response = await axios.post('graphql/sourdough', {
    query,
    variables,
  });

  devMode(`--- RESPONSE:
${JSON.stringify(response.data, 0, 4)}
  `);

  return response.data;
};
