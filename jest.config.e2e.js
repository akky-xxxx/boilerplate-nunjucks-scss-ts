module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/__tests__/e2e/*.ts'],
  setupFilesAfterEnv: ['./jest.setup.e2e.js'],
}
