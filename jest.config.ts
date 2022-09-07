export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**'],
  resetMocks: true,
  coverageReporters: ['text']
}
