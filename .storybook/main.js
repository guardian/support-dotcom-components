const path = require('path');

module.exports = {
	stories: ['../src/components/*.stories.tsx'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
        '@storybook/addon-viewport',
        {
            name: '@storybook/preset-typescript',
            options: {
                tsLoaderOptions: {
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
                },
                tsDocgenLoaderOptions: {
                    tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
                },
                include: [path.resolve(__dirname, '../src')],
            },
        }
    ],
}
