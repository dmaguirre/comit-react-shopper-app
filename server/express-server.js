const express = require('express');
const queryString = require('query-string');

const data = require("../data/items.json");

const app = express();

app.get('/items', (req, res) => {
    const { query } = queryString.parseUrl(req.url);
    const { tag, limit, offset } = query;
    const filteredItems = data.items.filter((item) => !tag || item.tags.includes(tag));
    res.json(filteredItems);
})
app.get('/cart', (req, res) => {
    res.json(data.cart);
})
app.get('/', (req, res) => {
    res.status(404).json({ message: 'Resource not found'});
})

app.listen(4000, () => console.log('Starting express server on port 4000'));
