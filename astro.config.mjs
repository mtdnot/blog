import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.mtdnot.dev',
  base: '/',
  output: 'static',
  build: {
    format: 'directory'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
