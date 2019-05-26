const _ = require('lodash');
const ethers = require('ethers');

const Wallet = require('../model/wallet');

const getWallet = async (userId, fromUser = false) => {
    const existingUser = await Wallet.findOne({ slackId: userId });

    if (existingUser === null) {
        let randomWallet = ethers.Wallet.createRandom();
    
        let wallet = {
            slackId: userId,
            address: randomWallet.signingKey.address,
            privateKey: randomWallet.signingKey.privateKey,
            createdAt: new Date(),
            isClaimed: fromUser, 
            balances: {
                "ETH": 0,
                "WETH": 0,
                "DAI": 0,
                "GUSD": 0,
            },
            txCount: 0, // todo fix this
        }

        let result = await Wallet.collection.insert(wallet);

        return {
            message: `New wallet created: https://ropsten.etherscan.io/address/${wallet.address}`,
            success: true,
            data: {
                walletCreated: true,
                address: wallet.address,
            }
        };
    } else {
        return {
            message: `Existing wallet found: https://ropsten.etherscan.io/address/${existingUser.address}`,
            success: true,
            data: {
                walletCreated: false,
                address: existingUser.address,
            }
        };
    }
};

module.exports = getWallet;