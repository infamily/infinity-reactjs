require('jest-localstorage-mock');
const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

// global.navigator = {
//   userAgent: 'node.js'
// };
