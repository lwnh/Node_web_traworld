const MongoClient = require('mongodb').MongoClient;
const databaseUrl = 'mongodb://localhost:27017';

let database;

module.exports = async () => {
    try {
        database = await MongoClient.connect(databaseUrl, (err, db) => {
            if(err){
                console.log(err);
            }else{
                const tempdb = db.db('nodedb');
                database = tempdb;
                console.log('mongodb connect ... ');
            }
        });
    } catch (e) {
        console.log("Could not connect to mongodb");
    }
  }

  module.exports.get = () => database;
  module.exports.close = () => database.close()