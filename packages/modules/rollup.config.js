import { moduleInfos } from '@sdc/shared/config';
import resolveNode from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import externalGlobals from 'rollup-plugin-external-globals';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';

const globals = {
    '@emotion/react': 'guardian.automat.emotionReact',
    '@emotion/react/jsx-runtime': 'guardian.automat.emotionReactJsxRuntime',
    react: 'guardian.automat.react',
};

const commonPlugins = [
    resolveNode(),
    commonjs(),
    json(),
    typescript(),
    babel({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
        babelHelpers: 'bundled',
    }),

    // eslint-disable-next-line @typescript-eslint/camelcase
    terser({ compress: { global_defs: { 'process.env.NODE_ENV': 'production' } } }),
    externalGlobals(globals),
    filesize(),
];

const config = args => {
    const modules = args.moduleName
        ? [moduleInfos.find(i => i.name === args.moduleName)]
        : moduleInfos;
    return modules.map(module => {
        const isProd = process.env.NODE_ENV === 'production';
        const sourcemaps = !isProd; // Nb: set to false if testing IE11
        return {
            input: module.srcPath,
            output: {
                file: module.distPath,
                format: 'es',
                sourcemap: sourcemaps ? 'inline' : false,
            },

            external: id => Object.keys(globals).some(key => key == id),

            plugins: [
                ...commonPlugins,
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
};

export default config;
