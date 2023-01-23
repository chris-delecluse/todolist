"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/db/',
    ],
    coverageProvider: 'v8',
    coverageReporters: [
        'json',
        'text',
        'lcov',
        'clover',
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
    ],
    preset: 'ts-jest',
    roots: [
        '<rootDir>/src',
    ],
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/helpers",
        "<rootDir>/src/__tests__/mock-data"
    ],
    setupFilesAfterEnv: ["./config/jest.setup.ts"],
};
//# sourceMappingURL=jest.config.js.map