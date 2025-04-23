import guardian from '@guardian/eslint-config';
import globals from 'globals';

export default [
    {
        ignores: ['node_modules', 'dist', 'server-dist', 'rollup.config.js', 'webpack.*js', 'cdk'],
    },
    ...guardian.configs.recommended,
    ...guardian.configs.jest,
    {
        ignores: ['eslint.config.mjs'],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: 5,
            sourceType: 'commonjs',
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: './',
            },
        },
        rules: {
            // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
            // e.g. "@typescript-eslint/explicit-function-return-type": "off",
            curly: 2,

            // Since we moved to using the @guardian/eslint-config we are getting many failures on existing code.
            // These are all rules that we should be using but we are not ready to fix all the existing code yet.
            // We are using bulk suppressions so we can apply the rules now and fix existing failures later
            // https://eslint.org/blog/2025/04/introducing-bulk-suppressions/

            // These are the rules that we may need to fix later see https://trello.com/c/lc8lG7Zj and https://typescript-eslint.io/rules/ 
            // '@typescript-eslint/await-thenable': 'off',
            // '@typescript-eslint/no-base-to-string': 'off',
            // '@typescript-eslint/no-floating-promise': 'off',
            // '@typescript-eslint/no-floating-promises': 'off',
            // '@typescript-eslint/no-unnecessary-condition': 'off',
            // '@typescript-eslint/no-unsafe-argument': 'off',
            // '@typescript-eslint/no-unsafe-assignment': 'off',
            // '@typescript-eslint/no-unsafe-call': 'off',
            // '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            // '@typescript-eslint/no-unsafe-member-access': 'off',
            // '@typescript-eslint/no-unsafe-return': 'off',
            // '@typescript-eslint/prefer-nullish-coalescing': 'off',
            // '@typescript-eslint/prefer-optional-chain': 'off',
            // '@typescript-eslint/prefer-promise-reject-errors': 'off',
            // '@typescript-eslint/require-await': 'off',
            // '@typescript-eslint/restrict-template-expressions': 'off',
        },
    },
];
