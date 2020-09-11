const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const data = require("../data/items.json");

const app = express();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(cors());
app.use(bodyParser());

app.get('/items', (req, res) => {
    const { tag, limit = 25, offset = 0 } = req.query;
    const filteredItems = data.items.filter((item) => !tag || item.tags.includes(tag));
    const selectedItems = filteredItems.slice(offset, offset + limit)
    res.json(selectedItems);
})
app.get('/cart', (req, res) => {
    res.json(data.cart);
})
app.get('/', (req, res) => {
    res.status(404).json({ message: 'Resource not found'});
})

app.listen(4000, () => console.log('Starting express server on port 4000'));
