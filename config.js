'use strict';

require('dotenv').config();

const elasticsearchConfig = {
    node: process.env.ES_HOST
};

module.exports = {
    elasticsearchConfig
};
