import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";

import config from "./src/config";

export default defineConfig(({ mode }) => {
  const { VITE_BASE_ENDPOINT } = loadEnv(mode, `${process.cwd()}/.env`);

  return {
    define: {
      CONFIG: JSON.stringify(config({ isProd: mode === "production", baseUrl: VITE_BASE_ENDPOINT })),
    },
    test: {
      runtimeEnv: "dom",
    },
    plugins: [react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } })],
  };
});
