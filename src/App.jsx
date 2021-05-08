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
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { lightBlue, pink } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
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
// todoSavedState,todoSavedDispatchの設定 TodoSavedContextで渡す

const todoSavedInitialState = JSON.parse(localStorage.getItem("TodoData"));
// localStorage.getItem("TodoData") || []; //データが無い場合は空の配列を返す

let newTodoSavedState = [];
const todoSavedReducer = (todoSavedState, todoSavedAction) => {
  switch (todoSavedAction.type) {
    case "addUpdate":
      //  tmpIdの有無で新規追加か更新かを分岐
      if (todoSavedAction.payload.tmpId === null) {
        // 新規idは最大値+1
        const newId =
          todoSavedState.length === 0
            ? 1
            : Math.max(...todoSavedState.map((todo) => todo.id)) + 1;
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

    case "doneTodo":
      const doneIndex = todoSavedState.findIndex(
        (item) => item.id === todoSavedAction.payload
      );
      newTodoSavedState = [...todoSavedState];
      newTodoSavedState[doneIndex].progressIndex = 4;
      newTodoSavedState[doneIndex].updateDate = format(
        new Date(),
        "yyyy-MM-dd"
      );
      newTodoSavedState[doneIndex].completeDate = format(
        new Date(),
        "yyyy-MM-dd"
      );
      console.log(JSON.stringify(newTodoSavedState));
      return newTodoSavedState;

    case "restoreTodo":
      const restoreIndex = todoSavedState.findIndex(
        (item) => item.id === todoSavedAction.payload
      );
      newTodoSavedState = [...todoSavedState];
      newTodoSavedState[restoreIndex].progressIndex = 2;
      newTodoSavedState[restoreIndex].updateDate = format(
        new Date(),
        "yyyy-MM-dd"
      );
      newTodoSavedState[restoreIndex].completeDate = null;
      // console.log(newTodoSavedState);
      return newTodoSavedState;

    case "deleteTodo": // todoの削除
      const deleteIndex = todoSavedState.findIndex(
        (item) => item.id === todoSavedAction.payload
      );
      newTodoSavedState = [...todoSavedState];
      newTodoSavedState.splice(deleteIndex, 1);
      return newTodoSavedState;

    case "getDefault":
      newTodoSavedState = [];
      newTodoSavedState = [...DefaultTodoData];
      return newTodoSavedState;

    case "clear":
      return [];

    case "localDelete":
      // ローカルストレージクリアの際、データが無い場合の空配列作成を明示的に回避
      return null;

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
  tmpDeadline: format(today.setDate(today.getDate() + 3), "yyyy-MM-dd"), // 3日後
  tmpImportanceIndex: 3,
  tmpProgressIndex: 1,
  tmpCreatedDate: format(new Date(), "yyyy-MM-dd"),
  tmpUpdateDate: format(new Date(), "yyyy-MM-dd"),
  tmpCompleteDate: null,
  isModalOpen: false, // モーダルの表示・非表示を設定
};

const todoTmpReducer = (todoTmpState, todoTmpAction) => {
  // console.log(JSON.stringify(todoTmpAction.payload), null, 2);
  switch (todoTmpAction.type) {
    case "new": // payloadはメイン画面の新規Todo（未追加）データ
      return (todoTmpState = {
        ...todoTmpState,
        isModalOpen: true,
      });

    case "edit": // payloadは編集したい個別todoデータ
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

    case "handleChange":
      const key = todoTmpAction.payload.key;
      const value = todoTmpAction.payload.value;
      return (todoTmpState = {
        ...todoTmpState,
        [key]: value,
      });

    case "cancel":
      console.log(todoTmpInitialState);
      return todoTmpState.tmpId === null
        ? (todoTmpState = { ...todoTmpState, isModalOpen: false })
        : (todoTmpState = todoTmpInitialState);

    case "reset":
      return todoTmpInitialState;

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
  // reducer関数の設定
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
      warning: { main: "#ff9800" },

      type: darkMode ? "dark" : "light",
    },
  });

  // ////////////////////////////////////////////////////
  // localStorageのデータ管理
  // 初回起動時
  useEffect(() => {
    if (typeof localStorage === "undefined") {
      alert(
        `このブラウザは、localStorageをサポートしていません！\nlocalStorageが利用できる環境でご使用ください。`
      );
      return;
    } else if (!localStorage.hasOwnProperty("TodoData")) {
      alert(
        `保存されたTodoデータはありません。\nデフォルトデータは画面右上の設定ボタンより取り込めます。`
      );
      return;
    } else {
      return;
    }
  }, []);

  // todoSavedStateが更新された場合にローカルストレージを更新する。
  // ただしtodoSavedStateがnullの場合はローカルストレージクリア。
  useEffect(() => {
    todoSavedState === null
      ? localStorage.clear()
      : localStorage.setItem("TodoData", JSON.stringify(todoSavedState));
  }, [todoSavedState]);

  useEffect(() => {
    console.log("DefaultTodoData が変わったよ！");
  }, [DefaultTodoData]);
  useEffect(() => {
    console.log("newTodoSavedState が変わったよ！");
  }, [newTodoSavedState]);

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
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
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
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
      {console.log("レンダー（App.jsx）")}
    </>
  );
};

export default App;
