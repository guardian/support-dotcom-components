module.exports = {
    stories: ['../src/modules/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-links',
        '@storybook/addon-knobs',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },
    typescript: {
        reactDocgen: 'none',
    },
};
