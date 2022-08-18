/** @format */
const { compilerOptions } = require("./tsconfig.json");

const nextJest = require("next/jest");
const { pathsToModuleNameMapper } = require("ts-jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  modulePaths: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: "node",
};

module.exports = createJestConfig(customJestConfig);
