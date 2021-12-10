
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        client: {
            // allowedHosts: 'all',  //'auto', 'all', [string]  一般开发时候用，不需要白名单，实际作用也不大
            // progress: true     //在浏览器显示进度  //实际作用不大
        },
        // headers: {
        //     'X-Custom-Foo': 'bar',
        // },        //所有资源请求响应添加headers  //实用作用不大
        // historyApiFallback: {
        //     rewrites: [
        //       { from: /./, to: './404.html' },
        //     ],
        // },       //处理404页面的路由
        // open: true    //提供快捷打开浏览器方式
        // port: 8080    //指定端口
        static: {
            directory: path.join(__dirname, 'assets')
        }     //开发时候就不需要把静态文件打包了，加快每次构建速度，默认为public文件
    }
}