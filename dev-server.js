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
  host: "0.0.0.0",
  open: true,
  proxy: projectConfig.proxy ? projectConfig.proxy : undefined,
  // 配合服务端渲染开发
  historyApiFallback: {
    disableDotRule: true
  },
  disableHostCheck: true // 不检查host
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

server.listen(projectConfig.PORT, "0.0.0.0", () => {
  console.log(
    "dev server listening on  " + `http://localhost:${projectConfig.PORT}`
  );
});
