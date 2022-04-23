'use strict';

const initServer = require('./server');

const main = async() => {
    const server = await initServer();

    server.start();
};

main();
