module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@guardian/src-foundations/(.*)$': '@guardian/src-foundations/$1/cjs',
    },
};
