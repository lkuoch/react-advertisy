const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            toplevel: true,
          },
        },
      }),
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
    ],
    moduleIds: "deterministic",
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        common: {
          name: "core",
          test: /[\\/]src[\\/]/,
          chunks: "all",
          minSize: 0,
        },
        vendor: {
          name: "vend",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          minSize: 0,
        },
      },
    },
  },
};
