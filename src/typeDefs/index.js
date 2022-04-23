'use strict';

const {gql} = require('apollo-server');

module.exports = gql`
  type Query {
    product(sku: String, id: String): Product
    products(search: string, first: Int, after: String)
  }
`;
