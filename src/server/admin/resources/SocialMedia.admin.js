const SocialMedia = require("../../models/SocialMedia")

/** @type {AdminBro.ResourceOptions} */
const options = {
  parent: {
    name: "Configuration",
    icon: "Accessibility",
  },
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
