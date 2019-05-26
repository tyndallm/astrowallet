const { SUPPORTED_TOKENS } = require('../constants');
const ethers = require('ethers');
const { getProvider } = require('../util/ethereum/ethers');

const getBalance = async (address, token = 'ETH') => {
    let balance;

    switch(token) {
        case SUPPORTED_TOKENS.ETH:
        default:
            balance = await getProvider().getBalance(address);
            balance = ethers.utils.formatEther(balance);
    }
    
    return {
        message: `Balance: ${balance} ${token}`,
        success: true,
        data: {
            balanceRetrieved: true,
            balance: balance,
        }
    };
};

module.exports = getBalance;