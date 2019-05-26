const _ = require('lodash');

module.exports = {
  bugsnag: {
    token: _.get(process.env, 'BUGSNAG_TOKEN', null),
  },
  slack: {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    accessToken: process.env.SLACK_ACCESS_TOKEN,
  },
  database: {
    connectionString: process.env.CONNECTION_STRING,
  },
  web3: {
    endpoint: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    networkId: 3, // Ropsten
  },
  port: process.env.PORT || 3001,
};

// mainnet endpoint: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,