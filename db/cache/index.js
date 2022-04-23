'use strict';

const {Client: ElasticsearchClient} = require('@elastic/elasticsearch');
const {elasticsearchConfig} = require('../../config');
const productsSchema = require('./schemas/products.json');
const products = require('./data/products.json');

const INDEX_NAME = 'products';

(async() => {
    try {
        const esClient = new ElasticsearchClient(elasticsearchConfig);

        const response = await esClient.indices.exists({index: INDEX_NAME});

        if (response.statusCode === 404) {
            // init mapping
            await esClient.indices.create({
                index: INDEX_NAME,
                body : {
                    settings: productsSchema.settings,
                    mappings: productsSchema.mappings
                }
            });
        }
        // init data
        const promises = products.map((product) => {
            return esClient.index({
                index: INDEX_NAME,
                id   : product.sku,
                body : product
            });
        });

        await Promise.all(promises);
        console.log('Initialized indices and data');
    } catch (error) {
        console.log(error);
    }
})();
