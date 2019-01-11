"use strict";

const path = require("path");
const glob = require("glob");

const entry = glob.sync("./src/*.js").reduce((prev, current) => {
    return {
        ...prev,
        [path.basename(current).split(".js")[0]]: current
    }
}, {});

module.exports = {
  mode: "development",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },

  watch: true
};
