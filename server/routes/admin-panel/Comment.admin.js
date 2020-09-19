const Comment = require('../../models/Comment');

/** @type {AdminBro.ResourceOptions} */
const options = {
    parent: {
        name: 'Website Content',
        icon: 'Accessibility',
    },
};

module.exports = {
    options,
    resource: Comment,
};