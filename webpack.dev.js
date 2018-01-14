const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'eval',
  // devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'dist/'),
    stats: {
      modules: false,
      chunks: false,
      children: false,
      chunkModules: false,
      hash: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
}
); 
