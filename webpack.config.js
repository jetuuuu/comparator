"use strict";

const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        dx: "./src/dx.js",
        highcharts: "./src/highcharts.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    watch: true
}