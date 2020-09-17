const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const sessionSecret = process.env.SESSION_SECRET;
const adminPassword = process.env.ADMIN_PASSWORD;

// configures passport to use our function for checking username and password
passport.use(adminStrategy());
passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));
const authenticate = passport.authenticate('local');

// sets up express and passport to use sessions
function setAuthMiddleware(app) {
    app.use(expressSession({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

// function used by passport to authenticate admin login
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

// route middleware to ensure route only used by admin
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