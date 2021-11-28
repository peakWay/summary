/**
 * 当mode等于'development'时，模块内的所有引用模块无论有没有被使用都会打包
 * 当mode等于'production'时，只要模块内引用并使用的导出才会被打包
 * mode不设置默认'production'
 * 当mode等于'development'时，usedExports无效，引用模块都会被打包
 */
const path = require('path');

module.exports = {
    mode: 'none',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        // 模块只导出被使用的成员
        usedExports: true,

        // 尽可能合并每一个模块到一个函数中
        concatenateModules: true,

        // 开启压缩代码功能 压缩输出结果
        minimize: true,
    }
}

