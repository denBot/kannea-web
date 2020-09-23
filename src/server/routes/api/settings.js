"use strict"
const SiteConfigModel = require("../../models/SiteConfig")
const express = require("express")
const { cloudinary } = require("../../utils/cloudinary")
const { isAuthenticatedAndAdmin } = require("./middleware")
const formidable = require("formidable")
let router = express.Router()

const uploadSettingsImage = async (uploadImage, uploadOptions) => {
  const uploadedResponse = await cloudinary.uploader.upload(
    uploadImage.path,
    uploadOptions
  )
  return uploadedResponse.secure_url
}

router
  .route("/")
  .get(isAuthenticatedAndAdmin, async (req, res) => {
    const settings = await SiteConfigModel.findOne().select(
      "-__v -createdAt -updatedAt -_immutable"
    )
    res.json(settings)
  })
  .post(isAuthenticatedAndAdmin, async (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
      let settings = JSON.parse(fields.settings)

      for (const fileType of Object.keys(files)) {
        switch (fileType) {
          case "headerFile":
            settings.headerUrl = await uploadSettingsImage(files[fileType], {
              public_id: `${process.env.CLOUDINARY_FOLDER}/static/${fileType}`,
            })
            break
          case "logoFile":
            settings.iconUrl = await uploadSettingsImage(files[fileType], {
              crop: "fill",
              width: 256,
              height: 256,
              public_id: `${process.env.CLOUDINARY_FOLDER}/static/${fileType}`,
            })
            break
          case "faviconFile":
            settings.faviconUrl = await uploadSettingsImage(files[fileType], {
              crop: "fill",
              width: 256,
              height: 256,
              public_id: `${process.env.CLOUDINARY_FOLDER}/settings/${fileType}`,
            })
            break
        }

        await SiteConfigModel.findOneAndUpdate(
          {
            _id: settings._id,
          },
          settings,
          {
            returnOriginal: false,
          },
          (err, settings) => {
            if (err) {
              res.status(400).send("Could not find settings with the given id")
            } else {
              res.json(settings)
            }
          }
        )
      }
    })
  })
  .delete(isAuthenticatedAndAdmin, async (req, res) => {
    await SiteConfigModel.deleteOne({})
    const settings = await SiteConfigModel.create({
      websiteName: process.env.DEFAULT_WEBSITE_NAME,
      contactEmail: process.env.DEFAULT_WEBSITE_CONTACT_EMAIL,
      websiteDescription: process.env.DEFAULT_WEBSITE_DESCRIPTION,
      faviconUrl: process.env.DEFAULT_WEBSITE_FAVICON,
      logoUrl: process.env.DEFAULT_WEBSITE_LOGO,
      headerUrl: process.env.DEFAULT_WEBSITE_HEADER,
    })
    res.json(settings)
  })

module.exports = router
