// Todoデータに新規Todoを追加する。
// 引数 payload(todoData,todoDetail,deadline,importanceIndex,ProgressIndex)

import { useContext } from "react";
import { TodoStateContext, TodoTmpContext, GlobalContext } from "../App";
import { format } from "date-fns";

const useAddNewTodo = (newTodoData) => {
  const todoStateContextValue = useContext(TodoStateContext);
  // const todoTmpContextValue = useContext(TodoTmpContext);
  const globalContextValue = useContext(GlobalContext);
  console.log(JSON.stringify(todoStateContextValue));
  const id =
    Math.max(...todoStateContextValue.todoState.map((todo) => todo.id)) + 1; // 新規idは最大値+1
  const newState = [
    ...todoStateContextValue,
    {
      id,
      todoText: newTodoData.todoText,
      todoDetail: newTodoData.todoDetail,
      deadline: newTodoData.deadline,
      importanceIndex: newTodoData.importanceIndex,
      progressIndex: newTodoData.progressIndex,
      createdDate: format(new Date(), "yyyy-MM-dd"),
      updateDate: format(new Date(), "yyyy-MM-dd"),
      completeDate: null,
    },
  ];
  // 入力フォームを初期化
  TodoTmpContext.setTodoText("");
  TodoTmpContext.setTodoDetail("");
  TodoTmpContext.setDeadline(globalContextValue.initialValue.deadline);
  TodoTmpContext.setImportanceIndex(
    globalContextValue.initialValue.importanceIndex
  );
  return newState;
};

export default useAddNewTodo;
