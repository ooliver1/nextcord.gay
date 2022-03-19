export default {
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "test/tsconfig.json",
      useESM: true,
    },
  },
  testRegex: "/test/.*\\.test\\.ts$",
  collectCoverageFrom: ["src/**/*.{ts,js}"],
  testEnvironment: "miniflare",
};
