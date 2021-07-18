require('dotenv').config();

exports.devMode = (str) => process.env !== 'production' && console.log(str);
