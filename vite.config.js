import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 1) Serve all assets and HMR under the subdirectory:
  base: '/projects/agentic-search/',   

  // 2) Enable the React plugin for JSX, SWC/Babel, and fast refresh:
  plugins: [
    react()
  ],

  // 3) Dev server configuration:
  server: {
    host: '0.0.0.0',                        // listen on all interfaces
    port: 3000,                             // default Vite port
    // 4) Allow your custom domain (or set to `true` to allow any host):
    allowedHosts: ['design.kristiantalley.com']
  }
});
