const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "hidden-source-map" : "eval",
  entry: "./src/index.tsx",
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: __dirname + '/dist',
    filename: "bundle.[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ],
  devServer: {
    host: "localhost",
    port: port,
    open: true,
    historyApiFallback: true,
    hot: true
  }
};