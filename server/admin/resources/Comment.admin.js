const Comment = require('../../models/Comment');

/** @type {AdminBro.ResourceOptions} */
const options = {
    parent: {
        name: 'Website Content',
        icon: 'Accessibility',
    },
    properties: {
        name: {
            position: 0,
            isVisible: true,
        },
        email: {
            position: 1,
            isVisible: true,
        },
        author: {
            position: 1,
            isVisible: true,
        },
        content: {
            type: 'richtext',
            custom: {},
            position: 2,
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