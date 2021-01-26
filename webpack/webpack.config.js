const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = ({ env }) => {
  const envConfig = require(`./environments/webpack.${env}.js`);

  return merge(commonConfig(env), envConfig);
};
