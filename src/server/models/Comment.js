const { Schema, model } = require("mongoose")

const schemaOptions = {
  timestamps: true,
}

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: process.env.USER_MIN_TITLE_CHARS,
      max: process.env.USER_MAX_TITLE_CHARS,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: process.env.USER_MAX_EMAIL_CHARS,
    },
    content: {
      type: String,
      required: true,
      min: 6,
      max: process.env.COMMENT_MAX_CONTENT_CHARS,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  },
  schemaOptions
)

const Comment = model("Comments", commentSchema)

module.exports = Comment
