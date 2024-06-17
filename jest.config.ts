import { Config } from 'jest';

const jestConfig: Config = {
  projects: ['<rootDir>/projects/widgets'],
  cacheDirectory: '.jest/cache',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/index.ts',
    '!**/public-api.ts',
    '!**/jest.config.ts',
    '!core/types/*',
    '!**/*.type.ts',
    '!**/*.model.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
  maxWorkers: '50%',
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    [
      'jest-slow-test-highlighter',
      {
        maxTests: 3,
        slowSeconds: 0.5,
      },
    ],
  ],
};

export default jestConfig;
