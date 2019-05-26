const memoryCache = require('memory-cache');
const ms = require('ms');

const web3 = require('./web3');

const getBalance = async address => {
    const balance = await web3.getWrapper().getBalanceInWeiAsync(address);

    return balance;
};

module.exports = getBalance;