const mongoose = require("mongoose")
const AdminBro = require("admin-bro")
const AdminBroMongoose = require("@admin-bro/mongoose")

AdminBro.registerAdapter(AdminBroMongoose)

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
  pages: {
    settings: {
      label: "Settings",
      component: AdminBro.bundle("./components/pages/settings.page.tsx"),
    },
  },
})

module.exports = adminBro
