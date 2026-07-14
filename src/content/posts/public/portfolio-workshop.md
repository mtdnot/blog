---
title: "ポートフォリオ作成会資料"
date: 2026-07-15
description: "ポートフォリオ作成会資料"
category: "tech"
thumbnail: "/images/portfolio-workshop/file-20260715055125845.png"
tags: ["portfolio", "astro", "web", "workshop"]
---
# 目標

**Web公開**
# +α

- ブログ機能
- ドメイン（調べたら取り方出てくるので調べてクレメンス）

## 書く内容の決め方

- 誰に~~見~~魅せるか <- 社会人（人事） or 知人 or 他人
- あなたは誰か
- 何をしてきたのか、何をアピールしたいのか
- 連絡先、各種SNS(facebook,twitter,github,speakerdeck,qiita,zenn,ニコニコ,faboxなどターゲット層に合わせる)

## 具体的なページ分け

相手に見やすくするには、用途に合わせてページを分けた方が良いです。

- 大学用(研究やサークル) 
- 就活用
- 個人用(生活、旅行など)

ドメインを使う方は、portfolio.your-domein.xxx/u-aizuやworks.your-domain.xxx/などすると良いでしょう。

## 記述する情報

一度マークダウンで何をかくか箇条書きで表してみましょう
以下はどこでも使える情報です。

- 名前
- アイコン
- 誕生日
- 所属
- 好きなもの
- SNSリンク
- blog
- 連絡先

## === 第一回ここまでできるのが目安 ===

私の場合このようになりました。
![[file-20260715055125845.png]]

## 実装

Astroがおすすめです。
AI使いましょう（諸説）
![[file-20260715055522846.png]]

この先はあなたの美的センスに合わせてデザインしていってください。

## デザインとUX

- 例 : ゲームっぽい世界観を表現したいから、ドット系のフォントを使う
- モノによりますが、グラデーションと絵文字の多用に気をつけましょう😅(AI臭する)
- 情報を絞る

## ホスティング（推奨）: 

- GitHub.io
- Cloudflare pages

gh,wranglerあたりがあれば、AIがCLIからデプロイしてくれる

## 参考事例
参考になるポートフォリオサイトを列挙します。

就活するならこういうデザインが好まれるよね
```embed
title: "p1ass's portfolio"
image: "https://p1ass.com/ogp.png"
description: "p1assのポートフォリオサイトです。"
url: "https://www.p1ass.com"
favicon: ""
aspectRatio: "50"
```
scrapboxというサービスだが、言わばwiki形式的に情報を羅列する形式
obsidian好きな人にも合いそう
```embed
title: "tkgshn（高木俊輔）について - tkgshn"
image: ""
description: "public 📝 English version: About me (English) 高木俊輔（Shunsuke Takagi）です。2002年生まれ（2024/7/13現在 21歳） twitter0xtkgshn https://twitter.com/0xtkgshn（日本語） / spotify3ni5 https://open.spotify.com/user/3ni5 / git"
url: "https://scrapbox.io/tkgshn/tkgshn%EF%BC%88%E9%AB%98%E6%9C%A8%E4%BF%8A%E8%BC%94%EF%BC%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6"
favicon: ""
```
web frontエンジニアの方
```embed
title: "げぐはつぺーじ"
image: "https://kght6123.page/images/kght6123.png"
description: "げぐはつ書房のブログへようこそ！"
url: "https://kght6123.page"
favicon: ""
aspectRatio: "100"
```
ブロガーのイメージ、単調だが信頼性のあるデザイン
```embed
title: "vaaaaanquish"
image: "https://vaaaaanquish.jp/_next/image?url=%2Fface_icon.png&w=640&q=75"
description: "We are vanquish."
url: "https://vaaaaanquish.jp"
favicon: ""
aspectRatio: "100"
```
コスプレの方、サブカル色が強い
```embed
title: "SaltyAom"
image: "https://saltyaom.com/cosplay/pekomama.webp"
description: "SaltyAom, open source maintainer and cosplayer"
url: "https://saltyaom.com"
favicon: ""
aspectRatio: "66.68646080760095"
```
アニメ調とエンジニアの組み合わせ
```embed
title: "WaifuVault"
image: "https://waifuvault.moe/assets/custom/images/vic_vault.webp"
description: "No Nonsense Temporary File Hosting"
url: "https://waifuvault.moe"
favicon: ""
aspectRatio: "100"
```
TUI風
```embed
title: "Dmitrii Kovanikov aka chshersh"
image: "https://chshersh.com/images/logo.jpg"
description: "About, my blog"
url: "https://chshersh.com"
favicon: ""
aspectRatio: "75"
```
イラストレーター
```embed
title: "Asuka Eo Illustration | Tokyo, Japan"
image: "https://static.wixstatic.com/media/600b13_d760331632ea4ae7a19743d9e3002aca~mv2.png/v1/fill/w_2500,h_1768,al_c/600b13_d760331632ea4ae7a19743d9e3002aca~mv2.png"
description: "Asuka Eo's illustration works"
url: "https://www.asukaeo.com"
favicon: ""
aspectRatio: "70.72"
```



# ブログ

時間余った or 思想を広めたい方向け

## ホスティング

ポートフォリオと同様にセットアップしてください。
更新頻度が異なるので、ポートフォリオとブログのレポジトリは別々にすることを推奨します。

## 書く内容

- 記事
- 記事を探しやすくするためのリンク
- ヘッダーにabout meやsearch、archiveなど <- 好み
- ブログの名前(~'s note, ~ブログなど検索に出るため名前はあると良い)

RSS,Ja/Enなどあげればブログは機能や情報付け足しまくれるが、筆者は「読めればいいんじゃね。」と思っている。

## 実装

![[file-20260715060953194.png]]


## 参考事例

```embed
title: "Kei18's Note"
image: "https://kei18.github.io/note/cover.jpeg"
description: "Essays and activity reports, mostly about computer science research 📚🔬💡🪽 "
url: "https://kei18.github.io/note/"
favicon: ""
aspectRatio: "66.4794921875"
```
```embed
title: "Blog | 39sho.dev"
image: "https://39sho.dev/_astro/avator.CAwgL-ez.png"
description: "39shoのブログ"
url: "https://39sho.dev/blog/"
favicon: ""
aspectRatio: "100"
```
