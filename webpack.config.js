const webpack = require('webpack')

module.exports = {
  output: {
    filename: '[name]/index.js',
    libraryTarget: 'umd',
  },
  target: 'node',
  watch: process.env.WATCH_MODE,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
  mode: process.env.NODE_ENV || 'none',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}