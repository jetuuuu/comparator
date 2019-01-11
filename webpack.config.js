"use strict";

const path = require("path");
const glob = require("glob");

module.exports = {
  mode: "development",
  entry: glob.sync("./src/*.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },

  watch: true
};
