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
    '!**/*.stories.ts',
    '!**/.storybook/**',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 40,
      functions: 60,
      lines: 60,
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
