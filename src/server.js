'use strict';
const Glue = require('@hapi/glue');
const manifest = require('./manifest');
const {ApolloServer} = require('apollo-server-hapi');

const initServer = async() => {
    const server = await Glue.compose(
        manifest,
        {
            relativeTo: __dirname
        }
    );

    const apolloServer = new ApolloServer({
        tracing    : true,
        typeDefs   : require('./graphql/typeDefs'),
        resolvers  : require('./graphql/resolvers'),
        dataSources: () => ({
            categoryReadstore: new CategoryReadstoreDataSource({
                elasticsearchConfig: config.get('transactionalReadstore.elasticsearch')
            }),
            productReadstore: new ProductReadstoreDataSource({
                elasticsearchConfig: config.get('transactionalReadstore.elasticsearch')
            }),
            magento: new MagentoDataSource({
                magentoUrl: config.get('urls.magentoUrl')
            }),
            registryItems: registryItemsDataSource
        }),
        context: ({request}) => ({request}),
        plugins: require('./graphql/plugins')
    });

    await apolloServer.applyMiddleware({
        app  : server,
        route: {
            auth: {
                strategy: 'tkMembership',
                mode    : 'try'
            }
        }
    });

    await apolloServer.installSubscriptionHandlers(server.listener);


    return server;
};

module.exports = initServer;
