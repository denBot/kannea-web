const Post = require('../../../models/Post');

const PostResource = {
    resource: Post,
    options: {
        parent: {
            name: 'content',
            icon: 'Accessibility',
        }
    }
}

module.exports = PostResource;