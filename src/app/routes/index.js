const combineRouters = require('koa-combine-routers');

const slack = require('./slack');

const router = combineRouters(
    slack,
);

module.exports = router;