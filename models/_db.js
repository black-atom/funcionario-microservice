
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const dbConfig = require("../config/databaseConfig")();

console.log(dbConfig)
let options = {
  db: { native_parser: true },
  server: { poolSize: 10 },
  promiseLibrary: bluebird,
  user: dbConfig.username,
  pass: dbConfig.password
}

mongoose.connect(dbConfig.url, options);
mongoose.Promise = bluebird;

let _db = mongoose.connection;

_db.on('error', console.error.bind(console, 'connection error:'));

_db.once('open', () => {
    console.log('The database of login microservice application is running');
});

module.exports = _db;