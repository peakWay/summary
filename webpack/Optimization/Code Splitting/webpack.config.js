
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './entrys/index',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,         //[\\/]兼容window和linux路径
                    name: 'vendor',
                    chunks: 'all',
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ]
    
}