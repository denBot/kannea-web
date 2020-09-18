const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
    },
};

const userSchema = new Schema({
    firstname: String,
    surname: String,
    avatarUrl: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
}, schemaOptions);

const User = model('Users', userSchema);

module.exports = User;