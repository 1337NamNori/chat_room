const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const maxAge = 5 * 24 * 60 * 60;

const createJWT = (id) => {
    return jwt.sign({ id }, 'secret chatroom', {
        expiresIn: maxAge,
    });
};

const alertError = (err) => {
    const errorMessage = {
        username: '',
        password: '',
        email: '',
    };
    if (err.code === 11000) {
        if (err.message.includes('username')) {
            errorMessage.username = 'This username is already taken';
        }
        if (err.message.includes('email')) {
            errorMessage.email = 'This email is already registered';
        }
        return errorMessage;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errorMessage[properties.path] = properties.message;
        });
    }
    console.log(errorMessage);
    return errorMessage;
};

module.exports = {
    login(req, res, next) {
        console.log(req.body);
        res.send('login');
    },
    async signup(req, res, next) {
        const { username, email, password } = req.body;
        try {
            const user = await User.create({ username, email, password });
            const token = createJWT(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });
            res.status(201).json({ user });
        } catch (err) {
            const errors = alertError(err);
            res.status(400).json({ errors });
        }
    },
    logout(req, res, next) {
        res.send('logout');
    },
};
