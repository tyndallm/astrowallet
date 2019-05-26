const Wallet = require('../../model/wallet');
const { getClient } = require('./client');
const getWallet = require('../../wallet/get-wallet');

// get slackUser from slack username string
const getUser = async (username) => {
    if (username.startsWith("@")) {
        username = username.slice(1);
    }

    const slackClient = getClient();
    const result = await slackClient.users.list();

    let users = result.members;

    let foundUser;
    users.map((user => {
        if (user.name === username) {
            // console.log("Match found!: ", user);
            foundUser = user;
            return;
        }
    }));

    return foundUser;
};

const getUserAddress = async (username) => {
    const slackUser = await getUser(username);
    const result = await getWallet(slackUser.id);

    return {
        user: `@${slackUser.name}`,
        address: result.data.address
    };
}

module.exports = { getUser, getUserAddress };