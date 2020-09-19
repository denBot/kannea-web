const { Schema, model } = require('mongoose');

const schemaOptions = {
    collection: 'Site Config'
};

const configSchema = new Schema({
    _immutable: {
        type: Boolean,
        default: true,
        required: true,
        unique: true,
        immutable: true,
    },
    contactEmail: {
        type: String,
        required: true
    },
    closeComments: {
        type: Boolean,
        default: false,
        required: true
    }
}, schemaOptions);

const SiteConfig = model('Site Config', configSchema);

module.exports = SiteConfig;