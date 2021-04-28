import React, { useState, createContext, useReducer } from "react";

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

// 各コンポーネントのインポート
import { Header, TodoInput, TodoLists } from "./components/index";

// todoデータ（JSON）のインポート
import TodoData from "./TodoData.json";

// material-uiの設定
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: { main: pink[300] },
  },
});

const useStyles = makeStyles({
  divider: {
    marginBottom: "16px",
  },
});

// todo保存データをuseContextで管理
export const TodoStateContext = createContext();
// todo入力データをuseContextで管理
export const TodoTmpContext = createContext();

// useReducerのinitialStateとReducerを定義
const initialState = TodoData;

const reducer = (state, action) => {
  switch (action) {
    case "addTodo":
      //TODO 処理を記述 TODOを追加する
      // idの最大値を求め+1する
      const id = Math.max(...state.map((todo) => todo.id)) + 1;
      return [
        ...state,
        {
          id,
          // todoText,
          // todoDetail,
          // deadline,
          // importance,
          progress: "未着手",
          registrationDate: new Date(),
          updateDate: new Date(),
          completeDate: null,
        },
      ];

    case "editedTodo":
      //TODO 処理を記述 Todoの編集確定
      return alert("editedTodo");
    case "doneTodo":
      //TODO 処理を記述 Todoを完了
      return alert("doneTodo");
    case "restoreTodo":
      //TODO 処理を記述 Todoを未完了に戻す
      return alert("restoreTodo");
    case "deleteTodo":
      //TODO 処理を記述 Todoを削除
      return alert("deleteTodo");
    default:
      return state;
  }
};

const App = () => {
  // material-uiのstyle読み込み
  const classes = useStyles();

  // 入力データをuseStateに設定 TodoTmpContextにまとめる
  const [todoText, setTodoText] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [importance, setImportance] = useState("");
  const [progress, setProgress] = useState("");

  // Todo保存データの変更をreducer関数にまとめる
  const [todoState, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TodoStateContext.Provider
          value={{
            todoState,
            todoDispatch: dispatch,
          }}
        >
          <TodoTmpContext.Provider
            value={{
              todoText,
              setTodoText,
              todoDetail,
              setTodoDetail,
              deadline,
              setDeadline,
              importance,
              setImportance,
              progress,
              setProgress,
            }}
          >
            <Header />
            <Container maxWidth="md">
              <TodoInput />
              <Divider variant="middle" className={classes.divider} />
              <h2>ToDo一覧</h2>
              <TodoLists />
            </Container>
          </TodoTmpContext.Provider>
        </TodoStateContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
