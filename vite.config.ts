import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
import config from "./src/config";

export default defineConfig(({ mode }) => ({
  define: {
    CONFIG: JSON.stringify(config(mode === "production")),
  },
  plugins: [tsconfigPaths(), react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } })],
}));
