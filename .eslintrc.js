module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@guardian/eslint-plugin-source-foundations/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        curly: 2,
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                ignoreParameters: true,
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'after-used',
                ignoreRestSiblings: true,
            },
        ],
        'react/display-name': 'off',

        // Not compatible with TS + arrow functions - https://github.com/yannickcr/eslint-plugin-react/issues/2353#issuecomment-674792754
        // TS does the type checking anyway
        'react/prop-types': 'off',

        // It's a known issue that eslint-plugin-react doesn't play nicely with the CSS prop:
        // https://github.com/emotion-js/emotion/issues/2878#issuecomment-1236384580
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
