require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { authenticate, login, ensureAdmin } = require('./middleware/auth-jwt');
const { getItems, getItem, createItem, getCart } = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/login', authenticate, login);

app.get('/items', getItems);
app.get('/items/:id', getItem);
app.post('/items', ensureAdmin, createItem);
app.get('/cart', ensureAdmin, getCart);
app.get('/', (req, res) => {
    res.status(404).json({ message: 'Resource not found'});
})

app.listen(4000, () => console.log('Starting express server on port 4000'));
