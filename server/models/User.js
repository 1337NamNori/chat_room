const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: [true, 'This username is already taken'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Please enter at least 8 character'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: [true, 'This email is already registered'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
});

User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

User.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (isAuthenticated) {
            return user;
        }
        throw Error('incorrect password');
    } else {
        throw Error('incorrect username');
    }
};

module.exports = mongoose.model('User', User);
