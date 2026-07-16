import { defineConfig } from 'astro/config';
import remarkObsidianBreaks from './scripts/remark-obsidian-breaks.mjs';
import remarkObsidianImages from './scripts/remark-obsidian-images.mjs';

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
    remarkPlugins: [remarkObsidianImages, remarkObsidianBreaks],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
