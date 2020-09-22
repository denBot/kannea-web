"use strict"
const express = require("express")
const cors = require("cors")
const app = express()
const { connectDB, checkSiteConfig } = require("./utils/utilities")

require("dotenv").config()

// Development
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"))
}

// Initial setup
app.use(require("./routes"))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json())
app.use(cors())

// Connect to DB and check/construct SiteConfig if not present
connectDB()
checkSiteConfig()

// Initialise server to listen on port defined in .env
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`server running on port ${process.env.BACKEND_PORT}`)
})
