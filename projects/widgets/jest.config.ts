import type { Config } from 'jest';

const jestConfig: Config = {
  displayName: 'widgets',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '@i-cell/widgets/(.*)': '<rootDir>/$1',
  },
};

export default jestConfig;
