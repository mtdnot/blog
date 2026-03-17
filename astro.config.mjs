import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mtdnot.github.io',
  base: '/blog',
  output: 'static',
  build: {
    format: 'directory'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
