'use strict';

const {join} = require('path');
const packageInfo = require(join(__dirname, '../package.json'));

const manifest = {
    server: {
        app: {
            slogan: packageInfo.description
        },
        port : process.env.PORT || 80,
        state: {
            strictHeader: false
        }
    },
    register: {
        plugins: [
        ]
    }
};

module.exports = manifest;
