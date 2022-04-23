'use strict';

module.exports = {
    mappings: {
        dynamic   : 'strict',
        properties: {
            breadcrumbIds: {
                type: 'keyword'
            },
            childrenIds: {
                type: 'keyword'
            },
            description: {
                type: 'text'
            },
            id: {
                type: 'keyword'
            },
            imageFileName: {
                type: 'text'
            },
            displayOnListingPage: {
                type: 'boolean'
            },
            includeInMenu: {
                type: 'boolean'
            },
            isCollection: {
                type: 'boolean'
            },
            isEnabled: {
                type: 'boolean'
            },
            lastUpdated: {
                type: 'text'
            },
            level: {
                type: 'integer'
            },
            name: {
                type: 'text'
            },
            thumbnailUrl: {
                type: 'text'
            },
            urlPath: {
                type: 'keyword'
            },
            version: {
                type: 'keyword'
            }
        }
    }
};
