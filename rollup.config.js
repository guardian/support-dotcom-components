import resolveNode from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import externalGlobals from 'rollup-plugin-external-globals';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';

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
    ['epic', 'src/components/modules/epics/ContributionsEpic.tsx', 'dist/modules/epics/Epic.js'],
    [
        'aus-banner',
        'src/components/modules/banners/contributions/AusMomentContributionsBanner.tsx',
        'dist/modules/banners/contributions/AusMomentContributionsBanner.js',
    ],
    [
        'aus-thank-you-banner',
        'src/components/modules/banners/contributions/ausMomentThankYouBanner/AusMomentThankYouBanner.tsx',
        'dist/modules/banners/contributions/ausMomentThankYouBanner/AusMomentThankYouBanner.js',
    ],
    [
        'digital-subscriptions-banner',
        'src/components/modules/banners/digitalSubscriptions/DigitalSubscriptionsBanner.tsx',
        'dist/modules/banners/digitalSubscriptions/DigitalSubscriptionsBanner.js',
    ],
    [
        'guardian-weekly-banner',
        'src/components/modules/banners/guardianWeekly/GuardianWeeklyBanner.tsx',
        'dist/modules/banners/guardianWeekly/GuardianWeeklyBanner.js',
    ],
].map(([entryPoint, name]) => {
    return {
        input: entryPoint,
        output: {
            file: target,
            format: 'es',
            sourcemap: isProd ? false : 'inline',
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

            // Note, visualizer is useful for *relative* sizes, but reports
            // pre-minification.
            visualizer({ sourcemap: !isProd, gzipSize: true, filename: `stats/${name}.html` }),
        ],
    };
});

export default config;
