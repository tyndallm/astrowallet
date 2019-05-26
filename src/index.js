const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

require('dotenv-safe').config({
    example:
        process.env.NODE_ENV === 'production'
            ? '.env.prod'
            : '.env'
});

const config = require('config');

const app = require('./app');

app.configure();
app.start(config.get('port'));