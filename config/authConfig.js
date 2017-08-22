const R = require('ramda');
const getConfig = require('./index');

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