import React, { useState, createContext, useReducer } from "react";
// 各コンポーネントのインポート
import {
  Header,
  TodoInput,
  TodoLists,
  TodoModal,
} from "./components/entryIndex";
// todoデータ本体（JSON）のインポート
import TodoData from "./TodoData.json";
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
// ////////////////////////////////////////////////////
// material-uiの設定
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: { main: pink[300] },
    //TODO ダークモードの実装
    // type: "dark",
  },
});
const useStyles = makeStyles({
  divider: {
    marginBottom: "16px",
  },
});

// ////////////////////////////////////////////////////
// ////////////////////////////////////////////////////
// Context作成
export const TodoSavedContext = createContext(); // Todoデータ本体(複数のtodo)
export const TodoTmpContext = createContext(); // 新規入力および編集する確定前todoデータ(個別todo)
export const GlobalContext = createContext(); // 定数

// ////////////////////////////////////////////////////
// todoSavedState,todoSavedDispatchの設定 TodoSavedContextで渡す

const todoSavedInitialState = TodoData; // TodoDataはインポートJSONデータ

const todoSavedReducer = (todoSavedState, todoSavedAction) => {
  let newTodoSavedState = [];
  switch (todoSavedAction.type) {
    case "addUpdate":
      //  tmpIdの有無で新規追加か更新かを分岐
      if (todoSavedAction.payload.tmpId === null) {
        // 新規idは最大値+1
        const newId = Math.max([...todoSavedState].map((todo) => todo.id)) + 1;
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

    case "editedTodo":
      //TODO 処理を記述 Todoの編集確定
      return alert("editedTodo");

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
      // console.log(newTodoSavedState);
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
  console.log(JSON.stringify(todoTmpAction.payload));
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

    // 追加・削除はtodoSavedのreducerのはず
    // case "done":
    //   // メイン画面およびモーダルから新規追加、およびモダールから既存Todoの更新がある。
    //   if (todoTmpState.tmpId === null) {
    //     // const newId = Math.max(...todoSavedState.map((todo) => todo.id)) + 1;
    //     // todoDetail((type: addTOdo), (payload: todoTmpState));
    //   } else {
    //     alert("編集");
    //   }

    //   return (todoTmpState = { todoTmpInitialState });

    case "reset":
      return todoTmpInitialState;

    default:
      return todoTmpState;
  }
};

// ////////////////////////////////////////////////////
//新規入力の初期値を設定
const todayOne = new Date();
const initialValue = {
  deadline: format(todayOne.setDate(todayOne.getDate() + 3), "yyyy-MM-dd"),
  importanceIndex: 3,
  progressIndex: 1,
};
// ↑でdead'L'ineとなっていたためハマった。オブジェクトのkeyだから？使われていないとのエラーが出ず。。

// // const addNewTodo = useAddNewTodo;

// const modalInitialState = {
//   modalId: null,
//   modalTodoText: "",
//   modalTodoDetail: "",
//   modalDeadline: null,
//   modalImportanceIndex: null,
//   modalProgressIndex: null,
//   modalCreatedDate: null,
//   modalUpdateDate: null,
// };

// const modalReducer = (modalReducerState, modalReducerAction) => {
//   // console.log(JSON.stringify(modalReducerAction.payload));
//   switch (modalReducerAction.type) {
//     case "new": // payloadはメイン画面の新規Todo（未追加）データ
//       return (modalReducerState = {
//         ...modalReducerState,
//         modalTodoText: modalReducerAction.payload.todoText,
//         modalDeadline: modalReducerAction.payload.deadline,
//         modalImportanceIndex: modalReducerAction.payload.importanceIndex,
//       });

//     case "edit": // payloadは編集したい個別todoデータ
//       return (modalReducerState = {
//         modalId: modalReducerAction.payload.id,
//         modalTodoText: modalReducerAction.payload.todoText,
//         modalTodoDetail: modalReducerAction.payload.todoDetail,
//         modalDeadline: modalReducerAction.payload.deadline,
//         modalImportanceIndex: modalReducerAction.payload.importanceIndex,
//         modalProgressIndex: modalReducerAction.payload.progressIndex,
//         modalCreatedDate: modalReducerAction.payload.createdDate,
//         modalUpdateDate: modalReducerAction.payload.updateDate,
//       });

//     case "handleChange":
//       return (modalReducerState = {
//         ...modalReducerState,
//         modalTodoText:
//           modalReducerAction.payload.key === "tmpTodoText"
//             ? modalReducerAction.payload.value
//             : modalReducerState.modalTodoText,
//         modalTodoDetail:
//           modalReducerAction.payload.key === "modalTodoDetail"
//             ? modalReducerAction.payload.value
//             : modalReducerState.modalTodoDetail,
//         modalDeadline:
//           modalReducerAction.payload.key === "modalDeadline"
//             ? modalReducerAction.payload.value
//             : modalReducerState.modalDeadline,
//         modalImportanceIndex:
//           modalReducerAction.payload.key === "modalImportanceIndex"
//             ? modalReducerAction.payload.value
//             : modalReducerState.modalImportanceIndex,
//         modalProgressIndex:
//           modalReducerAction.payload.key === "modalProgressIndex"
//             ? modalReducerAction.payload.value
//             : modalReducerState.modalProgressIndex,
//       });
//     // modalId,modalCreatedDate,modalUpdateDateは更新無し

//     case "cancel":
//       return (modalReducerState = { modalInitialState });

//     case "done":
//       // if (action.payload === true) {
//       //   // todoDetail((type: addTOdo), (payload: modalReducerState));
//       // } else {
//       //   alert("編集");
//       // }

//       return (modalReducerState = { modalInitialState });

//     default:
//       return modalReducerState;
//   }
// };

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

  // // 入力データをuseStateに設定
  // const [todoText, setTodoText] = useState("");
  // const [todoDetail, setTodoDetail] = useState("");
  // const [deadline, setDeadline] = useState(initialValue.deadline);
  // const [importanceIndex, setImportanceIndex] = useState(
  //   initialValue.importanceIndex
  // );
  // const [progressIndex, setProgressIndex] = useState(
  //   initialValue.progressIndex
  // );

  // モーダルの表示・非表示を管理
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // // モーダルに渡す個別Todoデータの管理
  // const [editDetailTodo, setEditDetailTodo] = useState({
  //   id: null,
  //   todoText: "",
  //   todoDetail: "",
  //   deadline: null,
  //   importanceIndex: null,
  //   progressIndex: null,
  //   createdDate: null,
  //   updateDate: null,
  //   completeDate: null,
  // });

  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  // RETURN
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
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
            // value={{
            //   todoText,
            //   setTodoText,
            //   todoDetail,
            //   setTodoDetail,
            //   deadline,
            //   setDeadline,
            //   importanceIndex,
            //   setImportanceIndex,
            //   progressIndex,
            //   setProgressIndex,
            //   isModalOpen,
            //   setIsModalOpen,
            //   // editDetailTodo,
            //   // setEditDetailTodo,
            // }}
          >
            {/* <TodoModalContext.Provider
              value={{
                modalState,
                modalDispatch,
              }} 
            >*/}
            <GlobalContext.Provider
              value={{
                initialValue,
                selectImportanceElements,
                selectProgressElements,
              }}
            >
              <Container maxWidth="xl">
                <TodoInput />
                <Divider variant="middle" className={classes.divider} />
                <h2>ToDo一覧</h2>
                <TodoLists />
                {todoTmpState.isModalOpen === true && (
                  <TodoModal
                  // setIsModalOpen={setIsModalOpen}
                  // useLookUp={useLookUp}
                  />
                )}
              </Container>
            </GlobalContext.Provider>
            {/* </TodoModalContext.Provider> */}
          </TodoTmpContext.Provider>
        </TodoSavedContext.Provider>
      </ThemeProvider>
      {console.log("render App.jsx")}
    </>
  );
};

export default App;
