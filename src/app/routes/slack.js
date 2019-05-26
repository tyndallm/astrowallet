const _  = require('lodash');
const Router = require('koa-router');
const { SLACK_COMMANDS } = require('../../constants');

const getWallet = require('../../wallet/get-wallet');
const sendTransaction = require('../../wallet/send-transaction');
const getBalance = require('../../wallet/get-balance');
const { getUserAddress } = require('../../util/slack/get-user');

const router = new Router();

router.post('/', async (ctx, next) => {
    
    const body = ctx.request.body;
    const user = body['user_id'];

    const rawText = body['text'];
    const cmd = rawText.split(' ')[0];

    switch(cmd) {
        case SLACK_COMMANDS.CREATE:
            let result = await getWallet(user, true);
            ctx.response.body = result.message; 
            break;
        case SLACK_COMMANDS.SEND:
            let rawCmd = rawText.split(' ');

            let recipient = rawCmd[1];
            let amount = rawCmd[2];
            let token = rawCmd[3];

            if (recipient !== undefined && amount !== undefined && token !== undefined) {
                let foundUser = await getUserAddress(recipient);
                let txResult = await sendTransaction(user, amount, token, foundUser.address);
                ctx.response.body = txResult.message;
            } else {
                ctx.response.body = `Unable to parse command: recipient: ${recipient}, amount: ${amount}, token: ${token}`;
            }
            break;
        case SLACK_COMMANDS.BALANCE:
            let wallet = await getWallet(user);
            let balanceResult = await getBalance(wallet.data.address);
            ctx.response.body = balanceResult.message;
            break;
        default:
            console.log(`Command not recognized: ${cmd}`);
            break;
    }
    
    await next();
});

module.exports = router;