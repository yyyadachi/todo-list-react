# ToDo アプリ（ReactHooks）

github URL https://github.com/yyyadachi/todo-list-react  
host URL https://yyyadachi.github.io/todo-list-react/

## 概要

- ToDo データを入力、編集、削除できる。
- 表示画面にて完了・未完了の選択、また各種ソートができる。
- 詳細入力および編集はモーダルで行う。

## ディレクトリ構成

src/  
￤ ┣ components/  
￤ │ ┗ forms/ // 汎用 component を格納  
￤ │ │ ┣ ButtonComponent.jsx // ボタン（登録、詳細入力、編集、完了、削除）  
￤ │ │ ┣ DatePickerComponent.jsx // 日付ピッカー（完了期日）  
￤ │ │ ┣ RadioComponent.jsx // ラジオボタン（表示区分、ソート選択）  
￤ │ │ ┣ SelectComponent.jsx // セレクトボックス（重要度、進捗）  
￤ │ │ ┗ TextInputComponent.jsx // 入力フォーム （todo、詳細）  
￤ │ ┣ definedFunction.js // 独自関数  
￤ │ ┣ entryIndex.js // エントリーポイント  
￤ │ ┣ Header.jsx // ヘッダー  
￤ │ ┣ TodoInput.jsx // 新規入力部分のラッパー  
￤ │ ┣ TodoLists.jsx // Todo データ表示部分のラッパー  
￤ │ ┣ TodoList.jsx // Todo データ本体表示  
￤ │ ┗ TodoModal.jsx // 新規 Todo の詳細入力および既存 Todo の編集  
￤ ┣ App.jsx  
￤ ┣ DefaultTodoData.josn // テスト用のデフォルト Todo データ  
￤ ┗ index.js

## UI 構成

index.js  
￤ ┗ App.jsx  
￤ ￤ ┣ Header.jsx // ダークモード切替、設定（スライド時、上に Fadeout）  
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

| 名前                                        | 内容                                                           | 設定ファイル  | context          | 備考                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------ | :------------------------------------------------------------- | :------------ | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| todoSavedInitialState                       | Todo データ本体を格納（LocalStorage）<br>reducer 関数の初期値  | App.jsx       |                  | Key :<br>• id<br>• todoData<br>• todoDetail<br>• deadline<br>• importanceIndex<br>• progressIndex<br>• createdDate<br>• updateDate<br>• completeDate                                                                                                                                                                           |
| todoSavedState<br>todoSavedDispatch         | Todo データ本体（更新があれば LocalStorage に反映）            | App.jsx       | TodoSavedContext | action.type：<br>• addUpadate 新規追加および更新<br>• doneTodo 完了<br>• restoreTodo 完了を進行中に戻す<br>• deleteTodo 削除<br>• getDefault デフォルトデータの取込<br>• clear 全データ削除<br>• localClear ロカールストレージのクリア                                                                                         |
| todoTmpInitialState                         | 新規入力の初期値（オブジェクト）                               | App.jsx       |                  | key：<br>• tmpId<br>• tmpTodoText<br>• tmpDetail<br>• tmpDeadline（初期値:３日後）<br>• tmpImportanceIndex 重要度（初期値:3、3（中））<br>• tmpProgressIndex 進捗（初期値:1、未着手）<br>• tmpCreateDate（初期値:当日）<br>• tmpUpdateDate（初期値:当日）<br>• tmpCompleteDate（初期値:null）<br>• isModalOpen（初期値:false） |
| todoTmpState<br>todoTmpDispatch             | 新規追加および更新対象の個別 Todo データ（オブジェクト）       | App.jsx       | TodoTmpContext   | action.type：<br>• new モーダルオープン（新規追加）<br>• edit モーダルオープン（編集）<br>• handleChange 各項目の onChange 時の関数<br>• cancel モーダルを閉じると共に編集の場合は初期値をセット<br>• reset 確定した（保存）後の初期値セット                                                                                   |
| selectImportanceElements                    | 重要度 selectBox の項目                                        | App.jsx       | GlobalContext    | 定数                                                                                                                                                                                                                                                                                                                           |
| selectProgressElements                      | 進捗 selectBox の項目                                          | App.jsx       | GlobalContext    | 定数                                                                                                                                                                                                                                                                                                                           |
| sortValue<br>setSortValue                   | 表示順の状態管理                                               | TodoLists.jsx |                  |                                                                                                                                                                                                                                                                                                                                |
| filterValue<br>setFilterValue               | 完了・未完了の表示状態管理                                     | TodoLists.jsx |                  |                                                                                                                                                                                                                                                                                                                                |
| todoListForDisplay<br>setTodoListForDisplay | 順序・表示切替・検索を反映した Todo リストを管理               | TodoLists.jsx |                  |                                                                                                                                                                                                                                                                                                                                |
| searchValue<br>setSearchValue               | 検索の値を管理                                                 | TodoLists.jsx |                  |                                                                                                                                                                                                                                                                                                                                |
| checked<br>setChecked                       | 表示条エリアの表示・非表示を切り替えるスイッチボタンの状態管理 | TodoLists.jsx |                  | switchChecked が怒られたため変更                                                                                                                                                                                                                                                                                               |
| sortRadioElements                           | ソート用 radio ボタンの項目                                    | TodoLists.jsx |                  | 定数                                                                                                                                                                                                                                                                                                                           |
| doneRadioElements                           | 完了・未完了表示切換え用 radio ボタンの項目                    | TodoLists.jsx |                  | 定数                                                                                                                                                                                                                                                                                                                           |

## 備考

- Material-ui 利用
- レスポンシブ対応に Grid 利用
- 入力時の一時的データを TodoTmpContext にまとめる
- Todo 保存データを TodoStateContext にまとめる
- Todo 保存データの state 変更は reducer にまとめる

## 今後の検証・反省

- 既にコンポーネント化されている material-ui の各部品をコンポーネントとして切り分ける必要はほとんどない？共通のデザイン等はスタイルで管理。
- React ではデータ構成だけでなく、どのように管理（useState、useReducer）し、どうやって渡すか（useContext、props）しっかりと最初に考慮しておくべき
- 検索を入れるときは、ソートや抽出との兼ね合いをどうするか先に決めておくべき

## 将来的に検討

- データをローカルストレージに保存。
- todoText の入力にバリデーションをつける
- Firebase を利用。(promise、axios 利用？)
- ダークモードの設定(済)
- 期日が翌日以前はアイコンを赤くする（完了分除く）(済)
- レスポンシブで divider の表示・非表示を切り替える(済)
- todo 削除に confirm を入れる(済)
- モバイルの見栄えのため入力とソート欄は初期非表示にする(済)
- 検索を追加(済)

## 課題・覚えたいこと（Todo アプリに関係ないもの含む）

- useCallback,useMemo,useRef を使ってみる
- カスタムフックを使ってみる
- material-ui のカスタマイズ
- 配列操作（高度な集計計算）
- ui（フォーム関係） の使い勝手およびバリデーションの強化
- テストの記述
- 認証
- データベースサーバー
- 本番での API キー等の保存の仕方
