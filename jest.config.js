module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@Components/(.*)": "<rootDir>/src/Components/$1",
    "@Core/(.*)": "<rootDir>/src/Core/$1",
    "@Config": "<rootDir>/src/Config/app.prod.json",
    "@Middlewares/(.*)": "<rootDir>/src/Middlewares/$1",
    "@Mock/(.*)": "<rootDir>/src/Mock/$1",
    "@Services/(.*)": "<rootDir>/src/Services/$1",
    "@Store/(.*)": "<rootDir>/src/Store/$1",
    "@Styles/(.*)": "<rootDir>/src/Styles/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};
