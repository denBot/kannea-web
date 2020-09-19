const Post = require('../../models/Post');

/** @type {AdminBro.ResourceOptions} */
const options = {
    parent: {
        name: 'Website Content',
        icon: 'Accessibility',
    },
    properties: {
        title: {
            position: 0,
            isVisible: true,
        },
        author: {
            position: 1,
            isVisible: true,
        },
        content: {
            type: 'richtext',
            position: 2,
            isVisible: {
                list: false, edit: true, filter: false, show: true,
            },
            custom: {
                modules: {
                    toolbar: [['bold', 'italic'], ['link', 'image']],
                },
            },
        },
        updatedAt: {
            isVisible: {
                list: true, edit: false, filter: true, show: true,
            },
        },
        views: {
            isVisible: {
                list: true, edit: false, filter: true, show: true,
            },
        },
        createdAt: {
            isVisible: {
                list: true, edit: false, filter: true, show: true,
            },
        }
    },
}

module.exports = {
    options,
    resource: Post,
};