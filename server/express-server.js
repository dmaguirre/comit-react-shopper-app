require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { setAuthMiddleware, authenticate, ensureAdmin } = require('./middleware/auth-sessions');
const { getItems, getItem, createItem, getCart } = require('./api');

const app = express();
//comment
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
setAuthMiddleware(app);

app.post('/login', authenticate, (req, res) => res.json({ success: true }));

app.get('/items', getItems);
app.get('/items/:id', getItem);
app.post('/items', ensureAdmin, createItem);
app.get('/cart', getCart);
app.get('/', (req, res) => {
    res.status(404).json({ message: 'Resource not found'});
})

app.listen(4000, () => console.log('Starting express server on port 4000'));
