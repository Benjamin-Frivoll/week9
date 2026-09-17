const { getDb } = require('./app');

async function updateProduct() {
    const { client, db } = await getDb();

    try {
        const products = db.collection('products');

        //update product with id = 1
        const result = await products.updateOne(
            { id : 1 },
            { $set: { price: 27.99, units: 45 } }
        );

        console.log(`Matched ${result.matchedCount}, modified ${result.modifiedCount} product(s)`);

        //show updated document
        const updated = await products.findOne({ id: 1 });
        console.log('Updated document: ', updated);
    } catch(err) {
        console.error('Error updating product: ', err);
    } finally {
        await client.close();
    }
}

updateProduct();