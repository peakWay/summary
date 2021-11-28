
const path = require('path');

module.exports =  {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': [
                '/public',
                '/src'
            ]
        },
        //限制解析路径
        // restrictions: [/\.(js|jpeg)$/],
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.jpeg/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 8192
                    },
                },
            }
        ]
    }
}