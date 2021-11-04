/**
 * 单入口文件
 */
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/single')
    }
}