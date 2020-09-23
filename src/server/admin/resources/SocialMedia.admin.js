const SocialMedia = require("../../models/SocialMedia")

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    _id: {
      isVisible: false,
    },
  },
}

module.exports = {
  options,
  resource: SocialMedia,
}
