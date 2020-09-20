const { Schema, model } = require("mongoose")

const socialMediaSchema = new Schema({
  type: {
    type: String,
    enum: [
      "discord",
      "email",
      "facebook",
      "google-plus",
      "instagram",
      "pinterest",
      "snapchat",
      "tumblr",
      "twitter",
      "youtube",
    ],
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
})

const socialMedia = model("SocialMedia", socialMediaSchema)

module.exports = socialMedia
