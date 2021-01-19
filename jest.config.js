module.exports = {
  'roots': [
    './src'
  ],
  'testMatch': [
    '**/__tests__/e2e/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
}