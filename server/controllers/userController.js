const User = require("../models/userModel");
User.init();
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../config/passport')

module.exports.getAllUsers = async (req, res, next) => {
    User.find().then(result => {
        res.send(result);
    });
};

module.exports.register = async (req, res, next) => {
    const user = new User({
        username: req.body.username.toLowerCase(),
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => {
        res.send({
            success: true,
            message: "User created successfully.",
            user: {
                id: user._id,
                username: user.username
            }
        })
    }).catch(err => {
        if (err.code === 11000) {
            res.send({
                success: false,
                message: "User with this username already exists",
                error: err
            })
        } else {
            res.send({
                success: false,
                message: "Something wrong",
                error: err
            })
        }
    })
};

module.exports.login = async (req, res, next) => {
    User.findOne({ username: req.body.username }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(payload, "Random string", { expiresIn: "1m" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
};

module.exports.protected = async (req, res, next) => {
    console.log(req.headers.authorization);
    const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
    // Теперь добавить токен в куки
    // На фронте добавлять его http заголовком с запросом на сервер
    return res.status(200).send({
        success: true,
        user: {
            id: token.id,
            username: token.username,
        }
    })
};