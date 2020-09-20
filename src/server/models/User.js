const { Schema, model } = require("mongoose")

const schemaOptions = {
  timestamps: true,
}

const userSchema = new Schema(
  {
    title: {
      type: String,
      requried: true,
      min: process.env.USER_MIN_TITLE_CHARS,
      max: process.env.USER_MAX_TITLE_CHARS,
    },
    avatarUrl: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: process.env.USER_MAX_EMAIL_CHARS,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  schemaOptions
)

const User = model("Users", userSchema)

module.exports = User
