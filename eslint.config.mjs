import guardian from '@guardian/eslint-config';
import globals from 'globals';

export default [
	{
		ignores: [
			'node_modules',
			'dist',
            'server-dist',

			'rollup.config.js',
			'webpack.*js',
		],
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
			// '@typescript-eslint/no-unused-vars': [
			// 	'error',
			// 	{
			// 		args: 'after-used',
			// 		ignoreRestSiblings: true,
			// 	},
			// ],

			// potentially to fix later see https://trello.com/c/lc8lG7Zj
			'@typescript-eslint/naming-convention': 'off',
			'@eslint-community/eslint-comments/require-description': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-unsafe-enum-comparison': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-floating-promise': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
		},
	},
];
