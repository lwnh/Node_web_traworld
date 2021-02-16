const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/nodedb';

let database;

module.exports = () => {
  mongoose.connect(databaseUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => {
      console.log('mongoose connect...');
      database = mongoose.connection;
    })
    .catch((e) => console.log("mongoose connection error...", e));
};

module.exports.get = () => database;
module.exports.close = () => database.close()