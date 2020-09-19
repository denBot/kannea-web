const Comment = require('../../models/Comment');

/** @type {AdminBro.ResourceOptions} */
const options = {
    parent: {
        name: 'Website Content',
        icon: 'Accessibility',
    },
    properties: {
        _id: {
            isVisible: false,
        },
        name: {
            position: 0,
            isVisible: true,
        },
        email: {
            position: 1,
            isVisible: true,
        },
        post: {
            position: 2,
            isVisible: {
                list: true, edit: true, filter: false, show: true,
            },
        },
        author: {
            position: 3,
            isVisible: true,
        },
        content: {
            type: 'richtext',
            custom: {},
            position: 4,
            isVisible: {
                list: false, edit: true, filter: false, show: true,
            },
        },
        updatedAt: {
            isVisible: false,
        },
        createdAt: {
            isVisible: false,
        },
    },
    actions: {
        show: {
            isAccessible: false,
        }
    },
};

module.exports = {
    options,
    resource: Comment,
};