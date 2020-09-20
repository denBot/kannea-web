"use strict"

require("dotenv").config()

const PORT = process.env.BACKEND_PORT || 5000
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./utils/database")
const path = require("path");

// Initial Setup
connectDB()

// Development
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan")
  app.use(morgan("dev"))
}

// Routes
;(async function () {
  app.use("/", express.static(path.join(__dirname, "../../dist")))
  app.use("/static", express.static("server/static"))
  app.use("/api/posts", require("./routes/api/posts"))
  app.use("/admin", await require("./admin/index"))
})()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
