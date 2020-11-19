const { merge } = require('webpack-merge');
const config = require('./webpack.common');

/** @type {import('webpack').Configuration */
const buildConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
};

module.exports = merge(config, buildConfig);
