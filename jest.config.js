module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/.jest/setup-tests.js"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/.jest/mocks/fileMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/.jest/mocks/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
  },
};
