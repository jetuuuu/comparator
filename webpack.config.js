"use strict";

const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        dx: "./src/dx.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    }
}