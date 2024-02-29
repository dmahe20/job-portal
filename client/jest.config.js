module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    collectCoverage: true,
    coverageReporters: ['json', 'html'],
    coverageDirectory: 'coverage'
  };
  