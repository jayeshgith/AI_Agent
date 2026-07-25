import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite configuration for the React frontend and Tailwind CSS plugin.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
