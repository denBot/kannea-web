"use strict"

require("dotenv").config()

const PORT = process.env.BACKEND_PORT || 5000
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./utils/database")
const SiteConfigModel = require("./models/SiteConfig")

// Development
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"))
}

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json())
app.use(cors())
app.use(require("./routes"))


// Construct SiteConfig if not present in DB
;(async function () {
  await SiteConfigModel.findOneAndUpdate(
    { _immutable: true },
    { updatedAt: new Date() },
    { upsert: true },
    function (error, result) {
      if (!error && !result) {
        result = !result ? new SiteConfigModel({ _immutable: true }) : result
        result.save(function (error) {
          console.error(error)
        })
        console.log("Site Config doesnt exist, created new config.")
      }
    }
  )
})()

connectDB()

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
