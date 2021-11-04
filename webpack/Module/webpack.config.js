
/**
 * 使用LiveSever打开编译后的html文件
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        // publicPath: 'assets',
        path: path.resolve(__dirname, 'dist/assets'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 8192
                    },
                },
                generator: {
                    publicPath: 'assets/',
                },
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: './index.html',
        })
    ]
}