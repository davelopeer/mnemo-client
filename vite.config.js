import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const apiBaseUrl = (env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

  if (
    mode === "production" &&
    (!apiBaseUrl || /localhost|127\.0\.0\.1/.test(apiBaseUrl))
  ) {
    throw new Error(
      "VITE_API_BASE_URL must point to the production API (not localhost). " +
        "Set it in .env.production or in the environment before `npm run build`.",
    );
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
    },
  };
});
