# mtdnot blog

技術ブログ。jser.info風のシンプルなデザイン。

https://blog.mtdnot.dev

## Obsidian sync

`~/Documents/obsidian/索/blog` の Markdown を公開用記事に同期できる。

- 同期: `npm run sync:obsidian`
- ローカル確認: `npm run dev`
- 公開: `main` に push すると GitHub Actions から Cloudflare Pages に自動デプロイされる

新規記事は Obsidian 側ノートの先頭に最低限これを入れる。

```md
---
title: "記事タイトル"
date: 2026-09-02
category: "tech"
tags: ["tag1", "tag2"]
slug: "my-post-slug"
---
```

`category` は `life`, `tech`, `business`, `research` のいずれか。`slug` を省略するとファイル名ベースになるので、日本語 URL を避けたいなら明示する。
