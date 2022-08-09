/** @format */

const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const createJestConfig = nextJest({
  
  dir: "./",
});

const customJestConfig = {
  modulePaths: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: "node",
  globalSetup: "./__tests__/jest/global_setup.ts",
  globalTearDown: "./__tests__/jest/global_teardown.ts"
  
};

module.exports = createJestConfig(customJestConfig);
