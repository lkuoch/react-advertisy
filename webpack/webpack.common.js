const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { generateAppConfig } = require("./utility/generateConfig");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const WorkerPlugin = require("worker-plugin");
const path = require("path");

// App variables
const buildConfig = require("./app.json");

module.exports = (env) => ({
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".css"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    port: 3000,
    https: true,
    clientLogLevel: "silent",
    contentBase: "./dist",
    hot: true,
    stats: "errors-warnings",
  },
  plugins: [
    generateAppConfig(env),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: buildConfig.app.title,
      favicon: path.resolve("./src/Assets/favicon.ico"),
      template: path.resolve("./src/index.html"),
    }),
    new CompressionPlugin(),
    new WorkerPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[fullhash:8].js",
    publicPath: "/",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id].[chunkhash].js",
  },
});
