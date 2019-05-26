const getSignature = require('../../util/slack/get-signature');

const createMiddleware = () => async (ctx, next) => {
    try {
        // todo: make sure timestamp is recent (within 5 mins)

        let timestamp = ctx.request.headers['x-slack-request-timestamp'];
        let signature = ctx.request.headers['x-slack-signature'];

        let computedSignature = getSignature(timestamp, ctx.request.rawBody); // use only raw request payload

        // console.log(`userId: ${ctx.request.body['user_id']}`);
        // console.log(`text: ${ctx.request.body['text']}`);

        // console.log(`provided signature: ${signature}`);
        // console.log(`computed signature: ${computedSignature}`);
        if (signature === computedSignature) {
            await next();
        } else {
            throw new Error('Invalid signature');
        }
    } catch (err) {
        ctx.response.body = {
            errors: [
                {
                code: 'UNAUTHORIZED',
                status: 401,
                title:
                    'Cannot validate signature of inbound request.',
                },
            ],
        };
        ctx.response.status = 401;
        ctx.app.emit('error', err, ctx);
    }
};
  
module.exports = createMiddleware;