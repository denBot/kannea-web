const SiteConfigModel = require("../models/SiteConfig")
const mongoose = require("mongoose")

const Utilities = {
  connectDB: async () => {
    const dbName = process.env.DB_NAME
    const dbUser = process.env.DB_USER
    const dbPass = process.env.DB_PASS
    const dbAddr = process.env.DB_ADDR
    const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbAddr}/${dbName}?retryWrites=true&w=majority`

    try {
      await mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      console.log(`MongoDB Connected: ${dbUser}@${dbAddr}/${dbName}`)
    } catch (err) {
      console.error("Failed to connect to MongoDB Server", err)
      process.exit(1)
    }
  },

  checkSiteConfig: async () => {
    await SiteConfigModel.findOneAndUpdate(
      { _immutable: true },
      { updatedAt: new Date() },
      { upsert: true },
      function (error, result) {
        if (!error && !result) {
          result = !result
            ? new SiteConfigModel({
                _immutable: true,
              })
            : result
          result.save(function (error) {
            console.error(error)
          })
          console.log("Site Config doesnt exist, created new config.")
        }
      }
    )
  },

  truncateString: (input, maxLength) => {
    if (input.length > 5) {
      return input.substring(0, maxLength) + "..."
    }
    return input
  },
}

module.exports = Utilities
