const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const projectConfig = require("./project-config.js");
const configBrowser = require("./webpack.browser.js");
const merge = require("webpack-merge");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const path = require("path");

const options = {
  // contentBase: path.join(__dirname, 'dist/'),
  compress: true,
  hot: true,
  host: "localhost",
  open: true,
  // 配合服务端渲染开发
  historyApiFallback: {
    disableDotRule: true
  }
};
const config = merge(configBrowser, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${projectConfig.PORT}` })
  ]
});
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(projectConfig.PORT, "localhost", () => {
  console.log(
    "dev server listening on  " + `http://localhost:${projectConfig.PORT}`
  );
});
