module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src/components'],
    transform: {
        '.*\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@guardian)'],
    verbose: true,
};
