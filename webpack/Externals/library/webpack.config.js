
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-library.js',
        library: {
            name: 'MyLibrary',
            type: 'umd'
        }
    },
    externals: {
        loadash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        },
        react: 'React'
    },
}