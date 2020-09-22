const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy } = require('passport-local');

const { pool } = require('../api');

const jwtSecret = process.env.JWT_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

const jwtOpts = {
    algorithm: 'HS256',
    expiresIn: '30d',
};

passport.use(adminStrategy());
const authenticate = passport.authenticate('local', { session: false });

function adminStrategy() {
    return new Strategy(async (username, password, callback) => {
        const isAdmin = username === 'admin' && password === adminPassword;
        if (isAdmin) {
            return callback(null, { username: 'admin' });
        }

        try {
            const user = await pool.query(`SELECT * FROM users WHERE username = ${username}`);
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                return callback(null, { username: user.username });
            }
        } catch (err) {}

        return callback(null, false);
    })
}

async function login(req, res) {
    const token = await jwt.sign({ username: req.user.username }, jwtSecret, jwtOpts);

    res.json({ success: true, token });
}

async function ensureAdmin(req, res, next) {
    console.log('Ensuring that client is admin');
    const jwtString = req.headers.authorization;
    try {
        const user = await jwt.verify(jwtString.replace('Bearer ', ''), jwtSecret);
        const isAdmin = user.username === 'admin';
        if (isAdmin) {
            return next();
        }            
    } catch (err) {}

    res.status(401).json({ error: 'Unauthorized' });
}

async function ensureUser(req, res, next) {
    const jwtString = req.headers.authorization;
    try {
        const payload = await jwt.verify(jwtString.replace('Bearer ', ''), jwtSecret);
        if (payload.username) {
            req.user = payload;
            req.isAdmin = payload.username === 'admin';
            return next();
        }
    } catch (err) {}

    res.status(401).json({ error: 'Unauthorized' });
}

module.exports = {
    authenticate,
    login,
    ensureAdmin,
    ensureUser,
}