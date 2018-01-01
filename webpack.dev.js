const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval',
  // devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'src/main/resources/static/'),
    stats: {
      modules: false,
      chunks: false,
      children: false,
      chunkModules: false,
      hash: false,
    },
  },
}
); 
