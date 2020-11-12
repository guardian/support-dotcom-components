import resolveNode from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import externalGlobals from 'rollup-plugin-external-globals';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import modules, { getSrcPath, getDistPath } from './src/modules';

const tsOpts = {
    target: 'es2018',
    strict: true,
    noImplicitReturns: true,
    esModuleInterop: true,
    jsx: 'preserve',
    include: ['src/**/*'],
    exclude: ['node_modules', '**/*.test.ts', 'src/factories/*', 'src/cdk/*'],
    tsconfig: false,
};

const globals = {
    react: 'guardian.automat.preact',
    '@emotion/core': 'guardian.automat.emotionCore',
};

const config = modules.map(module => {
    const isProd = process.env.NODE_ENV === 'production';
    const sourcemaps = !isProd; // Nb: set to false if testing IE11
    return {
        input: getSrcPath(module),
        output: {
            file: getDistPath(module),
            format: 'es',
            sourcemap: sourcemaps ? 'inline' : false,
        },
        external: id => Object.keys(globals).some(key => id == key),
        plugins: [
            resolveNode(),
            commonjs(),
            json(),
            typescript(tsOpts),
            babel({
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
                babelHelpers: 'bundled',
            }),

            // eslint-disable-next-line @typescript-eslint/camelcase
            terser({ compress: { global_defs: { 'process.env.NODE_ENV': 'production' } } }),
            externalGlobals(globals),
            filesize(),

            // Note, visualizer is useful for *relative* sizes, but reports
            // pre-minification.
            visualizer({
                sourcemap: sourcemaps,
                gzipSize: true,
                filename: `stats/${module.name}.html`,
            }),
        ],
    };
});

export default config;
