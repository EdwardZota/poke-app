import type {Config} from 'jest';

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.test.{js,jsx,ts,tsx}',
        '!**/__tests__/**',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
        '\\.test\\.(js|jsx|ts|tsx)$'
    ],
    moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    preset: "ts-jest",
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};

export default config;

