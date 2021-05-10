import React, { useState, createContext, useReducer, useEffect } from "react";
// 各コンポーネントのインポート
import {
  Header,
  TodoInput,
  TodoLists,
  TodoModal,
} from "./components/entryIndex";
// デフォルトtodoデータ（JSON）のインポート
import DefaultTodoData from "./DefaultTodoData.json";
//
// material-ui関連のインポート
import {
  Container,
  createMuiTheme,
  CssBaseline,
  Divider,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { lightBlue, pink } from "@material-ui/core/colors";

// date-fnsのインポート
import { format } from "date-fns";

// ////////////////////////////////////////////////////
// material-uiの設定

const useStyles = makeStyles({
  divider: {
    marginBottom: "16px",
  },
});

// ////////////////////////////////////////////////////
// Context作成
export const TodoSavedContext = createContext(); // Todoデータ本体(複数のtodo)
export const TodoTmpContext = createContext(); // 新規入力および編集する確定前todoデータ(個別todo)
export const GlobalContext = createContext(); // 定数

// ////////////////////////////////////////////////////
// todoSavedState,todoSavedDispatch（reducer）の設定 TodoSavedContextで渡す

const todoSavedInitialState = JSON.parse(localStorage.getItem("TodoData")); // データが無い場合nullが返ってくる。

const todoSavedReducer = (todoSavedState, todoSavedAction) => {
  console.log("関数実行（todoSavedReducer App.jsx）");
  let newTodoSavedState = [];
  switch (todoSavedAction.type) {
    // ////////////////////////////////
    case "addUpdate": // 新規追加および更新
      //  tmpIdの有無で新規追加か更新かを判断
      if (todoSavedAction.payload.tmpId === null) {
        // 新規追加の処理
        let newId = null;
        if (todoSavedState) {
          newId = Math.max(...todoSavedState.map((todo) => todo.id)) + 1; // 新規idは最大値+1（登録順ソートに利用）
        } else {
          newId = 1;
          todoSavedState = [];
          // 初回およびLocalStorageクリア後は、Todo新規追加時に空配列を作成する。
          // （todoSavedInitialStateに空配列を設定するとLocalStorageクリアが維持されない）
        }

        newTodoSavedState = [
          ...todoSavedState,
          {
            id: newId,
            todoText: todoSavedAction.payload.tmpTodoText,
            todoDetail: todoSavedAction.payload.tmpTodoDetail,
            deadline: todoSavedAction.payload.tmpDeadline,
            importanceIndex: todoSavedAction.payload.tmpImportanceIndex,
            progressIndex: todoSavedAction.payload.tmpProgressIndex,
            createdDate: todoSavedAction.payload.tmpCreatedDate,
            updateDate: todoSavedAction.payload.tmpUpdateDate,
            completeDate: todoSavedAction.payload.tmpCompleteDate,
          },
        ];
      } else {
        // 更新時の処理
        const updateTodo = {
          id: todoSavedAction.payload.tmpId,
          todoText: todoSavedAction.payload.tmpTodoText,
          todoDetail: todoSavedAction.payload.tmpTodoDetail,
          deadline: todoSavedAction.payload.tmpDeadline,
          importanceIndex: todoSavedAction.payload.tmpImportanceIndex,
          progressIndex: todoSavedAction.payload.tmpProgressIndex,
          createdDate: todoSavedAction.payload.tmpCreatedDate,
          updateDate: format(new Date(), "yyyy-MM-dd"),
          completeDate: todoSavedAction.payload.tmpCompleteDate,
        };
        const updateIndex = todoSavedState.findIndex(
          (item) => item.id === todoSavedAction.payload.tmpId
        );
        newTodoSavedState = [...todoSavedState];
        newTodoSavedState.splice(updateIndex, 1, updateTodo);
      }
      return newTodoSavedState;

    // ////////////////////////////////
    case "doneTodo": // Todo完了
      const doneIndex = todoSavedState.findIndex(
        (item) => item.id === todoSavedAction.payload
      );
      newTodoSavedState = [...todoSavedState];
      newTodoSavedState[doneIndex].progressIndex = 4; // 4:完了
      newTodoSavedState[doneIndex].updateDate = format(
        new Date(),
        "yyyy-MM-dd"
      );
      newTodoSavedState[doneIndex].completeDate = format(
        new Date(),
        "yyyy-MM-dd"
      );
      return newTodoSavedState;

    // ////////////////////////////////
    case "restoreTodo": // 完了を進行中に戻す
      const restoreIndex = todoSavedState.findIndex(
        (item) => item.id === todoSavedAction.payload
      );
      newTodoSavedState = [...todoSavedState];
      newTodoSavedState[restoreIndex].progressIndex = 2; // 2:進行中
      newTodoSavedState[restoreIndex].updateDate = format(
        new Date(),
        "yyyy-MM-dd"
      );
      newTodoSavedState[restoreIndex].completeDate = null;
      return newTodoSavedState;

    // ////////////////////////////////
    case "deleteTodo": // todoの削除
      const deleteIndex = todoSavedState.findIndex(
        (item) => item.id === todoSavedAction.payload
      );
      newTodoSavedState = [...todoSavedState];
      newTodoSavedState.splice(deleteIndex, 1);
      return newTodoSavedState;

    // ////////////////////////////////
    case "getDefault": // デフォルトデータの取り込み
      newTodoSavedState = [];
      newTodoSavedState = [...DefaultTodoData];
      return newTodoSavedState;

    // ////////////////////////////////
    case "clear": // 全データ削除
      return [];

    // ////////////////////////////////
    case "localClear": // ローカルストレージのクリア;
      // todoSavedStateがnullの場合、useEffectにてlocalStorage.clearが実行される。
      return null;

    // ////////////////////////////////
    default:
      return todoSavedState;
  }
};

// ////////////////////////////////////////////////////
// todoTmpState,todoTmpDispatchの設定 TodoTmpContextで渡す

const today = new Date();
const todoTmpInitialState = {
  tmpId: null,
  tmpTodoText: "",
  tmpTodoDetail: "",
  tmpDeadline: format(today.setDate(today.getDate() + 3), "yyyy-MM-dd"), // 完了期日の初期値:3日後
  tmpImportanceIndex: 3,
  tmpProgressIndex: 1,
  tmpCreatedDate: format(today, "yyyy-MM-dd"),
  tmpUpdateDate: format(today, "yyyy-MM-dd"),
  tmpCompleteDate: null,
  isModalOpen: false, // モーダルの表示・非表示を管理
};

const todoTmpReducer = (todoTmpState, todoTmpAction) => {
  console.log("関数実行（todoTmpReducer App.jsx）");
  switch (todoTmpAction.type) {
    // ////////////////////////////////
    case "new": // モーダルオープン（新規追加） *メイン画面の新規入力データはtodoTmpStateに格納済み。モーダルの状態のみ変更
      return (todoTmpState = {
        ...todoTmpState,
        isModalOpen: true,
      });

    // ////////////////////////////////
    case "edit": // モーダルオープン（編集）。payloadは編集したい個別todoデータ
      return (todoTmpState = {
        tmpId: todoTmpAction.payload.id,
        tmpTodoText: todoTmpAction.payload.todoText,
        tmpTodoDetail: todoTmpAction.payload.todoDetail,
        tmpDeadline: todoTmpAction.payload.deadline,
        tmpImportanceIndex: todoTmpAction.payload.importanceIndex,
        tmpProgressIndex: todoTmpAction.payload.progressIndex,
        tmpCreatedDate: todoTmpAction.payload.createdDate,
        tmpUpdateDate: todoTmpAction.payload.updateDate,
        isModalOpen: true,
      });

    // ////////////////////////////////
    case "handleChange": // todoTmpStateのいずれかの値が変更された場合のonChange処理
      const key = todoTmpAction.payload.key;
      const value = todoTmpAction.payload.value;
      return (todoTmpState = {
        ...todoTmpState,
        [key]: value,
      });

    // ////////////////////////////////
    case "cancel": // モーダルを閉じる。未確定の編集データと新規用データはtodoTmpInitialStateで共有しているため、編集の場合は初期値をセット。
      console.log(todoTmpInitialState);
      return todoTmpState.tmpId === null
        ? (todoTmpState = { ...todoTmpState, isModalOpen: false })
        : (todoTmpState = todoTmpInitialState);

    // ////////////////////////////////
    case "reset": // 確定した（保存）後の初期値セット
      return todoTmpInitialState;

    // ////////////////////////////////
    default:
      return todoTmpState;
  }
};

// ////////////////////////////////////////////////////
// 定数を設定
// 重要度selectボックスの項目
const selectImportanceElements = [
  { index: 1, name: "veryLaw", text: "1(低)" },
  { index: 2, name: "law", text: "2" },
  { index: 3, name: "common", text: "3（中）" },
  { index: 4, name: "high", text: "4" },
  { index: 5, name: "veryHigh", text: "5(高)" },
];

// 重要度selectボックスの項目
const selectProgressElements = [
  { index: 1, name: "notStated", text: "未着手" },
  { index: 2, name: "inProgress", text: "進行中" },
  { index: 3, name: "waiting", text: "待機中" },
  { index: 4, name: "done", text: "完了" },
];

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const App = () => {
  // material-uiのstyle読み込み
  const classes = useStyles();

  // ////////////////////////////////////////////////////
  // reducer関数の設定（それぞれcontextで渡す）
  const [todoSavedState, todoSavedDispatch] = useReducer(
    todoSavedReducer,
    todoSavedInitialState
  );
  const [todoTmpState, todoTmpDispatch] = useReducer(
    todoTmpReducer,
    todoTmpInitialState
  );

  // ダークモードの設定 headerのpropsで渡す
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "on" ? true : false
  );

  // 変数darkModeを利用するため、関数内に移動
  const theme = createMuiTheme({
    palette: {
      primary: lightBlue,
      secondary: { main: pink[300] },
      type: darkMode ? "dark" : "light",
    },
  });

  // ////////////////////////////////////////////////////
  // localStorageのデータ管理
  // 初回起動時
  useEffect(() => {
    // console.log("localStorage 初回起動時の処理 useEffect");
    if (typeof localStorage === "undefined") {
      alert(
        `このブラウザは、localStorageをサポートしていません！\nlocalStorageが利用できる環境でご使用ください。`
      );
      return;
    } else if (!localStorage.hasOwnProperty("TodoData")) {
      // 空配列がある場合は表示されない
      alert(
        `保存されたTodoデータはありません。\nデフォルトデータは画面右上の設定ボタンより取り込めます。`
      );
      return;
    } else {
      return;
    }
  }, []);

  // todoSavedStateが更新された場合にローカルストレージを更新する。
  // ただしtodoSavedStateがnullの場合はローカルストレージをクリア。
  useEffect(() => {
    // console.log("localStorage の更新 useEffect");
    todoSavedState === null
      ? localStorage.clear()
      : localStorage.setItem("TodoData", JSON.stringify(todoSavedState));
  }, [todoSavedState]);

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（App.jsx）");
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TodoSavedContext.Provider
          value={{
            todoSavedState,
            todoSavedDispatch,
          }}
        >
          <TodoTmpContext.Provider
            value={{
              todoTmpState,
              todoTmpDispatch,
            }}
          >
            <GlobalContext.Provider
              value={{
                selectImportanceElements,
                selectProgressElements,
              }}
            >
              {/* <TodoSavedDispatchContext value={todoSavedDispatch}> */}
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              {/* </TodoSavedDispatchContext> */}
              <Container maxWidth="xl">
                <TodoInput />
                <Divider variant="middle" className={classes.divider} />
                <TodoLists />
                {todoTmpState.isModalOpen === true && <TodoModal />}
              </Container>
            </GlobalContext.Provider>
          </TodoTmpContext.Provider>
        </TodoSavedContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
