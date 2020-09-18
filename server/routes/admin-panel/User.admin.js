const AdminBro = require('admin-bro');
const User = require('../../models/User');

const isAdmin = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'

const {
    after: passwordAfterHook,
    before: passwordBeforeHook,
} = require('./actions/user-password.hook');

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('./actions/user-upload.hook');

/** @type {AdminBro.ResourceOptions} */
const options = {
    properties: {
        encryptedPassword: {
            isVisible: false,
        },
        email: {
            type: 'email',
            isVisible: {
                list: true, edit: isAdmin, filter: true, show: true,
            },
        },
        password: {
            type: 'password',
            isVisible: {
                list: false, edit: isAdmin, filter: false, show: false,
            },
        },
        avatarUrl: {
            isVisible: {
                list: false, edit: true, filter: false, show: true,
            },
        },
        uploadImage: {
            components: {
                edit: AdminBro.bundle('./components/avatar.edit.tsx'),
                list: AdminBro.bundle('./components/avatar.list.tsx'),
            },
        },
    },
    listProperties: ['uploadImage', 'firstname', 'surname', 'email', 'role', 'created_at'],
    editProperties: ['uploadImage', 'avatarUrl', 'firstname', 'surname', 'role', 'email', 'password'],
    filterProperties: ['firstname', 'surname', '_id', 'role', 'email'],

    actions: {
        new: {
            after: async (response, request, context) => {
                const modifiedResponse = await passwordAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        edit: {
            after: async (response, request, context) => {
                const modifiedResponse = await passwordAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        show: {
            isVisible: false,
        },
    },
};

module.exports = {
    options,
    resource: User,
};