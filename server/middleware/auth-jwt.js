const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const { getUser } = require('../repository');


const jwtSecret = process.env.JWT_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

const jwtOps = {
    algorithm: 'HS256',
    expiresIn: '30d',
}

// configures passport to use our function for checking username and password
passport.use(adminStrategy());
const authenticate = passport.authenticate('local', { session: false });

// function used by passport to authenticate admin login
function adminStrategy() {
    return new Strategy(async (username, password, callback) => {
        const isAdmin = username === 'admin' && password === adminPassword;
        if (isAdmin) {
            callback(null, { username: 'admin' });
        }

        try {
            const user = await getUser(username);
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                return callback(null, { username: user.username });
            }
        } catch (err) {}

        return callback(null, false);
    })
}

async function login(req, res) {
    const token = await jwt.sign({ username: req.user.username }, jwtSecret, jwtOps);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ success: true, token });
}

// route middleware to ensure route only used by admin
async function ensureAdmin(req, res, next) {
    const jwtString = req.headers.authorization || req.cookies.jwt;
    try {
        const payload = await jwt.verify(jwtString.replace('Bearer ', ''), jwtSecret);
        const isAdmin = payload.username === 'admin';
        
        if (isAdmin) {
            return next();
        }
        throw new Error('Unauthorized');
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized'});
    }
}

// route middleware to ensure route only used by authenticated user
async function ensureUser(req, res, next) {
    const jwtString = req.headers.authorization || req.cookies.jwt;
    try {
        const payload = await jwt.verify(jwtString.replace('Bearer ', ''), jwtSecret);
        if (payload.username) {
            req.user = payload;
            req.isAdmin = payload.username === 'admin';
            return next();
        }
        throw new Error('Unauthorized');
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized'});
    }
}

module.exports = {
    authenticate,
    login,
    ensureAdmin,
    ensureUser,
}