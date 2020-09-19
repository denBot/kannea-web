const SocialMedia = require('../../models/SocialMedia');

/** @type {AdminBro.ResourceOptions} */
const options = {
    parent: {
        name: 'Configuration',
        icon: 'Accessibility',
    },
};

module.exports = {
    options,
    resource: SocialMedia,
};