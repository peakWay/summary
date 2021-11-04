
/**
 * 正常是使用comminJs编写没有问题
 */

// const path = require('path');
// module.exports = {
//     mode: 'production',
//     entry: './index.js',
//     output: {
//         path: path.resolve(__dirname, './dist')
//     }
// }

/**
 * 1.tsconfig.json不设置allowSyntheticDefaultImports会找不到类型报红
 * 2.运行时tsconfig.json中的module配置要为commonjs，否则会报错，因为 ts-node 不支持 commonjs 以外的其他模块规范
 * 解决方案：
 * (1)target: 'ES5'会默认设置module为commonjs
 * (2)修改 tsconfig.json 并且添加 ts-node 的设置
 * (3)使用 tsconfig-paths为 webpack 配置创建一个单独的 TypeScript 配置文件(该例子为tsconfig-for-webpack-config.json)
 * 注：方案2和3运行不会报错，但是webpack会标红，ts校验过不去
 */

import * as path from 'path';
import * as webpack from 'webpack';
 
const config: webpack.Configuration = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
};
   
export default config;
