"use strict"
const SiteConfigModel = require("../../models/SiteConfig")
const express = require("express")
const { cloudinary, getCloudinaryOptions } = require("../../utils/cloudinary")
const { getDefaultSettings } = require("../../utils/utilities")
const { isAuthenticatedAndAdmin } = require("./middleware")
const formidable = require("formidable")
let router = express.Router()

router
  .route("/")
  .get(isAuthenticatedAndAdmin, async (req, res) => {
    // return settings if user is an authenticated admin, filter out unecessary fields
    const settings = await SiteConfigModel.findOne().select(
      "-__v -createdAt -updatedAt -_immutable"
    )
    res.json(settings)
  })
  .post(isAuthenticatedAndAdmin, async (req, res) => {
    new formidable.IncomingForm().parse(req, async (err, fields, files) => {
      let imageFields = JSON.parse(fields.imageFields)
      let textFields = JSON.parse(fields.textFields)
      let checkboxFields = JSON.parse(fields.checkboxFields)

      // Iterate through files and process each file depending on the field type
      for (const fileUploadKey of Object.keys(files)) {
        // __ used as delimiter here in key for formData file, e.g. imageFields__websiteLogo
        const [settingCategory, settingField] = fileUploadKey.split("__")

        try {
          switch (settingCategory) {
            case "imageFields":
              imageFields[settingField].url = await cloudinary.uploader.upload(
                files[fileUploadKey].path,
                getCloudinaryOptions(settingField)
              ).secure_url
              break

            case "fileFields":
              console.log("fileFields upload: TODO")
              break
          }
        } catch (err) {
          console.error(err)
          return res
            .status(400)
            .send(
              `Failed to upload/process file for setting: ${settingCategory} -> ${settingField}`
            )
        }
      }

      const select = { _id: fields.settingsId }
      const update = { imageFields, textFields, checkboxFields }
      const options = { returnOriginal: false }

      // Update settings and respond with newly updated settings (including image/file upload URLs)
      await SiteConfigModel.findOneAndUpdate(
        select,
        update,
        options,
        (err, settings) => {
          if (err) {
            res.status(400).send("Could not find settings with the given id")
          } else {
            res.json(settings)
          }
        }
      )
    })
  })
  .delete(isAuthenticatedAndAdmin, async (req, res) => {
    // SiteConfig only has one row, get it, delete it and create a new row using default values
    await SiteConfigModel.deleteOne({})
    const settings = await SiteConfigModel.create(getDefaultSettings())
    res.json(settings)
  })

module.exports = router
