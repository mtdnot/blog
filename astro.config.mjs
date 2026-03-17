import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.mtdnot.dev',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
