// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('ts-node').register({
    compilerOptions: {
        module: 'CommonJS',
    },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { moduleInfos } = require('./src/modules.ts');

const globals = [
    { filter: /^react$/, global: 'guardian.automat.preact' },
    { filter: /^@emotion\/core$/, global: 'guardian.automat.emotionCore' },
];

const externalGlobals = globals => ({
    name: 'map-to-globals',
    setup(build) {
        globals.forEach(global => {
            build.onResolve({ filter: global.filter }, args => ({
                path: args.path,
                namespace: 'externalGlobals',
            }));

            build.onLoad({ filter: global.filter, namespace: 'externalGlobals' }, () => {
                const contents = `module.exports = ${global.global}`;
                return { contents };
            });
        });
    },
});

esbuild.build({
    entryPoints: moduleInfos.map(info => info.srcPath),
    bundle: true,
    format: 'esm',
    outdir: 'dist/modules',
    define: { 'process.env.NODE_ENV': '"production"' },
    plugins: [externalGlobals(globals)],
    jsxFactory: 'guardian.automat.emotionCore.jsx',
});
