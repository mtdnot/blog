import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.mtdnot.dev',
  base: '/',
  output: 'static',
  devToolbar: {
    enabled: false
  },
  build: {
    format: 'directory'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
