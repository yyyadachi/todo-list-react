import React, { useState, useContext, useEffect } from "react";
import { RadioComponent, TodoList } from "./index";

// TodoStateContextをインポート
import { TodoStateContext } from "../App";

// material-ui関連のインポート
import Grid from "@material-ui/core/Grid";

const TodoLists = () => {
  // TodoStateContext.todoStateの値を変数に分割代入
  const { todoState } = useContext(TodoStateContext);

  // 表示の状態（filter,sort）を管理するstate
  const [sortValue, setSortValue] = useState("id");
  const [filterValue, setFilterValue] = useState("incomplete");
  // 画面表示するtodoリストをstateで管理
  const [todoListForDisplay, setTodoListForDisplay] = useState(todoState);

  // radioボタン項目（ソート）
  const sortRadioElements = [
    { value: "id", label: "登録順" },
    { value: "deadline", label: "期日順" },
    { value: "importance", label: "重要度順" },
    {
      value: "updateDate",
      label: "更新日順",
      disabled: filterValue === "complete", // 完了の時はdisabled
    },
    {
      value: "completeDate",
      label: "完了日順",
      disabled: filterValue === "incomplete", // 未完了の時はdisabled
    },
  ];
  // radioボタン項目（表示区分）
  const doneRadioElements = [
    { value: "incomplete", label: "未完了", color: "secondary" },
    { value: "complete", label: "完了" },
  ];

  // 初回およびstate(filterValue、sortValue)が変更された場合にstate(todoListForDisplay)を更新する。
  useEffect(() => {
    // 更新日順を選択している状態で完了表示とした場合、完了日順を選択している状態で未完了表示とした場合ソートを登録順(id)とする。
    if (filterValue === "complete" && sortValue === "updateDate")
      setSortValue("id");
    if (filterValue === "incomplete" && sortValue === "completeDate")
      setSortValue("id");

    // 実行時の選択状態でfilter→sortを行う。
    const newDisplay = todoState
      .filter((todo) => {
        return filterValue === "incomplete"
          ? todo.progress !== "完了"
          : todo.progress === "完了";
      })
      .slice()
      .sort((a, b) => {
        if (a[sortValue] < b[sortValue]) {
          return 1;
        } else {
          return -1;
        }
      });
    setTodoListForDisplay(newDisplay);
    // console.log(todoListForDisplay); // 表示内容（正しい）と違うログが出力されるのが不明。
  }, [sortValue, filterValue]); // Warning:React Hook useEffect has missing dependencies.が出る。

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <RadioComponent
            title={"ソート（すべて降順）"}
            name={"sortRadioGroup"}
            elements={sortRadioElements}
            radioValue={sortValue}
            setRadioValue={setSortValue}
          />
          {/* {console.log("render:TodoLists.jsx RadioComponent(ソート)")} */}
        </Grid>
        <Grid item xs={12} md={4}>
          <RadioComponent
            title={"表示切替"}
            name={"FilterRadioGroup"}
            elements={doneRadioElements}
            radioValue={filterValue}
            setRadioValue={setFilterValue}
          />
          {/* {console.log("render:TodoLists.jsx RadioComponent(表示切替)")} */}
        </Grid>
      </Grid>
      <TodoList
        todoListForDisplay={todoListForDisplay} // 画面表示用Todo配列
        filterValue={filterValue} // 表示区分によってボタンの表示を切り替える
      />
      {/* {console.log("render:TodoLists.jsx")} */}
    </>
  );
};

export default TodoLists;
