"use strict";

const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entry = glob.sync("./src/*.js").reduce((prev, current) => {
  return {
    ...prev,
    [path.basename(current).split(".js")[0]]: current
  };
}, {});

const htmls = glob.sync("./src/*.js").map(f => {
  const name = path.basename(f).split(".js")[0];
  return new HtmlWebpackPlugin({
    inject: true,
    chunks: [name],
    template: "./src/teamplate.html",
    filename: `${name}.html`
  });
});

module.exports = {
  mode: "development",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  plugins: htmls,
  watch: true
};
