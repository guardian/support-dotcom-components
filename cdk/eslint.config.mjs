import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import guardian from '@guardian/eslint-config';
import globals from 'globals';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));

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
				tsconfigRootDir,
			},
		},
		rules: {
			'@typescript-eslint/no-inferrable-types': 'off',
			'import/no-namespace': 'error',
		},
	},
];
