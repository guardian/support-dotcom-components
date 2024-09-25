module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: ['<rootDir>/src/server/factories/test.ts'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
};
