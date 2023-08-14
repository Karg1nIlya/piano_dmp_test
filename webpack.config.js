const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ['@babel/polyfill', './src/index.ts'],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", '.tsx', '.ts'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
