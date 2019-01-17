"use strict";

const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const browsers = [
  'last 2 versions',
  'ios_saf >= 8',
  'ie >= 11',
  'chrome >= 49',
  'firefox >= 49',
  '> 1%',
];

const entry = glob.sync("./src/*.js").reduce((prev, current) => {
  return {
    ...prev,
    [path.basename(current).split(".js")[0]]: current
  };
}, {});

const htmls = glob.sync("./src/*.js").map(f => {
  const name = path.basename(f).split(".js")[0];
  let teamplate = "./src/teamplate.html";
  if (name === "index") {
    teamplate = "./index.html"
  }
  return new HtmlWebpackPlugin({
    inject: true,
    chunks: [name],
    template: teamplate,
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
  watch: true,
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: path.resolve(__dirname, "node_modules"),
            use: {
              loader: "babel-loader",
              options: {
                presets: [[
                  "env", {targets: { browsers }, useBuiltIns: true}
                ],
                "es2015", "es2015-ie", "es2015-script"]
              }
            }
          }
    ]
  }
};
