const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const sessionSecret = process.env.SESSION_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

passport.use(adminStrategy());
passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));
const authenticate = passport.authenticate('local');

function setAuthMiddleware(app) {
    app.use(expressSession({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

function adminStrategy() {
    return new Strategy((username, password, callback) => {
        const isAdmin = username === 'admin' && password === adminPassword;
        if (isAdmin) {
            callback(null, { username: 'admin' });
        } else {
            callback(null, false);
        }
    })
}

function login(req, res) {
    res.json({ success: true });
}

function ensureAdmin(req, res, next) {
    const isAdmin = req.user && req.user.username === 'admin';
    if (isAdmin) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
}

module.exports = {
    authenticate,
    setAuthMiddleware,
    login,
    ensureAdmin
}