import resolveNode from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import externalGlobals from 'rollup-plugin-external-globals';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';

const tsOpts = {
    target: 'es2018',
    strict: true,
    noImplicitReturns: true,
    esModuleInterop: true,
    jsx: 'react',
    include: ['src/**/*'],
    exclude: ['node_modules', '**/*.test.ts', 'src/factories/*', 'src/cdk/*'],
    tsconfig: false,
};

const globals = {
    react: 'guardian.automat.react',
    emotion: 'guardian.automat.emotion', // TODO remove this dependency
    '@emotion/core': 'guardian.automat.emotionCore',
    'emotion-theming': 'guardian.automat.emotionTheming',
};

const config = [
    ['src/components/modules/ContributionsEpic.tsx', 'dist/modules/Epic.js'],
    ['src/components/modules/Banner.tsx', 'dist/modules/Banner.js'],
    [
        'src/components/modules/contributionsBanners/AusMomentContributionsBanner.tsx',
        'dist/modules/contributionsBanners/AusMomentContributionsBanner.js',
    ],
    [
        'src/components/modules/ausMomentThankYouBanner/AusMomentThankYouBanner.tsx',
        'dist/modules/ausMomentThankYouBanner/AusMomentThankYouBanner.js',
    ],
].map(([entryPoint, name]) => {
    return {
        input: entryPoint,
        output: {
            file: name,
            format: 'es',
            sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
        },
        external: id => Object.keys(globals).some(key => id.startsWith(key)),
        plugins: [
            resolveNode(),
            commonjs(),
            json(),
            babel({
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
                plugins: [['emotion', { sourceMap: false }]],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                ie: '11',
                            },
                        },
                    ],
                ],
                babelHelpers: 'bundled',
            }),
            typescript(tsOpts),
            // eslint-disable-next-line @typescript-eslint/camelcase
            terser({ compress: { global_defs: { 'process.env.NODE_ENV': 'production' } } }),
            externalGlobals(globals),
            filesize(),
        ],
    };
});

export default config;
