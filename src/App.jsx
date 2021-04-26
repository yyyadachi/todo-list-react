import React, { createContext, useReducer } from "react";

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
//TODO ローカルストレージを使ってみる。Firebaseに移行。
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

//TODO custom Hookにしたい
// todoデータをuseContextで管理
export const TodosContext = createContext();

// useReducerのinitialStateとReducerを定義
const initialState = TodoData;

const reducer = (state, action) => {
  switch (action) {
    case "addTodo":
      //TODO 処理を記述 TODOを追加する
      // idの最大値を求め+1する
      const id = Math.max(...state.map((todo) => todo.id)) + 1;

      return alert(id);
    case "openModal":
      //TODO 処理を記述 モーダルを開く
      return alert("openModal");
    case "editedTodo":
      //TODO 処理を記述 Todoの編集確定
      return alert("editedTodo");
    case "doneTodo":
      //TODO 処理を記述 Todoを完了
      return alert("doneTodo");
    case "deleteTodo":
      //TODO 処理を記述 Todoを削除
      return alert("deleteTodo");
    default:
      return state;
  }
};

const App = () => {
  const classes = useStyles();
  const [todosState, dispatch] = useReducer(reducer, initialState);
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TodosContext.Provider
          value={{
            todosState: todosState,
            todosDispatch: dispatch,
          }}
        >
          <Header />
          <Container maxWidth="md">
            <TodoInput />
            <Divider variant="middle" className={classes.divider} />
            <h2>ToDo一覧</h2>
            <TodoLists />
          </Container>
        </TodosContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
