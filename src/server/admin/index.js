const AdminBro = require("admin-bro")
const AdminBroExpress = require("@admin-bro/express")
const AdminBroMongoose = require("@admin-bro/mongoose")
const mongoose = require("mongoose")
const argon2 = require("argon2")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

AdminBro.registerAdapter(AdminBroMongoose)

// Models
const UserModel = require("../models/User")
const SiteConfigModel = require("../models/SiteConfig")

// Admin Resources
const AuthUser = require("./resources/User.admin")
const Post = require("./resources/Post.admin")
const Comment = require("./resources/Comment.admin")
const SocialMedia = require("./resources/SocialMedia.admin")
const SiteConfig = require("./resources/SiteConfig.admin")

// Asynchronous export required due to DB Query: accessing Site Config document via mongoose

module.exports = (async function () {
  // Get site config from mongo DB and update AdminBro branding.
  var query = { _immutable: true },
    update = { updatedAt: new Date() },
    options = { upsert: true }

  const config = await SiteConfigModel.findOneAndUpdate(
    query,
    update,
    options,
    function (error, result) {
      if (!error && !result) {
        result = !result ? new SiteConfigModel({ _immutable: true }) : result
        result.save(function (error) {
          console.error(error)
        })
        console.log("Site Config doesnt exist, created new config.")
      }
    }
  )

  const adminBro = new AdminBro({
    databases: [mongoose],
    resources: [AuthUser, Post, Comment, SocialMedia, SiteConfig],
    branding: {
      softwareBrothers: false,
      companyName: config.websiteName,
      favicon: config.faviconUrl,
      logo: config.logoUrl,
    },
    rootPath: "/admin",
  })

  const router = AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
      cookieName: process.env.ADMINBRO_COOKIE_NAME,
      cookiePassword: process.env.ADMINBRO_COOKIE_PASSWORD,
      authenticate: async (email, password) => {
        const user = await UserModel.findOne({ email })
        return user && (await argon2.verify(user.encryptedPassword, password))
          ? user
          : null
      },
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }
  )

  return router
})()