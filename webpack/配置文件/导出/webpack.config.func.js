
module.exports = function (env, argv) {
    console.log(env, argv);
    let config = {
        mode: env.mode,
        entry: './index.js',
        output: {
            filename: `func-${env.mode}.js`
        }
    }

    env.mode === 'development' && (config.devtool = 'eval-cheap-module-source-map')

    return config;
}