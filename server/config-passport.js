const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDb = {
    id: 1,
    email: 'test@mail.ru',
    password: 12345
}

passport.serializeUser(function (user, done) {
    console.log("Сериализация: ", user);
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    console.log("Десериализация: ", id);
    const user = userDb.id === id ? userDb : false;
    done(null, user);
})

passport.use(new LocalStrategy({ usernameField: 'email' },
    function (email, password, done) {
        if (email === userDb.email && password === userDb.password) {
            return done(null, userDb)
        } else {
            return done(null, false)
        }
    }
));