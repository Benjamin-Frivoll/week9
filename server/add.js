const { getDb } = require('./db');

// POST /products - add a new product, reject duplicate ids
async function addProduct(req, res) {
  try {
    const db = await getDb();
    const collection = db.collection('products');
    const { id, name, description, price, units } = req.body;

    if (id === undefined || !name) {
      return res.status(400).json({ error: 'id and name are required' });
    }

    // Duplicate check on the id field
    const existing = await collection.findOne({ id: Number(id) });
    if (existing) {
      return res.status(409).json({ error: `Product with id ${id} already exists` });
    }

    const newProduct = {
      id: Number(id),
      name,
      description: description || '',
      price: parseFloat(price) || 0,
      units: parseInt(units) || 0
    };

    const result = await collection.insertOne(newProduct);
    res.status(201).json({ _id: result.insertedId, ...newProduct });
  } catch (err) {
    console.error('Add error:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
}

module.exports = { addProduct };