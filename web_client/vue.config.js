const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
            alias: {
                // vue: '@vue/runtime-dom',
                '@': resolve('src'),
            },
        },
    },
});
