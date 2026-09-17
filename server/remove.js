const { getDb } = require('./db');
const { ObjectId } = require('mongodb');

// DELETE /products/:id - remove by Mongo _id
async function removeProduct(req, res) {
  try {
    const db = await getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Mongo ObjectId' });
    }

    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted', deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Remove error:', err);
    res.status(500).json({ error: 'Failed to remove product' });
  }
}

module.exports = { removeProduct };