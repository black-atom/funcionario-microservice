const  { prop, curry } = require('ramda');

/**
 * This approach is from a pagar.me code. All the credits goes do grvcoelho
 */

/**
 * Gets the environment variable accordint 
 * @param {*} env a string, development, test, production
 */
const getEnv = (env) => env || process.env.NODE_ENV || 'test';

/**
 * Gets the configuration according to the environment 
 * @param {*} config 
 */
//const getConfig = curry((config, env ) => prop(getEnv(env), config));
const getConfig = config => env => prop(getEnv(env), config);


module.exports = getConfig;