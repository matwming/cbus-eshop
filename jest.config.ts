/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/?(*.)+(spec|test).(ts|tsx)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/mocks/", // Exclude mocks folder
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/mocks/",
    "/coverage/",
  ],
};

export default createJestConfig(customJestConfig);
