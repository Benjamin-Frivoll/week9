const { getDb } = require('./db');
const { ObjectId } = require('mongodb');

// PUT /products/:id - update by Mongo _id
async function updateProduct(req, res) {
  try {
    const db = await getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Mongo ObjectId' });
    }

    const { name, description, price, units } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = parseFloat(price);
    if (units !== undefined) updates.units = parseInt(units);

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updated = await db.collection('products').findOne({ _id: new ObjectId(id) });
    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
}

module.exports = { updateProduct };