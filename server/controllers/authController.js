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
    if (err.message === 'incorrect username') {
        errorMessage.username = 'This username is not exist';
        return errorMessage;
    }
    if (err.message === 'incorrect password') {
        errorMessage.password = 'This password is incorrect';
        return errorMessage;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errorMessage[properties.path] = properties.message;
        });
    }
    return errorMessage;
};

module.exports = {
    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            const user = await User.login(username, password);
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
    verify(req, res, next) {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'secret chatroom', async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    next();
                } else {
                    const user = await User.findById(decodedToken.id);
                    res.json({ user });
                    next();
                }
            });
        } else {
            next();
        }
    },
    logout(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ logout: true });
    },
};
