const { Schema, model } = require('mongoose');

const socialMediaSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

const socialMedia = model('Social Media', socialMediaSchema);

module.exports = socialMedia;