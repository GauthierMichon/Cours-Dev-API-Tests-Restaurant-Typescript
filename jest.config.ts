export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.(ts|js)", "**/?(*.)+(spec|test).(ts|js)"],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^../database/database$": "<rootDir>/src/database/__mocks__/database.ts", // Mappage vers le mock correct
  },
};
