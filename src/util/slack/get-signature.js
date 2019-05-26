const crypto = require('crypto');
const config = require('config');

// as described here https://api.slack.com/docs/verifying-requests-from-slack

const getSignature = (timestamp, body) => {
    const secret = config.get('slack.signingSecret');
    
    const baseString = "v0:" + timestamp + ":" + body;
    const hash = crypto.createHmac('sha256', secret).update(baseString).digest('hex');

    return `v0=${hash}`;
};

module.exports = getSignature;