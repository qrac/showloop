import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "showloop",
      fileName: (format) => {
        if (format === "umd") {
          return "showloop.js"
        }
        if (format === "es") {
          return "showloop.esm.js"
        }
        return `showloop.${format}.js`
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "/@showloop",
        replacement: path.resolve(__dirname + "/dist"),
      },
    ],
  },
})
