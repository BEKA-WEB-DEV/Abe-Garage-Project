import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to remove sourceMappingURL comments from Bootstrap CSS files
function removeBootstrapSourceMap() {
  return {
    name: 'remove-bootstrap-sourcemap',
    enforce: 'pre', // run this plugin before others
    transform(code, id) {
      // Check if the file path ends with bootstrap.css or bootstrap.min.css in your assets directory
      if (id.includes('template_assets/css') && (id.endsWith('bootstrap.css') || id.endsWith('bootstrap.min.css'))) {
        // Remove any sourceMappingURL comment (robust regex to catch various formats)
        const newCode = code.replace(/\/\*#\s*sourceMappingURL=.*?\*\//g, '')
        return newCode
      }
      return code
    }
  }
}

export default defineConfig({
  plugins: [react(), removeBootstrapSourceMap()],
  css: {
    devSourcemap: false, // Disable CSS sourcemaps in development
  },
  build: {
    sourcemap: false,    // Disable sourcemaps for production builds
  },
})
