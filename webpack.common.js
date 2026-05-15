const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { readFileSync } = require('fs');

// Read dependencies from package.json to allowlist them
const rootPackageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const serverPackageJson = JSON.parse(readFileSync('./src/server/package.json', 'utf8'));

const allDependencies = [
    ...Object.keys(rootPackageJson.dependencies || {}),
    ...Object.keys(rootPackageJson.peerDependencies || {}),
    ...Object.keys(rootPackageJson.devDependencies || {}),
    ...Object.keys(serverPackageJson.dependencies || {}),
    ...Object.keys(serverPackageJson.devDependencies || {}),
];

module.exports = {
    entry: './src/server/server.ts',
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: (module) => {
                // Allowlist if it matches any of our dependencies (including submodules)
                return allDependencies.some(
                    (dep) => module === dep || module.startsWith(dep + '/'),
                );
            },
        }),
    ],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'server-dist'),
        chunkFormat: false,
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        projectReferences: true,
                        configFile: path.resolve(__dirname, 'tsconfig.json'),
                    },
                },
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
