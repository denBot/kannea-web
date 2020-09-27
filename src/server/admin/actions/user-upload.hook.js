// eslint-disable-next-line no-unused-vars
const AdminBro = require("admin-bro")
const { cloudinary } = require("../../utils/cloudinary")
const isImageUrl = require("is-image-url")

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, avatar } = context

  if (record.isValid() && avatar) {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(avatar.path, {
        crop: "fill",
        width: 200,
        height: 200,
        gravity: "faces",
        public_id: `${process.env.CLOUDINARY_FOLDER}/avatars/${record.params["_id"]}`,
      })
      await record.update({ avatarUrl: uploadedResponse.secure_url })
    } catch (err) {
      console.error(err)
      throw err()
    }
  }
  return response
}

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === "post") {
    console.log(request.payload)
    const { avatar, avatarUrl, ...otherParams } = request.payload

    if (context.record && context.record.isValid()) {
      if (!avatarUrl && !avatar) {
        // If no URL or upload image is provided, get the default avatar from dicebear
        await context.record.update({
          avatarUrl: `https://avatars.dicebear.com/api/${process.env.DICEBEAR_DEFAULT_AVATAR_TYPE}/${context.record.params["_id"]}.svg`,
        })
      } else if (avatarUrl && !avatar && isImageUrl(avatarUrl)) {
        // If new URL but no upload image is provided, set avatar to URL
        await context.record.update({ avatarUrl })
      }
    }

    // eslint-disable-next-line no-param-reassign
    context.avatar = avatar

    return {
      ...request,
      payload: otherParams,
    }
  }
  return request
}

module.exports = { after, before }
