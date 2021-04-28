# ToDoアプリ（ReactHooks）
 github URL https://github.com/yyyadachi/todo-list-react  
 host URL 未作成

## 概要
- ToDoデータを入力、編集、削除できる。
- 表示画面にて完了・未完了の選択、また各種ソートができる。
- 詳細入力および編集はモーダルで行う。

## ディレクトリ構成
src/  
￤ ┣ components/  
￤ │ ┗ forms/ // 汎用componentを格納  
￤ │ │ ┣ ButtonComponent.jsx // ボタン（登録、詳細入力、編集、完了、削除）  
￤ │ │ ┣ DatePickerComponent.jsx // 日付ピッカー（完了期日）  
￤ │ │ ┣ RadioComponent.jsx // ラジオボタン（表示区分、ソート選択）  
￤ │ │ ┣ SelectComponent.jsx // セレクトボックス（重要度、進捗）  
￤ │ │ ┣ TextInputComponent.jsx // 入力フォーム （todo、詳細）  
￤ │ │ ┗ ModalComponent.jsx // モーダル （詳細入力、編集）**未実装**  
￤ │ ┣ Header.jsx // ヘッダー  
￤ │ ┣ index.js // エントリーポイント  
￤ │ ┣ TodoInput.jsx // 新規入力部分のラッパー  
￤ │ ┣ TodoLists.jsx // Todoデータ表示部分のラッパー  
￤ │ ┗ TodoList.jsx // Todoデータ本体表示  
￤ ┣ App.jsx  
￤ ┣ index.js  
￤ ┗ TodoData.json //ToDo本体データ（JSON形式）

## UI構成
index.js  
￤ ┗ App.jsx  
￤ ￤ ┣ Header.jsx  // ダークモード（**未実装**）切替用スイッチボタン内包  
￤ ￤ ┣ TodoInput.jsx  
￤ ￤ │ ┣ TextInputComponent.jsx // Todoテキスト入力  
￤ ￤ │ ┣  ButtonComponent.jsx // 詳細編集ボタン（モーダルを開く）  
￤ ￤ │ ┣  DatePickerComponent.jsx // 完了期日入力  
￤ ￤ │ ┣  SelectComponent.jsx // 重要度選択  
￤ ￤ │ ┗ ButtonComponent.jsx // 登録ボタン  
￤ ￤ ┣ TodoLists.jsx  
￤ ￤ │ ┣ SelectComponent.jsx // ソート選択  
￤ ￤ │ ┣ SelectComponent.jsx // 完了・未完了切替  
￤ ￤ │ ┗ TodoList.jsx //Todoデータ本文の表示  
￤ ￤ │ ￤ ┣ ButtonComponent.jsx // 完了ボタン（未完了表示の場合）  
￤ ￤ │ ￤ ┣ ButtonComponent.jsx // 編集ボタン（未完了表示の場合）  
￤ ￤ │ ￤ ┗ ButtonComponent.jsx // 削除ボタン（未完了表示の場合）  
￤ ￤ │ ￤ ┗ ButtonComponent.jsx // 戻すボタン（完了表示の場合）  
￤ ￤ ┗ Modal.jsx(**未実装**)  

## データ構成
- id ユニークな整数値・最も大きなIDに＋１する
- todoText Todo本文
- todoDetail Todo詳細
- deadline 期日（デフォルトは3日後）
- importance 重要度（１～５、デフォルトは３）
- progress 進捗（未着手、進行中、待期、完了）  
- registrationDate 登録日
- updateDate 更新日（初期値は登録日）
- completeDate 完了日

## 備考
- Material-ui利用
- レスポンシブ対応にGrid利用
- 入力時の一時的データをTodoTmpContextにまとめる
- Todo保存データをTodoStateContextにまとめる
- Todo保存データのstate変更はreducerにまとめる
## 将来的に検討
- ダークモードの設定
- データをローカルストレージに保存。
- Firebaseを利用。(promise、axios利用？)
- 検索を追加
