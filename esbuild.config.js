// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild');

const globals = {
    react: 'guardian.automat.preact',
    '@emotion/core': 'guardian.automat.emotionCore',
};

const globalsPlugin = {
    name: 'map-to-globals',
    setup(build) {
        build.onResolve({ filter: /^react$/ }, args => ({
            path: args.path,
            namespace: 'map-to-globals',
        }));

        build.onLoad({ filter: /.*/, namespace: 'map-to-globals' }, () => {
            const contents = `module.exports = guardian.automat.preact`;
            return { contents };
        });
    },
};

esbuild.build({
    entryPoints: ['src/components/modules/banners/globalEoy/GlobalEoy.tsx'],
    bundle: true,
    outfile: 'dist/modules/banners/globalEoy/GlobalEoy.js',
    define: { 'process.env.NODE_ENV': '"production"' },
    external: Object.keys(globals),
    plugins: [globalsPlugin],
});
