const path = require('path');

module.exports = {
    mode: 'development',
    optimization: {
        // sideEffects: false
        usedExports: true
    },
    entry: './src/public.ts',
    target: 'node',
    output: {
        filename: 'public.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            // { test: /\.ts$/, use: { loader: 'ts-loader', options: { projectReferences: true } } },
            {
                test: /\.tsx?$/,
                use: ['babel-loader','ts-loader'],
                exclude: /node_modules/,
            },
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
