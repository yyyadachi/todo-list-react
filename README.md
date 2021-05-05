# ToDo アプリ（ReactHooks）

github URL https://github.com/yyyadachi/todo-list-react  
host URL 未作成

## 概要

- ToDo データを入力、編集、削除できる。
- 表示画面にて完了・未完了の選択、また各種ソートができる。
- 詳細入力および編集はモーダルで行う。(未実装)

## ディレクトリ構成

src/  
￤ ┣ components/  
￤ │ ┗ forms/ // 汎用 component を格納  
￤ │ │ ┣ ButtonComponent.jsx // ボタン（登録、詳細入力、編集、完了、削除）  
￤ │ │ ┣ DatePickerComponent.jsx // 日付ピッカー（完了期日）  
￤ │ │ ┣ RadioComponent.jsx // ラジオボタン（表示区分、ソート選択）  
￤ │ │ ┣ SelectComponent.jsx // セレクトボックス（重要度、進捗）  
￤ │ │ ┗ TextInputComponent.jsx // 入力フォーム （todo、詳細）  
￤ │ ┣ Header.jsx // ヘッダー  
￤ │ ┣ index.js // エントリーポイント  
￤ │ ┣ TodoInput.jsx // 新規入力部分のラッパー  
￤ │ ┣ TodoLists.jsx // Todo データ表示部分のラッパー  
￤ │ ┣ TodoList.jsx // Todo データ本体表示  
￤ │ ┗ TodoModal.jsx // 新規 Todo の詳細入力および既存 Todo の編集  
￤ ┣ App.jsx  
￤ ┣ index.js  
￤ ┗ TodoData.json //ToDo 本体データ（JSON 形式）

## UI 構成

index.js  
￤ ┗ App.jsx  
￤ ￤ ┣ Header.jsx // ダークモード（**未実装**）切替用スイッチボタン内包  
￤ ￤ ┣ TodoInput.jsx  
￤ ￤ │ ┣ TextInputComponent.jsx // Todo テキスト入力  
￤ ￤ │ ┣ ButtonComponent.jsx // 詳細編集ボタン（モーダルを開く）  
￤ ￤ │ │ ┗ Modal.jsx  
￤ ￤ │ │ │ ┣ DatePickerComponent.jsx // 完了期日入力  
￤ ￤ │ │ │ ┣ SelectComponent.jsx // 重要度選択  
￤ ￤ │ │ │ ┗ SelectComponent.jsx // 進捗度選択  
￤ ￤ │ ┣ DatePickerComponent.jsx // 完了期日入力  
￤ ￤ │ ┣ SelectComponent.jsx // 重要度選択  
￤ ￤ │ ┗ ButtonComponent.jsx // 登録ボタン  
￤ ￤ ┣ TodoLists.jsx  
￤ ￤ │ ┣ SelectComponent.jsx // ソート選択  
￤ ￤ │ ┣ SelectComponent.jsx // 完了・未完了切替  
￤ ￤ │ ┗ TodoList.jsx //Todo データ本文の表示  
￤ ￤ │ ￤ ┣ ButtonComponent.jsx // 完了ボタン（未完了表示の場合）  
￤ ￤ │ ￤ ┣ ButtonComponent.jsx // 編集ボタン（未完了表示の場合、モーダルを開く）  
￤ ￤ ￤ ￤ │ ┗ Modal.jsx  
￤ ￤ ￤ ￤ │ │ ┣ DatePickerComponent.jsx // 完了期日入力  
￤ ￤ ￤ ￤ │ │ ┣ SelectComponent.jsx // 重要度選択  
￤ ￤ ￤ ￤ │ │ ┗ SelectComponent.jsx // 進捗度選択  
￤ ￤ │ ￤ ┗ ButtonComponent.jsx // 削除ボタン（未完了表示の場合）  
￤ ￤ │ ￤ ┗ ButtonComponent.jsx // 進行中に戻すボタン（完了表示の場合）

## データ構成

### 一つの Todo が持つデータ ①

- id ユニークな整数値・最も大きな ID に＋１する
- todoText Todo 本文
- todoDetail Todo 詳細
- deadline 期日（デフォルトは 3 日後）
- importanceIndex 重要度（１～５、デフォルトは３（３中））
- progressIndex 進捗（１～４（未着手、進行中、待期、完了）、デフォルトは１（未着手））
- createdDate 登録日
- updateDate 更新日（初期値は登録日）
- completeDate 完了日

### 3 パターンの todo データで管理

- todoSavedState(App.jsx) ① のオブジェクトを複数持つ配列。保存する todo データ本体。  
  reducer で制御し、TodoStateContext で渡す。
- todoTmpState(App.jsx) ① のデータおよびモーダルの表示・非表示を持つオブジェクト。  
  一つの新規追加 todo もしくは編集する todo の確定前データを持つ。  
  reducer で制御し、TodoTmpContext で渡す。
- todoListForDisplay(TodoLists.jsx) ① のオブジェクトを複数持つ配列。  
  filter および sort の状態を反映した表示用の todo データ  
  useState で制御し、context 利用はしない

## 主な State・変数・定数 構成

| 名前                                | 内容                                                          | 設定ファイル | context          | 備考                                                                                                                                        | 利用ファイル |
| :---------------------------------- | :------------------------------------------------------------ | :----------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :----------- |
| initialState                        | Todo データ本体を格納（オブジェクト）<br>reducer 関数の初期値 | App.jsx      |                  | Key はデータ構成参照                                                                                                                        |
| todoState<br>todoDispatch           | Todo データ本体                                               | App.jsx      | TodoStateContext | dispatch：<br>• addTodo 新規追加<br>• editedTodo 詳細・編集確定<br>• doneTodo 完了<br>• restoreTodo 完了を進行中に戻す<br>• deleteTodo 削除 |
| initialValue                        | 新規入力の初期値（オブジェクト）                              | App.jsx      |                  | key：<br>• deadline 完了期日（３日後）<br>• importance 重要度（３）<br>• progress 進捗（未着手）                                            |
| todoText<br>setTodoText             | Todo テキスト（新規入力）                                     | App.jsx      | TodoTmpContext   |
| todoDetail<br>setTodoDetail         | 詳細テキスト（新規入力）                                      | App.jsx      | TodoTmpContext   |
| deadline<br>setDeadline             | 完了期日（新規入力）                                          | App.jsx      | TodoTmpContext   | 初期値は initialValue より                                                                                                                  |
| importance<br>setImportance         | 重要度（新規入力）                                            | App.jsx      | TodoTmpContext   | 初期値は initialValue より                                                                                                                  |
| progress<br>setProgress             | 進捗（新規入力）                                              | App.jsx      | TodoTmpContext   | 初期値は initialValue より                                                                                                                  |
| isModalOpen<br>setIsModalOpen       | モーダルの表示状態を管理                                      | App.jsx      | TodoTmpContext   | 初期値 false                                                                                                                                |
| editDetailTodo<br>setEditDetailTodo | モーダル編集対象の個別 Todo データ（オブジェクト）            | App.jsx      | TodoTmpContext   | Key はデータ構成参照                                                                                                                        |
| selectImportanceElements            | 重要度 selectBox の項目                                       | App.jsx      | GlobalContext    | 定数                                                                                                                                        |              |
| selectProgressElements              | 進捗 selectBox の項目                                         | App.jsx      | GlobalContext    | 定数                                                                                                                                        |              |

## 備考

- Material-ui 利用
- レスポンシブ対応に Grid 利用
- 入力時の一時的データを TodoTmpContext にまとめる
- Todo 保存データを TodoStateContext にまとめる
- Todo 保存データの state 変更は reducer にまとめる

## 将来的に検討

- ダークモードの設定
- データをローカルストレージに保存。
- Firebase を利用。(promise、axios 利用？)
- 検索を追加
- モバイルの使い勝手のため入力とソート欄は初期非表示にする
- todo 削除に cofirm を入れる
- フッターをつける。（新規入力、ソート・検索）
- 期日が翌日以前はアイコンを赤くする
- レスポンシブで divider の表示・非表示を切り替える

## 課題・覚えたいこと（Todo アプリに関係ないもの含む）

- useCallback,useMemo,useRef を使ってみる
- materiai-ui のカスタマイズ
- 配列操作（高度な集計計算）
- ui の使い勝手やバリデーション
- 認証
- データベースサーバー
- 本番での API キー等の保存の仕方
