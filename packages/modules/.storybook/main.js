import path from 'path';

const getAbsolutePath = (packageName) =>
  path.dirname(require.resolve(path.join(packageName, 'package.json')));

const config = {
  framework: {
    // Replace your-framework with the same one you've imported above.
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  stories: ['../src/modules/**/*.stories.tsx'],
  addons: [
    //👇 Use getAbsolutePath when referencing Storybook's addons and frameworks
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-links'),
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],
  typescript: {
      reactDocgen: 'none',
  },
};

export default config;
