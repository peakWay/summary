
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        var: {
            import: './index.js',
            library: {
                name: 'varLibrary',
                type: 'var'
            },
        },
        assign: {
            import: './index.js',
            library: {
                name: 'assignLibrary',
                type: 'assign'
            },
        },
        this: {
            import: './index.js',
            library: {
                name: 'thisLibrary',
                type: 'this'
            },
        },
        global: {
            import: './index.js',
            library: {
                name: 'globalLibrary',
                type: 'global'
            },
        },
        commonjs: {
            import: './index.js',
            library: {
                name: 'commonjsLibrary',
                type: 'commonjs'
            },
        },
        amd: {
            import: './index.js',
            library: {
                name: 'amdLibrary',
                type: 'amd'
            },
        },
        umd: {
            import: './index.js',
            library: {
                name: 'umdLibrary',
                type: 'umd'
            },
        },
        system: {
            import: './index.js',
            library: {
                name: 'systemLibrary',
                type: 'system'
            },
        }
    },
    output: {
        path: path.resolve(__dirname, 'library')
    }
}