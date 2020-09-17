const Comment = require('../../models/Comment');

module.exports = {
    resource: Comment,
    options: {
        parent: {
            name: 'content',
            icon: 'Accessibility',
        }
    }
}