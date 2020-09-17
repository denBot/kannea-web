const Post = require('../../models/Post');

module.exports = {
    resource: Post,
    options: {
        parent: {
            name: 'content',
            icon: 'Accessibility',
        }
    }
}