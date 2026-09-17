const { getDb } = require('./app');

async function addProducts() {
    const { client, db } = await getDb();

    try {
        const products = db.collection('products');

        //drop each collection first to prevent duplicates
        await products.deleteMany({});

        const items = [
            {
                id: 1,
                name: 'Coffee Beans',
                description: 'Premium Arabica beans, 500g bag',
                price: 24.99,
                units: 50
            },
            {
                id: 2,
                name: 'Hunter Valley Shiraz',
                description: 'Full-bodied red wine, 750ml bottle',
                price: 35.50,
                units: 20
            },
            {
                id: 3,
                name: 'Artisan Cheese Board',
                description: 'Selection of local cheeses with crackers',
                price: 45.00,
                units: 15
            },
            {
                id: 4,
                name: 'Dark Chocolate Box',
                description: 'Handmade 70% cocoa chocolates, 250g',
                price: 18.75,
                units: 30
            }
        ];

        const result = await products.insertMany(items);
        console.log(`Inserted ${result.insertedCount} products into "products" collection`);
    } catch (err) {
        console.error('Error inserting products:', err);
    } finally {
        await client.close();
    }
}

addProducts();