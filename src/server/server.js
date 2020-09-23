"use strict"
const bodyParser = require("body-parser")
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
app.use(cors())
app.use(require("./routes"))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
)

// Connect to DB and check/construct SiteConfig if not present
connectDB()
checkSiteConfig()

// Initialise server to listen on port defined in .env
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`server running on port ${process.env.BACKEND_PORT}`)
})
