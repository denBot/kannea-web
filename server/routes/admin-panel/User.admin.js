const AdminBro = require('admin-bro');
const Company = require('../../models/User');

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
        password: {
            type: 'password',
            isVisible: {
                list: false, edit: true, filter: false, show: false,
            },
        },
        avatarLocation: {
            isVisible: {
                list: false, edit: true, filter: false, show: false,
            },
        },
        uploadImage: {
            components: {
                edit: AdminBro.bundle('./components/image.edit.tsx'),
                list: AdminBro.bundle('./components/image.list.tsx'),
            },
        },
    },
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
    resource: Company,
};