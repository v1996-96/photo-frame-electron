const path = require('path');

module.exports = {
    transpileDependencies: ['vuetify'],
    configureWebpack: {
        devtool: 'source-map',
        resolve: {
            alias: {
                '~': path.resolve('src'),
            },
        },
    },
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            mainProcessWatch: ['src/background.js', 'src/handlers/**/*.js'],
            builderOptions: {
                linux: {
                    target: [{ target: 'AppImage', arch: ['armv7l', 'arm64'] }],
                },
            },
        },
    },
};
