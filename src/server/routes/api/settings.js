"use strict"
const SiteConfigModel = require("../../models/SiteConfig")
const express = require("express")
const { isAuthenticatedAndAdmin } = require("./middleware")
let router = express.Router()

router
  .route("/")
  .get(isAuthenticatedAndAdmin, async (req, res) => {
    const settings = await SiteConfigModel.findOne().select(
      "-__v -createdAt -updatedAt -_immutable"
    )
    res.json(settings)
  })
  .put(isAuthenticatedAndAdmin, async (req, res) => {
    const settings = req.body
    await SiteConfigModel.findOneAndUpdate(
      { _id: settings._id },
      settings,
      { returnOriginal: false },
      (err) => {
        if (err) {
          res.send(400, "Could not find settings with the given id")
        } else {
          res.send("Settings have been updated.")
        }
      }
    )
  })
  .delete(isAuthenticatedAndAdmin, async (req, res) => {
    await SiteConfigModel.deleteOne({})
    const settings = new SiteConfigModel({
      websiteName: process.env.DEFAULT_WEBSITE_NAME,
      contactEmail: process.env.DEFAULT_WEBSITE_CONTACT_EMAIL,
      websiteDescription: process.env.DEFAULT_WEBSITE_DESCRIPTION,
      faviconUrl: process.env.DEFAULT_WEBSITE_FAVICON,
      logoUrl: process.env.DEFAULT_WEBSITE_LOGO,
      headerUrl: process.env.DEFAULT_WEBSITE_HEADER,
    })
    console.log(settings)
    settings.save()
    res.json(settings)
  })

module.exports = router
