import guardian from '@guardian/eslint-config';
import globals from 'globals';

export default [
	{
		ignores: ['node_modules', 'cdk.out', 'dist', '**/*.js'],
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
	{
		ignores: ['eslint.config.mjs'],
		languageOptions: {
			globals: {
				...globals.jest,
				...globals.node,
			},
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: './',
			},
		},
		rules: {
			'@typescript-eslint/no-inferrable-types': 'off',
			'import/no-namespace': 'error',
		},
	},
];
