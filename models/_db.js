
const mongoose = require('mongoose');
const bluebird = require('bluebird');

let options = {
  db: { native_parser: true },
  server: { poolSize: 10 },
  promiseLibrary: bluebird,
  //promiseLibrary:
  //user: '',
  //pass: 'myPassword'
}

mongoose.connect('mongodb://localhost/test', options);
mongoose.Promise = bluebird;

let _db = mongoose.connection;

_db.on('error', console.error.bind(console, 'connection error:'));

_db.once('open', () => {
    console.log('The database of login microservice application is running');
});

module.exports = _db;