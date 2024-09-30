const path = require('path');

module.exports = {
    entry: './src/server/server.ts',
    target: 'node',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'server-dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.ts$/, use: { loader: 'ts-loader', options: { projectReferences: true } } },
        ],
    },
    ignoreWarnings: [
        {
            module: /node_modules\/express\/lib\/view\.js/,
            message: /the request of a dependency is an expression/,
        },
        {
            module: /node_modules\/log4js\/lib\/appenders\/index\.js/,
            message: /the request of a dependency is an expression/,
        },
    ],
};
