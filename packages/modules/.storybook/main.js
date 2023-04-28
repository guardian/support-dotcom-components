module.exports = {
    stories: ['../src/modules/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
    ],
    core: {
        builder: '@storybook/builder-webpack5',
    },
};
