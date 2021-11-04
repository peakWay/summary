
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        library: {
            name: 'myLibrary',
            type: 'var',
            export: 'default'
        },
    }
}