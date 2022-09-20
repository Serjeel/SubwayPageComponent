require("./database").connect();
const express = require("express");
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'megaSuperSecret',
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => res.send('Hello world'));

app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send('Укажите правильный email или пароль!')
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err)
            }
            return res.redirect('/admin')
        });
    })(req, res, next);
});

const auth = (req, res, next) => {
    if(req.isAuthentificated()) {
        next()
    } else {
        return res.redirect('/')
    }
}

app.get('/admin', auth, (req, res) => {
    res.send('Admin page!')
})

const foodRoute = require("./routes/foodRoute");
app.use(cors());

app.use("/food", foodRoute);

module.exports = app;