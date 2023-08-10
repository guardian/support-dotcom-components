module.exports = {
    stories: ['../src/modules/**/*.stories.tsx'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    typescript: {
        reactDocgen: 'none',
    },
};
