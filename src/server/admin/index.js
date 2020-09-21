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

// Admin Resources
const AuthUser = require("./resources/User.admin")
const Post = require("./resources/Post.admin")
const Comment = require("./resources/Comment.admin")
const SocialMedia = require("./resources/SocialMedia.admin")
const SiteConfig = require("./resources/SiteConfig.admin")

// Asynchronous export required due to DB Query: accessing Site Config document via mongoose

const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [AuthUser, Post, Comment, SocialMedia, SiteConfig],
  branding: {
    softwareBrothers: false,
    companyName: process.env.DEFAULT_WEBSITE_NAME,
    favicon: process.env.DEFAULT_WEBSITE_FAVICON,
    logo: process.env.DEFAULT_WEBSITE_LOGO,
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

router.use("/api/", require("./api"))

module.exports = router
