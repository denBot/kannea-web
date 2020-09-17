const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');
const mv = require('mv');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
    const { record, uploadImage } = context;

    if (record.isValid() && uploadImage) {
        const destination = path.join('server/media/avatars', record.id().toString(), uploadImage.name);
        const avatarLocation = path.join('media/avatars', record.id().toString(), uploadImage.name);
        await fs.promises.mkdir(path.dirname(destination), { recursive: true });

        mv(uploadImage.path, destination, function (err) {
            if (err) {
                console.error('File upload failed:', err);
                throw err;
            }
        });

        await record.update({ avatarLocation });
    }
    return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
    if (request.method === 'post') {
        const { uploadImage, ...otherParams } = request.payload;

        // eslint-disable-next-line no-param-reassign
        context.uploadImage = uploadImage;

        return {
            ...request,
            payload: otherParams,
        };
    }
    return request;
};

module.exports = { after, before };