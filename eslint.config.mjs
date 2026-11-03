import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import guardian from '@guardian/eslint-config';
import globals from 'globals';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

export default [
    {
        ignores: ['node_modules', 'dist', 'server-dist', 'rollup.config.js', 'webpack.*js', 'cdk', '**/dist/**'],
    },
    ...guardian.configs.recommended,
    ...guardian.configs.jest,
    {
        ignores: ['eslint.config.mjs'],
        linterOptions: {
            reportUnusedDisableDirectives: 'warn', // Only 'warn' do not fail the build if redundant directives
        },
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: 5,
            sourceType: 'commonjs',
            parserOptions: {
                tsconfigRootDir,
            },
        },
        rules: {
            // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
            // e.g. "@typescript-eslint/explicit-function-return-type": "off",
            curly: 2,

            // Below: rules disabled in Oct 2026, when moving typescript from 5.9.3 to 6.0.3
            // https://eslint.org/blog/2025/04/introducing-bulk-suppressions/
            // https://typescript-eslint.io/rules/
            // We will be reactivating one by one with specific PRs
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
        },
    },
];
