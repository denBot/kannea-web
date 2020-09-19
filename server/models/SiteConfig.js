const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: true,
};

const configSchema = new Schema({
    _immutable: {
        type: Boolean,
        default: true,
        required: true,
        unique: true,
        immutable: true,
    },
    websiteName: {
        type: String,
        required: true,
        default: process.env.DEFAULT_WEBSITE_NAME
    },
    contactEmail: {
        type: String,
        required: true,
        default: process.env.DEFAULT_WEBSITE_CONTACT_EMAIL
    },
    faviconUrl: {
        type: String,
        required: true,
        default: process.env.DEFAULT_WEBSITE_FAVICON
    },
    logoUrl: {
        type: String,
        required: true,
        default: process.env.DEFAULT_WEBSITE_LOGO
    },
    closeComments: {
        type: Boolean,
        default: false,
        required: true
    },
}, schemaOptions);

const SiteConfig = model('SiteConfig', configSchema);

module.exports = SiteConfig;