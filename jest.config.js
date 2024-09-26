module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: ['<rootDir>/src/server/factories/test.ts'],
};
