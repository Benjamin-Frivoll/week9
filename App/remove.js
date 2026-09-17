const { getDb } = require('./app');

async function removeProduct() {
    const { client, db } = await getDb();

    try {
        const products = db.collection('products');

        //delete product with id = 2
        const result = await products.deleteOne({ id: 2 });

        console.log(`Deleted ${result.deletedCount} product(s)`);

        //show remaining products
        const remaining = await products.find({}).toArray();
        console.log(`${remaining.length} product(s) remain in the collection`);
    } catch(err) {
        console.error('Error removing product: ', err);
    } finally {
        await client.close();
    }
}

removeProduct();