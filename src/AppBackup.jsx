import React, { useState, createContext } from "react";

// todoデータ（JSON）のインポート
//TODO ローカルストレージ、Firebaseに移行
import TodoData from "./TodoData.json";

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

// todoデータをuseContextで管理
export const TodoContext = createContext();

const App = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState(TodoData);
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TodoContext.Provider value={todos}>
          <Header />
          <Container maxWidth="md">
            <TodoInput />
            <Divider variant="middle" className={classes.divider} />
            <h2>ToDo一覧</h2>
            <TodoLists />
          </Container>
        </TodoContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
