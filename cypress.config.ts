import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
  env: {
    base_url_dev: 'http://localhost:5173',
    base_url_prod: 'https://bk-skillgro.netlify.app/',
  },
});
