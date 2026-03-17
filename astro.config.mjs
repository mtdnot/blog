import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.mtdnot.dev',
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
