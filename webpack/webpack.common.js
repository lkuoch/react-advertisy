const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

// Config
const tsConfigFile = path.resolve("./tsconfig.json");

// App variables
const appVars = require("./app.json");

module.exports = {
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
          {
            loader: "ts-loader",
            options: {
              configFile: tsConfigFile,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|webpack)/,
        use: {
          loader: "babel-loader",
        },
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: appVars.app.title,
      favicon: path.resolve("./src/Assets/favicon.ico"),
      template: path.resolve("./src/index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[fullhash:8].js",
    sourceMapFilename: "[name].map",
    chunkFilename: "[id].[chunkhash].js",
  },
  optimization: {
    usedExports: true,
  },
};
