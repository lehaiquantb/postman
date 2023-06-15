module.exports = {
    // roots: ['<rootDir>/src'],
    // testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
    // transform: {
    //     '^.+\\.(ts|tsx)$': 'ts-jest',
    // },
    // moduleNameMapper: {
    //     '^@/(.*)$': '<rootDir>/src/$1',
    // },
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // coverageDirectory: '<rootDir>/coverage',
    // collectCoverageFrom: [
    //     '<rootDir>/src/**/*.+(ts|js)',
    //     '!<rootDir>/src/**/*.spec.+(ts|js)',
    // ],
    // reporters: ['default', 'jest-junit'],
    transformIgnorePatterns: [
        '/node_modules/',
        '\\.(json)$', // Bỏ qua tất cả các tệp có đuôi .json
    ],
};
