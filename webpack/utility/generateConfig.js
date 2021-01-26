const webpack = require("webpack");
const path = require("path");

function generateAppConfig(env) {
  const appConfig =
    String(env).toLowerCase() === "dev"
      ? require(path.resolve("./src/Config/app.dev.json"))
      : require(path.resolve("./src/Config/app.prod.json"));

  return new webpack.DefinePlugin({
    CONFIG: JSON.stringify(appConfig),
  });
}

module.exports = {
  generateAppConfig,
};
