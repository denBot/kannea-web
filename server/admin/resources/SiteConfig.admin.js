const SiteConfig = require('../../models/SiteConfig');
const { isAdmin } = require('../permissions');

/** @type {AdminBro.ResourceOptions} */
const options = {
    parent: {
        name: 'Configuration',
        icon: 'Accessibility',
    },
    properties: {
        _id: {
            isVisible: false,
        },
        _immutable: {
            isVisible: false,
        },
    },
    actions: {
        new: {
            isAccessible: isAdmin,
        },
        edit: {
            isAccessible: isAdmin,
        },
        list: {
            isAccessible: isAdmin,
        },
        show: {
            isAccessible: false,
        },
        delete: {
            isAccessible: false,
        },
        bulkDelete: {
            isAccessible: false,
        }
    },
};

module.exports = {
    options,
    resource: SiteConfig,
};