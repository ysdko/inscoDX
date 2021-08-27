# inscoDX

## ハッカソンアプリ


## 準備


## 環境構築と実行方法
1. 必要なモジュールをインストールする。  
`yarn install`
2. 以下のリンクからface-apiで使用するweightをダウンロードして/public/modelsというディレクトリに保存する。　　
<https://github.com/justadudewhohacks/face-api.js.git>
3. ローカルサーバを起動する。  
`yarn dev`

## 開発方法

1. develop ブランチから開発用のブランチを切る。（ブランチ名については下のブランチ命名規則を参照）
2. 開発用のブランチで開発を進める。（このブランチからさらにブランチを切ってマージをさせる分には自由にやってもらって大丈夫です。コミットのルールについては下記を参照）
4. develop -> 開発用ブランチにマージをし、コンフリクトが発生していないか確認する。
5. 開発用のブランチ -> develop にプルリクを出す。
6. レビュアーによる承認を得たら、プルリクを出した人がマージさせる。


## ブランチ命名規則

- 新規ページ design/[ページ名]
- 新規機能 add/[機能名]
- 既存機能の修正 fix/[機能名]
- バグ修正 hotfix/[バグ名]
- リリース release/[バージョン]


## コミットのルール

- コメントの言語（日・英）に関してはとくに定めていません。
- 頭に、タグ（add:, update:, fix: など）をつけてもらえると非常に見やすいかと思います。
- コミットの粒度については、なるべく細かめにお願いします。（目安としては、1機能1コミット）
