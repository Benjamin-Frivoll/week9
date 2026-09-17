const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { readProducts } = require('./read');
const { addProduct } = require('./add');
const { updateProduct } = require('./update');
const { removeProduct } = require('./remove');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/products', readProducts);            // (1) list all
app.post('/products', addProduct);             // (2) add new
app.put('/products/:id', updateProduct);       // (4) update by _id
app.delete('/products/:id', removeProduct);    // (3) remove by _id

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});