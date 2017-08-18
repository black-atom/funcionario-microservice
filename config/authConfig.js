const R = require('ramda');
const getConfig = require('./index').getConfig;

const config = getConfig({
    development: {
        bypass: true,
    },

    test: {
        bypass: true,
    },

    production: {
        bypass: false,
    }
});

module.exports = config;