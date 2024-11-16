import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        include: ["src/**/*.spec.{js,ts,jsx,tsx}"],
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        coverage: {
            reporter: ['text', 'json-summary', 'json']
        }
    },
})