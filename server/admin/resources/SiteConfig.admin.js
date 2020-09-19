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
        createdAt: {
            isVisible: false,
        },
        updatedAt: {
            isVisible: {
                list: true,
            },
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
            isAccessible: true,
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