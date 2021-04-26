# ToDoアプリ作成のアクションと考察メモ

## 2021/4/20
### Action
- create-react-appでアプリケーション作成・確認
- Githubにてレポジトリ作成 https://github.com/yyyadachi/todo-list-react  
GitHistoryで初期化、first commitプッシュ
- Material-UIをインストール・設定  
yarn add @material-ui/core @material-ui/system @material-ui/icons
- index.htmlを更新、下記を追加  
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />  

## 2021/4/21
### Action
- material-uiにはまる

## 2021/4/22
### examination
- データ構成
  - id ユニークな整数値・最も大きなIDに＋１する
  - summary 概要
  - detail 詳細（後日追加）
  - deadline 期日（デフォルトは3日後）
  - importance 重要度（１～５、デフォルトは３）
  - progress 進捗（未着手、進行中、待期、完了）  
  完了はボタン。表示は完了の有無でfilterする。
  - registrationDate 登録日
  - updateDate 更新日（初期値は登録日）
  - completionDate 完了日

### Action
- ヘッダー作成

