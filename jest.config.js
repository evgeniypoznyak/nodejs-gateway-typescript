// eslint-disable-next-line @typescript-eslint/no-var-requires
const {defaults} = require('jest-config');
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageThreshold: {
        'global': {
            'branches': 50,
            'functions': 50,
            'lines': 50,
            'statements': 50,
        },
        'transform': {
            '^.+\\.tsx?$': 'ts-jest',
        },
    },
};
