const {getDb} = require('./app');

async function readProducts() {
    const { client, db } = await getDb();

    try {
        const products = db.collection('products');
        const all = await products.find({}).toArray();

        console.log(`Found ${all.length} product(s): `);
        all.forEach(p => console.log(p));
    } catch(err) {
        console.error('Error reading products: ', err);
    } finally {
        await client.close();
    }
}

readProducts();