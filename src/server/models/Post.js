const { truncateString } = require("../utils/utilities")
const { JSDOM } = require("jsdom")
const { Schema, model } = require("mongoose")

const maxContentChars = process.env.POST_MAX_CONTENT_CHARS
const maxTitleChars = process.env.POST_MAX_TITLE_CHARS
const maxDescriptionChars = process.env.POST_MAX_DESCRIPTION_CHARS

const schemaOptions = {
  timestamps: true,
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 6,
      max: maxTitleChars,
    },
    content: {
      type: String,
      required: true,
      min: 6,
      max: maxContentChars,
    },
    description: {
      type: String,
      min: 6,
      max: maxDescriptionChars,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
)

/**
 * When a new post is created / updated,
 * truncate post content and use as description if no description
 * if no description is provided, else check if new description is
 * longer than max description length and truncate it
 */
const truncateDescription = (model) => {
  if (!model.description || 0 === model.description.length) {
    return truncateString(
      JSDOM.fragment(model.content).textContent,
      maxDescriptionChars - 3
    )
  } else if (model.description.length > maxDescriptionChars) {
    return truncateString(
      JSDOM.fragment(model.description).textContent,
      maxDescriptionChars - 3
    )
  }
  return model.description
}

postSchema.pre("save", function (next) {
  this.description = truncateDescription(this)
  next()
})

postSchema.pre("findOneAndUpdate", async function (next) {
  this._update["$set"].description = truncateDescription(this._update["$set"])
  next()
})

const Post = model("Posts", postSchema)

module.exports = Post
