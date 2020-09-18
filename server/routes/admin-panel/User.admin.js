const AdminBro = require('admin-bro');
const User = require('../../models/User');
const {
    isAdmin,
    isAdminOrUserOwner
} = require('./permissions');

const {
    before: passwordBeforeHook,
    after: passwordAfterHook,
} = require('./actions/user-password.hook');

const {
    before: uploadBeforeHook,
    after: uploadAfterHook,
} = require('./actions/user-upload.hook');

/** @type {AdminBro.ResourceOptions} */
const options = {
    properties: {
        avatar: {
            position: 0,
            components: {
                edit: AdminBro.bundle('./components/avatar.edit.tsx'),
                list: AdminBro.bundle('./components/avatar.list.tsx'),
            },
        },
        avatarUrl: {
            position: 1,
            isVisible: {
                list: false, edit: true, filter: false, show: true,
            },
        },
        firstname: {
            position: 2,
            isVisible: {
                list: true, edit: true, filter: true, show: true,
            },
        },
        surname: {
            position: 3,
            isVisible: {
                list: true, edit: true, filter: true, show: true,
            },
        },
        role: {
            position: 4,
            isVisible: {
                list: true, edit: true, filter: true, show: true,
            },
        },
        email: {
            type: 'email',
            isVisible: {
                list: true, edit: true, filter: true, show: true,
            },
            position: 5,
        },
        password: {
            type: 'password',
            position: 6,
            isVisible: {
                list: false, edit: true, filter: false, show: false,
            },
        },
        createdAt: {
            position: 7,
            isVisible: {
                list: true, edit: false, filter: true, show: true,
            },
        },
        updatedAt: {
            position: 8,
            isVisible: {
                list: true, edit: false, filter: true, show: true,
            },
        },
        encryptedPassword: {
            isVisible: false,
        },
    },

    actions: {
        new: {
            isAccessible: isAdmin,
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
            isAccessible: isAdminOrUserOwner,
            after: async (response, request, context) => {
                const modifiedResponse = await passwordAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        delete: {
            isAccessible: isAdmin,
            guard: 'Are you sure?',
        },
        bulkDelete: {
            isAccessible: isAdmin,
            guard: 'Are you sure?'
        },
        show: {
            isAccessible: isAdmin
        }
    },
};

module.exports = {
    options,
    resource: User,
};