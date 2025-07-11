const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const ip = require('ip');

const infoColor = (message) =>
    `\u001b[1m\u001b[34m${message}\u001b[39m\u001b[22m`;

module.exports = merge(commonConfiguration, {
    stats: 'errors-warnings',
    mode: 'development',
    infrastructureLogging: {
        level: 'warn',
    },
    devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    allowedHosts: 'all',
    hot: true,
    watchFiles: ['src/**', 'static/**'],
    server: {
        type: 'http', // statt https: false
    },
    static: {
        directory: path.join(__dirname, '../static'),
    },
    client: {
        logging: 'warn',
        overlay: true,
        progress: false,
    },
    setupMiddlewares: (middlewares, devServer) => {
        const port = devServer.options.port;
        const https = devServer.options.https ? 's' : '';
        const localIp = ip.address();
        const domain1 = `http${https}://${localIp}:${port}`;
        const domain2 = `http${https}://localhost:${port}`;

        console.log(
            `Server gestartet:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`
        );

        return middlewares;
    },
},
});