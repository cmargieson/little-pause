var HtmlWebpackPlugin = require("html-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/js/background.js",
    options: "./src/js/options.js",
    application: "./src/js/application.js",
  },

  output: {
    // Output files have the same name as entry files
    filename: "src/js/[name].js",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
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
    // Remove webpack assets that are not used anymore
    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
        { from: "manifest.json" },
        { from: "src/icons", to: "src/icons" },
      ],
    }),

    new HtmlWebpackPlugin({
      // The file to write the HTML to
      filename: "src/html/options.html",
      // Path to the template, includes root div
      template: "template.ejs",
      // Add only these chunks
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      filename: "src/html/little-pause.html",
      template: "template.ejs",
      chunks: ["application"],
    }),
  ],
};
