const { merge } = require('webpack-merge');
const config = require('./webpack.common');

/** @type {import('webpack-dev-server').Configuration} */
const devServer = {
  host: '0.0.0.0',
  port: '8888',
  open: true,
  hot: true,
  inline: true,
};

/** @type {import('webpack').Configuration */
const devConfig = {
  mode: 'development',
  devServer,
};

module.exports = merge(config, devConfig);
