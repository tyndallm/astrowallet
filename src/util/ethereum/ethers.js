const ethers = require('ethers');

let provider;

const configure = ({ endpoint }) => {
  provider = new ethers.providers.JsonRpcProvider(endpoint);
};

const getProvider = () => provider;

module.exports = { configure, getProvider };
