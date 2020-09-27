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

    textFields: {
      websiteName: {
        value: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "Enter a name for your website:",
        },
        fieldType: {
          type: String,
          default: "textfield",
        },
      },
      contactEmail: {
        value: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "Enter a valid contact email address:",
        },
        fieldType: {
          type: String,
          default: "emailfield",
        },
      },
      websiteDescription: {
        value: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "Enter a name for your website:",
        },
        fieldType: {
          type: String,
          default: "textarea",
        },
      },
    },

    imageFields: {
      homepageBanner: {
        url: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "Upload a header image for the homepage",
        },
        mimeTypes: {
          type: Array,
          default: ["image/jpeg", "image/png"],
        },
        previewType: {
          type: String,
          default: "banner",
        },
      },
      websiteFavicon: {
        url: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "Upload a Favicon for the website",
        },
        mimeTypes: {
          type: Array,
          default: ["image/x-icon", "image/png"],
        },
        previewType: {
          type: String,
          default: "small",
        },
      },
      websiteLogo: {
        url: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "Upload a logo for the website NavBar",
        },
        mimeTypes: {
          type: Array,
          default: ["image/jpeg", "image/png", "image/svg+xml"],
        },
        previewType: {
          type: String,
          default: "small",
        },
      },
    },

    checkboxFields: {
      disableComments: {
        value: {
          type: Boolean,
          required: true,
          default: false,
        },
        description: {
          type: String,
          default: "Disable commenting on all posts.",
        },
      },
      hideComments: {
        value: {
          type: Boolean,
          required: true,
          default: false,
        },
        description: {
          type: String,
          default: "Hide comments section on all posts.",
        },
      },
      hideSocialMedia: {
        value: {
          type: Boolean,
          required: true,
          default: false,
        },
        description: {
          type: String,
          default: "Hide social media icons from appearing on the website.",
        },
      },
      removeWebsiteDescription: {
        value: {
          type: Boolean,
          required: true,
          default: false,
        },
        description: {
          type: String,
          default: "Remove the website description from the homepage.",
        },
      },
    },
  },
  schemaOptions
)

const SiteConfig = model("SiteConfig", configSchema)

module.exports = SiteConfig
