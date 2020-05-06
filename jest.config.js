module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: ['<rootDir>/src/factories/test.ts'],
};
