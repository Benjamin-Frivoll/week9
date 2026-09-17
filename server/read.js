const { getDb } = require('./db');

// GET /products - return all products as JSON
async function readProducts(req, res) {
  try {
    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error('Read error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

module.exports = { readProducts };