const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
    },
};

const userSchema = new Schema({
    firstname: String,
    surname: String,
    avatar: String,
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
        enum: ['admin', 'moderator'],
        required: true
    },
}, schemaOptions);


const User = model('Users', userSchema);

module.exports = User;