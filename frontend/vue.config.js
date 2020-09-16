const path = require("path");
const vueSrc = "./src";

// vue.config.js
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, vueSrc)
            }
        }
    }
}