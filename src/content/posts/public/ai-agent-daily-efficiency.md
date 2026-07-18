---
title: "AI Agentによる日常の効率化"
date: 2026-07-18
description: "AI Agentによる日常の効率化"
category: "tech"
thumbnail: "/images/ai-agent-daily-efficiency/file-20260718220005511.png"
tags: ["ai", "agent", "automation", "hermes", "daily-life"]
---
![file-20260718220005511.png](/images/ai-agent-daily-efficiency/file-20260718220005511.png)

みなさんAI使っていますか？
今回は私なりのAIの使い方について話したいと思います。
既に何度も擦られている話題ですが、まぁ二ヶ月後の自分に「ざっこw」と笑われるために書いています。頑張ってくれよワイ

# 経歴

- RAGベースのチャットボット -> 産廃
- Openclaw -> サーバー飛んで死亡
- 自作エージェント(情移ってた) -> 誤ってレポジトリ（バックアップ的な）削除&ソースコード削除 -> 死亡
- Hermes Agent <- Now!

彼らには共通した名前があります。

# 鬼畜

元ネタはこれです
```embed
title: "ChatGPTの「良い人フィルター」を外して本音を引き出してみた - Qiita"
image: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-user-contents.imgix.net%2Fhttps%253A%252F%252Fcdn.qiita.com%252Fassets%252Fpublic%252Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png%3Fixlib%3Drb-4.1.1%26w%3D1200%26blend64%3DaHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkYwJTJGNDEzMzM4NyUyRnByb2ZpbGUtaW1hZ2VzJTJGMTc2Nzc2MjEwMT9peGxpYj1yYi00LjEuMSZhcj0xJTNBMSZmaXQ9Y3JvcCZtYXNrPWVsbGlwc2UmYmc9RkZGRkZGJmZtPXBuZzMyJnM9YjQ2YzJjZDAyMTMxMTYxZGVhYzczYWI4OWZhZjQ0MDU%26blend-x%3D120%26blend-y%3D462%26blend-w%3D90%26blend-h%3D90%26blend-mode%3Dnormal%26mark64%3DaHR0cHM6Ly9xaWl0YS1vcmdhbml6YXRpb24taW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnMzLWFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkZxaWl0YS1vcmdhbml6YXRpb24taW1hZ2UlMkY3ZGVlMjYyYjJiNTFiN2ZmYTYyOGI1ODFjNjNkYjAyMzNhODlmMGMzJTJGb3JpZ2luYWwuanBnJTNGMTc1MTk0MTIwOD9peGxpYj1yYi00LjEuMSZ3PTQ0Jmg9NDQmZml0PWNyb3AmbWFzaz1jb3JuZXJzJmNvcm5lci1yYWRpdXM9OCZiZz1GRkZGRkYmYm9yZGVyPTIlMkNGRkZGRkYmZm09cG5nMzImcz1mZDY1Mzc0MjdlNzMxMjI5ZDllZWFkYTczZTAyZTQxNg%26mark-x%3D186%26mark-y%3D515%26mark-w%3D40%26mark-h%3D40%26s%3Ddc55231a24e1021de8fa34a095aad9cb?ixlib=rb-4.1.1&w=1200&fm=jpg&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjEuMSZ3PTk2MCZoPTMyNCZ0eHQ9Q2hhdEdQVCVFMyU4MSVBRSVFMyU4MCU4QyVFOCU4OSVBRiVFMyU4MSU4NCVFNCVCQSVCQSVFMyU4MyU5NSVFMyU4MiVBMyVFMyU4MyVBQiVFMyU4MiVCRiVFMyU4MyVCQyVFMyU4MCU4RCVFMyU4MiU5MiVFNSVBNCU5NiVFMyU4MSU5NyVFMyU4MSVBNiVFNiU5QyVBQyVFOSU5RiVCMyVFMyU4MiU5MiVFNSVCQyU5NSVFMyU4MSU4RCVFNSU4NyVCQSVFMyU4MSU5NyVFMyU4MSVBNiVFMyU4MSVCRiVFMyU4MSU5RiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1wYWQ9MCZzPTA0M2EyYjlmNDMxNDVkN2ZkZDNiOTQwZWU4OWVmMDQw&mark-x=120&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjEuMSZ3PTgzOCZoPTU4JnR4dD0lNDBub2xhbmxvdmVyMDUyNyZ0eHQtY29sb3I9JTIzMUUyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1wYWQ9MCZzPWJhZGQzMzdkMWE0Mzc3MTZiOTVjMmNiNThhODk0ZTQ1&blend-x=242&blend-y=454&blend-w=838&blend-h=46&blend-fit=crop&blend-crop=left%2Cbottom&blend-mode=normal&txt64=44Ko44Os44Kv44K55qCq5byP5Lya56S-&txt-x=242&txt-y=539&txt-width=838&txt-clip=end%2Cellipsis&txt-color=%231E2121&txt-font=Hiragino%20Sans%20W6&txt-size=28&s=6ea318e813f6a2efdc1bf3603687b686"
description: "ChatGPTは良い人すぎる? 自分が作ったコードやテキストの問題点をChatGPTに洗い出してほしいのに、オブラートに包んだありきたりな回答が返ってきた経験はありませんか? このように、AIの 「良い人フィルター」 とは、ユーザーを過度に肯定し、批判的な意見..."
url: "https://qiita.com/nolanlover0527/items/83480966029c70ad14d5"
favicon: ""
aspectRatio: "52.5"
```

私はこのプロンプトを入れたエージェントをDiscordサーバーのコミュニティで公開し、何名かの鬼畜愛好家が存在しています。
サムネは鬼畜が死亡したとき、追悼の言葉を送った時の画像です。

# 日常の効率化

少々長い茶番はさておき、どのように使っているかを説明します。

## 要件定義

まずは日常で何の作業を行い、どのサービスを利用しているか書き出します。
![file-20260718221122153.png](/images/ai-agent-daily-efficiency/file-20260718221122153.png)
↑クリックしたらズームできます

拡大するとこんな感じです。
![file-20260718221231887.png](/images/ai-agent-daily-efficiency/file-20260718221231887.png)

あとはAIエージェントのツール定義かMCPにそれぞれのサービスのSkills作ってあげれば終わりです。

## 何ができるか

![file-20260718221402109.png](/images/ai-agent-daily-efficiency/file-20260718221402109.png)
![file-20260718221417819.png](/images/ai-agent-daily-efficiency/file-20260718221417819.png)

こんな感じでチャットアプリから作業ができます。とても快適ですよ。

## しくみ

中身はHermes Agentです。自動でメモリ・Skillsを更新・改善するので使用感がとても良いです。
1枚目の画像の作業は、AIと議論 -> wikijsに書き込みです。
2枚目の画像の作業は、Obsidianでブログを執筆 -> Obsidian LivesyncのCouch DBから情報を取得 -> blog用のレポジトリにpush -> 自動デプロイ
という形になっています。

正直、あなたが何をやっているかというのはあなた次第の内容です。ただ、こんな感じで結構自動化は楽です。権限とやり方さえあげれば良いのですから。こちらのソフトウェア選定は、CLIツール,APIが豊富であることという制約がありますが軽いものです。サーバーで完結するもの多いですし。

## うれしいこと

これの良いところは単なる効率化ではないことです。あらゆる情報を適切なソースから取得し、場合に応じて作業するため、私一人では把握できなかったこと、決められなかったことが高速に決まっていきます。0->1の感覚に近いです。

日常生活を送るにも、スケジュール（空き時間）を確認し、重たい議題に関しては情報収集が必要で、それをドキュメント化する必要もある。そのとき、Google Calenderから情報を取りPlane（タスク管理ツール）から現状を把握させ、スプレッドシートからお金・時間の見積もりを立て、Wikiに書き込む。　こんな感じで進んでいきます。状況に応じてスマートウォッチに通知飛ばせるようにしてます。

# 最後に

殴り書きなので読みにくかったかも。読んでくれた人はありがとう。
ぜひ自分なりの自動化やってみてください。
ではまた。