const { Schema, model } = require("mongoose")

const schemaOptions = {
  timestamps: true,
}

const userSchema = new Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    avatarUrl: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
