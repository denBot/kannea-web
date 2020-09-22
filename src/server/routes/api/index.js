"use strict"
const express = require("express")

let router = express.Router()

router.use("/posts", require("./posts"))
router.use("/settings", require("./settings"))

module.exports = router
