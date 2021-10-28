
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'dev.js'
    },
    // webpack4
    // devtool: 'cheap-eval-module-source-map'

    // webpack5
    // devtool: 'eval-cheap-module-source-map'
});