const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        username: { type: String, required: true },
        userID: { type: String, required: true },
        roomID: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

module.exports = mongoose.model('Message', Message);
