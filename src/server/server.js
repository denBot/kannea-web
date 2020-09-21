"use strict"

require("dotenv").config()

const PORT = process.env.BACKEND_PORT || 5000
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./utils/database")
const path = require("path")
const SiteConfigModel = require("./models/SiteConfig")

// Initial Setup
connectDB()

// Development
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan")
  app.use(morgan("dev"))
}

// Rpites
app.use("/admin", require("./admin/index"))
app.use("/", express.static(path.join(__dirname, "../../dist")))
app.use("/static", express.static(path.join(__dirname, "static")))
app.use("/api/posts", require("./routes/api/posts"))

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json())
app.use(cors())

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

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
