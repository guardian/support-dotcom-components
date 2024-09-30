import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

export default [
    {
        input: 'src/dotcom/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
            },
            {
                file: pkg.module,
                format: 'esm',
                sourcemap: false,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve({ extensions: extensions }),
            commonjs(),
            replace({ 'process.env.NODE_ENV': '"production"' }),
            babel({
                babelHelpers: 'bundled',
                extensions: extensions,
            }),
            terser(),
            filesize(),
        ],
    }
]
