const { Schema, model } = require("mongoose")

const schemaOptions = {
  timestamps: true,
}

const configSchema = new Schema(
  {
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
    },
    contactEmail: {
      type: String,
      required: true,
    },
    websiteDescription: {
      type: String,
      required: true,
    },
    faviconUrl: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    headerUrl: {
      type: String,
      required: true,
    },
    closeComments: {
      type: Boolean,
      required: true,
      default: false,
    },
    showDescription: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  schemaOptions
)

const SiteConfig = model("SiteConfig", configSchema)

module.exports = SiteConfig
