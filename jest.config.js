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
    "@AppTypes": "<rootDir>/src/types",
    "@Components/(.*)": "<rootDir>/src/Components/$1",
    "@Config": "<rootDir>/src/Config/app.json",
    "@Containers/(.*)": "<rootDir>/src/Containers/$1",
    "@Mock/(.*)": "<rootDir>/src/Mock/$1",
    "@Core/(.*)": "src/Core/$1",
    "@Services/(.*)": "<rootDir>/src/Services/$1",
    "@Styles/(.*)": "<rootDir>/src/Styles/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};
