const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose = require('mongoose');

AdminBro.registerAdapter(AdminBroMongoose)

// Models and Resources
const User = require('../../models/User');
const AuthUser = require('./resources/User.resource.js')
const Post = require('./resources/Post.resource.js')

const adminBroOptions = {
    databases: [mongoose],
    resources: [
        AuthUser,
        Post
    ],
    rootPath: '/admin',
}

const adminBro = new AdminBro(adminBroOptions)

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            if (password === user.encryptedPassword) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'session Key',
})

module.exports = router;