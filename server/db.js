const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;
  const client = new MongoClient(url);
  await client.connect();
  dbInstance = client.db(dbName);
  console.log(`Connected to MongoDB database "${dbName}"`);
  return dbInstance;
}

module.exports = { getDb };