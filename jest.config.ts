export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**'],
  resetMocks: true,
  coverageReporters: ['text'],
  verbose: true,
  roots: ['<rootDir>/test/']
}
