const webpack = require('webpack')
const path = require('path')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  entry: [
    './src/main/js/index.tsx'
  ],
  output: {
    filename: 'gwentTools.js',
    publicPath: 'js',
    path: path.resolve(__dirname, './dist/js')
  },
  resolve: {
    alias: { '@src': path.resolve('src/main/js') },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['src/main/js', 'node_modules'],
  },
  module: {
    rules:
      [
        { test: /\.tsx?$/, loaders: ['babel-loader', 'awesome-typescript-loader'], include: path.resolve('src/main/js') },
        {
          test: /\.less$/,
          use: [
            { loader: "style-loader" }, // creates style nodes from JS strings
            { loader: "css-loader" }, // translates CSS into CommonJS
            { loader: "less-loader" }, // compiles Less to CSS
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { url: false } }
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|json|xml|ico)$/,
          loader: 'file-loader',
          options: {
            name: './../gwentAssets/[name].[ext]'
          }
        }

      ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ]
}
