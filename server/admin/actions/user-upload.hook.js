const { cloudinary } = require('../../utils/cloudinary');
const AdminBro = require('admin-bro');
const isImageUrl = require('is-image-url');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
    const { record, uploadImage } = context;

    if (record.isValid() && uploadImage) {
        try {
            const uploadedResponse = await cloudinary.uploader.upload(uploadImage.path, {
                crop: 'fill',
                width: 200,
                height: 200,
                public_id: `${process.env.CLOUDINARY_FOLDER}/avatars/${record.params['_id']}`
            });
            await record.update({ avatarUrl: uploadedResponse.secure_url });
        } catch (err) {
            console.error(err);
            throw err();
        }
}
    return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
    if (request.method === 'post') {

        const { uploadImage, avatarUrl, ...otherParams } = request.payload;

        if (context.record && context.record.isValid()) {
            if (!avatarUrl && !uploadImage) {
                // If no URL or upload image is provided, get the default avatar from dicebear
                await context.record.update({
                    avatarUrl: `https://avatars.dicebear.com/api/identicon/${context.record.params['_id']}.svg`
                });
            } else if (avatarUrl && !uploadImage && isImageUrl(avatarUrl)) {
                // If new URL but no upload image is provided, set avatar to URL
                await context.record.update({ avatarUrl });
            }
        }

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