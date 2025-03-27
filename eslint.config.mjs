import guardian from '@guardian/eslint-config';

export default [
	{
		ignores: [
			'node_modules',
			'dist',

			'customize.js',
			'rollup.config.js',
			'webpack.*js',
		],
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
	{
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
		},
	},
];