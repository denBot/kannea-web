"use strict"
const express = require("express")
const adminBro = require("../admin")
const argon2 = require("argon2")
const path = require("path")
const session = require("express-session")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")(session)
const AdminBroExpress = require("@admin-bro/express")

//const { isAuthenticatedAndAdmin } = require("./middleware")

const UserModel = require("../models/User")

let router = express.Router()

const sessionOptions = {
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    cookieName: process.env.ADMINBRO_COOKIE_NAME,
    cookiePassword: process.env.ADMINBRO_COOKIE_PASSWORD,
    authenticate: async (email, password) => {
      const user = await UserModel.findOne({
        email,
      })
      return user && (await argon2.verify(user.encryptedPassword, password))
        ? user
        : null
    },
  },
  null,
  sessionOptions
)

router.use("/admin", adminRouter)
router.use(
  session({
    ...sessionOptions,
    secret: process.env.ADMINBRO_COOKIE_PASSWORD,
    name: process.env.ADMINBRO_COOKIE_NAME,
  })
)
router.use("/", express.static(path.join(__dirname, "../../../dist")))
router.use("/static", express.static(path.join(__dirname, "static")))
router.use("/api/posts", require("./api/posts"))

module.exports = router
