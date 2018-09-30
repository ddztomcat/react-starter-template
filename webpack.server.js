const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const nodemon = require('nodemon');
const devMode = process.env.NODE_ENV !== "production";
let running = false;

let plugs = [
  new CleanWebpackPlugin(["dist"], {
    exclude: ["public"]
  })
];
if (devMode) {
  plugs = plugs.concat([
    new EventHooksPlugin({
      done: () => {
        if (!running) {
          running = true;
          process.chdir(path.join(__dirname, "./dist"));
          console.log("nodemon start...");
          nodemon({
            script: "server.js",
            delay: 2 * 1000,
            // ignore: ["public/*", "logs/*"]
          });
        }
      }
    })
  ]);
}

let config = merge(common, {
  target: "node",
  devtool: devMode ? "inline-source-map" : false,
  entry: {
    app: ["babel-polyfill", "./src/server.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "",
    filename: "server.js",
    chunkFilename: "[name].bundle.js"
  },
  plugins: plugs
});
config.optimization = {}
module.exports = config