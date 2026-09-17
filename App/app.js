const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

async function getDb() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return { client, db };
}

module.exports = { getDb };