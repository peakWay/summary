/**
 * 多入口文件
 */
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './main.js',
        vendor: ['react', 'react-dom'],
        app: {
            import: './app.js',
            filename: '[name].js',
            dependOn: 'vendor'
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist/multiple'),
    }
}