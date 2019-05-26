const { WebClient } = require('@slack/web-api');

let client;
  
const configure = ({ token }) => {
    client = new WebClient(token);
};

const getClient = () => client;

module.exports = { configure, getClient };