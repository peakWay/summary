
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const TerserPlugin = require('terser-webpack-plugin');

console.log(process.env.NODE_ENV, 'NODE_ENV')


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'build.js'
    },
    plugins: [
        // webpack5自带压缩
        // new TerserPlugin({
        //     terserOptions: {
        //         compress: true
        //     }
        // })
    ]
});