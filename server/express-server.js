require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const { ensureAdmin } = require('./middleware/auth');
const { getItems, getItem, createItem, getCart } = require('./api');

const sessionSecret = process.env.SESSION_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

passport.use(new Strategy((username, password, callback) => {
    const isAdmin = username === 'admin' && password === adminPassword;
    if (isAdmin) {
        callback(null, { username: 'admin' });
    } else {
        callback(null, false);
    }
}))

passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => res.json({ success: true }));

app.get('/items', getItems);
app.get('/items/:id', getItem);
app.post('/items', ensureAdmin, createItem);
app.get('/cart', getCart);
app.get('/', (req, res) => {
    res.status(404).json({ message: 'Resource not found'});
})

app.listen(4000, () => console.log('Starting express server on port 4000'));
