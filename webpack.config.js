const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // || "production"
  devtool: "inline-source-map",
  entry: {
    background: path.resolve(__dirname, "src", "background.js"),
    App: path.resolve(__dirname, "src", "App.js"),
    Options: path.resolve(__dirname, "src", "Options.js"),
  },
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "manifest.json"),
        },
        {
          from: path.resolve(__dirname, "src", "icons"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "app.html",
      chunks: ["App"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      chunks: ["Options"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
