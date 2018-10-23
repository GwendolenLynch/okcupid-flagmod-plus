/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');

/* eslint-disable node/no-unpublished-require */
const Encore = require('@symfony/webpack-encore');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

Encore
    .setOutputPath('dist/app/')
    .setPublicPath('/app/')

    .addEntry('background', './src/background/background.js')
    .addEntry('flagmod-plus', './src/flagmod-plus/main.js')
    .addEntry('options', './src/options/options.js')

    // https://symfony.com/doc/current/frontend.html#adding-more-features
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(false)
    .enableVersioning(false)
    .enableSassLoader()
    .disableSingleRuntimeChunk()
    .configureBabel((babelConfig) => {
        babelConfig.plugins.push(['@babel/plugin-transform-runtime', { regenerator: true }]);
    });

if (!Encore.isProduction()) {
    console.log(`${chalk.bgYellow.black('  WARNING  ')} ${chalk.yellow('Adding plugin: ChromeExtensionReloader')}`);
    Encore.addPlugin(new ChromeExtensionReloader());
}

const config = Encore.getWebpackConfig();

config.watchOptions = {
    poll: true,
    ignored: /node_modules/,
};

module.exports = config;
