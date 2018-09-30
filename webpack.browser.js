const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
const {PATHS} = require('./project-config');

const devMode = process.env.NODE_ENV !== "production";

let plugs = [
  new HtmlWebpackPlugin({
    title: "react 全家桶",
    template: "src/index.html"
  })
];
if (!devMode) {
  plugs = plugs.concat([
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
        uglifyOptions: {
            compress: {
                drop_console: true // 是否删除代码中所有的console
            }
        }
    }),
    new OptimizeCSSAssetsPlugin({}),
    // new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': JSON.stringify('production')
    // }),
  ]);
}

module.exports = merge(common, {
  devtool: devMode ? "inline-source-map" : false,
  entry: {
    app: ["babel-polyfill", PATHS.index]
  },
  output: {
    path: path.resolve(__dirname, PATHS.output),
    publicPath: PATHS.publicPath,
    filename: devMode ? "[name].js" : "[name].[chunkhash].js",
    chunkFilename: devMode ? "[name].bundle.js" : "[name].[chunkhash].js"
  },
  plugins: plugs
});
