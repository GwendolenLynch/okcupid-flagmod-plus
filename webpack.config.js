const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('dist/app/')
    .setPublicPath('/app/')

    .addEntry('background', './src/background/background.ts')
    // .addEntry('profile-page', './src/profile-page/index.ts')
    .addEntry('page-script', './src/page-script/index.ts')
    .addEntry('flagmod-plus', './src/flagmod-plus/index.ts')
    // .addEntry('photo-review', './src/profile-page/photo-review/photo-review.ts')
    .addEntry('options', './src/options/index.ts')

    // https://symfony.com/doc/current/frontend.html#adding-more-features
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(false)
    .enableVersioning(false)
    .enableTypeScriptLoader()
    .enableSassLoader()
    .disableSingleRuntimeChunk()

    .configureBabel((babelConfig) => {
        babelConfig.plugins.push(['@babel/plugin-transform-runtime', { regenerator: true }]);
    });

const config = Encore.getWebpackConfig();

config.watchOptions = {
    poll: true,
    ignored: /node_modules/,
};

module.exports = config;
