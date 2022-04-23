'use strict';

const { DataSource } = require('apollo-datasource');
const {Client: ElasticsearchClient} = require('@elastic/elasticsearch');
const DataLoader = require('dataloader');
const {elasticsearchConfig} = require('../../config');

const INDEX_NAME = 'products';

class ProductDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize() {
        this.elasticsearchClient = new ElasticsearchClient(elasticsearchConfig);
        this.productLoader = new DataLoader(async(skus) => {
            const { body } = await this.elastic.get(
                {
                    index: this.elasticsearchConfig.productsIndex,
                    id   : skus[0]
                },
                { ignore: [404] }
            );

            if (!body.found) {
                return [null];
            }

            return [body._source];
        });
    }

    didEncounterError(error) {
        throw error;
    }

    async getProductBySku(sku) {
        return await this.productLoader.load(sku);
    }

    async getProductsBySkus(skus, size = 10) {
        const { body } = await this.elastic.search(
            {
                index: INDEX_NAME,
                body : {
                    query: {
                        terms: {
                            skus
                        }
                    },
                    size
                }
            },
            { ignore: [404] }
        );

        if (!body?.hits?.hits) {
            return null;
        }

        return body.hits.hits.map(({_source}) => _source);
    }
}

module.exports = ProductDataSource;
