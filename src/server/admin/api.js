"use strict"
const SiteConfigModel = require("../models/SiteConfig")
const express = require("express")
const { isAuthenticatedAndAdmin } = require("./middleware")
let router = express.Router()

router
  .route("/settings")
  .get(isAuthenticatedAndAdmin, async (req, res) => {
    const settings = await SiteConfigModel.findOne().select(
      "-__v -createdAt -updatedAt -_immutable"
    )
    res.json(settings)
  })
  .put(isAuthenticatedAndAdmin, async (req, res) => {
    await SiteConfigModel.findOneAndUpdate(
      { _id: req.fields._id },
      req.fields,
      {
        returnOriginal: false,
      },
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
    await SiteConfigModel.remove({})
    const settings = new SiteConfigModel()
    settings.save()
    res.send(201, "Settings have been reset.")
  })

module.exports = router
