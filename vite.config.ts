import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
import config from "./src/Config";

export default defineConfig(({ mode }) => ({
  define: {
    CONFIG: JSON.stringify(config(mode === "production")),
  },
  plugins: [tsconfigPaths(), reactRefresh()],
}));
