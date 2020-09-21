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
  .post(async (req, res) => {
    console.log(req.fields)
    if (req.fields._id) {
      const settings = await SiteConfigModel.findOneAndUpdate(
        { _id: req.fields._id },
        req.fields
      )
      res.json(settings)
    } else {
      res.json({ code: 400, message: "No settings ID provided." })
    }
  })

module.exports = router
