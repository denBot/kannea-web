const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const getCloudinaryOptions = (imageType) => {
  switch (imageType) {
    case "websiteFavicon":
      return {
        crop: "fill",
        width: 256,
        height: 256,
        public_id: `${process.env.CLOUDINARY_FOLDER}/static/${imageType}`,
      }
    case "websiteLogo":
      return {
        crop: "fill",
        height: 250,
        public_id: `${process.env.CLOUDINARY_FOLDER}/static/${imageType}`,
      }
    default:
      return {
        public_id: `${process.env.CLOUDINARY_FOLDER}/static/${imageType}`,
      }
  }
}

module.exports = { cloudinary, getCloudinaryOptions }
