"use strict";

const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['dx'],
      filename: 'dx.html'
    }),
  ],
  watch: true
};
