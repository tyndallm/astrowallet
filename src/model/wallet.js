const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema({
    slackId: { type: String, index: true },
    username: { type: String, index: true },
    address: { type: String, index: true },
    privateKey: String,
    createdAt: { type: Date, index: -1 },
    balances: { type: Schema.Types.Mixed },
    isClaimed: { type: Boolean, default: false },
    isFunded: { type: Boolean, default: false },
    type: String,
    txCount: { type: Number, default: 0 },
});

const Model = mongoose.model('Wallet', schema);

module.exports = Model;
